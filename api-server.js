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
const Patrocinio = require('./src/models/Patrocinio');
const Testimonio = require('./src/models/Testimonio');
const CampaignMetrics = require('./src/models/CampaignMetrics');
const Articulo = require('./src/models/Articulo');

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

// CORS configurado para ambos dominios de producción
app.use(cors({
  origin: [
    'http://localhost:3000', 
    'https://chiledigno.cl', 
    'http://chiledigno.cl',
    'https://melinao2026.cl',
    'http://melinao2026.cl',
    'https://n8n.melisoft.cloud'
  ],
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
  // OAuth credentials not configured
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
  // Google OAuth configured
} else {
  // Google OAuth skipped - configure credentials
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
.then(() => {
  // Connected to MongoDB
})
.catch(err => {
  // MongoDB connection error
});

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

// Middleware para verificar administrador autorizado
const verifyAdmin = (req, res, next) => {
  const authorizedAdmins = ['neobones@gmail.com'];
  
  // Verificar si el usuario tiene JWT válido
  if (!req.user) {
    return res.status(401).json({ error: 'Autenticación requerida' });
  }
  
  // Verificar si el email está en la lista de administradores autorizados
  if (!authorizedAdmins.includes(req.user.email)) {
    return res.status(403).json({ 
      error: 'Acceso denegado. No tienes permisos de administrador.',
      requiredRole: 'Administrador autorizado'
    });
  }
  
  next();
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
    // console.error('Error obteniendo consultas públicas:', error);
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
    // console.error('Error procesando like:', error);
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
    // console.error('Error procesando reporte:', error);
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

    // Manejar datos del usuario (JWT o session authentication)
    let userFromDB = null;
    
    // Si hay JWT authentication (req.user contiene el payload del JWT)
    if (req.user && req.user.id && !req.user.incrementarConsultas) {
      // Buscar el usuario completo en la base de datos
      const Usuario = require('./src/models/Usuario');
      userFromDB = await Usuario.findById(req.user.id);
      
      if (userFromDB) {
        consultaData.userId = userFromDB._id;
        consultaData.nombre = req.body.esAnonima ? '' : (req.body.nombre || userFromDB.nombre);
        consultaData.email = req.body.esAnonima ? '' : (req.body.email || userFromDB.email);
        consultaData.esAnonima = req.body.esAnonima || false;
        consultaData.categoria = req.body.categoria || 'general';
        
        // Incrementar contador de consultas del usuario
        await userFromDB.incrementarConsultas();
      }
    }
    // Si hay session authentication (req.user es el modelo completo)
    else if (req.isAuthenticated() && req.user.incrementarConsultas) {
      consultaData.userId = req.user._id;
      consultaData.nombre = req.body.esAnonima ? '' : (req.body.nombre || req.user.nombre);
      consultaData.email = req.body.esAnonima ? '' : (req.body.email || req.user.email);
      consultaData.esAnonima = req.body.esAnonima || false;
      consultaData.categoria = req.body.categoria || 'general';
      
      // Incrementar contador de consultas del usuario
      await req.user.incrementarConsultas();
    }
    // Usuario no autenticado (no debería llegar aquí con requireAuth)
    else {
      consultaData.nombre = nombre || '';
      consultaData.email = email || '';
      consultaData.esAnonima = false;
      consultaData.categoria = 'general';
    }

    const consulta = new Consulta(consultaData);

    // Análisis automático
    consulta.categorizarAutomaticamente();
    consulta.analizarSentimiento();
    
    // Moderación automática de contenido
    const analisisModeracion = consulta.moderarContenido();

    // Determinar prioridad automáticamente
    if (consulta.tipoConsulta === 'critica' || consulta.sentiment === 'negativo') {
      consulta.prioridad = 'alta';
    } else if (consulta.tipoConsulta === 'apoyo') {
      consulta.prioridad = 'baja';
    }

    // Guardar en base de datos
    await consulta.save();

    // console.log(`🆕 Nueva consulta recibida - Región: ${region}, Tipo: ${tipoConsulta}, Categoría: ${consulta.categoria}, Moderación: ${consulta.estadoModeracion}`);

    // Mensaje personalizado según el estado de moderación
    let message = 'Consulta recibida exitosamente';
    let requiresReview = false;
    
    if (consulta.estadoModeracion === 'pendiente_revision') {
      message = 'Consulta recibida y en proceso de revisión. Será publicada una vez que sea aprobada por nuestro equipo de moderación.';
      requiresReview = true;
    }

    res.status(201).json({
      success: true,
      message,
      id: consulta._id,
      categoria: consulta.categoria,
      sentiment: consulta.sentiment,
      requiresReview,
      estadoModeracion: consulta.estadoModeracion,
      esPublica: consulta.esPublica
    });

  } catch (error) {
    // console.error('Error guardando consulta:', error);
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
    // console.error('Error obteniendo estadísticas:', error);
    res.status(500).json({
      error: 'Error obteniendo estadísticas'
    });
  }
});

// GET - Obtener consultas recientes (solo para admin)
app.get('/api/consultas/admin', verifyJWT, verifyAdmin, async (req, res) => {
  try {
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
    // console.error('Error obteniendo consultas:', error);
    res.status(500).json({
      error: 'Error obteniendo consultas'
    });
  }
});

// PUT - Actualizar estado de consulta (solo para admin)
app.put('/api/consultas/:id/estado', verifyJWT, verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { estado, respuesta, implementada, descripcionImplementacion } = req.body;

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
        if (descripcionImplementacion) {
          consulta.descripcionImplementacion = descripcionImplementacion;
        }
      }
    }

    await consulta.save();

    res.json({
      success: true,
      message: 'Consulta actualizada exitosamente'
    });

  } catch (error) {
    // console.error('Error actualizando consulta:', error);
    res.status(500).json({
      error: 'Error actualizando consulta'
    });
  }
});

