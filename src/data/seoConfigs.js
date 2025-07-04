import { getCurrentDomain } from '../utils/domainUtils';

export const seoConfigs = {
  home: {
    title: "Juan Pablo Melinao González - Candidato Presidencial Chile 2026",
    description: "Ingeniero Mapuche Independiente para Presidente 2026. Automatización IA del Estado ahorra $500 mil millones. IVA 5% canasta básica, sueldo mínimo $900k. Desarrollo Araucanía $300 mil millones. Tecnología para Todos, Unidad para Chile.",
    keywords: [
      'Juan Pablo Melinao González',
      'Melinao 2026', 
      'candidato presidencial Chile',
      'presidente mapuche',
      'ingeniero presidente',
      'independiente 2026',
      'automatización IA estado',
      'reducción IVA canasta básica',
      'sueldo mínimo 900 mil',
      'desarrollo Araucanía',
      'Chile digno',
      'tecnología gobierno',
      'justicia social Chile',
      'fronteras seguras',
      'deuda histórica profesores',
      'unidad nacional',
      'mapuche presidente Chile',
      'candidato independiente',
      'elecciones presidenciales 2026',
      'reforma tributaria Chile'
    ],
    canonicalUrl: () => `${getCurrentDomain()}/`,
    structuredData: {
      "@context": "https://schema.org",
      "@type": ["Person", "PoliticalCandidate"],
      "name": "Juan Pablo Melinao González",
      "alternateName": ["Melinao 2026", "Juan Pablo Melinao", "Candidato Melinao"],
      "description": "Candidato Presidencial Chile 2026 - Ingeniero en Informática, Emprendedor Mapuche Independiente. Automatización IA del Estado, justicia social y unidad nacional.",
      "jobTitle": "Candidato Presidencial de Chile",
      "nationality": "Chilean",
      "ethnicity": "Mapuche",
      "profession": "Ingeniero en Informática",
      "politicalAffiliation": "Independiente",
      "campaignSlogan": "Tecnología para Todos, Unidad para Chile",
      "url": () => getCurrentDomain(),
      "email": () => `contacto@${getCurrentDomain().replace('https://', '').replace('http://', '')}`,
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "Chile",
        "addressRegion": "Región Metropolitana"
      },
      "sameAs": [
        "https://instagram.com/melinao2026",
        "https://twitter.com/melinao2026",
        "https://facebook.com/melinao2026",
        "https://linkedin.com/in/melinao2026",
        "https://youtube.com/@melinao2026",
        "https://tiktok.com/@melinao2026"
      ],
      "knowsAbout": [
        "Automatización con Inteligencia Artificial",
        "Desarrollo de Software",
        "Política Pública",
        "Derechos Indígenas",
        "Justicia Social",
        "Tecnología Gubernamental",
        "Desarrollo Económico",
        "Seguridad Nacional"
      ],
      "seeks": {
        "@type": "Role",
        "roleName": "Presidente de la República de Chile",
        "startDate": "2026-03-11",
        "description": "Candidato presidencial independiente enfocado en modernización tecnológica del Estado y justicia social"
      },
      "memberOf": {
        "@type": "PoliticalParty",
        "name": "Independiente",
        "description": "Candidatura independiente sin afiliación partidaria"
      },
      "campaign": {
        "@type": "Event",
        "name": "Campaña Presidencial Melinao 2026",
        "description": "Campaña presidencial enfocada en tecnología, justicia social y unidad nacional",
        "startDate": "2025-01-01",
        "endDate": "2026-11-15",
        "location": {
          "@type": "Country",
          "name": "Chile"
        }
      }
    }
  },
  
  automatizacion: {
    title: "Automatización del Estado con IA - Chile Digital 2026 | Melinao Presidente",
    description: "Revolución digital con Inteligencia Artificial en el Estado chileno. Trámites de semanas a 2 minutos. Ahorro $500 mil millones anuales. Registro Civil, SII y notarías 100% automatizados. Juan Pablo Melinao González, ingeniero mapuche, moderniza Chile.",
    keywords: [
      'automatización estado Chile',
      'inteligencia artificial gobierno',
      'IA trámites Chile',
      'Registro Civil automatizado',
      'SII inteligencia artificial',
      'notarías digitales blockchain',
      'gobierno digital Chile 2026',
      'Juan Pablo Melinao IA',
      'candidato ingeniero presidente',
      'modernización estado mapuche',
      'trámites 2 minutos Chile',
      'ahorro 500 mil millones',
      'Melinao automatización',
      'Chile digital total',
      'IA sector público',
      'transformación digital estado',
      'tecnología gobierno Chile',
      'candidato presidencial IA',
      'reforma digital Chile',
      'estado eficiente IA'
    ],
    canonicalUrl: () => `${getCurrentDomain()}/reformas/automatizacion-estado-inteligencia-artificial`,
    openGraph: {
      image: '/images/automatizacion-ia-melinao-2026.jpg',
      imageAlt: 'Juan Pablo Melinao - Automatización del Estado con IA Chile 2026'
    },
    structuredData: {
      "@context": "https://schema.org",
      "@type": ["GovernmentService", "PublicPolicy"],
      "name": "Automatización del Estado Chileno con Inteligencia Artificial",
      "headline": "Chile Digital 2026: IA para Revolucionar el Estado",
      "description": "Plan integral de automatización del Estado chileno con IA. Trámites instantáneos, ahorro masivo y acceso universal 24/7 desde cualquier región.",
      "author": {
        "@type": "Person",
        "name": "Juan Pablo Melinao González",
        "jobTitle": "Candidato Presidencial Chile 2026",
        "ethnicity": "Mapuche",
        "profession": "Ingeniero en Informática",
        "politicalAffiliation": "Independiente"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Campaña Melinao 2026",
        "url": () => getCurrentDomain()
      },
      "serviceType": "Digital Government Transformation",
      "areaServed": [
        {
          "@type": "Country",
          "name": "Chile"
        },
        {
          "@type": "Place",
          "name": "Santiago"
        },
        {
          "@type": "Place", 
          "name": "Araucanía"
        },
        {
          "@type": "Place",
          "name": "Antofagasta"
        },
        {
          "@type": "Place",
          "name": "Valparaíso"
        }
      ],
      "expectedBenefit": [
        "Reducción 99.9% tiempo trámites (semanas a 2 minutos)",
        "Ahorro $500 mil millones anuales del presupuesto público",
        "Servicios estatales 24/7 accesibles desde cualquier región",
        "Eliminación virtual de corrupción en trámites",
        "Inclusión digital para comunidades mapuche y rurales",
        "Capacitación 50.000 empleados públicos en 3 años"
      ],
      "cost": {
        "@type": "MonetaryAmount",
        "currency": "CLP",
        "value": "500000000000000"
      },
      "funding": [
        "Impuesto progresivo sueldos altos (20% FFAA, 50% otros)",
        "Ingresos formalización economía digital",
        "Fondos internacionales CAF y BID"
      ],
      "timeline": {
        "phase1": "Primeros 100 días: Pilotos Registro Civil y SII",
        "phase2": "Año 1-2: Expansión notarías y RSH, Centro Nacional IA",
        "phase3": "Año 3-5: 90% trámites automatizados, conectividad rural"
      },
      "technology": [
        "Inteligencia Artificial",
        "Blockchain",
        "Validación biométrica",
        "Análisis predictivo",
        "Procesamiento lenguaje natural",
        "Ciberseguridad avanzada"
      ],
      "keyFeatures": {
        "RegistroCivil": "Registros nacimiento/matrimonio/defunción en 2 minutos",
        "SII": "Auditorías automáticas, detección fraudes, asesoramiento IA",
        "Notarias": "Documentos 100% digitales con blockchain",
        "RSH": "Evaluación socioeconómica automatizada",
        "Universales": "Acceso 24/7 desde cualquier dispositivo"
      }
    },
    politicalKeywords: [
      'elecciones Chile 2026',
      'candidato presidencial mapuche',
      'independiente tecnología',
      'reforma estado digital',
      'modernización gobierno',
      'Chile primer mundo',
      'eficiencia pública',
      'transparencia gobierno'
    ]
  },

  participacionCiudadana: {
    title: "Participación Ciudadana - Melinao 2026 | Tu Voz Construye Chile",
    description: "Participa activamente en la construcción del Chile que queremos. Lee consultas ciudadanas, comparte ideas y forma parte del cambio democrático con Juan Pablo Melinao González.",
    keywords: [
      'participación ciudadana Chile',
      'consultas públicas Melinao',
      'democracia participativa 2026',
      'gobierno digital transparente',
      'consulta ciudadana online',
      'transparencia política Chile',
      'Chile digno participación',
      'ideas ciudadanas gobierno',
      'plataforma participación',
      'democracia digital Chile',
      'Juan Pablo Melinao participación',
      'consultas ciudadanas online',
      'gobierno abierto Chile',
      'participación democrática'
    ],
    canonicalUrl: () => `${getCurrentDomain()}/participacion-ciudadana`,
    openGraph: {
      image: '/images/participacion-ciudadana-melinao-2026.jpg',
      imageAlt: 'Participación Ciudadana - Tu Voz Construye Chile'
    },
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Participación Ciudadana - Melinao 2026",
      "description": "Plataforma de participación ciudadana para la campaña presidencial de Juan Pablo Melinao González 2026",
      "url": () => `${getCurrentDomain()}/participacion-ciudadana`,
      "mainEntity": {
        "@type": "GovernmentService",
        "name": "Sistema de Consultas Ciudadanas",
        "description": "Plataforma digital para recopilar consultas y propuestas ciudadanas",
        "provider": {
          "@type": "PoliticalParty",
          "name": "Campaña Melinao 2026",
          "candidate": {
            "@type": "Person",
            "name": "Juan Pablo Melinao González",
            "jobTitle": "Candidato Presidencial"
          }
        }
      }
    }
  },
  
  economia: {
    title: "Reforma Económica: Menos Impuestos, Más Sueldo - Melinao 2026 | Chile Próspero",
    description: "Revolución económica: IVA 5% canasta básica, sueldo mínimo $900,000 (+70% desde $529,000 actual), formalización digital. Ahorro $50,000 mensual promedio por familia. Superávit fiscal $1.1T garantizado. Juan Pablo Melinao González transforma Chile hacia la prosperidad.",
    keywords: [
      'reforma económica Chile 2026',
      'IVA 5% canasta básica',
      'sueldo mínimo 900 mil',
      'reducción impuestos Chile',
      'formalización digital',
      'facturas electrónicas arriendos',
      'impuesto sueldos altos',
      'Juan Pablo Melinao economía',
      'candidato presidencial economía',
      'menos costo vida Chile',
      'superávit fiscal Chile',
      'reducción IVA alimentos',
      'subsidio PYME sueldo mínimo',
      'reforma tributaria progresiva',
      'economía justa Chile',
      'Melinao plan económico',
      'prosperidad familiar Chile',
      'desarrollo económico regional',
      'justicia fiscal Chile',
      'alivio económico familias'
    ],
    canonicalUrl: () => `${getCurrentDomain()}/reformas/reduccion-costo-vida-impuestos`,
    openGraph: {
      image: '/images/economia-reforma-melinao-2026.jpg',
      imageAlt: 'Juan Pablo Melinao - Reforma Económica Chile 2026: Menos Impuestos, Más Sueldo'
    },
    structuredData: {
      "@context": "https://schema.org",
      "@type": ["GovernmentService", "PublicPolicy", "EconomicPolicy"],
      "name": "Reforma Económica: Reducción de Impuestos y Formalización",
      "headline": "Chile Próspero 2026: Menos Impuestos, Más Sueldo para las Familias",
      "description": "Plan integral de reforma económica chilena: IVA reducido, sueldo mínimo digno, formalización digital y justicia fiscal. Beneficios directos para 70% de las familias chilenas.",
      "author": {
        "@type": "Person",
        "name": "Juan Pablo Melinao González",
        "jobTitle": "Candidato Presidencial Chile 2026",
        "ethnicity": "Mapuche",
        "profession": "Ingeniero en Informática",
        "politicalAffiliation": "Independiente"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Campaña Melinao 2026",
        "url": () => getCurrentDomain()
      },
      "serviceType": "Economic Reform Policy",
      "areaServed": [
        {
          "@type": "Country",
          "name": "Chile"
        },
        {
          "@type": "Place",
          "name": "Santiago"
        },
        {
          "@type": "Place", 
          "name": "Araucanía"
        },
        {
          "@type": "Place",
          "name": "Antofagasta"
        }
      ],
      "expectedBenefit": [
        "IVA 5% canasta básica (reducción desde 19%)",
        "Sueldo mínimo $900,000 (aumento 70% desde $529,000)",
        "Ahorro promedio $50,000 mensuales por familia",
        "Formalización 80% economía chilena",
        "Facturas electrónicas obligatorias arriendos",
        "Impuesto progresivo sueldos altos (20% FFAA, 50% otros)",
        "Superávit fiscal $1.1 billones garantizado",
        "Beneficia 70% familias chilenas directamente"
      ],
      "cost": {
        "@type": "MonetaryAmount",
        "currency": "CLP",
        "value": "1700000000000000"
      },
      "funding": [
        "Formalización economía digital (+$800B recaudación)",
        "Impuesto progresivo sueldos altos (+$1.5-2T)",
        "Optimización eficiencia tributaria",
        "Eliminación privilegios fiscales"
      ],
      "timeline": {
        "phase1": "Primeros 100 días: Ley IVA reducido y facturación arriendos",
        "phase2": "Año 1-2: Sueldo mínimo $900K gradual con subsidios PYME",
        "phase3": "Año 3-5: Formalización 80% y sistema tributario IA"
      },
      "targetAudience": [
        "Trabajadores sueldo mínimo (1.8M personas)",
        "Familias ingresos medios y bajos (60% hogares)",
        "PYMES con dificultades salariales",
        "Comerciantes informales (27% trabajadores)",
        "Familias región Araucanía, Antofagasta, Santiago"
      ],
      "keyFeatures": {
        "IVAReducido": "Canasta básica 5%, otros bienes 10%",
        "SueldoMinimo": "$900,000 con subsidio estatal 50% PYMES",
        "Formalizacion": "Facturas electrónicas arriendos/comercio/fundaciones",
        "ImpuestoAlto": "50% progresivo sobre $3M (20% FFAA), 30% entre $2-3M",
        "Sostenibilidad": "Superávit $1.1T, retorno inversión 2-3 años"
      },
      "economicImpact": {
        "families": "70% familias chilenas beneficiadas directamente",
        "savings": "$50,000 ahorro mensual promedio por familia", 
        "formalization": "80% economía formalizada en 5 años",
        "revenue": "$800B adicionales por formalización",
        "employment": "1.8M trabajadores sueldo mínimo $900K"
      }
    },
    politicalKeywords: [
      'elecciones Chile 2026',
      'candidato presidencial mapuche',
      'independiente economía',
      'reforma tributaria Chile',
      'justicia económica',
      'Chile próspero familias',
      'alivio costo vida',
      'economía justa Chile'
    ]
  },
  
  fronterasInteligentes: {
    title: "Fronteras Inteligentes - Seguridad Nacional y Tecnología | Melinao 2026",
    description: "Revolución en seguridad nacional: drones, IA y vigilancia satelital para fronteras protegidas. 50% reducción migración ilegal, 20% menos crimen violento. Tecnología + prevención social. Juan Pablo Melinao González, ingeniero mapuche, moderniza la seguridad chilena con enfoque humanitario.",
    keywords: [
      'fronteras inteligentes Chile',
      'seguridad nacional tecnología',
      'drones fronteras Chile',
      'vigilancia satelital migración',
      'control migración ilegal',
      'crimen organizado Chile',
      'Tren de Aragua tecnología',
      'Juan Pablo Melinao seguridad',
      'candidato presidencial seguridad',
      'ingeniero mapuche fronteras',
      'migración controlada humanitaria',
      'tecnología seguridad pública',
      'prevención crimen social',
      'Bukele modelo Chile',
      'fronteras Bolivia Perú',
      'centros humanitarios migrantes',
      'IA seguridad nacional',
      'automatización fronteras',
      'candidato independiente seguridad',
      'Melinao fronteras seguras'
    ],
    canonicalUrl: () => `${getCurrentDomain()}/reformas/fronteras-inteligentes-seguridad-nacional`,
    openGraph: {
      image: '/images/fronteras-inteligentes-melinao-2026.jpg',
      imageAlt: 'Juan Pablo Melinao - Fronteras Inteligentes Chile 2026'
    },
    structuredData: {
      "@context": "https://schema.org",
      "@type": ["GovernmentService", "PublicPolicy", "SecurityPolicy"],
      "name": "Fronteras Inteligentes - Reforma de Seguridad Nacional",
      "headline": "Chile Seguro 2026: Tecnología para Fronteras Protegidas y Calles Tranquilas",
      "description": "Plan integral de seguridad nacional con tecnología avanzada. Drones, IA y vigilancia satelital para control fronterizo humanitario y prevención del crimen organizado.",
      "author": {
        "@type": "Person",
        "name": "Juan Pablo Melinao González",
        "jobTitle": "Candidato Presidencial Chile 2026",
        "ethnicity": "Mapuche",
        "profession": "Ingeniero en Informática",
        "politicalAffiliation": "Independiente"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Campaña Melinao 2026",
        "url": () => getCurrentDomain()
      },
      "serviceType": "National Security Reform Policy",
      "areaServed": [
        {
          "@type": "Country",
          "name": "Chile"
        },
        {
          "@type": "Place",
          "name": "Arica y Parinacota"
        },
        {
          "@type": "Place", 
          "name": "Tarapacá"
        },
        {
          "@type": "Place",
          "name": "Antofagasta"
        },
        {
          "@type": "Place",
          "name": "Araucanía"
        }
      ],
      "expectedBenefit": [
        "50% reducción migración ilegal en fronteras norte",
        "20% disminución delitos violentos en 3 años",
        "Vigilancia 24/7 con drones y satélites",
        "Centros humanitarios dignos para migrantes",
        "Prevención social en zonas vulnerables",
        "Acuerdos internacionales Bolivia y Perú",
        "Tecnología IA para predicción criminal",
        "Inclusión comunidades mapuche en Araucanía"
      ],
      "cost": {
        "@type": "MonetaryAmount",
        "currency": "CLP",
        "value": "650000000000000"
      },
      "funding": [
        "Impuesto progresivo sueldos altos ($1.5-2T)",
        "Formalización arriendos y comercio ($500-800B)",
        "Ahorros automatización estado ($200B)",
        "Fondo minero cobre y litio ($500B)"
      ],
      "timeline": {
        "phase1": "Primeros 100 días: Drones Arica-Tarapacá, centros humanitarios",
        "phase2": "Año 1-2: Expansión Antofagasta-Atacama, tribunales especiales",
        "phase3": "Año 3-5: IA nacional, acuerdos Bolivia-Perú, prevención social"
      },
      "technology": [
        "Drones vigilancia fronteriza",
        "Satélites monitoreo 24/7",
        "Inteligencia Artificial predictiva",
        "Cámaras térmicas avanzadas",
        "Sistemas comunicación segura",
        "Análisis big data criminal"
      ],
      "keyFeatures": {
        "Fronteras": "Drones y satélites en 4,329 km fronteras",
        "Centros": "Instalaciones humanitarias dignas migrantes",
        "Prevencion": "Programas sociales zonas vulnerables",
        "Internacional": "Acuerdos Bolivia-Perú control conjunto",
        "IA": "Predicción criminal y optimización recursos"
      },
      "regionalImpact": {
        "Araucania": "$50B programas sociales juventud mapuche",
        "Antofagasta": "$100B vigilancia fronteriza tecnológica",
        "Santiago": "$150B fortalecimiento unidades especiales",
        "Norte": "50% reducción contrabando y migración ilegal"
      }
    },
    politicalKeywords: [
      'elecciones Chile 2026',
      'candidato presidencial mapuche',
      'independiente seguridad',
      'reforma seguridad nacional',
      'tecnología fronteras Chile',
      'Chile seguro familias',
      'migración controlada humanitaria',
      'crimen organizado Chile'
    ]
  },
  
  justiciaSocial: {
    title: "Justicia Social - Deuda Histórica Profesores y Fin Privilegios | Melinao 2026",
    description: "Revolución en justicia social: pago $4.5 millones a 57,000 profesores, sueldo docente $900K, eliminación sueldos vitalicios ex presidentes. Equidad real para trabajadores. Juan Pablo Melinao González, ingeniero mapuche, salda deudas históricas y termina privilegios políticos.",
    keywords: [
      'justicia social Chile',
      'deuda histórica profesores',
      'pago profesores 4.5 millones',
      'sueldo docente 900 mil',
      'eliminación sueldos vitalicios',
      'privilegios políticos Chile',
      'Juan Pablo Melinao justicia',
      'candidato presidencial educación',
      'ingeniero mapuche equidad',
      'fin privilegios ex presidentes',
      'transparencia política Chile',
      'equidad social trabajadores',
      'reforma educativa Chile',
      'docentes dignos Chile',
      'ex parlamentarios privilegios',
      'colegio profesores Chile',
      'Melinao justicia social',
      'candidato independiente educación',
      'profesores mapuche',
      'eliminar desigualdades Chile'
    ],
    canonicalUrl: () => `${getCurrentDomain()}/reformas/justicia-social-equidad-fin-privilegios`,
    openGraph: {
      image: '/images/justicia-social-melinao-2026.jpg',
      imageAlt: 'Juan Pablo Melinao - Justicia Social Chile 2026'
    },
    structuredData: {
      "@context": "https://schema.org",
      "@type": ["GovernmentService", "PublicPolicy", "SocialPolicy"],
      "name": "Justicia Social - Equidad y Fin de Privilegios",
      "headline": "Chile Justo 2026: Pagamos a Profesores, Eliminamos Privilegios Políticos",
      "description": "Plan integral de justicia social chilena: deuda histórica profesores, sueldos docentes dignos, eliminación privilegios políticos y reinversión en programas sociales para equidad real.",
      "author": {
        "@type": "Person",
        "name": "Juan Pablo Melinao González",
        "jobTitle": "Candidato Presidencial Chile 2026",
        "ethnicity": "Mapuche",
        "profession": "Ingeniero en Informática",
        "politicalAffiliation": "Independiente"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Campaña Melinao 2026",
        "url": () => getCurrentDomain()
      },
      "serviceType": "Social Justice Reform Policy",
      "areaServed": [
        {
          "@type": "Country",
          "name": "Chile"
        },
        {
          "@type": "Place",
          "name": "Araucanía"
        },
        {
          "@type": "Place", 
          "name": "Santiago"
        },
        {
          "@type": "Place",
          "name": "Antofagasta"
        },
        {
          "@type": "Place",
          "name": "Valparaíso"
        }
      ],
      "expectedBenefit": [
        "Pago $4.5 millones a 57,000 profesores deuda histórica",
        "Sueldo docente $900,000 para 200,000 profesores activos",
        "Eliminación sueldos vitalicios ex presidentes y parlamentarios",
        "Ahorro $1,500 millones anuales reinvertidos programas sociales",
        "Bonos rurales $100,000 para 50,000 docentes zonas vulnerables",
        "Programas educativos $50B específicos para docentes mapuche",
        "Transparencia total pagos via melinao2026.cl",
        "Equidad regional con inversión focalizada Araucanía"
      ],
      "cost": {
        "@type": "MonetaryAmount",
        "currency": "CLP",
        "value": "795000000000000"
      },
      "funding": [
        "Impuesto progresivo sueldos altos ($1.5-2T anuales)",
        "Formalización arriendos y comercio digital ($500-800B)",
        "Ahorros eliminación sueldos vitalicios ($1.5B anuales)",
        "Fondo minero cobre y litio ($500B anuales)"
      ],
      "timeline": {
        "phase1": "Primeros 100 días: Inicio pago 10,000 docentes ancianos",
        "phase2": "Año 1-2: 30,000 docentes pagados, sueldo $900K 50% escuelas",
        "phase3": "Año 3-5: Deuda histórica saldada, privilegios eliminados"
      },
      "targetAudience": [
        "57,000 profesores con deuda histórica pendiente",
        "200,000 docentes activos sistema educacional",
        "Familias chilenas que buscan educación de calidad",
        "Comunidades vulnerables Araucanía y regiones",
        "Ciudadanos que rechazan privilegios políticos (65%)",
        "Trabajadores que demandan equidad laboral"
      ],
      "keyFeatures": {
        "DeudaHistorica": "$4.5M por docente, 57,000 beneficiados 2025-2031",
        "SueldoDocente": "$900,000 base + bonos rurales zonas vulnerables",
        "EliminacionPrivilegios": "Fin sueldos vitalicios ex presidentes/parlamentarios gradual",
        "Transparencia": "Registro público pagos y ahorros en melinao2026.cl",
        "EquidadRegional": "Programas específicos docentes mapuche y rurales"
      },
      "socialImpact": {
        "teachers": "57,000 profesores reciben justicia histórica",
        "activeTeachers": "200,000 docentes sueldo digno $900K",
        "savings": "$1,500M anuales eliminación privilegios políticos", 
        "education": "Mejora calidad educativa 15% en 2 años",
        "equity": "Fin desigualdades históricas trabajadores vs políticos"
      }
    },
    politicalKeywords: [
      'elecciones Chile 2026',
      'candidato presidencial mapuche',
      'independiente justicia social',
      'reforma educativa Chile',
      'transparencia política',
      'Chile justo profesores',
      'equidad social trabajadores',
      'fin privilegios políticos'
    ]
  },
  
  chileUnido: {
    title: "Chile Unido - Desarrollo Sostenible Araucanía y Unidad Nacional | Melinao 2026",
    description: "Revolución de unidad nacional: $470B desarrollo sostenible Araucanía, reconocimiento cultura mapuche, 5,000 empleos turismo, educación intercultural. Juan Pablo Melinao González, ingeniero mapuche, construye Chile unido en diversidad con diálogo y desarrollo.",
    keywords: [
      'Chile unido Melinao',
      'desarrollo sostenible Araucanía',
      'cultura mapuche reconocimiento',
      'turismo sostenible Chile',
      'unidad nacional diversidad',
      'integración social mapuche',
      'Juan Pablo Melinao Araucanía',
      'candidato presidencial mapuche',
      'ingeniero mapuche unidad',
      'desarrollo indígena Chile',
      'reconciliación nacional Chile',
      'derechos territoriales mapuche',
      'educación intercultural',
      'protección ambiental Chile',
      'diálogo intercomunitario',
      'cohesión social Chile',
      'Temuco desarrollo turístico',
      'bosques protegidos Araucanía',
      'emprendimiento mapuche',
      'Chile diversidad fortaleza'
    ],
    canonicalUrl: () => `${getCurrentDomain()}/reformas/chile-unido-desarrollo-araucania`,
    openGraph: {
      image: '/images/chile-unido-melinao-2026.jpg',
      imageAlt: 'Juan Pablo Melinao - Chile Unido Desarrollo Araucanía 2026'
    },
    structuredData: {
      "@context": "https://schema.org",
      "@type": ["GovernmentService", "PublicPolicy", "SocialPolicy"],
      "name": "Chile Unido - Desarrollo Sostenible e Integración Araucanía",
      "headline": "Chile Unido 2026: Desarrollo Sostenible, Cultura Mapuche y Unidad Nacional",
      "description": "Plan integral de unidad nacional chilena: desarrollo sostenible Araucanía, reconocimiento cultural mapuche, turismo responsable y educación intercultural para cohesión social y prosperidad compartida.",
      "author": {
        "@type": "Person",
        "name": "Juan Pablo Melinao González",
        "jobTitle": "Candidato Presidencial Chile 2026",
        "ethnicity": "Mapuche",
        "profession": "Ingeniero en Informática",
        "politicalAffiliation": "Independiente"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Campaña Melinao 2026",
        "url": () => getCurrentDomain()
      },
      "serviceType": "National Unity and Cultural Integration Policy",
      "areaServed": [
        {
          "@type": "Country",
          "name": "Chile"
        },
        {
          "@type": "Place",
          "name": "Araucanía"
        },
        {
          "@type": "Place", 
          "name": "Santiago"
        },
        {
          "@type": "Place",
          "name": "Antofagasta"
        },
        {
          "@type": "Place",
          "name": "Valparaíso"
        }
      ],
      "expectedBenefit": [
        "Desarrollo sostenible $470B inversión integral Araucanía",
        "Reconocimiento cultura mapuche en 500 escuelas públicas",
        "Creación 5,000 empleos turismo cultural y tecnología",
        "Protección ambiental con $100B reforestación y manejo residuos",
        "Consejo Regional Desarrollo Sostenible con participación indígena",
        "Educación intercultural para 50,000 estudiantes",
        "Regularización derechos territoriales 5,000 familias mapuche",
        "Turismo sostenible con 20 centros culturales regionales"
      ],
      "cost": {
        "@type": "MonetaryAmount",
        "currency": "CLP",
        "value": "470000000000000"
      },
      "funding": [
        "Impuesto progresivo sueldos altos ($1.5-2T anuales)",
        "Formalización arriendos y comercio digital ($500-800B)",
        "Fondo minero cobre y litio ($500B anuales)",
        "Ahorros automatización estado ($200B)",
        "Cooperación internacional ONU-UE ($100B)"
      ],
      "timeline": {
        "phase1": "Primeros 100 días: Consejo Regional, programas ambientales piloto",
        "phase2": "Año 1-2: Regularización tierras, infraestructura educativa y salud",
        "phase3": "Año 3-5: Turismo consolidado, educación cívica nacional"
      },
      "targetAudience": [
        "Comunidades mapuche y pueblos originarios",
        "Habitantes región Araucanía (100,000 personas)",
        "Familias demandantes educación intercultural",
        "Emprendedores turismo sostenible",
        "Ciudadanos buscando unidad nacional (80%)",
        "Estudiantes educación pública nacional"
      ],
      "keyFeatures": {
        "DesarrolloSostenible": "$470B inversión integral Araucanía 2026-2031",
        "ReconocimientoCultural": "Idioma mapuche en 500 escuelas, educación intercultural",
        "TurismoSostenible": "20 centros turísticos culturales, 5,000 empleos directos",
        "ProteccionAmbiental": "$100B reforestación, reducción 15% contaminación",
        "IntegracionSocial": "Consejo Regional participativo, diálogo intercomunitario"
      },
      "socialImpact": {
        "culturalRecognition": "50,000 estudiantes educación intercultural",
        "economicDevelopment": "5,000 empleos turismo y tecnología Araucanía",
        "environmentalProtection": "15% reducción contaminación regional", 
        "territorialRights": "5,000 familias mapuche derechos territoriales asegurados",
        "nationalUnity": "80% chilenos beneficiados cohesión social mejorada"
      }
    },
    politicalKeywords: [
      'elecciones Chile 2026',
      'candidato presidencial mapuche',
      'independiente unidad nacional',
      'desarrollo sostenible Chile',
      'cultura mapuche integración',
      'Chile unido diversidad',
      'reconciliación nacional',
      'Araucanía desarrollo turístico'
    ]
  },
  
  privilegiosPoliticos: {
    title: "Eliminación de Privilegios Políticos - Reforma Transparencia Chile | Melinao 2026",
    description: "Revolución en transparencia política: eliminación sueldos vitalicios ex presidentes/parlamentarios, autofinanciamiento partidos políticos, fin privilegios. Ahorro $3.460M anuales para salud, educación y pensiones. Juan Pablo Melinao González termina con la política de privilegios en Chile.",
    keywords: [
      'eliminación privilegios políticos Chile',
      'sueldos vitalicios ex presidentes',
      'autofinanciamiento partidos políticos',
      'reforma transparencia política',
      'fin privilegios parlamentarios',
      'Juan Pablo Melinao privilegios',
      'candidato presidencial transparencia',
      'ingeniero mapuche equidad',
      'reforma política Chile 2026',
      'eliminación financiamiento estatal partidos',
      'transparencia política total',
      'equidad política Chile',
      'justicia política trabajadores',
      'ex presidentes sin sueldos vitalicios',
      'partidos autofinanciados Chile',
      'Melinao reforma política',
      'candidato independiente privilegios',
      'ahorro 3 mil millones privilegios',
      'política sin privilegios Chile',
      'democracia transparente Chile'
    ],
    canonicalUrl: () => `${getCurrentDomain()}/reformas/eliminacion-privilegios-politicos-transparencia`,
    openGraph: {
      image: '/images/privilegios-politicos-melinao-2026.jpg',
      imageAlt: 'Juan Pablo Melinao - Eliminación Privilegios Políticos Chile 2026'
    },
    structuredData: {
      "@context": "https://schema.org",
      "@type": ["GovernmentService", "PublicPolicy", "PoliticalReform"],
      "name": "Eliminación de Privilegios Políticos - Reforma de Transparencia",
      "headline": "Chile Transparente 2026: Fin de Privilegios Políticos y Autofinanciamiento de Partidos",
      "description": "Plan integral de reforma política chilena: eliminación sueldos vitalicios, autofinanciamiento de partidos, transparencia total. Ahorro masivo para reinversión en prioridades sociales y fin de desigualdades políticas.",
      "author": {
        "@type": "Person",
        "name": "Juan Pablo Melinao González",
        "jobTitle": "Candidato Presidencial Chile 2026",
        "ethnicity": "Mapuche",
        "profession": "Ingeniero en Informática",
        "politicalAffiliation": "Independiente"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Campaña Melinao 2026",
        "url": () => getCurrentDomain()
      },
      "serviceType": "Political Transparency Reform Policy",
      "areaServed": [
        {
          "@type": "Country",
          "name": "Chile"
        },
        {
          "@type": "Place",
          "name": "Santiago"
        },
        {
          "@type": "Place", 
          "name": "Araucanía"
        },
        {
          "@type": "Place",
          "name": "Valparaíso"
        },
        {
          "@type": "Place",
          "name": "Concepción"
        }
      ],
      "expectedBenefit": [
        "Eliminación sueldos vitalicios ex presidentes/parlamentarios/ministros",
        "Autofinanciamiento total partidos políticos sin fondos públicos",
        "Ahorro fiscal $2.660-3.660 millones anuales garantizado",
        "Transparencia total donaciones políticas registro público",
        "Límite 15 años remuneraciones estatales post-servicio",
        "Reinversión ahorros en salud, educación y pensiones dignas",
        "Equidad política: fin privilegios vs trabajadores comunes",
        "Fondo transición 5 años para ex autoridades actuales"
      ],
      "cost": {
        "@type": "MonetaryAmount",
        "currency": "CLP",
        "value": "200000000000000"
      },
      "funding": [
        "Autofinanciado por eliminación privilegios ($3.460M anuales)",
        "Auditoría legal identificación normativas ($200B)",
        "Fondo transición temporal ($200B 5 años)",
        "Fiscalización reforzada SERVEL (presupuesto existente)"
      ],
      "timeline": {
        "phase1": "Primeros 100 días: Auditoría legal, proyectos ley presentados",
        "phase2": "Año 1-2: Eliminación financiamiento estatal, reducción 20% sueldos vitalicios",
        "phase3": "Año 3-5: Eliminación total privilegios, autofinanciamiento consolidado"
      },
      "legalFramework": [
        "Derogación artículos Ley N° 19.884 financiamiento estatal",
        "Modificación Ley N° 20.900 para autofinanciamiento exclusivo",
        "Nueva ley límite 15 años remuneraciones post-servicio",
        "Reforma constitucional Artículo 8 (probidad y transparencia)",
        "Fortalecimiento SERVEL fiscalización donaciones privadas"
      ],
      "keyFeatures": {
        "EliminacionSueldosVitalicios": "Gradual 5 años, $1.660-2.160M ahorro anual",
        "AutofinanciamientoPartidos": "Solo donaciones privadas transparentes, $1.000-1.500M ahorro",
        "TransparenciaTotal": "Registro público tiempo real todas donaciones",
        "Limite15Anos": "Prohibición remuneraciones estatales después 15 años servicio",
        "FondoTransicion": "Apoyo reinserción laboral ex autoridades 5-10 años"
      },
      "politicalImpact": {
        "privilegeElimination": "$1.860-2.360M privilegios eliminados anualmente",
        "publicSavings": "$2.660-3.660M total ahorro anual para programas sociales",
        "transparency": "100% donaciones políticas públicas y auditadas", 
        "equity": "Fin desigualdades políticos vs trabajadores comunes",
        "citizenTrust": "65% chilenos apoyan eliminación privilegios políticos"
      },
      "targetAudience": [
        "Ciudadanos que rechazan privilegios políticos (65%)",
        "Trabajadores demandando equidad con políticos",
        "Familias afectadas por falta recursos salud/educación",
        "Contribuyentes exigiendo uso eficiente impuestos",
        "Jóvenes demandando transparencia política total",
        "Organizaciones sociedad civil anticorrupción"
      ],
      "comparison": {
        "exPresidente": "De $3.500.000/mes a $0/mes = 35 pensiones dignas",
        "exParlamentario": "De $6.000.000/mes a $400.000/mes = 56 pensiones AFP", 
        "exMinistro": "De $2.800.000/mes a $0/mes = 28 pensiones dignas",
        "totalEquivalencia": "Ahorros financian 34.600 pensiones dignas adicionales"
      }
    },
    politicalKeywords: [
      'elecciones Chile 2026',
      'candidato presidencial mapuche',
      'independiente transparencia',
      'reforma política Chile',
      'eliminación privilegios',
      'Chile transparente equitativo',
      'política sin privilegios',
      'democracia transparente'
    ]
  },

  // Configuraciones SEO Regionales
  regional: {
    santiago: {
      title: "Juan Pablo Melinao en Santiago - Automatización IA y Tecnología 2026",
      description: "Candidato Presidencial Juan Pablo Melinao en Santiago. Centro Nacional de IA, automatización trámites municipales, conectividad digital para 7.1M santiaguinos. Tecnología para todos en la Región Metropolitana.",
      keywords: [
        'Melinao Santiago',
        'candidato presidencial Santiago',
        'IA Santiago',
        'automatización municipal Santiago',
        'tecnología Santiago 2026',
        'trámites digitales RM',
        'Centro Nacional IA Santiago',
        'gobierno digital metropolitano'
      ],
      canonicalUrl: () => `${getCurrentDomain()}/regiones/santiago`,
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Place",
        "name": "Santiago",
        "description": "Centro de operaciones tecnológicas para la automatización del Estado chileno",
        "containedInPlace": "Chile",
        "population": "7100000",
        "economicImpact": "$200 mil millones ahorro anual"
      }
    },

    araucania: {
      title: "Juan Pablo Melinao en La Araucanía - Desarrollo Mapuche y Tecnología",
      description: "Ingeniero Mapuche Juan Pablo Melinao para La Araucanía. $300 mil millones desarrollo regional, inclusión digital mapuche, conectividad rural, preservación cultural con tecnología. Unidad y progreso en Temuco.",
      keywords: [
        'Melinao Araucanía',
        'candidato mapuche Temuco',
        'desarrollo Araucanía',
        'inclusión digital mapuche',
        'conectividad rural Araucanía',
        'tecnología pueblos originarios',
        'reconciliación Araucanía',
        'desarrollo indígena Chile'
      ],
      canonicalUrl: () => `${getCurrentDomain()}/regiones/araucania`,
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Place",
        "name": "La Araucanía",
        "description": "Desarrollo tecnológico inclusivo respetando la cultura mapuche",
        "containedInPlace": "Chile",
        "population": "1000000",
        "economicImpact": "$300 mil millones inversión desarrollo"
      }
    },

    antofagasta: {
      title: "Juan Pablo Melinao en Antofagasta - Tecnología Minera y Fronteras",
      description: "Candidato Juan Pablo Melinao en Antofagasta. Automatización minería con IA, fronteras digitales seguras, desarrollo norte de Chile. Tecnología para el desierto más árido del mundo.",
      keywords: [
        'Melinao Antofagasta',
        'tecnología minera Chile',
        'automatización minería IA',
        'fronteras digitales norte',
        'desarrollo Antofagasta',
        'candidato norte Chile',
        'minería 4.0 Chile',
        'desierto Atacama tecnología'
      ],
      canonicalUrl: () => `${getCurrentDomain()}/regiones/antofagasta`,
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Place",
        "name": "Antofagasta",
        "description": "Hub tecnológico minero y control fronterizo digital",
        "containedInPlace": "Chile",
        "population": "650000",
        "economicImpact": "$50 mil millones impacto minería digital"
      }
    },

    valparaiso: {
      title: "Juan Pablo Melinao en Valparaíso - Puerto Digital y Comercio 4.0",
      description: "Juan Pablo Melinao en Valparaíso. Automatización portuaria, comercio exterior digital, conectividad costera. Puerto principal de Chile líder en tecnología logística.",
      keywords: [
        'Melinao Valparaíso',
        'puerto digital Chile',
        'automatización portuaria',
        'comercio exterior digital',
        'logística 4.0 Chile',
        'conectividad costera',
        'candidato Valparaíso',
        'tecnología marítima'
      ],
      canonicalUrl: () => `${getCurrentDomain()}/regiones/valparaiso`,
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Place",
        "name": "Valparaíso",
        "description": "Puerto digital líder en comercio exterior automatizado",
        "containedInPlace": "Chile", 
        "population": "1800000",
        "economicImpact": "$80 mil millones comercio exterior digital"
      }
    },

    concepcion: {
      title: "Juan Pablo Melinao en Concepción - Educación Digital y Universidad 4.0",
      description: "Candidato Juan Pablo Melinao en Concepción. Educación digital, universidad 4.0, investigación IA, desarrollo sur de Chile. Capital educacional con tecnología de vanguardia.",
      keywords: [
        'Melinao Concepción',
        'educación digital Chile',
        'universidad 4.0',
        'investigación IA Chile',
        'desarrollo Biobío',
        'candidato sur Chile',
        'tecnología educativa',
        'innovación Concepción'
      ],
      canonicalUrl: () => `${getCurrentDomain()}/regiones/concepcion`,
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Place",
        "name": "Concepción",
        "description": "Centro educacional y de investigación en IA",
        "containedInPlace": "Chile",
        "population": "1200000",
        "economicImpact": "$60 mil millones educación digital"
      }
    }
  }
};