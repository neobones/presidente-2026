const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const path = require('path');

// Importar modelo
const Consulta = require('./src/models/Consulta');

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

// Rutas API

// POST - Enviar nueva consulta
app.post('/api/consultas', consultasLimiter, async (req, res) => {
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
    const consulta = new Consulta({
      nombre: nombre || '',
      email: email || '',
      region,
      edad,
      tema: tema || 'general',
      tipoConsulta,
      mensaje,
      ip: req.clientIp,
      userAgent,
      url,
      fechaEnvio: new Date()
    });

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