// Endpoint para consultas pendientes de moderación
app.get('/api/consultas/moderacion', verifyJWT, verifyAdmin, async (req, res) => {
  try {
    const consultasPendientes = await Consulta.find({
      estadoModeracion: 'pendiente_revision'
    })
      .populate('userId', 'nombre email avatar')
      .sort({ fechaEnvio: -1 });

    const estadisticas = await Consulta.aggregate([
      {
        $group: {
          _id: '$estadoModeracion',
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      consultas: consultasPendientes,
      estadisticas: estadisticas.reduce((acc, stat) => {
        acc[stat._id] = stat.count;
        return acc;
      }, {})
    });
  } catch (error) {
    // console.error('Error obteniendo consultas de moderación:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Endpoint para re-procesar moderación de todas las consultas existentes
app.post('/api/consultas/reprocess-moderation', verifyJWT, verifyAdmin, async (req, res) => {
  try {
    const consultas = await Consulta.find({
      $or: [
        { estadoModeracion: { $exists: false } },
        { 'analisisContenido.esOfensivo': { $exists: false } }
      ]
    });

    let procesadas = 0;
    let rechazadas = 0;

    for (const consulta of consultas) {
      const analisisOriginal = consulta.analisisContenido;
      consulta.moderarContenido();
      
      if (consulta.estadoModeracion === 'pendiente_revision') {
        rechazadas++;
      }
      
      await consulta.save();
      procesadas++;
    }

    // console.log(`🔄 Re-procesamiento completado: ${procesadas} consultas procesadas, ${rechazadas} marcadas para revisión`);

    res.json({
      success: true,
      message: `Re-procesamiento completado exitosamente`,
      estadisticas: {
        procesadas,
        rechazadas,
        aprobadas: procesadas - rechazadas
      }
    });

  } catch (error) {
    // console.error('Error re-procesando moderación:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Endpoint para aprobar/rechazar consultas
app.post('/api/consultas/:id/moderar', verifyJWT, verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { accion, razon } = req.body; // accion: 'aprobar' o 'rechazar'

    const consulta = await Consulta.findById(id);
    if (!consulta) {
      return res.status(404).json({ error: 'Consulta no encontrada' });
    }

    if (accion === 'aprobar') {
      consulta.estadoModeracion = 'aprobado_manual';
      consulta.esPublica = true;
      consulta.moderada = false;
      consulta.razonModeracion = razon || 'Aprobado manualmente por moderador';
    } else if (accion === 'rechazar') {
      consulta.estadoModeracion = 'rechazado_manual';
      consulta.esPublica = false;
      consulta.moderada = true;
      consulta.razonModeracion = razon || 'Rechazado por contenido inapropiado';
    }

    await consulta.save();

    // console.log(`📝 Consulta ${accion}da - ID: ${id}, Razón: ${razon || 'Sin razón especificada'}`);

    res.json({
      success: true,
      message: `Consulta ${accion}da exitosamente`,
      consulta: {
        id: consulta._id,
        estadoModeracion: consulta.estadoModeracion,
        esPublica: consulta.esPublica
      }
    });

  } catch (error) {
    // console.error('Error moderando consulta:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Middleware para verificar la API Key de n8n
const verifyN8nApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey || apiKey !== process.env.N8N_API_KEY) {
    return res.status(401).json({ error: 'No autorizado' });
  }
  next();
};

// POST - Webhook para recibir datos de n8n (consultas)
app.post('/api/n8n/webhook', verifyN8nApiKey, async (req, res) => {
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
      url,
      esAnonima = false,
      categoria = 'general'
    } = req.body;

    if (!mensaje) {
      return res.status(400).json({ error: 'El campo mensaje es requerido' });
    }

    const consultaData = {
      nombre: esAnonima ? '' : nombre,
      email: esAnonima ? '' : email,
      region,
      edad,
      tema: tema || 'general',
      tipoConsulta,
      mensaje,
      ip: req.clientIp,
      userAgent,
      url,
      fechaEnvio: new Date(),
      esAnonima,
      categoria,
      origen: 'n8n_webhook'
    };

    const consulta = new Consulta(consultaData);
    consulta.categorizarAutomaticamente();
    consulta.analizarSentimiento();
    consulta.moderarContenido();

    if (consulta.tipoConsulta === 'critica' || consulta.sentiment === 'negativo') {
      consulta.prioridad = 'alta';
    }

    await consulta.save();

    res.status(201).json({
      success: true,
      message: 'Consulta recibida y procesada exitosamente desde n8n.',
      id: consulta._id,
      estadoModeracion: consulta.estadoModeracion
    });

  } catch (error) {
    // console.error('Error en webhook de n8n:', error);
    res.status(500).json({
      error: 'Error interno del servidor al procesar el webhook de n8n.'
    });
  }
});

// POST - Webhook para recibir artículos/noticias desde n8n
app.post('/api/n8n/articles', verifyN8nApiKey, async (req, res) => {
  try {
    const {
      title,
      slug,
      summary,
      content,
      author = 'Equipo de Campaña',
      tags = [],
      status = 'published',
      date
    } = req.body;

    // Validaciones requeridas
    if (!title || !slug || !summary || !content) {
      return res.status(400).json({ 
        error: 'Faltan campos requeridos: title, slug, summary, content' 
      });
    }

    // Verificar que el slug sea único
    const existingArticle = await Articulo.findOne({ slug });
    if (existingArticle) {
      return res.status(409).json({ 
        error: 'Ya existe un artículo con este slug. Use un slug único.' 
      });
    }

    // Crear nuevo artículo
    const articuloData = {
      title: title.trim(),
      slug: slug.trim().toLowerCase(),
      summary: summary.trim(),
      content: content.trim(),
      author: author.trim(),
      tags: Array.isArray(tags) ? tags.map(tag => tag.trim()) : [],
      status: ['published', 'draft'].includes(status) ? status : 'published',
      date: date ? new Date(date) : new Date()
    };

    const articulo = new Articulo(articuloData);
    await articulo.save();

    res.status(201).json({
      success: true,
      message: 'Artículo creado exitosamente desde n8n.',
      data: {
        id: articulo._id,
        title: articulo.title,
        slug: articulo.slug,
        summary: articulo.summary,
        author: articulo.author,
        status: articulo.status,
        date: articulo.date,
        tags: articulo.tags,
        createdAt: articulo.createdAt
      }
    });

  } catch (error) {
    // console.error('Error creando artículo desde n8n:', error);
    res.status(500).json({
      error: 'Error interno del servidor al crear el artículo.',
      details: error.message
    });
  }
});

// RUTAS API DE ARTÍCULOS/NOTICIAS

// GET - Obtener todos los artículos publicados (público)
app.get('/api/articulos', async (req, res) => {
  try {
    const { page = 1, limit = 10, tag, search } = req.query;
    const skip = (page - 1) * limit;
    
    // Construir filtros
    let query = { status: 'published' };
    
    if (tag) {
      query.tags = { $in: [tag] };
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { summary: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }
    
    const articulos = await Articulo.find(query)
      .sort({ date: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .select('title slug summary author date tags status createdAt');
    
    const total = await Articulo.countDocuments(query);
    
    res.json({
      articulos,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: parseInt(limit)
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo artículos' });
  }
});

// GET - Obtener todos los artículos para admin (incluye borradores)
app.get('/api/articulos/admin', verifyJWT, verifyAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 20, status, search } = req.query;
    const skip = (page - 1) * limit;
    
    let query = {};
    
    if (status && ['published', 'draft'].includes(status)) {
      query.status = status;
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { summary: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } }
      ];
    }
    
    const articulos = await Articulo.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await Articulo.countDocuments(query);
    
    // Estadísticas adicionales
    const stats = await Articulo.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);
    
    const estadisticas = {
      total: await Articulo.countDocuments(),
      published: stats.find(s => s._id === 'published')?.count || 0,
      draft: stats.find(s => s._id === 'draft')?.count || 0
    };
    
    res.json({
      articulos,
      estadisticas,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: parseInt(limit)
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo artículos para admin' });
  }
});

// GET - Obtener artículo por slug (público)
app.get('/api/articulos/:slug', async (req, res) => {
  try {
    const articulo = await Articulo.findOne({ 
      slug: req.params.slug, 
      status: 'published' 
    });
    
    if (!articulo) {
      return res.status(404).json({ error: 'Artículo no encontrado' });
    }
    
    res.json(articulo);
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo artículo' });
  }
});

// POST - Crear nuevo artículo (admin)
app.post('/api/articulos', verifyJWT, verifyAdmin, async (req, res) => {
  try {
    const {
      title,
      slug,
      summary,
      content,
      author = 'Equipo de Campaña',
      tags = [],
      status = 'draft',
      date
    } = req.body;

    // Validaciones requeridas
    if (!title || !slug || !summary || !content) {
      return res.status(400).json({ 
        error: 'Faltan campos requeridos: title, slug, summary, content' 
      });
    }

    // Verificar que el slug sea único
    const existingArticle = await Articulo.findOne({ slug: slug.trim().toLowerCase() });
    if (existingArticle) {
      return res.status(409).json({ 
        error: 'Ya existe un artículo con este slug. Use un slug único.' 
      });
    }

    // Crear nuevo artículo
    const articuloData = {
      title: title.trim(),
      slug: slug.trim().toLowerCase(),
      summary: summary.trim(),
      content: content.trim(),
      author: author.trim(),
      tags: Array.isArray(tags) ? tags.map(tag => tag.trim()) : [],
      status: ['published', 'draft'].includes(status) ? status : 'draft',
      date: date ? new Date(date) : new Date()
    };

    const articulo = new Articulo(articuloData);
    await articulo.save();

    res.status(201).json({
      success: true,
      message: 'Artículo creado exitosamente',
      data: articulo
    });

  } catch (error) {
    res.status(500).json({
      error: 'Error interno del servidor al crear el artículo',
      details: error.message
    });
  }
});

// PUT - Actualizar artículo (admin)
app.put('/api/articulos/:id', verifyJWT, verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      slug,
      summary,
      content,
      author,
      tags,
      status,
      date
    } = req.body;

    // Verificar que el artículo existe
    const articulo = await Articulo.findById(id);
    if (!articulo) {
      return res.status(404).json({ error: 'Artículo no encontrado' });
    }

    // Si se actualiza el slug, verificar que sea único
    if (slug && slug.trim().toLowerCase() !== articulo.slug) {
      const existingArticle = await Articulo.findOne({ 
        slug: slug.trim().toLowerCase(),
        _id: { $ne: id }
      });
      if (existingArticle) {
        return res.status(409).json({ 
          error: 'Ya existe un artículo con este slug. Use un slug único.' 
        });
      }
    }

    // Actualizar campos
    const updateData = {};
    if (title) updateData.title = title.trim();
    if (slug) updateData.slug = slug.trim().toLowerCase();
    if (summary) updateData.summary = summary.trim();
    if (content) updateData.content = content.trim();
    if (author) updateData.author = author.trim();
    if (tags) updateData.tags = Array.isArray(tags) ? tags.map(tag => tag.trim()) : [];
    if (status && ['published', 'draft'].includes(status)) updateData.status = status;
    if (date) updateData.date = new Date(date);

    const articuloActualizado = await Articulo.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Artículo actualizado exitosamente',
      data: articuloActualizado
    });

  } catch (error) {
    res.status(500).json({
      error: 'Error interno del servidor al actualizar el artículo',
      details: error.message
    });
  }
});

// DELETE - Eliminar artículo (admin)
app.delete('/api/articulos/:id', verifyJWT, verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const articulo = await Articulo.findById(id);
    if (!articulo) {
      return res.status(404).json({ error: 'Artículo no encontrado' });
    }

    await Articulo.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'Artículo eliminado exitosamente'
    });

  } catch (error) {
    res.status(500).json({
      error: 'Error interno del servidor al eliminar el artículo',
      details: error.message
    });
  }
});

