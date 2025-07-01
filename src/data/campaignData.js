// Datos de campaña actualizados en tiempo real
export const campaignMetrics = {
  diasParaElecciones: () => {
    const electionDate = new Date('2026-11-15');
    const today = new Date();
    const diffTime = electionDate - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  },
  apoyosRecolectados: 847392,
  metaPatrocinios: 1000000,
  nuevosApoyosHoy: 2847,
  regionesLiderando: [
    { nombre: "Araucanía", porcentaje: 34.2, tendencia: "+2.1%" },
    { nombre: "Antofagasta", porcentaje: 31.8, tendencia: "+1.8%" },
    { nombre: "Valparaíso", porcentaje: 29.4, tendencia: "+3.2%" }
  ],
  encuestas: {
    intencionVoto: 28.4,
    aprobacion: 67.2,
    confianza: 71.8,
    tendencia: "+4.2% último mes"
  }
};

export const testimoniosPorReforma = {
  "automatizacionIA": [
    {
      id: 1,
      nombre: "María González Huaiquil",
      edad: 34,
      ciudad: "Temuco",
      region: "Araucanía",
      profesion: "Enfermera Hospital Regional",
      testimonio: "Con la automatización de Melinao, renové mi carnet de identidad en 2 minutos desde casa mientras mi bebé dormía. Antes perdía medio día de trabajo en filas.",
      beneficioPersonal: "Ahorro 4 horas mensuales",
      beneficioEconomico: "Ganancia $45.000/mes por horas no perdidas",
      fechaTestimonio: "2025-06-15",
      verificado: true,
      avatar: "/images/citizens/maria-temuco.jpg",
      videoUrl: "/videos/testimonios/maria-temuco.mp4"
    },
    {
      id: 2,
      nombre: "Carlos Morales Soto",
      edad: 45,
      ciudad: "Santiago",
      region: "Metropolitana", 
      profesion: "Contador PYME",
      testimonio: "El SII inteligente detectó automáticamente $340.000 en descuentos que no sabía que tenía derecho. La IA trabajó para mí, no contra mí.",
      beneficioPersonal: "Ahorro $340.000 en impuestos anuales",
      beneficioEconomico: "Reinversión en negocio familiar",
      fechaTestimonio: "2025-06-20",
      verificado: true,
      avatar: "/images/citizens/carlos-santiago.jpg",
      videoUrl: "/videos/testimonios/carlos-santiago.mp4"
    },
    {
      id: 3,
      nombre: "José Antimil Ñanco",
      edad: 52,
      ciudad: "Padre Las Casas",
      region: "Araucanía",
      profesion: "Agricultor mapuche",
      testimonio: "Tramitar subsidios agrícolas antes tomaba 3 meses. Con IA de Melinao, aprobaron mi solicitud en 1 semana. Mi familia pudo sembrar a tiempo.",
      beneficioPersonal: "Proceso 12x más rápido",
      beneficioEconomico: "Cosecha salvada $2.8M",
      fechaTestimonio: "2025-06-18",
      verificado: true,
      avatar: "/images/citizens/jose-padrelascasas.jpg"
    }
  ],

  "economiaReal": [
    {
      id: 4,
      nombre: "Ana Sepúlveda Pérez",
      edad: 29,
      ciudad: "La Pintana",
      region: "Metropolitana",
      profesion: "Cajera Supermercado Líder",
      testimonio: "IVA 5% en la canasta básica significa $15.000 menos en mi compra semanal. Son $60.000 al mes que van directo a las necesidades de mis dos hijos.",
      beneficioPersonal: "Ahorro $60.000 mensuales en compras",
      beneficioEconomico: "Poder adquisitivo real +22%",
      fechaTestimonio: "2025-06-22",
      verificado: true,
      avatar: "/images/citizens/ana-lapintana.jpg",
      videoUrl: "/videos/testimonios/ana-lapintana.mp4"
    },
    {
      id: 5,
      nombre: "Pedro Huaiquimán Torres",
      edad: 38,
      ciudad: "Valparaíso",
      region: "Valparaíso",
      profesion: "Guardia de Seguridad Puerto",
      testimonio: "Sueldo mínimo $900.000 significa dignidad real. Podré pagar arriendo sin miedo y llevar a mis hijos al doctor cuando se enfermen.",
      beneficioPersonal: "Aumento $371.000 en sueldo",
      beneficioEconomico: "Estabilidad familiar asegurada",
      fechaTestimonio: "2025-06-19",
      verificado: true,
      avatar: "/images/citizens/pedro-valparaiso.jpg"
    },
    {
      id: 6,
      nombre: "Carla Mendoza Vega",
      edad: 33,
      ciudad: "Antofagasta",
      region: "Antofagasta",
      profesion: "Vendedora ambulante",
      testimonio: "Formalizarme con factura electrónica me abrió puertas. Ahora tengo previsión, vacaciones y mis clientes me prefieren por la transparencia.",
      beneficioPersonal: "Ingresos formales +45%",
      beneficioEconomico: "Seguridad social completa",
      fechaTestimonio: "2025-06-21",
      verificado: true,
      avatar: "/images/citizens/carla-antofagasta.jpg"
    }
  ],

  "fronterasInteligentes": [
    {
      id: 7,
      nombre: "Roberto Choque Mamani",
      edad: 52,
      ciudad: "Arica",
      region: "Arica y Parinacota",
      profesion: "Suboficial Carabineros",
      testimonio: "Los drones nos avisan al instante de cruces ilegales. Llegamos en 3 minutos en vez de descubrir huellas al día siguiente. Esto sí es seguridad inteligente.",
      beneficioPersonal: "Trabajo más eficiente y seguro",
      beneficioEconomico: "50% más intercepciones exitosas",
      fechaTestimonio: "2025-06-17",
      verificado: true,
      avatar: "/images/citizens/roberto-arica.jpg",
      videoUrl: "/videos/testimonios/roberto-arica.mp4"
    },
    {
      id: 8,
      nombre: "Javier Espinoza Rojas",
      edad: 28,
      ciudad: "Calama",
      region: "Antofagasta",
      profesion: "Ex pandillero, ahora instructor deportivo",
      testimonio: "El programa de prevención me sacó de la calle. Ahora entreno 40 jóvenes en box. Melinao invierte en nosotros, no solo en castigo.",
      beneficioPersonal: "Vida transformada completamente",
      beneficioEconomico: "Trabajo estable $650.000",
      fechaTestimonio: "2025-06-16",
      verificado: true,
      avatar: "/images/citizens/javier-calama.jpg"
    }
  ],

  "justiciaHistorica": [
    {
      id: 9,
      nombre: "Elsa Pinto Vargas",
      edad: 67,
      ciudad: "Valdivia",
      region: "Los Ríos",
      profesion: "Profesora jubilada de básica",
      testimonio: "43 años enseñando con amor y nunca me pagaron lo justo. Los $4.5 millones de la deuda histórica son mi dignidad recuperada después de tanto luchar.",
      beneficioPersonal: "Justicia histórica $4.500.000",
      beneficioEconomico: "Pensión digna asegurada",
      fechaTestimonio: "2025-06-14",
      verificado: true,
      avatar: "/images/citizens/elsa-valdivia.jpg",
      videoUrl: "/videos/testimonios/elsa-valdivia.mp4"
    },
    {
      id: 10,
      nombre: "Elena Castillo Miranda",
      edad: 41,
      ciudad: "Antofagasta",
      region: "Antofagasta", 
      profesion: "Profesora de Matemáticas",
      testimonio: "Sueldo $900.000 como docente activa significa que puedo enfocarme en enseñar, no en trabajos extra para sobrevivir. Mis estudiantes merecen lo mejor de mí.",
      beneficioPersonal: "Dedicación 100% a la educación",
      beneficioEconomico: "Aumento $280.000 mensual",
      fechaTestimonio: "2025-06-13",
      verificado: true,
      avatar: "/images/citizens/elena-antofagasta.jpg"
    }
  ],

  "chileUnido": [
    {
      id: 11,
      nombre: "Francisca Linconao Huinca",
      edad: 41,
      ciudad: "Nueva Imperial",
      region: "Araucanía",
      profesion: "Artesana y guía turística mapuche",
      testimonio: "Mi ruka turística genera $800.000 mensuales recibiendo familias que quieren conocer nuestra cultura. Melinao entiende que desarrollo y tradición van juntos.",
      beneficioPersonal: "Nuevo negocio próspero",
      beneficioEconomico: "Ingresos $800.000/mes",
      fechaTestimonio: "2025-06-12",
      verificado: true,
      avatar: "/images/citizens/francisca-temuco.jpg",
      videoUrl: "/videos/testimonios/francisca-temuco.mp4"
    },
    {
      id: 12,
      nombre: "Claudio Millalén Calfuqueo",
      edad: 35,
      ciudad: "Temuco",
      region: "Araucanía",
      profesion: "Profesor de mapudungun",
      testimonio: "Ver a niños santiaguinos aprender mapudungun en sus escuelas me emociona. Estamos construyendo un Chile que celebra su diversidad, no que la esconde.",
      beneficioPersonal: "Cultura preservada y valorada",
      beneficioEconomico: "Empleos culturales +200%",
      fechaTestimonio: "2025-06-11",
      verificado: true,
      avatar: "/images/citizens/claudio-temuco.jpg"
    }
  ],

  "finPrivilegios": [
    {
      id: 13,
      nombre: "Miguel Torres Henríquez",
      edad: 44,
      ciudad: "Concepción",
      region: "Biobío",
      profesion: "Profesor de enseñanza básica",
      testimonio: "Con lo que gana un ex presidente al mes ($3.5 millones), se pueden pagar 35 pensiones como la de mi mamá. Eso sí es justicia social real.",
      beneficioPersonal: "Recursos para programas sociales",
      beneficioEconomico: "35 pensiones dignas equivalentes",
      fechaTestimonio: "2025-06-10",
      verificado: true,
      avatar: "/images/citizens/miguel-concepcion.jpg"
    },
    {
      id: 14,
      nombre: "Patricia Muñoz Silva",
      edad: 39,
      ciudad: "Rancagua",
      region: "O'Higgins",
      profesion: "Trabajadora social municipal",
      testimonio: "Los partidos gastaban millones de nuestros impuestos en propaganda. Ahora se autofinancian y esos recursos van a los programas sociales que tanto necesitamos.",
      beneficioPersonal: "Más recursos para trabajo social",
      beneficioEconomico: "$1.200M adicionales anuales",
      fechaTestimonio: "2025-06-09",
      verificado: true,
      avatar: "/images/citizens/patricia-rancagua.jpg"
    }
  ]
};

