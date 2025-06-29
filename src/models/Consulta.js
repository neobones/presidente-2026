const mongoose = require('mongoose');
const ContentModerator = require('../utils/contentModerator');

const consultaSchema = new mongoose.Schema({
  // Datos del ciudadano
  nombre: {
    type: String,
    trim: true,
    maxlength: 100
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    validate: {
      validator: function(v) {
        return !v || /^\w+([-.]?\w+)*@\w+([-.]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: 'Email inválido'
    }
  },
  region: {
    type: String,
    required: true,
    enum: [
      'Arica y Parinacota', 'Tarapacá', 'Antofagasta', 'Atacama', 'Coquimbo',
      'Valparaíso', 'Metropolitana', 'O\'Higgins', 'Maule', 'Ñuble', 'Biobío',
      'La Araucanía', 'Los Ríos', 'Los Lagos', 'Aysén', 'Magallanes'
    ]
  },
  edad: {
    type: String,
    required: true,
    enum: ['18-25', '26-35', '36-45', '46-55', '56-65', '65+']
  },
  
  // Contenido de la consulta
  tema: {
    type: String,
    required: true,
    default: 'general'
  },
  tipoConsulta: {
    type: String,
    required: true,
    enum: ['sugerencia', 'critica', 'apoyo', 'duda']
  },
  mensaje: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 2000,
    trim: true
  },
  
  // Usuario y metadata técnica
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: false // Para mantener compatibilidad con consultas anónimas existentes
  },
  esPublica: {
    type: Boolean,
    default: true
  },
  fechaEnvio: {
    type: Date,
    default: Date.now
  },
  fechaPublicacion: {
    type: Date,
    default: Date.now
  },
  ip: {
    type: String
  },
  userAgent: {
    type: String
  },
  url: {
    type: String
  },
  
  // Estado administrativo
  estado: {
    type: String,
    enum: ['pendiente', 'revisando', 'implementada', 'rechazada', 'respondida'],
    default: 'pendiente'
  },
  prioridad: {
    type: String,
    enum: ['baja', 'media', 'alta', 'urgente'],
    default: 'media'
  },
  categoria: {
    type: String,
    enum: ['economia', 'ia', 'seguridad', 'justicia', 'unidad', 'general'],
    default: 'general'
  },
  
  // Respuesta del equipo
  respuesta: {
    mensaje: String,
    autor: String,
    fecha: Date
  },
  
  // Análisis y seguimiento
  sentiment: {
    type: String,
    enum: ['positivo', 'neutral', 'negativo']
  },
  tags: [String],
  implementada: {
    type: Boolean,
    default: false
  },
  fechaImplementacion: Date,
  descripcionImplementacion: String,
  
  // Engagement y moderación
  likes: {
    type: Number,
    default: 0
  },
  likedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario'
  }],
  reportes: [{
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario'
    },
    razon: String,
    fecha: {
      type: Date,
      default: Date.now
    }
  }],
  moderada: {
    type: Boolean,
    default: false
  },
  razonModeracion: String,
  
  // Sistema de moderación automática
  analisisContenido: {
    esOfensivo: {
      type: Boolean,
      default: false
    },
    nivel: {
      type: String,
      enum: ['limpio', 'sospechoso', 'ofensivo', 'muy_ofensivo'],
      default: 'limpio'
    },
    palabrasDetectadas: [String],
    patronesDetectados: [String],
    requiereRevision: {
      type: Boolean,
      default: false
    },
    puntuacion: {
      type: Number,
      default: 0
    },
    fechaAnalisis: {
      type: Date,
      default: Date.now
    }
  },
  
  // Estado de moderación
  estadoModeracion: {
    type: String,
    enum: ['automatico_aprobado', 'pendiente_revision', 'aprobado_manual', 'rechazado_manual'],
    default: 'automatico_aprobado'
  }
}, {
  timestamps: true,
  collection: 'consultas_ciudadanas'
});

// Índices para búsquedas eficientes
consultaSchema.index({ tema: 1, estado: 1 });
consultaSchema.index({ region: 1, edad: 1 });
consultaSchema.index({ fechaEnvio: -1 });
consultaSchema.index({ fechaPublicacion: -1 });
consultaSchema.index({ tipoConsulta: 1, prioridad: 1 });
consultaSchema.index({ userId: 1 });
consultaSchema.index({ esPublica: 1, moderada: 1 });
consultaSchema.index({ likes: -1 });

// Método para obtener estadísticas
consultaSchema.statics.getEstadisticas = async function() {
  const stats = await this.aggregate([
    {
      $group: {
        _id: null,
        total: { $sum: 1 },
        implementadas: {
          $sum: { $cond: [{ $eq: ['$implementada', true] }, 1, 0] }
        },
        enRevision: {
          $sum: { $cond: [{ $eq: ['$estado', 'revisando'] }, 1, 0] }
        },
        porRegion: {
          $push: {
            region: '$region',
            count: 1
          }
        },
        porTipo: {
          $push: {
            tipo: '$tipoConsulta',
            count: 1
          }
        }
      }
    }
  ]);
  
  return stats[0] || { total: 0, implementadas: 0, enRevision: 0 };
};