// PUT - Cambiar estado de artículo (admin)
app.put('/api/articulos/:id/status', verifyJWT, verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['published', 'draft'].includes(status)) {
      return res.status(400).json({ 
        error: 'Estado inválido. Debe ser "published" o "draft"' 
      });
    }

    const articulo = await Articulo.findById(id);
    if (!articulo) {
      return res.status(404).json({ error: 'Artículo no encontrado' });
    }

    articulo.status = status;
    await articulo.save();

    res.json({
      success: true,
      message: `Artículo ${status === 'published' ? 'publicado' : 'marcado como borrador'} exitosamente`,
      data: articulo
    });

  } catch (error) {
    res.status(500).json({
      error: 'Error interno del servidor al cambiar el estado del artículo',
      details: error.message
    });
  }
});

// RUTAS API DE PATROCINIOS

// GET - Obtener estadísticas de patrocinios
app.get('/api/patrocinios/stats', async (req, res) => {
  try {
    const stats = await Patrocinio.getStats();
    res.json({
      actual: stats.actual,
      meta: stats.meta,
      porcentaje: Math.min((stats.actual / stats.meta) * 100, 100),
      ultima_actualizacion: stats.ultima_actualizacion
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Error obteniendo estadísticas de patrocinios',
      actual: 0,
      meta: 35361,
      porcentaje: 0
    });
  }
});