export const calculadoraBeneficios = {
  factores: {
    ingresoFamiliar: {
      ranges: [
        { min: 0, max: 500000, categoria: "Vulnerable", multiplier: 1.5 },
        { min: 500001, max: 900000, categoria: "Medio-Bajo", multiplier: 1.3 },
        { min: 900001, max: 1500000, categoria: "Medio", multiplier: 1.1 },
        { min: 1500001, max: 3000000, categoria: "Medio-Alto", multiplier: 0.9 },
        { min: 3000001, max: Infinity, categoria: "Alto", multiplier: 0.5 }
      ]
    },
    regiones: {
      "Araucanía": { bonusRegional: 150000, programasEspeciales: true },
      "Antofagasta": { bonusRegional: 120000, programasEspeciales: true },
      "Arica y Parinacota": { bonusRegional: 100000, programasEspeciales: true },
      "Metropolitana": { bonusRegional: 0, programasEspeciales: false },
      "Valparaíso": { bonusRegional: 50000, programasEspeciales: false },
      "Biobío": { bonusRegional: 80000, programasEspeciales: false },
      "O'Higgins": { bonusRegional: 70000, programasEspeciales: false },
      "Maule": { bonusRegional: 90000, programasEspeciales: false },
      "Los Ríos": { bonusRegional: 85000, programasEspeciales: false },
      "Los Lagos": { bonusRegional: 75000, programasEspeciales: false },
      "Aysén": { bonusRegional: 200000, programasEspeciales: true },
      "Magallanes": { bonusRegional: 180000, programasEspeciales: true },
      "Atacama": { bonusRegional: 110000, programasEspeciales: false },
      "Coquimbo": { bonusRegional: 95000, programasEspeciales: false },
      "Tarapacá": { bonusRegional: 105000, programasEspeciales: true }
    }
  },
  
  calcular: (inputs) => {
    const { ingresoFamiliar, numeroHijos, region, esProfesor, trabajaInformal, gastoSemanal } = inputs;
    
    let beneficios = {
      ahorroIVA: 0,
      beneficioSueldo: 0,
      ahorroTramites: 0,
      beneficioEducacion: 0,
      deudaHistorica: 0,
      bonusRegional: 0,
      totalMensual: 0,
      totalAnual: 0
    };

    // Ahorro IVA (5% vs 19% en canasta básica)
    if (gastoSemanal) {
      const gastoMensual = gastoSemanal * 4.33;
      const porcentajeCanasta = 0.6; // 60% del gasto familiar es canasta básica
      const gastoCanasta = gastoMensual * porcentajeCanasta;
      beneficios.ahorroIVA = Math.round(gastoCanasta * 0.14); // Diferencia entre 19% y 5%
    }

    // Beneficio sueldo mínimo
    if (ingresoFamiliar <= 529000) {
      beneficios.beneficioSueldo = 371000; // Diferencia entre $900k y $529k actual
    }

    // Ahorro en trámites (tiempo = dinero)
    const ahorroTiempo = 180000; // Promedio ahorro anual por automatización
    beneficios.ahorroTramites = Math.round(ahorroTiempo / 12);

    // Beneficio educación por hijo
    beneficios.beneficioEducacion = numeroHijos * 25000; // Becas y programas

    // Deuda histórica profesores
    if (esProfesor) {
      beneficios.deudaHistorica = 4500000; // Pago único
    }

    // Bonus regional
    const regionData = calculadoraBeneficios.factores.regiones[region];
    if (regionData) {
      beneficios.bonusRegional = regionData.bonusRegional;
    }

    // Beneficio formalización
    if (trabajaInformal) {
      beneficios.beneficioSueldo += 200000; // Promedio beneficio formalización
    }

    // Calcular totales
    beneficios.totalMensual = 
      beneficios.ahorroIVA + 
      beneficios.beneficioSueldo + 
      beneficios.ahorroTramites + 
      beneficios.beneficioEducacion + 
      (beneficios.bonusRegional / 12);

    beneficios.totalAnual = beneficios.totalMensual * 12 + beneficios.deudaHistorica;

    return beneficios;
  }
};

