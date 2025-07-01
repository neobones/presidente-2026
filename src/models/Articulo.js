const mongoose = require('mongoose');

const articuloSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'El título del artículo es obligatorio.'],
    trim: true,
  },
  slug: {
    type: String,
    required: [true, 'El slug del artículo es obligatorio.'],
    unique: true,
    trim: true,
    lowercase: true,
    index: true, // Add index for faster queries by slug
  },
  summary: {
    type: String,
    required: [true, 'El resumen del artículo es obligatorio.'],
    trim: true,
  },
  content: {
    type: String,
    required: [true, 'El contenido del artículo es obligatorio.'],
  },
  author: {
    type: String,
    required: [true, 'El autor es obligatorio.'],
    default: 'Equipo de Campaña',
  },
  date: {
    type: Date,
    default: Date.now,
  },
  tags: {
    type: [String],
    default: [],
  },
  status: {
    type: String,
    enum: ['published', 'draft'],
    default: 'published',
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt
});

module.exports = mongoose.model('Articulo', articuloSchema);