// PUT - Actualizar contador de patrocinios (solo admin)
app.put('/api/patrocinios/stats', verifyJWT, verifyAdmin, async (req, res) => {
  try {
    const { actual } = req.body;
    
    if (typeof actual !== 'number' || actual < 0) {
      return res.status(400).json({ 
        error: 'El valor actual debe ser un número mayor o igual a 0' 
      });
    }

    const stats = await Patrocinio.updateActual(actual, req.user.email);
    
    res.json({
      success: true,
      message: 'Contador de patrocinios actualizado',
      data: {
        actual: stats.actual,
        meta: stats.meta,
        porcentaje: Math.min((stats.actual / stats.meta) * 100, 100),
        actualizado_por: stats.actualizado_por,
        ultima_actualizacion: stats.ultima_actualizacion
      }
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Error actualizando contador de patrocinios' 
    });
  }
});

// RUTAS API DE MÉTRICAS DE CAMPAÑA

// GET - Obtener todas las métricas de campaña (público)
app.get('/api/campaign/metrics', async (req, res) => {
  try {
    const metrics = await CampaignMetrics.getOrCreate();
    
    res.json({
      success: true,
      data: {
        // Métricas de patrocinios
        patrocinios: {
          actual: metrics.patrocinios.actual,
          meta: metrics.patrocinios.meta,
          nuevosHoy: metrics.patrocinios.nuevosHoy,
          porcentaje: metrics.calcularPorcentajePatrocinios(),
          fechaLimiteInscripcion: metrics.patrocinios.fechaLimiteInscripcion
        },
        
        // Fechas importantes
        fechas: {
          elecciones: metrics.fechas.elecciones,
          diasParaElecciones: metrics.calcularDiasParaElecciones(),
          limitePatrocinios: metrics.fechas.limitePatrocinios,
          inicioInscripcionCandidaturas: metrics.fechas.inicioInscripcionCandidaturas
        },
        
        // Encuestas
        encuestas: metrics.encuestas,
        
        // Regiones liderando
        regionesLiderando: metrics.regionesLiderando.slice(0, 5), // Top 5
        
        // Métricas de interacción
        interaccion: metrics.interaccion,
        
        // Redes sociales
        redesSociales: metrics.redesSociales,
        
        // Metadatos
        ultimaActualizacion: metrics.sistema.ultimaActualizacion
      }
    });
  } catch (error) {
    console.error('Error obteniendo métricas de campaña:', error);
    res.status(500).json({ 
      error: 'Error obteniendo métricas de campaña',
      success: false
    });
  }
});