// Método para categorizar automáticamente
consultaSchema.methods.categorizarAutomaticamente = function() {
  const mensaje = this.mensaje.toLowerCase();
  
  if (mensaje.includes('económico') || mensaje.includes('sueldo') || mensaje.includes('impuesto') || mensaje.includes('iva')) {
    this.categoria = 'economia';
  } else if (mensaje.includes('inteligencia artificial') || mensaje.includes('ia') || mensaje.includes('automatización') || mensaje.includes('digital')) {
    this.categoria = 'ia';
  } else if (mensaje.includes('seguridad') || mensaje.includes('frontera') || mensaje.includes('migración')) {
    this.categoria = 'seguridad';
  } else if (mensaje.includes('justicia') || mensaje.includes('profesor') || mensaje.includes('privilegio')) {
    this.categoria = 'justicia';
  } else if (mensaje.includes('araucanía') || mensaje.includes('mapuche') || mensaje.includes('unidad')) {
    this.categoria = 'unidad';
  }
  
  return this.categoria;
};

// Análisis de sentimientos básico
consultaSchema.methods.analizarSentimiento = function() {
  const mensaje = this.mensaje.toLowerCase();
  const palabrasPositivas = ['excelente', 'bueno', 'apoyo', 'genial', 'perfecto', 'me gusta', 'correcto'];
  const palabrasNegativas = ['malo', 'terrible', 'no sirve', 'error', 'problema', 'rechazo', 'incorrecto'];
  
  const positivas = palabrasPositivas.filter(palabra => mensaje.includes(palabra)).length;
  const negativas = palabrasNegativas.filter(palabra => mensaje.includes(palabra)).length;
  
  if (positivas > negativas) {
    this.sentiment = 'positivo';
  } else if (negativas > positivas) {
    this.sentiment = 'negativo';
  } else {
    this.sentiment = 'neutral';
  }
  
  return this.sentiment;
};

// Moderación automática de contenido
consultaSchema.methods.moderarContenido = function() {
  // Analizar el mensaje principal
  const analisisTexto = ContentModerator.analizarContenido(this.mensaje);
  
  // También analizar el nombre si existe
  if (this.nombre) {
    const analisisNombre = ContentModerator.analizarContenido(this.nombre);
    if (analisisNombre.esOfensivo) {
      analisisTexto.esOfensivo = true;
      analisisTexto.palabrasDetectadas = [...analisisTexto.palabrasDetectadas, ...analisisNombre.palabrasDetectadas];
      analisisTexto.patronesDetectados = [...analisisTexto.patronesDetectados, ...analisisNombre.patronesDetectados];
      analisisTexto.puntuacion += analisisNombre.puntuacion;
    }
  }
  
  // Guardar análisis
  this.analisisContenido = {
    esOfensivo: analisisTexto.esOfensivo,
    nivel: analisisTexto.nivel,
    palabrasDetectadas: analisisTexto.palabrasDetectadas,
    patronesDetectados: analisisTexto.patronesDetectados,
    requiereRevision: analisisTexto.requiereRevision,
    puntuacion: analisisTexto.puntuacion,
    fechaAnalisis: new Date()
  };
  
  // Establecer estado de moderación
  if (analisisTexto.requiereRevision) {
    this.estadoModeracion = 'pendiente_revision';
    this.esPublica = false; // No publicar hasta que sea revisado
    this.moderada = true;
    this.razonModeracion = `Contenido detectado como ${analisisTexto.nivel} - Requiere revisión manual`;
  } else {
    this.estadoModeracion = 'automatico_aprobado';
    this.esPublica = true;
    this.moderada = false;
  }
  
  return this.analisisContenido;
};

// Método para obtener consultas públicas con paginación
consultaSchema.statics.getConsultasPublicas = async function(filtros = {}, opciones = {}) {
  const { page = 1, limit = 12, sortBy = 'fechaPublicacion', sortOrder = -1 } = opciones;
  
  const consulta = {
    esPublica: true,
    moderada: false,
    ...filtros
  };

  const consultas = await this.find(consulta)
    .populate('userId', 'nombre avatar perfilPublico')
    .sort({ [sortBy]: sortOrder })
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .lean();

  const total = await this.countDocuments(consulta);

  return {
    consultas: consultas.map(c => ({
      ...c,
      // Anonimizar si el usuario no tiene perfil público
      usuario: c.userId && c.userId.perfilPublico ? {
        nombre: c.userId.nombre,
        avatar: c.userId.avatar
      } : {
        nombre: 'Ciudadano Anónimo',
        avatar: ''
      }
    })),
    totalPages: Math.ceil(total / limit),
    currentPage: page,
    total
  };
};

// Método para dar like a una consulta
consultaSchema.methods.toggleLike = async function(userId) {
  const yaLeMeGusta = this.likedBy.includes(userId);
  
  if (yaLeMeGusta) {
    this.likedBy.pull(userId);
    this.likes = Math.max(0, this.likes - 1);
  } else {
    this.likedBy.push(userId);
    this.likes += 1;
  }
  
  await this.save();
  return !yaLeMeGusta; // Retorna true si se agregó like, false si se quitó
};

// Método para reportar una consulta
consultaSchema.methods.reportar = async function(userId, razon) {
  // Verificar que el usuario no haya reportado ya
  const yaReportado = this.reportes.some(r => r.usuario.equals(userId));
  
  if (!yaReportado) {
    this.reportes.push({
      usuario: userId,
      razon: razon,
      fecha: new Date()
    });
    
    // Auto-moderar si recibe muchos reportes
    if (this.reportes.length >= 3) {
      this.moderada = true;
      this.razonModeracion = 'Múltiples reportes de usuarios';
    }
    
    await this.save();
  }
  
  return this;
};

module.exports = mongoose.model('Consulta', consultaSchema);