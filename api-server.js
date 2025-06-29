require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');
const path = require('path');

// Importar modelos
const Consulta = require('./src/models/Consulta');
const Usuario = require('./src/models/Usuario');

const app = express();

// Configuración de seguridad
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

// CORS configurado para el dominio de producción
app.use(cors({
  origin: ['http://localhost:3000', 'https://chiledigno.cl', 'http://chiledigno.cl'],
  credentials: true
}));

// Rate limiting
const consultasLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // máximo 5 consultas por IP cada 15 minutos
  message: {
    error: 'Demasiadas consultas. Intenta nuevamente en 15 minutos.',
    code: 'RATE_LIMIT_EXCEEDED'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Configuración de sesiones
app.use(session({
  secret: process.env.SESSION_SECRET || 'melinao2026-secret-key',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: 'mongodb://localhost:27017/melinao2026',
    touchAfter: 24 * 3600 // lazy session update
  }),
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7 // 7 días
  }
}));

// Inicializar Passport
app.use(passport.initialize());
app.use(passport.session());

// Verificar configuración OAuth
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
  console.warn('⚠️  Credenciales OAuth no configuradas. Login deshabilitado.');
  console.warn('ℹ️  Ejecuta: /root/application/setup-oauth.sh para configurar');
}

// Función para obtener la URL base de producción
const getProductionUrl = () => {
  return process.env.FRONTEND_URL_PROD || 'https://melinao2026.cl';
};

// Configurar Google OAuth Strategy solo si hay credenciales
if (GOOGLE_CLIENT_ID && GOOGLE_CLIENT_SECRET) {
  passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.NODE_ENV === 'production' 
      ? `${getProductionUrl()}/api/auth/google/callback`
      : 'http://localhost:8000/api/auth/google/callback'
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      const usuario = await Usuario.buscarOCrearOAuth(profile, 'google');
      return done(null, usuario);
    } catch (error) {
      return done(error, null);
    }
  }));
  console.log('✅ Google OAuth configurado correctamente');
} else {
  console.log('⏭️  Google OAuth omitido - configurar credenciales');
}

// Serialización de usuarios para sesiones
passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await Usuario.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/melinao2026', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Conectado a MongoDB'))
.catch(err => console.error('❌ Error conectando a MongoDB:', err));

// Middleware para capturar IP real
app.use((req, res, next) => {
  req.clientIp = req.headers['x-forwarded-for'] || 
                 req.headers['x-real-ip'] || 
                 req.connection.remoteAddress || 
                 req.socket.remoteAddress ||
                 (req.connection.socket ? req.connection.socket.remoteAddress : null);
  next();
});

// Middleware de verificación JWT
const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token de acceso requerido' });
  }
  
  const token = authHeader.split(' ')[1];
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
};

// Middleware de autenticación (soporte para JWT y sesiones)
const requireAuth = (req, res, next) => {
  // Primero intentamos verificar JWT
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return verifyJWT(req, res, next);
  }
  
  // Fallback a session authentication
  if (req.isAuthenticated()) {
    return next();
  }
  
  res.status(401).json({ error: 'Acceso denegado. Debes iniciar sesión.' });
};

// Rutas de Autenticación

// Iniciar autenticación con Google
app.get('/api/auth/google', (req, res, next) => {
  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
    return res.status(503).json({
      error: 'OAuth no configurado',
      message: 'Las credenciales de Google OAuth no están configuradas en el servidor.',
      setup: 'Contacta al administrador para configurar las credenciales'
    });
  }
  passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
});

// Callback de Google OAuth
app.get('/api/auth/google/callback',
  passport.authenticate('google', { 
    failureRedirect: process.env.NODE_ENV === 'production' 
      ? `${getProductionUrl()}/login-error`
      : 'http://localhost:3000/login-error'
  }),
  (req, res) => {
    // Generar JWT token
    const jwtPayload = {
      id: req.user._id,
      nombre: req.user.nombre,
      email: req.user.email,
      avatar: req.user.avatar,
      provider: req.user.provider
    };
    
    const token = jwt.sign(jwtPayload, process.env.JWT_SECRET, { expiresIn: '7d' });
    
    // Redirigir a la página de participación con el token
    const redirectUrl = process.env.NODE_ENV === 'production' 
      ? `${getProductionUrl()}/participacion-ciudadana?login=success&token=${token}`
      : `http://localhost:3000/participacion-ciudadana?login=success&token=${token}`;
    
    res.redirect(redirectUrl);
  }
);