// GET - Obtener solo métricas de patrocinios (público)
app.get('/api/campaign/patrocinios', async (req, res) => {
  try {
    const metrics = await CampaignMetrics.getOrCreate();
    
    res.json({
      success: true,
      data: {
        actual: metrics.patrocinios.actual,
        meta: metrics.patrocinios.meta,
        nuevosHoy: metrics.patrocinios.nuevosHoy,
        porcentaje: metrics.calcularPorcentajePatrocinios(),
        fechaLimite: metrics.patrocinios.fechaLimiteInscripcion,
        diasRestantes: metrics.calcularDiasParaElecciones(),
        ultimaActualizacion: metrics.sistema.ultimaActualizacion
      }
    });
  } catch (error) {
    console.error('Error obteniendo métricas de patrocinios:', error);
    res.status(500).json({ 
      error: 'Error obteniendo métricas de patrocinios',
      success: false
    });
  }
});

// POST - Incrementar patrocinios (público con rate limiting)
app.post('/api/campaign/patrocinios/incrementar', consultasLimiter, async (req, res) => {
  try {
    const { cantidad = 1 } = req.body;
    
    if (typeof cantidad !== 'number' || cantidad < 1 || cantidad > 5) {
      return res.status(400).json({ 
        error: 'Cantidad debe ser un número entre 1 y 5',
        success: false
      });
    }
    
    const metrics = await CampaignMetrics.getOrCreate();
    await metrics.incrementarPatrocinios(cantidad);
    
    res.json({
      success: true,
      message: `${cantidad} patrocinio(s) agregado(s)`,
      data: {
        actual: metrics.patrocinios.actual,
        meta: metrics.patrocinios.meta,
        porcentaje: metrics.calcularPorcentajePatrocinios()
      }
    });
  } catch (error) {
    console.error('Error incrementando patrocinios:', error);
    res.status(500).json({ 
      error: 'Error incrementando patrocinios',
      success: false
    });
  }
});

