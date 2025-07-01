const mongoose = require('mongoose');

const CampaignMetricsSchema = new mongoose.Schema({
  // Métricas de Patrocinios
  patrocinios: {
    actual: {
      type: Number,
      default: 847392,
      min: 0
    },
    meta: {
      type: Number,
      default: 1000000,
      min: 1
    },
    nuevosHoy: {
      type: Number,
      default: 2847,
      min: 0
    },
    fechaLimiteInscripcion: {
      type: Date,
      default: () => new Date('2026-01-15T23:59:59')
    }
  },

  // Fechas Importantes
  fechas: {
    elecciones: {
      type: Date,
      default: () => new Date('2026-11-15T09:00:00')
    },
    limitePatrocinios: {
      type: Date,
      default: () => new Date('2026-01-15T23:59:59')
    },
    inicioInscripcionCandidaturas: {
      type: Date,
      default: () => new Date('2025-08-01T00:00:00')
    }
  },

  // Métricas de Encuestas
  encuestas: {
    intencionVoto: {
      type: Number,
      default: 28.4,
      min: 0,
      max: 100
    },
    aprobacion: {
      type: Number,
      default: 67.2,
      min: 0,
      max: 100
    },
    confianza: {
      type: Number,
      default: 71.8,
      min: 0,
      max: 100
    },
    tendencia: {
      type: String,
      default: "+4.2% último mes"
    },
    ultimaActualizacion: {
      type: Date,
      default: Date.now
    }
  },

  // Estadísticas Regionales
  regionesLiderando: [{
    nombre: {
      type: String,
      required: true,
      enum: [
        'Arica y Parinacota', 'Tarapacá', 'Antofagasta', 'Atacama',
        'Coquimbo', 'Valparaíso', 'Metropolitana', 'O\'Higgins',
        'Maule', 'Ñuble', 'Biobío', 'Araucanía', 'Los Ríos',
        'Los Lagos', 'Aysén', 'Magallanes'
      ]
    },
    porcentaje: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    },
    tendencia: {
      type: String,
      required: true
    },
    ultimaActualizacion: {
      type: Date,
      default: Date.now
    }
  }],

  // Métricas de Interacción Web
  interaccion: {
    visitasHoy: {
      type: Number,
      default: 15234,
      min: 0
    },
    compartidosHoy: {
      type: Number,
      default: 892,
      min: 0
    },
    suscriptosNewsletter: {
      type: Number,
      default: 23456,
      min: 0
    },
    videoViews: {
      type: Number,
      default: 145678,
      min: 0
    }
  },

  // Métricas de Redes Sociales
  redesSociales: {
    seguidoresTotal: {
      type: Number,
      default: 89234,
      min: 0
    },
    crecimientoSemanal: {
      type: Number,
      default: 3.2,
      min: -100,
      max: 1000
    },
    engagementRate: {
      type: Number,
      default: 8.7,
      min: 0,
      max: 100
    }
  },

  // Configuración para Updates Automáticos
  configuracion: {
    autoUpdate: {
      type: Boolean,
      default: true
    },
    intervaloActualizacion: {
      type: Number,
      default: 30, // minutos
      min: 1
    },
    habilitarSimulacion: {
      type: Boolean,
      default: true // Para incrementos automáticos en desarrollo
    }
  },

  // Metadatos del Sistema
  sistema: {
    version: {
      type: String,
      default: "1.0.0"
    },
    ultimaActualizacion: {
      type: Date,
      default: Date.now
    },
    actualizadoPor: {
      type: String,
      default: "sistema"
    }
  }

}, {
  timestamps: true,
  collection: 'campaign_metrics'
});

// Métodos del Schema
CampaignMetricsSchema.methods.calcularDiasParaElecciones = function() {
  const ahora = new Date();
  const elecciones = this.fechas.elecciones;
  const diffTime = elecciones - ahora;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

CampaignMetricsSchema.methods.calcularPorcentajePatrocinios = function() {
  return Math.round((this.patrocinios.actual / this.patrocinios.meta) * 100);
};

CampaignMetricsSchema.methods.incrementarPatrocinios = function(cantidad = 1) {
  this.patrocinios.actual += cantidad;
  this.patrocinios.nuevosHoy += cantidad;
  this.sistema.ultimaActualizacion = new Date();
  return this.save();
};

CampaignMetricsSchema.methods.actualizarEncuesta = function(datos) {
  Object.assign(this.encuestas, datos);
  this.encuestas.ultimaActualizacion = new Date();
  this.sistema.ultimaActualizacion = new Date();
  return this.save();
};

CampaignMetricsSchema.methods.actualizarRegion = function(nombreRegion, porcentaje, tendencia) {
  const region = this.regionesLiderando.find(r => r.nombre === nombreRegion);
  if (region) {
    region.porcentaje = porcentaje;
    region.tendencia = tendencia;
    region.ultimaActualizacion = new Date();
  } else {
    this.regionesLiderando.push({
      nombre: nombreRegion,
      porcentaje,
      tendencia,
      ultimaActualizacion: new Date()
    });
  }
  this.sistema.ultimaActualizacion = new Date();
  return this.save();
};

// Statics Methods
CampaignMetricsSchema.statics.getOrCreate = async function() {
  let metrics = await this.findOne({});
  if (!metrics) {
    metrics = await this.create({
      regionesLiderando: [
        { nombre: "Araucanía", porcentaje: 34.2, tendencia: "+2.1%" },
        { nombre: "Antofagasta", porcentaje: 31.8, tendencia: "+1.8%" },
        { nombre: "Valparaíso", porcentaje: 29.4, tendencia: "+3.2%" }
      ]
    });
  }
  return metrics;
};

CampaignMetricsSchema.statics.simulateUpdate = async function() {
  const metrics = await this.getOrCreate();
  
  if (metrics.configuracion.habilitarSimulacion) {
    // Simular incrementos pequeños
    metrics.patrocinios.actual += Math.floor(Math.random() * 5);
    metrics.patrocinios.nuevosHoy += Math.floor(Math.random() * 3);
    metrics.interaccion.visitasHoy += Math.floor(Math.random() * 50);
    metrics.interaccion.compartidosHoy += Math.floor(Math.random() * 5);
    
    metrics.sistema.ultimaActualizacion = new Date();
    await metrics.save();
  }
  
  return metrics;
};

// Middleware pre-save
CampaignMetricsSchema.pre('save', function(next) {
  this.sistema.ultimaActualizacion = new Date();
  next();
});

// Indexes para mejor performance
CampaignMetricsSchema.index({ 'sistema.ultimaActualizacion': -1 });
CampaignMetricsSchema.index({ 'patrocinios.actual': 1 });
CampaignMetricsSchema.index({ 'regionesLiderando.nombre': 1 });

module.exports = mongoose.model('CampaignMetrics', CampaignMetricsSchema);