// Obtener información del usuario actual
app.get('/api/auth/user', (req, res) => {
  // Verificar JWT primero
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return res.json({
        id: decoded.id,
        nombre: decoded.nombre,
        email: decoded.email,
        avatar: decoded.avatar,
        provider: decoded.provider
      });
    } catch (error) {
      return res.status(401).json({ error: 'Token inválido o expirado' });
    }
  }
  
  // Fallback a session authentication
  if (req.isAuthenticated()) {
    res.json({
      id: req.user._id,
      nombre: req.user.nombre,
      email: req.user.email,
      avatar: req.user.avatar,
      provider: req.user.provider,
      consultasEnviadas: req.user.consultasEnviadas,
      reputacion: req.user.reputacion
    });
  } else {
    res.status(401).json({ error: 'No autenticado' });
  }
});

// Cerrar sesión
app.post('/api/auth/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: 'Error al cerrar sesión' });
    }
    res.json({ message: 'Sesión cerrada exitosamente' });
  });
});

// Rutas API de Consultas

// GET - Obtener consultas públicas con filtros y paginación
app.get('/api/consultas/public', async (req, res) => {
  try {
    const { page = 1, limit = 12, tema, region, sortBy = 'fechaPublicacion' } = req.query;
    
    const filtros = {};
    if (tema && tema !== 'todos') filtros.tema = tema;
    if (region && region !== 'todas') filtros.region = region;

    const opciones = {
      page: parseInt(page),
      limit: parseInt(limit),
      sortBy,
      sortOrder: -1
    };

    const resultado = await Consulta.getConsultasPublicas(filtros, opciones);
    res.json(resultado);

  } catch (error) {
    console.error('Error obteniendo consultas públicas:', error);
    res.status(500).json({
      error: 'Error obteniendo consultas públicas'
    });
  }
});

// POST - Dar like a una consulta (requiere autenticación)
app.post('/api/consultas/:id/like', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const consulta = await Consulta.findById(id);
    
    if (!consulta) {
      return res.status(404).json({ error: 'Consulta no encontrada' });
    }

    const liked = await consulta.toggleLike(req.user._id);
    
    res.json({
      success: true,
      liked,
      totalLikes: consulta.likes
    });

  } catch (error) {
    console.error('Error procesando like:', error);
    res.status(500).json({ error: 'Error procesando like' });
  }
});

// POST - Reportar una consulta (requiere autenticación)
app.post('/api/consultas/:id/report', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { motivo } = req.body;
    
    const consulta = await Consulta.findById(id);
    if (!consulta) {
      return res.status(404).json({ error: 'Consulta no encontrada' });
    }

    await consulta.reportar(req.user._id, motivo);
    
    res.json({
      success: true,
      message: 'Reporte enviado exitosamente'
    });

  } catch (error) {
    console.error('Error procesando reporte:', error);
    res.status(500).json({ error: 'Error procesando reporte' });
  }
});

// POST - Enviar nueva consulta (requiere autenticación)
app.post('/api/consultas', consultasLimiter, requireAuth, async (req, res) => {
  try {
    const {
      nombre,
      email,
      region,
      edad,
      tema,
      tipoConsulta,
      mensaje,
      userAgent,
      url
    } = req.body;

    // Validaciones básicas
    if (!region || !edad || !tipoConsulta || !mensaje) {
      return res.status(400).json({
        error: 'Faltan campos requeridos: región, edad, tipo de consulta y mensaje'
      });
    }

    if (mensaje.length < 10) {
      return res.status(400).json({
        error: 'El mensaje debe tener al menos 10 caracteres'
      });
    }

    // Crear nueva consulta
    const consultaData = {
      region,
      edad,
      tema: tema || 'general',
      tipoConsulta,
      mensaje,
      ip: req.clientIp,
      userAgent,
      url,
      fechaEnvio: new Date()
    };

    // Si el usuario está autenticado
    if (req.isAuthenticated()) {
      consultaData.userId = req.user._id;
      consultaData.nombre = req.user.nombre;
      consultaData.email = req.user.email;
      
      // Incrementar contador de consultas del usuario
      await req.user.incrementarConsultas();
    } else {
      // Usuario anónimo (mantener compatibilidad)
      consultaData.nombre = nombre || '';
      consultaData.email = email || '';
    }

    const consulta = new Consulta(consultaData);

    // Análisis automático
    consulta.categorizarAutomaticamente();
    consulta.analizarSentimiento();

    // Determinar prioridad automáticamente
    if (consulta.tipoConsulta === 'critica' || consulta.sentiment === 'negativo') {
      consulta.prioridad = 'alta';
    } else if (consulta.tipoConsulta === 'apoyo') {
      consulta.prioridad = 'baja';
    }

    // Guardar en base de datos
    await consulta.save();

    console.log(`🆕 Nueva consulta recibida - Región: ${region}, Tipo: ${tipoConsulta}, Categoría: ${consulta.categoria}`);

    res.status(201).json({
      success: true,
      message: 'Consulta recibida exitosamente',
      id: consulta._id,
      categoria: consulta.categoria,
      sentiment: consulta.sentiment
    });

  } catch (error) {
    console.error('Error guardando consulta:', error);
    res.status(500).json({
      error: 'Error interno del servidor',
      message: 'No se pudo guardar la consulta. Inténtalo nuevamente.'
    });
  }
});