// PUT - Actualizar métricas de encuestas (solo admin)
app.put('/api/campaign/encuestas', verifyJWT, verifyAdmin, async (req, res) => {
  try {
    const { intencionVoto, aprobacion, confianza, tendencia } = req.body;
    
    const metrics = await CampaignMetrics.getOrCreate();
    
    const datosActualizacion = {};
    if (typeof intencionVoto === 'number' && intencionVoto >= 0 && intencionVoto <= 100) {
      datosActualizacion.intencionVoto = intencionVoto;
    }
    if (typeof aprobacion === 'number' && aprobacion >= 0 && aprobacion <= 100) {
      datosActualizacion.aprobacion = aprobacion;
    }
    if (typeof confianza === 'number' && confianza >= 0 && confianza <= 100) {
      datosActualizacion.confianza = confianza;
    }
    if (typeof tendencia === 'string' && tendencia.length > 0) {
      datosActualizacion.tendencia = tendencia;
    }
    
    await metrics.actualizarEncuesta(datosActualizacion);
    
    res.json({
      success: true,
      message: 'Métricas de encuestas actualizadas',
      data: metrics.encuestas
    });
  } catch (error) {
    console.error('Error actualizando encuestas:', error);
    res.status(500).json({ 
      error: 'Error actualizando métricas de encuestas',
      success: false
    });
  }
});

// PUT - Actualizar región específica (solo admin)
app.put('/api/campaign/regiones/:nombreRegion', verifyJWT, verifyAdmin, async (req, res) => {
  try {
    const { nombreRegion } = req.params;
    const { porcentaje, tendencia } = req.body;
    
    if (typeof porcentaje !== 'number' || porcentaje < 0 || porcentaje > 100) {
      return res.status(400).json({ 
        error: 'Porcentaje debe ser un número entre 0 y 100',
        success: false
      });
    }
    
    if (!tendencia || typeof tendencia !== 'string') {
      return res.status(400).json({ 
        error: 'Tendencia es requerida',
        success: false
      });
    }
    
    const metrics = await CampaignMetrics.getOrCreate();
    await metrics.actualizarRegion(decodeURIComponent(nombreRegion), porcentaje, tendencia);
    
    res.json({
      success: true,
      message: `Región ${nombreRegion} actualizada`,
      data: metrics.regionesLiderando
    });
  } catch (error) {
    console.error('Error actualizando región:', error);
    res.status(500).json({ 
      error: 'Error actualizando región',
      success: false
    });
  }
});

// PUT - Actualizar métricas de interacción web (solo admin)
app.put('/api/campaign/interaccion', verifyJWT, verifyAdmin, async (req, res) => {
  try {
    const { visitasHoy, compartidosHoy, suscriptosNewsletter, videoViews } = req.body;
    
    const metrics = await CampaignMetrics.getOrCreate();
    
    if (typeof visitasHoy === 'number' && visitasHoy >= 0) {
      metrics.interaccion.visitasHoy = visitasHoy;
    }
    if (typeof compartidosHoy === 'number' && compartidosHoy >= 0) {
      metrics.interaccion.compartidosHoy = compartidosHoy;
    }
    if (typeof suscriptosNewsletter === 'number' && suscriptosNewsletter >= 0) {
      metrics.interaccion.suscriptosNewsletter = suscriptosNewsletter;
    }
    if (typeof videoViews === 'number' && videoViews >= 0) {
      metrics.interaccion.videoViews = videoViews;
    }
    
    await metrics.save();
    
    res.json({
      success: true,
      message: 'Métricas de interacción actualizadas',
      data: metrics.interaccion
    });
  } catch (error) {
    console.error('Error actualizando métricas de interacción:', error);
    res.status(500).json({ 
      error: 'Error actualizando métricas de interacción',
      success: false
    });
  }
});

