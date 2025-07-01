const mongoose = require('mongoose');

const patrocinioSchema = new mongoose.Schema({
  actual: {
    type: Number,
    default: 0,
    min: 0
  },
  meta: {
    type: Number,
    default: 35361,
    min: 1
  },
  ultima_actualizacion: {
    type: Date,
    default: Date.now
  },
  actualizado_por: {
    type: String,
    default: 'sistema'
  }
}, {
  timestamps: true
});

// Solo permitir un documento en la colección
patrocinioSchema.statics.getStats = async function() {
  let stats = await this.findOne();
  if (!stats) {
    stats = await this.create({
      actual: 0,
      meta: 35361
    });
  }
  return stats;
};

patrocinioSchema.statics.updateActual = async function(nuevoValor, actualizadoPor = 'admin') {
  const stats = await this.getStats();
  stats.actual = nuevoValor;
  stats.actualizado_por = actualizadoPor;
  stats.ultima_actualizacion = new Date();
  return await stats.save();
};

module.exports = mongoose.model('Patrocinio', patrocinioSchema);