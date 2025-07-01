const mongoose = require('mongoose');

const testimonioSchema = new mongoose.Schema({
  usuario_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  contenido: {
    type: String,
    required: true,
    maxlength: 500,
    trim: true
  },
  nombre_publico: {
    type: String,
    maxlength: 100,
    trim: true,
    default: ''
  },
  ocupacion: {
    type: String,
    maxlength: 100,
    trim: true,
    default: ''
  },
  region: {
    type: String,
    maxlength: 50,
    trim: true,
    default: ''
  },
  estado: {
    type: String,
    enum: ['pendiente', 'aprobado', 'rechazado'],
    default: 'pendiente'
  },
  fecha_creacion: {
    type: Date,
    default: Date.now
  },
  fecha_moderacion: {
    type: Date
  },
  moderado_por: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario'
  },
  metadata: {
    ip_address: String,
    user_agent: String
  }
}, {
  timestamps: true
});

// Índices
testimonioSchema.index({ estado: 1, fecha_creacion: -1 });
testimonioSchema.index({ usuario_id: 1 });

// Métodos estáticos
testimonioSchema.statics.getAprobados = function() {
  return this.find({ estado: 'aprobado' })
    .sort({ fecha_creacion: -1 })
    .select('contenido nombre_publico ocupacion region fecha_creacion');
};

testimonioSchema.statics.getPendientes = function() {
  return this.find({ estado: 'pendiente' })
    .populate('usuario_id', 'nombre email')
    .sort({ fecha_creacion: -1 });
};

testimonioSchema.statics.getTodos = function() {
  return this.find()
    .populate('usuario_id', 'nombre email')
    .sort({ fecha_creacion: -1 });
};

// Métodos de instancia
testimonioSchema.methods.aprobar = function(moderadorId) {
  this.estado = 'aprobado';
  this.fecha_moderacion = new Date();
  this.moderado_por = moderadorId;
  return this.save();
};

testimonioSchema.methods.rechazar = function(moderadorId) {
  this.estado = 'rechazado';
  this.fecha_moderacion = new Date();
  this.moderado_por = moderadorId;
  return this.save();
};

module.exports = mongoose.model('Testimonio', testimonioSchema);