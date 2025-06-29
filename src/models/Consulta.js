const mongoose = require('mongoose');

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
  
  // Metadata técnica
  fechaEnvio: {
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
  descripcionImplementacion: String
}, {
  timestamps: true,
  collection: 'consultas_ciudadanas'
});

// Índices para búsquedas eficientes
consultaSchema.index({ tema: 1, estado: 1 });
consultaSchema.index({ region: 1, edad: 1 });
consultaSchema.index({ fechaEnvio: -1 });
consultaSchema.index({ tipoConsulta: 1, prioridad: 1 });

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

module.exports = mongoose.model('Consulta', consultaSchema);