// POST - Simular actualización automática (solo admin en desarrollo)
app.post('/api/campaign/simulate', verifyJWT, verifyAdmin, async (req, res) => {
  try {
    const metrics = await CampaignMetrics.simulateUpdate();
    
    res.json({
      success: true,
      message: 'Simulación ejecutada',
      data: {
        patrocinios: {
          actual: metrics.patrocinios.actual,
          nuevosHoy: metrics.patrocinios.nuevosHoy
        },
        interaccion: metrics.interaccion,
        ultimaActualizacion: metrics.sistema.ultimaActualizacion
      }
    });
  } catch (error) {
    console.error('Error en simulación:', error);
    res.status(500).json({ 
      error: 'Error ejecutando simulación',
      success: false
    });
  }
});

// RUTAS API DE TESTIMONIOS

// GET - Obtener testimonios aprobados (público)
app.get('/api/testimonios/aprobados', async (req, res) => {
  try {
    const testimonios = await Testimonio.getAprobados();
    res.json(testimonios);
  } catch (error) {
    res.status(500).json({ 
      error: 'Error obteniendo testimonios',
      testimonios: []
    });
  }
});

// POST - Crear nuevo testimonio (requiere autenticación)
app.post('/api/testimonios', verifyJWT, async (req, res) => {
  try {
    const { contenido, nombre_publico, ocupacion, region } = req.body;
    
    if (!contenido || contenido.trim().length === 0) {
      return res.status(400).json({ 
        error: 'El contenido del testimonio es requerido' 
      });
    }

    if (contenido.length > 500) {
      return res.status(400).json({ 
        error: 'El testimonio no puede exceder 500 caracteres' 
      });
    }

    // Verificar si el usuario ya tiene un testimonio pendiente
    const testimonioExistente = await Testimonio.findOne({
      usuario_id: req.user.id,
      estado: 'pendiente'
    });

    if (testimonioExistente) {
      return res.status(400).json({ 
        error: 'Ya tienes un testimonio pendiente de moderación' 
      });
    }

    const nuevoTestimonio = new Testimonio({
      usuario_id: req.user.id,
      contenido: contenido.trim(),
      nombre_publico: nombre_publico?.trim() || '',
      ocupacion: ocupacion?.trim() || '',
      region: region?.trim() || '',
      metadata: {
        ip_address: req.ip,
        user_agent: req.get('User-Agent')
      }
    });

    await nuevoTestimonio.save();

    res.status(201).json({
      success: true,
      message: 'Testimonio enviado exitosamente. Será revisado antes de publicarse.',
      testimonio: {
        id: nuevoTestimonio._id,
        contenido: nuevoTestimonio.contenido,
        estado: nuevoTestimonio.estado,
        fecha_creacion: nuevoTestimonio.fecha_creacion
      }
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Error enviando testimonio' 
    });
  }
});

// GET - Obtener todos los testimonios para moderación (solo admin)
app.get('/api/testimonios/admin', verifyJWT, verifyAdmin, async (req, res) => {
  try {
    const testimonios = await Testimonio.getTodos();
    res.json(testimonios);
  } catch (error) {
    res.status(500).json({ 
      error: 'Error obteniendo testimonios para moderación',
      testimonios: []
    });
  }
});

// PUT - Actualizar estado de testimonio (solo admin)
app.put('/api/testimonios/:id/estado', verifyJWT, verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;
    
    if (!['aprobado', 'rechazado'].includes(estado)) {
      return res.status(400).json({ 
        error: 'Estado inválido. Debe ser "aprobado" o "rechazado"' 
      });
    }

    const testimonio = await Testimonio.findById(id);
    if (!testimonio) {
      return res.status(404).json({ error: 'Testimonio no encontrado' });
    }

    if (testimonio.estado !== 'pendiente') {
      return res.status(400).json({ 
        error: 'Solo se pueden moderar testimonios pendientes' 
      });
    }

    if (estado === 'aprobado') {
      await testimonio.aprobar(req.user.id);
    } else {
      await testimonio.rechazar(req.user.id);
    }

    res.json({
      success: true,
      message: `Testimonio ${estado} exitosamente`,
      testimonio: {
        id: testimonio._id,
        estado: testimonio.estado,
        fecha_moderacion: testimonio.fecha_moderacion
      }
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Error actualizando estado del testimonio' 
    });
  }
});

// ================================
// ENDPOINTS DE PATROCINIOS
// ================================

