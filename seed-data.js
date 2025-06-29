const mongoose = require('mongoose');
const Consulta = require('./src/models/Consulta');

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/melinao2026', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Conectado a MongoDB'))
.catch(err => console.error('❌ Error conectando a MongoDB:', err));

// Datos de prueba realistas
const consultasPrueba = [
  {
    nombre: 'María González',
    region: 'Metropolitana',
    edad: '36-45',
    tema: 'economia',
    tipoConsulta: 'sugerencia',
    mensaje: 'Me parece excelente la reducción del IVA para la canasta básica. ¿Podrían considerar también incluir medicamentos básicos como aspirinas y paracetamol en esta reducción?',
    esPublica: true,
    likes: 12
  },
  {
    nombre: 'Carlos Espinoza',
    region: 'Valparaíso',
    edad: '26-35',
    tema: 'ia',
    tipoConsulta: 'apoyo',
    mensaje: 'Como empresario, apoyo totalmente la automatización de trámites. He perdido días enteros en el SII y Registro Civil. ¿Cuándo estiman que esté funcionando el sistema?',
    esPublica: true,
    likes: 8
  },
  {
    nombre: 'Ana Martínez',
    region: 'La Araucanía',
    edad: '46-55',
    tema: 'general',
    tipoConsulta: 'sugerencia',
    mensaje: 'Vivo en Temuco y creo que es fundamental que las propuestas lleguen a regiones. ¿Habrá oficinas descentralizadas para implementar estos cambios?',
    esPublica: true,
    likes: 15
  },
  {
    nombre: 'Ciudadano Anónimo',
    region: 'Biobío',
    edad: '18-25',
    tema: 'economia',
    tipoConsulta: 'duda',
    mensaje: 'Soy estudiante universitario y trabajo part-time. ¿El aumento del sueldo mínimo a $900k aplicará también para trabajos de medio tiempo?',
    esPublica: true,
    likes: 6
  },
  {
    nombre: 'Roberto Silva',
    region: 'Antofagasta',
    edad: '56-65',
    tema: 'ia',
    tipoConsulta: 'critica',
    mensaje: 'Me preocupa que la automatización elimine empleos públicos. ¿Qué plan tienen para reconvertir a los funcionarios que puedan verse afectados?',
    esPublica: true,
    likes: 9
  },
  {
    nombre: 'Isabel Ramírez',
    region: 'O\'Higgins',
    edad: '36-45',
    tema: 'general',
    tipoConsulta: 'apoyo',
    mensaje: 'Me encanta que un candidato mapuche represente la diversidad de Chile. Es hora de tener líderes que entiendan todas nuestras realidades.',
    esPublica: true,
    likes: 22
  },
  {
    nombre: 'Patricio Morales',
    region: 'Tarapacá',
    edad: '26-35',
    tema: 'economia',
    tipoConsulta: 'sugerencia',
    mensaje: 'En el norte tenemos desafíos únicos con el costo de vida. ¿Considerarían bonos especiales para zonas extremas además de las medidas generales?',
    esPublica: true,
    likes: 7
  },
  {
    nombre: 'Claudia Torres',
    region: 'Los Lagos',
    edad: '36-45',
    tema: 'ia',
    tipoConsulta: 'duda',
    mensaje: '¿Los trámites automatizados funcionarán sin internet? En zonas rurales del sur a veces tenemos problemas de conectividad.',
    esPublica: true,
    likes: 13
  },
  {
    nombre: 'Jorge Henríquez',
    region: 'Coquimbo',
    edad: '46-55',
    tema: 'general',
    tipoConsulta: 'sugerencia',
    mensaje: 'Como agricultor, me interesa saber si habrá medidas específicas para el sector agrícola. La tecnología puede ayudar mucho en el campo.',
    esPublica: true,
    likes: 5
  },
  {
    nombre: 'Francisca Rojas',
    region: 'Maule',
    edad: '26-35',
    tema: 'economia',
    tipoConsulta: 'apoyo',
    mensaje: 'Trabajo en una PYME y el subsidio al sueldo mínimo nos ayudaría muchísimo. ¿Cuándo entraría en vigencia esta medida?',
    esPublica: true,
    likes: 11
  },
  {
    nombre: 'Miguel Contreras',
    region: 'Atacama',
    edad: '56-65',
    tema: 'general',
    tipoConsulta: 'sugerencia',
    mensaje: 'Me parece importante que un ingeniero lidere el país. Chile necesita más ciencia y tecnología en las decisiones políticas.',
    esPublica: true,
    likes: 8
  },
  {
    nombre: 'Valentina Soto',
    region: 'Metropolitana',
    edad: '18-25',
    tema: 'ia',
    tipoConsulta: 'apoyo',
    mensaje: 'Como joven, me emociona ver propuestas tan innovadoras. ¿Habrá programas de capacitación en tecnología para los jóvenes?',
    esPublica: true,
    likes: 14
  }
];

async function seedDatabase() {
  try {
    // Limpiar datos existentes
    await Consulta.deleteMany({});
    console.log('🗑️ Base de datos limpiada');

    // Insertar datos de prueba
    for (const consultaData of consultasPrueba) {
      const consulta = new Consulta({
        ...consultaData,
        fechaEnvio: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000), // Últimos 7 días
        fechaPublicacion: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
        ip: '127.0.0.1',
        sentiment: 'positivo'
      });

      // Categorizar automáticamente
      consulta.categorizarAutomaticamente();
      consulta.analizarSentimiento();
      
      await consulta.save();
    }

    console.log(`✅ ${consultasPrueba.length} consultas de prueba creadas exitosamente`);
    
    // Mostrar estadísticas
    const stats = await Consulta.getEstadisticas();
    console.log('📊 Estadísticas:', stats);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error creando datos de prueba:', error);
    process.exit(1);
  }
}

seedDatabase();