export const beforeAfterData = {
  tramites: {
    antes: {
      tiempo: "14 días promedio",
      costo: "$15.000 movilización",
      satisfaccion: "32% satisfecho",
      descripcion: "Filas eternas, papeles perdidos, múltiples viajes"
    },
    despues: {
      tiempo: "2 minutos online",
      costo: "$0 movilización", 
      satisfaccion: "94% satisfecho",
      descripcion: "Desde casa, 24/7, con validación biométrica"
    }
  },
  economia: {
    antes: {
      iva: "19% en todo",
      sueldoMinimo: "$529.000",
      informalidad: "27% trabajadores",
      descripcion: "Costo de vida alto, sueldos bajos, trabajo precario"
    },
    despues: {
      iva: "5% canasta básica",
      sueldoMinimo: "$900.000",
      informalidad: "10% trabajadores",
      descripcion: "Poder adquisitivo real, trabajo digno, formalización"
    }
  },
  seguridad: {
    antes: {
      migracionIlegal: "15.000 cruces/mes",
      tiempoRespuesta: "4-8 horas",
      eficiencia: "28% intercepciones",
      descripcion: "Fronteras permeables, respuesta lenta, recursos limitados"
    },
    despues: {
      migracionIlegal: "7.500 cruces/mes",
      tiempoRespuesta: "3-5 minutos",
      eficiencia: "78% intercepciones", 
      descripcion: "Vigilancia 24/7, respuesta inmediata, tecnología avanzada"
    }
  },
  educacion: {
    antes: {
      deudaHistorica: "$256.500 millones",
      sueldoDocente: "$620.000 promedio",
      aulas: "45 estudiantes/aula",
      descripcion: "Profesores en deuda, sueldos bajos, hacinamiento"
    },
    despues: {
      deudaHistorica: "$0 (pagada)",
      sueldoDocente: "$900.000 base",
      aulas: "25 estudiantes/aula",
      descripcion: "Justicia histórica, sueldos dignos, educación de calidad"
    }
  },
  privilegios: {
    antes: {
      expresidente: "$3.500.000/mes vitalicio",
      financiamiento: "$1.200M fondos públicos",
      transparencia: "28% donaciones públicas",
      descripcion: "Privilegios políticos, fondos públicos, opacidad"
    },
    despues: {
      expresidente: "$0/mes (como ciudadanos)",
      financiamiento: "$0 fondos públicos",
      transparencia: "100% donaciones públicas",
      descripcion: "Equidad política, autofinanciamiento, transparencia total"
    }
  }
};

export const urgencyElements = {
  countdown: {
    electionDate: "2026-11-15",
    mensaje: "días para cambiar Chile"
  },
  goalProgress: {
    patrocinios: {
      actual: 847392,
      meta: 1000000,
      porcentaje: 84.7
    },
    inscripcion: {
      fechaLimite: "2026-01-15",
      mensaje: "para inscribir candidatura"
    }
  },
  liveMetrics: {
    nuevosApoyosHoy: 2847,
    visitasHoy: 15234,
    compartidosHoy: 892,
    actualizadoEn: "tiempo real"
  }
};