// Endpoint para estadísticas de patrocinios
app.get('/api/patrocinios/stats', async (req, res) => {
  try {
    // Calcular días restantes hasta 16 noviembre 2025
    const fechaLimitePatrocinios = new Date('2025-11-16T23:59:59');
    const ahora = new Date();
    const diasRestantes = Math.max(0, Math.ceil((fechaLimitePatrocinios.getTime() - ahora.getTime()) / (1000 * 60 * 60 * 24)));
    
    // Aquí podrías consultar la base de datos para obtener datos reales
    // Por ahora devolvemos datos de ejemplo con cálculo correcto
    const stats = {
      actual: 847397,
      meta: 1000000,
      porcentaje: 84.7,
      nuevosHoy: 2847,
      diasRestantes: diasRestantes,
      fechaLimite: '2025-11-16T23:59:59.000Z',
      ultimaActualizacion: new Date().toISOString()
    };
    
    res.json(stats);
  } catch (error) {
    console.error('Error obteniendo estadísticas de patrocinios:', error);
    res.status(500).json({ 
      error: 'Error obteniendo estadísticas de patrocinios' 
    });
  }
});

// ================================
// ENDPOINTS MULTI-DOMINIO SEO
// ================================

// Robots.txt dinámico basado en hostname
app.get('/robots.txt', (req, res) => {
  const hostname = req.get('host');
  
  // Configuración base para ambos dominios
  const baseRobots = `# Robots.txt para Campaña Presidencial Melinao 2026
# ${hostname}

User-agent: *
Allow: /

# Permitir acceso completo a buscadores principales
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Slurp
Allow: /

User-agent: DuckDuckBot
Allow: /

User-agent: Baiduspider
Allow: /

User-agent: YandexBot
Allow: /

User-agent: facebookexternalhit
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: LinkedInBot
Allow: /

# Bloquear crawlers problemáticos
User-agent: SemrushBot
Disallow: /

User-agent: AhrefsBot
Disallow: /

User-agent: MJ12bot
Disallow: /

# Configuraciones específicas
Crawl-delay: 1

# Sitemap dinámico
Sitemap: https://${hostname}/sitemap.xml

# Información adicional
# Sitio web oficial de Juan Pablo Melinao González
# Candidato Presidencial Chile 2026 - Independiente
# Contacto: contacto@${hostname}`;

  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.send(baseRobots);
});

// Sitemap.xml dinámico basado en hostname
app.get('/sitemap.xml', (req, res) => {
  const hostname = req.get('host');
  const baseUrl = `https://${hostname}`;
  const currentDate = new Date().toISOString().split('T')[0];
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">

  <!-- Página Principal -->
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="es-cl" href="${baseUrl}/" />
  </url>

  <!-- Landing Pages de Reformas -->
  <url>
    <loc>${baseUrl}/reformas/automatizacion-estado-inteligencia-artificial</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>${baseUrl}/reformas/reduccion-costo-vida-impuestos</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>${baseUrl}/reformas/fronteras-inteligentes-seguridad-nacional</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>${baseUrl}/reformas/justicia-social-equidad-fin-privilegios</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>${baseUrl}/reformas/chile-unido-desarrollo-araucania</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>${baseUrl}/reformas/eliminacion-privilegios-politicos-transparencia</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- Índice de Reformas -->
  <url>
    <loc>${baseUrl}/reformas</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- Patrocinios -->
  <url>
    <loc>${baseUrl}/patrocinios</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- Participación Ciudadana -->
  <url>
    <loc>${baseUrl}/participacion-ciudadana</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- Noticias -->
  <url>
    <loc>${baseUrl}/noticias</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>

  <!-- Páginas Regionales SEO -->
  <url>
    <loc>${baseUrl}/regiones/santiago</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>${baseUrl}/regiones/araucania</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>${baseUrl}/regiones/antofagasta</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>${baseUrl}/regiones/valparaiso</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>${baseUrl}/regiones/concepcion</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

</urlset>`;

  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.send(sitemap);
});

// Ruta para servir archivos estáticos de React
app.use(express.static(path.join(__dirname, 'build')));

// Fallback para React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Manejo de errores
app.use((error, req, res, next) => {
  // console.error('Error no manejado:', error);
  res.status(500).json({
    error: 'Error interno del servidor',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Algo salió mal'
  });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  // console.log(`🚀 Servidor API ejecutándose en puerto ${PORT}`);
  // console.log(`📊 Dashboard admin: http://localhost:${PORT}/api/consultas/admin`);
  // console.log(`📈 Estadísticas públicas: http://localhost:${PORT}/api/consultas/stats`);
});

module.exports = app;