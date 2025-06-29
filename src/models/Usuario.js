const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const usuarioSchema = new mongoose.Schema({
  // Datos básicos
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  nombre: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  avatar: {
    type: String,
    default: ''
  },
  
  // Autenticación OAuth
  provider: {
    type: String,
    enum: ['google', 'apple', 'microsoft', 'email'],
    required: true
  },
  providerId: {
    type: String,
    required: true
  },
  
  // Autenticación tradicional (opcional)
  password: {
    type: String,
    minlength: 6
  },
  
  // Estado del usuario
  verificado: {
    type: Boolean,
    default: false
  },
  activo: {
    type: Boolean,
    default: true
  },
  
  // Estadísticas de participación
  consultasEnviadas: {
    type: Number,
    default: 0
  },
  ultimaConsulta: {
    type: Date
  },
  reputacion: {
    type: Number,
    default: 100,
    min: 0,
    max: 1000
  },
  
  // Información demográfica (opcional)
  region: {
    type: String,
    enum: [
      'Arica y Parinacota', 'Tarapacá', 'Antofagasta', 'Atacama', 'Coquimbo',
      'Valparaíso', 'Metropolitana', 'O\'Higgins', 'Maule', 'Ñuble', 'Biobío',
      'La Araucanía', 'Los Ríos', 'Los Lagos', 'Aysén', 'Magallanes'
    ]
  },
  edad: {
    type: String,
    enum: ['18-25', '26-35', '36-45', '46-55', '56-65', '65+']
  },
  
  // Metadata
  fechaRegistro: {
    type: Date,
    default: Date.now
  },
  ultimaActividad: {
    type: Date,
    default: Date.now
  },
  ip: String,
  userAgent: String,
  
  // Configuración de privacidad
  perfilPublico: {
    type: Boolean,
    default: false
  },
  recibirNotificaciones: {
    type: Boolean,
    default: true
  },
  
  // Moderación
  reportes: [{
    tipo: String,
    razon: String,
    fecha: Date,
    reportadoPor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario'
    }
  }],
  suspendido: {
    type: Boolean,
    default: false
  },
  fechaSuspension: Date,
  razonSuspension: String
}, {
  timestamps: true,
  collection: 'usuarios'
});

// Índices para búsquedas eficientes
usuarioSchema.index({ email: 1 });
usuarioSchema.index({ provider: 1, providerId: 1 });
usuarioSchema.index({ fechaRegistro: -1 });
usuarioSchema.index({ ultimaActividad: -1 });
usuarioSchema.index({ region: 1, edad: 1 });

// Middleware para hash de contraseña
usuarioSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  if (this.password) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Método para verificar contraseña
usuarioSchema.methods.verificarPassword = async function(password) {
  if (!this.password) return false;
  return await bcrypt.compare(password, this.password);
};

// Método para actualizar actividad
usuarioSchema.methods.actualizarActividad = function() {
  this.ultimaActividad = new Date();
  return this.save();
};

// Método para incrementar consultas
usuarioSchema.methods.incrementarConsultas = function() {
  this.consultasEnviadas += 1;
  this.ultimaConsulta = new Date();
  return this.save();
};

// Estadísticas de usuarios
usuarioSchema.statics.getEstadisticas = async function() {
  const stats = await this.aggregate([
    {
      $group: {
        _id: null,
        totalUsuarios: { $sum: 1 },
        usuariosActivos: {
          $sum: { $cond: [{ $eq: ['$activo', true] }, 1, 0] }
        },
        usuariosVerificados: {
          $sum: { $cond: [{ $eq: ['$verificado', true] }, 1, 0] }
        },
        promedioConsultas: { $avg: '$consultasEnviadas' },
        usuariosOAuth: {
          $sum: { $cond: [{ $ne: ['$provider', 'email'] }, 1, 0] }
        }
      }
    }
  ]);
  
  return stats[0] || {
    totalUsuarios: 0,
    usuariosActivos: 0,
    usuariosVerificados: 0,
    promedioConsultas: 0,
    usuariosOAuth: 0
  };
};

// Usuarios por región
usuarioSchema.statics.getUsuariosPorRegion = async function() {
  return await this.aggregate([
    {
      $match: { region: { $exists: true, $ne: null } }
    },
    {
      $group: {
        _id: '$region',
        count: { $sum: 1 }
      }
    },
    { $sort: { count: -1 } }
  ]);
};

// Método para buscar o crear usuario OAuth
usuarioSchema.statics.buscarOCrearOAuth = async function(profile, provider) {
  let usuario = await this.findOne({
    provider: provider,
    providerId: profile.id
  });

  if (!usuario) {
    // Verificar si existe por email
    const usuarioExistente = await this.findOne({
      email: profile.emails[0].value
    });

    if (usuarioExistente) {
      // Vincular cuenta OAuth existente
      usuarioExistente.provider = provider;
      usuarioExistente.providerId = profile.id;
      usuarioExistente.verificado = true;
      if (profile.photos && profile.photos[0]) {
        usuarioExistente.avatar = profile.photos[0].value;
      }
      await usuarioExistente.save();
      return usuarioExistente;
    }

    // Crear nuevo usuario
    usuario = new this({
      email: profile.emails[0].value,
      nombre: profile.displayName || profile.name?.givenName || 'Usuario',
      provider: provider,
      providerId: profile.id,
      verificado: true,
      avatar: profile.photos && profile.photos[0] ? profile.photos[0].value : '',
      fechaRegistro: new Date()
    });

    await usuario.save();
  } else {
    // Actualizar información si es necesario
    usuario.ultimaActividad = new Date();
    if (profile.photos && profile.photos[0] && !usuario.avatar) {
      usuario.avatar = profile.photos[0].value;
    }
    await usuario.save();
  }

  return usuario;
};

module.exports = mongoose.model('Usuario', usuarioSchema);