// GET - Obtener estadísticas públicas
app.get('/api/consultas/stats', async (req, res) => {
  try {
    const stats = await Consulta.getEstadisticas();
    
    // Estadísticas por región
    const porRegion = await Consulta.aggregate([
      {
        $group: {
          _id: '$region',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    // Estadísticas por tipo
    const porTipo = await Consulta.aggregate([
      {
        $group: {
          _id: '$tipoConsulta',
          count: { $sum: 1 }
        }
      }
    ]);

    // Tendencia semanal
    const haceUnaSemana = new Date();
    haceUnaSemana.setDate(haceUnaSemana.getDate() - 7);
    
    const consultasRecientes = await Consulta.countDocuments({
      fechaEnvio: { $gte: haceUnaSemana }
    });

    res.json({
      total: stats.total || 0,
      implementadas: stats.implementadas || 0,
      enRevision: stats.enRevision || 0,
      consultasEstaSemana: consultasRecientes,
      porRegion,
      porTipo,
      ultimaActualizacion: new Date()
    });

  } catch (error) {
    console.error('Error obteniendo estadísticas:', error);
    res.status(500).json({
      error: 'Error obteniendo estadísticas'
    });
  }
});

// GET - Obtener consultas recientes (solo para admin)
app.get('/api/consultas/admin', async (req, res) => {
  try {
    // En producción, esto debería tener autenticación
    const { page = 1, limit = 20, estado, categoria, region } = req.query;
    
    const filtros = {};
    if (estado) filtros.estado = estado;
    if (categoria) filtros.categoria = categoria;
    if (region) filtros.region = region;

    const consultas = await Consulta.find(filtros)
      .select('-ip -userAgent') // No exponer datos sensibles
      .sort({ fechaEnvio: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .lean();

    const total = await Consulta.countDocuments(filtros);

    res.json({
      consultas,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });

  } catch (error) {
    console.error('Error obteniendo consultas:', error);
    res.status(500).json({
      error: 'Error obteniendo consultas'
    });
  }
});

// PUT - Actualizar estado de consulta (solo para admin)
app.put('/api/consultas/:id/estado', async (req, res) => {
  try {
    const { id } = req.params;
    const { estado, respuesta, implementada } = req.body;

    const consulta = await Consulta.findById(id);
    if (!consulta) {
      return res.status(404).json({ error: 'Consulta no encontrada' });
    }

    consulta.estado = estado;
    if (respuesta) {
      consulta.respuesta = {
        mensaje: respuesta,
        autor: 'Equipo Melinao 2026',
        fecha: new Date()
      };
    }
    
    if (implementada !== undefined) {
      consulta.implementada = implementada;
      if (implementada) {
        consulta.fechaImplementacion = new Date();
      }
    }

    await consulta.save();

    res.json({
      success: true,
      message: 'Consulta actualizada exitosamente'
    });

  } catch (error) {
    console.error('Error actualizando consulta:', error);
    res.status(500).json({
      error: 'Error actualizando consulta'
    });
  }
});

// Ruta para servir archivos estáticos de React
app.use(express.static(path.join(__dirname, 'build')));

// Fallback para React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Manejo de errores
app.use((error, req, res, next) => {
  console.error('Error no manejado:', error);
  res.status(500).json({
    error: 'Error interno del servidor',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Algo salió mal'
  });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor API ejecutándose en puerto ${PORT}`);
  console.log(`📊 Dashboard admin: http://localhost:${PORT}/api/consultas/admin`);
  console.log(`📈 Estadísticas públicas: http://localhost:${PORT}/api/consultas/stats`);
});

module.exports = app;