#!/usr/bin/env node

/**
 * Script para migrar datos de campaignData.js a MongoDB
 * Ejecutar: node scripts/migrateCampaignData.js
 */

require('dotenv').config();
const mongoose = require('mongoose');
const CampaignMetrics = require('../src/models/CampaignMetrics');

// Importar datos originales de campaignData.js
const { campaignMetrics, urgencyElements } = require('../src/data/campaignData');

async function migrateCampaignData() {
  try {
    console.log('🚀 Iniciando migración de datos de campaña...');
    
    // Conectar a MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/presidente2026', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Conectado a MongoDB');

    // Verificar si ya existen datos
    const existingMetrics = await CampaignMetrics.findOne({});
    if (existingMetrics) {
      console.log('⚠️  Ya existen métricas en la base de datos');
      console.log('¿Deseas continuar? Esto actualizará los datos existentes.');
      
      // En un entorno de producción, podrías querer un prompt aquí
      // Por ahora, procedemos con la migración
    }

    // Preparar datos para migración
    const migratedData = {
      patrocinios: {
        actual: campaignMetrics.apoyosRecolectados || 847392,
        meta: campaignMetrics.metaPatrocinios || 1000000,
        nuevosHoy: campaignMetrics.nuevosApoyosHoy || 2847,
        fechaLimiteInscripcion: new Date(urgencyElements.goalProgress.inscripcion.fechaLimite || '2026-01-15T23:59:59')
      },

      fechas: {
        elecciones: new Date(urgencyElements.countdown.electionDate || '2026-11-15T09:00:00'),
        limitePatrocinios: new Date(urgencyElements.goalProgress.inscripcion.fechaLimite || '2026-01-15T23:59:59'),
        inicioInscripcionCandidaturas: new Date('2025-08-01T00:00:00')
      },

      encuestas: {
        intencionVoto: campaignMetrics.encuestas?.intencionVoto || 28.4,
        aprobacion: campaignMetrics.encuestas?.aprobacion || 67.2,
        confianza: campaignMetrics.encuestas?.confianza || 71.8,
        tendencia: campaignMetrics.encuestas?.tendencia || "+4.2% último mes",
        ultimaActualizacion: new Date()
      },

      regionesLiderando: campaignMetrics.regionesLiderando?.map(region => ({
        nombre: region.nombre,
        porcentaje: region.porcentaje,
        tendencia: region.tendencia,
        ultimaActualizacion: new Date()
      })) || [
        { nombre: "Araucanía", porcentaje: 34.2, tendencia: "+2.1%", ultimaActualizacion: new Date() },
        { nombre: "Antofagasta", porcentaje: 31.8, tendencia: "+1.8%", ultimaActualizacion: new Date() },
        { nombre: "Valparaíso", porcentaje: 29.4, tendencia: "+3.2%", ultimaActualizacion: new Date() }
      ],

      interaccion: {
        visitasHoy: urgencyElements.liveMetrics?.visitasHoy || 15234,
        compartidosHoy: urgencyElements.liveMetrics?.compartidosHoy || 892,
        suscriptosNewsletter: 23456,
        videoViews: 145678
      },

      redesSociales: {
        seguidoresTotal: 89234,
        crecimientoSemanal: 3.2,
        engagementRate: 8.7
      },

      configuracion: {
        autoUpdate: true,
        intervaloActualizacion: 30,
        habilitarSimulacion: process.env.NODE_ENV !== 'production'
      },

      sistema: {
        version: "1.0.0",
        ultimaActualizacion: new Date(),
        actualizadoPor: "migration-script"
      }
    };

    // Crear o actualizar métricas
    let metrics;
    if (existingMetrics) {
      // Actualizar datos existentes
      Object.assign(existingMetrics, migratedData);
      metrics = await existingMetrics.save();
      console.log('✅ Datos actualizados en base de datos');
    } else {
      // Crear nuevos datos
      metrics = await CampaignMetrics.create(migratedData);
      console.log('✅ Nuevos datos creados en base de datos');
    }

    // Mostrar resumen de migración
    console.log('\n📊 Resumen de datos migrados:');
    console.log(`   • Patrocinios: ${metrics.patrocinios.actual.toLocaleString()} / ${metrics.patrocinios.meta.toLocaleString()}`);
    console.log(`   • Porcentaje: ${metrics.calcularPorcentajePatrocinios()}%`);
    console.log(`   • Días para elecciones: ${metrics.calcularDiasParaElecciones()}`);
    console.log(`   • Regiones liderando: ${metrics.regionesLiderando.length}`);
    console.log(`   • Última actualización: ${metrics.sistema.ultimaActualizacion.toLocaleString()}`);
    
    // Verificar métodos del modelo
    console.log('\n🧪 Probando métodos del modelo:');
    console.log(`   • calcularDiasParaElecciones(): ${metrics.calcularDiasParaElecciones()} días`);
    console.log(`   • calcularPorcentajePatrocinios(): ${metrics.calcularPorcentajePatrocinios()}%`);
    
    // Probar incremento de patrocinios
    const oldActual = metrics.patrocinios.actual;
    await metrics.incrementarPatrocinios(5);
    console.log(`   • incrementarPatrocinios(5): ${oldActual} → ${metrics.patrocinios.actual}`);

    console.log('\n✅ Migración completada exitosamente');
    console.log('\n📝 Próximos pasos:');
    console.log('   1. Actualizar componentes frontend para usar /api/campaign/metrics');
    console.log('   2. Eliminar datos duplicados de campaignData.js');
    console.log('   3. Configurar actualizaciones automáticas en producción');
    console.log('   4. Probar endpoints API con curl o Postman');

  } catch (error) {
    console.error('❌ Error durante la migración:', error);
    process.exit(1);
  } finally {
    // Cerrar conexión
    await mongoose.connection.close();
    console.log('🔌 Conexión a MongoDB cerrada');
    process.exit(0);
  }
}

// Ejecutar migración si el script se ejecuta directamente
if (require.main === module) {
  migrateCampaignData();
}

module.exports = { migrateCampaignData };