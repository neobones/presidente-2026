import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle, Cpu, Clock, DollarSign, Users, Zap, TrendingUp, Shield, Globe, BarChart3, Monitor, Building2, MapPin, Star, Target, Calculator, BookOpen, Play, ChevronRight, Award, Briefcase, Heart, TreePine, Mountain, Building, X, Home, FileText, Timer, CheckSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOWrapper from '../components/SEOWrapper';
import ConsultasCiudadanas from '../components/ConsultasCiudadanas';
import { seoConfigs } from '../data/seoConfigs';

const AutomatizacionIA = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState('registro');
  const [activeRegion, setActiveRegion] = useState('araucania');
  const [activeFase, setActiveFase] = useState(0);
  const [showCalculator, setShowCalculator] = useState(false);
  const [showSimulator, setShowSimulator] = useState(false);
  const [simulatorStep, setSimulatorStep] = useState(0);
  const [simulatorData, setSimulatorData] = useState({
    nombre: '',
    rut: '',
    proceso: '',
    documento: '',
    resultado: null
  });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Datos actualizados basados en el nuevo contenido
  const keyStats = [
    {
      icon: <Clock className="w-8 h-8" />,
      title: "43%",
      subtitle: "procesos digitalizados",
      description: "Oportunidad de automatizar 57%",
      color: "from-red-500 to-orange-500"
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "$500B",
      subtitle: "ahorro anual",
      description: "A partir del tercer año",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "$800B",
      subtitle: "inversión inicial",
      description: "Retorno en 2-3 años",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "100K",
      subtitle: "ciudadanos capacitados",
      description: "Inclusión digital masiva",
      color: "from-purple-500 to-pink-500"
    }
  ];

  const procesosAutomatizar = [
    {
      id: 'registro',
      name: 'Registro Civil',
      icon: <Building2 className="w-12 h-12" />,
      costoInicial: '$100B',
      ahorroAnual: '$50B',
      tiempoRetorno: '2 años',
      descripcion: 'Digitalización completa de registros vitales',
      beneficios: [
        'Registros de nacimiento, matrimonio y defunción automatizados',
        'Certificados instantáneos desde cualquier dispositivo',
        'Integración directa con hospitales y juzgados',
        'Archivo digital permanente e inmutable'
      ],
      ejemplo: 'Registra el nacimiento de tu hijo desde tu celular en 5 minutos, sin filas ni traslados'
    },
    {
      id: 'sii',
      name: 'SII',
      icon: <BarChart3 className="w-12 h-12" />,
      costoInicial: '$150B',
      ahorroAnual: '$75B',
      tiempoRetorno: '2 años',
      descripcion: 'Auditorías automáticas y detección de fraudes con IA',
      beneficios: [
        'Detección automática de inconsistencias fiscales',
        'Asesoramiento tributario personalizado con IA',
        'Declaraciones pre-llenadas con datos validados',
        'Recaudación optimizada (+10% eficiencia)'
      ],
      ejemplo: 'La IA detecta automáticamente deducciones que puedes aplicar, maximizando tu devolución'
    },
    {
      id: 'notarias',
      name: 'Notarías',
      icon: <Monitor className="w-12 h-12" />,
      costoInicial: '$120B',
      ahorroAnual: '$60B',
      tiempoRetorno: '2 años',
      descripcion: 'Autenticación digital de documentos con blockchain',
      beneficios: [
        'Documentos 100% digitales con validez legal',
        'Autenticación blockchain inmutable',
        'Validación biométrica avanzada',
        'Acceso 24/7 desde cualquier ubicación'
      ],
      ejemplo: 'Autentica contratos de arriendo desde casa, sin notario físico ni horarios restringidos'
    },
    {
      id: 'registro-social',
      name: 'Registro Social',
      icon: <Users className="w-12 h-12" />,
      costoInicial: '$80B',
      ahorroAnual: '$40B',
      tiempoRetorno: '2 años',
      descripcion: 'Validación automática de datos socioeconómicos',
      beneficios: [
        'Actualización automática de condiciones socioeconómicas',
        'Asignación inteligente de beneficios sociales',
        'Eliminación de trámites redundantes',
        'Detección de vulnerabilidades en tiempo real'
      ],
      ejemplo: 'Recibe automáticamente subsidios cuando tu situación cambia, sin papeleos'
    },
    {
      id: 'salud',
      name: 'Servicios de Salud',
      icon: <Heart className="w-12 h-12" />,
      costoInicial: '$150B',
      ahorroAnual: '$75B',
      tiempoRetorno: '2 años',
      descripcion: 'Priorización de pacientes y diagnósticos asistidos por IA',
      beneficios: [
        'Diagnósticos más precisos con IA médica',
        'Priorización automática por urgencia real',
        'Reducción de listas de espera en 30%',
        'Telemedicina avanzada para zonas rurales'
      ],
      ejemplo: 'La IA analiza tus síntomas y te programa automáticamente con el especialista correcto'
    }
  ];

  const impactoRegional = [
    {
      id: 'araucania',
      name: 'La Araucanía',
      icon: <TreePine className="w-8 h-8" />,
      poblacion: '957,224',
      inversion: '$60B',
      enfoque: 'Digitalización Cultural y Conectividad',
      beneficios: [
        {
          titulo: 'Digitalización Cultural',
          monto: '$10B',
          descripcion: 'Archivos mapuche digitalizados con IA'
        },
        {
          titulo: 'Conectividad Rural',
          monto: '$30B',
          descripcion: '50,000 personas con internet de alta velocidad'
        },
        {
          titulo: 'Empleos Tecnológicos',
          monto: '$20B',
          descripcion: '1,000 nuevos puestos en tech rural'
        }
      ],
      ejemplo: 'Una familia mapuche registra su negocio online y vende productos artesanales desde casa'
    },
    {
      id: 'antofagasta',
      name: 'Antofagasta',
      icon: <Mountain className="w-8 h-8" />,
      poblacion: '691,854',
      inversion: '$80B',
      enfoque: 'Productividad Minera e Innovación',
      beneficios: [
        {
          titulo: 'IA en Minería',
          monto: '$50B',
          descripcion: '+15% productividad = $100B adicionales'
        },
        {
          titulo: 'Salud Digital',
          monto: '$20B',
          descripcion: 'Listas de espera reducidas 30%'
        },
        {
          titulo: 'Hub Tecnológico',
          monto: '$10B',
          descripcion: 'Centro de innovación del norte'
        }
      ],
      ejemplo: 'Mineros usan IA para optimizar extracción y reducir riesgos laborales'
    },
    {
      id: 'santiago',
      name: 'Santiago',
      icon: <Building className="w-8 h-8" />,
      poblacion: '7,112,808',
      inversion: '$400B',
      enfoque: 'Centro Neurálgico de IA Nacional',
      beneficios: [
        {
          titulo: 'Recaudación IA',
          monto: '$200B',
          descripcion: '+10% eficiencia tributaria'
        },
        {
          titulo: 'Centro Nacional IA',
          monto: '$150B',
          descripcion: 'Hub de desarrollo e innovación'
        },
        {
          titulo: 'Servicios Inteligentes',
          monto: '$50B',
          descripcion: 'Plataforma integrada de servicios'
        }
      ],
      ejemplo: 'Emprendedores lanzan startups desde una ventanilla única digital en minutos'
    }
  ];

  const cronogramaImplementacion = [
    {
      fase: 'FASE 1: PILOTOS',
      duracion: 'Primeros 100 días',
      costo: '$50B',
      objetivos: [
        'Validar tecnología en áreas clave',
        'Registro Civil en Santiago y Temuco',
        'SII auditorías en Antofagasta y Valparaíso'
      ],
      hitos: [
        '30 días: Infraestructura base',
        '60 días: Pilotos funcionando',
        '100 días: Evaluación y ajustes'
      ],
      color: 'from-green-500 to-emerald-600'
    },
    {
      fase: 'FASE 2: EXPANSIÓN',
      duracion: 'Año 1-2',
      costo: '$300B',
      objetivos: [
        'Escalar soluciones a nivel nacional',
        'Notarías digitales en todo Chile',
        'Registro Social automatizado'
      ],
      hitos: [
        '6 meses: 50% procesos activos',
        '12 meses: Cobertura nacional',
        '24 meses: Optimización completa'
      ],
      color: 'from-blue-500 to-cyan-600'
    },
    {
      fase: 'FASE 3: CONSOLIDACIÓN',
      duracion: 'Año 3-5',
      costo: '$250B',
      objetivos: [
        'Automatizar 90% de trámites',
        'Centro Nacional de IA',
        'Integración total de servicios'
      ],
      hitos: [
        '36 meses: 80% automatización',
        '48 meses: Centro IA operativo',
        '60 meses: Estado totalmente digital'
      ],
      color: 'from-purple-500 to-pink-600'
    }
  ];

  const fundamentosLegales = [
    {
      nombre: 'Ley de Transformación Digital',
      numero: 'N° 21.180',
      descripcion: 'Base legal para digitalización de servicios públicos',
      url: 'https://digital.gob.cl/transformacion-digital/ley-de-transformacion-digital/'
    },
    {
      nombre: 'Política Nacional de IA',
      numero: 'Minciencia',
      descripcion: '70 acciones prioritarias para desarrollo de IA',
      url: 'https://www.minciencia.gob.cl/areas/inteligencia-artificial/politica-nacional-de-inteligencia-artificial/'
    },
    {
      nombre: 'Digital Government Review Chile',
      numero: 'OECD 2020',
      descripcion: 'Marco internacional de mejores prácticas',
      url: 'https://www.oecd.org/gov/digital-government-review-of-chile-2020.pdf'
    },
    {
      nombre: 'Circular Uso Responsable IA',
      numero: 'Minciencia 2024',
      descripcion: 'Uso responsable IA en servicios públicos',
      url: 'https://minciencia.gob.cl/noticias/gobierno-publica-circular-para-un-uso-responsable-de-la-ia-en-los-servicios-publicos/'
    }
  ];

  // Simulador Functions
  const startSimulation = (proceso) => {
    setSimulatorData({ ...simulatorData, proceso });
    setSimulatorStep(1);
    setShowSimulator(true);
  };

  const processSimulation = () => {
    setSimulatorStep(2);
    // Simular procesamiento IA
    setTimeout(() => {
      const resultados = {
        'registro': {
          tiempo: '2 minutos 30 segundos',
          ahorro: '$45,000',
          documentos: ['Certificado de Nacimiento Digital', 'Actualización RUT', 'Notificación FONASA'],
          siguiente: 'Tu certificado estará disponible en tu ChileID digital'
        },
        'sii': {
          tiempo: '4 minutos 15 segundos',
          ahorro: '$120,000',
          documentos: ['Declaración Pre-llenada', 'Deducciones Automáticas', 'Formulario 22'],
          siguiente: 'IA detectó 3 deducciones adicionales que puedes aplicar'
        },
        'notarias': {
          tiempo: '3 minutos 45 segundos',
          ahorro: '$85,000',
          documentos: ['Contrato Autenticado', 'Firma Digital', 'Registro Blockchain'],
          siguiente: 'Documento almacenado permanentemente en blockchain'
        },
        'registro-social': {
          tiempo: '1 minuto 50 segundos',
          ahorro: '$25,000',
          documentos: ['Ficha Social Actualizada', 'Beneficios Asignados', 'Calendario Pagos'],
          siguiente: 'Subsidio habitacional pre-aprobado automáticamente'
        },
        'salud': {
          tiempo: '2 minutos 10 segundos',
          ahorro: '$200,000',
          documentos: ['Cita Médica Asignada', 'Pre-diagnóstico IA', 'Plan Tratamiento'],
          siguiente: 'Cita con especialista programada para mañana 10:00 AM'
        }
      };
      
      setSimulatorData({ ...simulatorData, resultado: resultados[simulatorData.proceso] });
      setSimulatorStep(3);
    }, 3000);
  };

  const resetSimulator = () => {
    setSimulatorStep(0);
    setSimulatorData({
      nombre: '',
      rut: '',
      proceso: '',
      documento: '',
      resultado: null
    });
    setShowSimulator(false);
  };

  return (
    <SEOWrapper seoConfig={seoConfigs.automatizacion}>
      <div className="min-h-screen bg-gray-50">
        {/* Header Navigation */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link 
                to="/" 
                className="flex items-center space-x-3 text-gray-900 hover:text-blue-600 transition-colors"
              >
                <Home className="w-6 h-6" />
                <span className="font-bold">Volver al Menú Principal</span>
              </Link>
              
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowSimulator(true)}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors"
                >
                  <Play className="w-4 h-4" />
                  <span>Simulador IA</span>
                </button>
                
                <button
                  onClick={() => setShowCalculator(true)}
                  className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition-colors"
                >
                  <Calculator className="w-4 h-4" />
                  <span>Calculadora</span>
                </button>
              </div>
            </div>
          </div>
        </header>
        {/* Hero Section Enhanced */}
        <section className="relative min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-cyan-900 overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-cyan-500/20"></div>
            <div 
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(120, 213, 250, 0.3) 0%, transparent 70%), radial-gradient(circle at 75% 80%, rgba(59, 130, 246, 0.3) 0%, transparent 70%)',
                transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
              }}
            ></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 flex flex-col justify-center min-h-screen">
            <div className="text-center space-y-6 lg:space-y-8">
              {/* Updated Badge - Mobile Optimized */}
              <div className="inline-flex items-center space-x-2 lg:space-x-3 bg-white/10 backdrop-blur-md rounded-full px-4 lg:px-8 py-3 lg:py-4 border border-white/20">
                <Cpu className="w-5 h-5 lg:w-6 lg:h-6 text-cyan-400" />
                <span className="text-white font-bold text-sm lg:text-lg">REFORMA ESTRUCTURAL</span>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>

              {/* Main Title - Mobile Optimized */}
              <h1 className="text-2xl sm:text-3xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-black leading-tight">
                <span className="block text-white">AUTOMATIZACIÓN</span>
                <span className="block text-white">DEL ESTADO</span>
                <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent text-xl sm:text-2xl lg:text-4xl xl:text-5xl 2xl:text-6xl">
                  CON INTELIGENCIA ARTIFICIAL
                </span>
              </h1>

              {/* Enhanced Subtitle - Mobile Optimized */}
              <div className="max-w-5xl mx-auto space-y-3 lg:space-y-4">
                <p className="text-base lg:text-xl xl:text-2xl 2xl:text-3xl text-gray-200">
                  <span className="font-bold text-white">Liderada por Juan Pablo Melinao González</span>
                  <br />
                  <span className="text-cyan-300 text-sm lg:text-base xl:text-xl 2xl:text-2xl">Ingeniero informático, emprendedor mapuche, candidato presidencial independiente</span>
                </p>
                <p className="text-sm lg:text-lg xl:text-xl text-gray-300 max-w-4xl mx-auto">
                  Posicionando a Chile como referente en innovación pública en América Latina
                </p>
              </div>

              {/* Key Stats Grid - Mobile Optimized */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 max-w-6xl mx-auto">
                {keyStats.map((stat, index) => (
                  <div 
                    key={index} 
                    className="bg-white/10 backdrop-blur-md rounded-xl lg:rounded-2xl p-3 lg:p-6 border border-white/20 text-center hover:bg-white/20 transition-all duration-300 group cursor-pointer"
                    onClick={() => setShowCalculator(true)}
                  >
                    <div className={`inline-flex p-2 lg:p-3 rounded-full bg-gradient-to-r ${stat.color} text-white mb-2 lg:mb-4 group-hover:scale-110 transition-transform`}>
                      <div className="text-sm lg:text-base">{stat.icon}</div>
                    </div>
                    <div className="text-lg lg:text-3xl font-black text-white mb-1 lg:mb-2">{stat.title}</div>
                    <div className="text-xs lg:text-sm text-cyan-300 font-semibold mb-1">{stat.subtitle}</div>
                    <div className="text-xs text-gray-300 hidden lg:block">{stat.description}</div>
                  </div>
                ))}
              </div>

              {/* CTA Buttons - Mobile Optimized */}
              <div className="flex flex-col gap-3 lg:gap-4 justify-center pt-6 lg:pt-8">
                <button 
                  onClick={() => {
                    document.getElementById('contexto')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="group px-6 lg:px-8 py-3 lg:py-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 text-white font-bold text-sm lg:text-lg rounded-full hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 lg:space-x-3 w-full sm:w-auto"
                >
                  <span className="hidden sm:inline">VER PLAN TÉCNICO COMPLETO</span>
                  <span className="sm:hidden">VER PLAN COMPLETO</span>
                  <ArrowRight className="w-5 h-5 lg:w-6 lg:h-6 group-hover:translate-x-2 transition-transform" />
                </button>
                
                <button 
                  onClick={() => {
                    setShowCalculator(true);
                  }}
                  className="px-6 lg:px-8 py-3 lg:py-4 border-2 border-white text-white font-bold text-sm lg:text-lg rounded-full hover:bg-white hover:text-gray-900 transition-all duration-300 flex items-center justify-center space-x-2 lg:space-x-3 w-full sm:w-auto"
                >
                  <Calculator className="w-5 h-5 lg:w-6 lg:h-6" />
                  <span className="hidden sm:inline">CALCULADORA DE AHORROS</span>
                  <span className="sm:hidden">CALCULADORA</span>
                </button>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="flex flex-col items-center space-y-2 text-white">
              <span className="text-sm">Descubre los fundamentos</span>
              <ArrowRight className="w-6 h-6 rotate-90" />
            </div>
          </div>
        </section>

        {/* Context Section - New */}
        <section id="contexto" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 bg-blue-100 rounded-full px-6 py-3 text-blue-800 font-semibold mb-6">
                <BookOpen className="w-5 h-5" />
                <span>CONTEXTO TÉCNICO, ECONÓMICO Y POLÍTICO</span>
              </div>
              
              <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-8">
                Chile tiene las 
                <span className="text-blue-600"> bases</span>, ahora las 
                <span className="text-green-600"> optimizamos</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              {/* Avances Actuales */}
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-8 border border-blue-100">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-blue-600 rounded-full">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Avances Actuales</h3>
                </div>
                <div className="space-y-4">
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="font-bold text-blue-600 mb-1">Ley N° 21.180</div>
                    <div className="text-gray-700 text-sm">Impulsa digitalización (Gob.cl)</div>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="font-bold text-green-600 mb-1">Política Nacional IA</div>
                    <div className="text-gray-700 text-sm">70 acciones prioritarias (Minciencia)</div>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="font-bold text-red-600 mb-1">Solo 43% digitalizado</div>
                    <div className="text-gray-700 text-sm">Oportunidad del 57% restante</div>
                  </div>
                </div>
              </div>

              {/* Oportunidad Económica */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 border border-green-100">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-green-600 rounded-full">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Oportunidad Económica</h3>
                </div>
                <div className="space-y-4">
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="text-3xl font-black text-green-600 mb-1">$500B</div>
                    <div className="text-gray-700 text-sm">Ahorro anual posible</div>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="text-2xl font-bold text-blue-600 mb-1">US$550M</div>
                    <div className="text-gray-700 text-sm">Equivalente internacional</div>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="font-bold text-purple-600 mb-1">Reasignación</div>
                    <div className="text-gray-700 text-sm">A salud y educación</div>
                  </div>
                </div>
              </div>

              {/* Dimensión Política */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 border border-purple-100">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-purple-600 rounded-full">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Dimensión Política</h3>
                </div>
                <div className="space-y-4">
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="font-bold text-purple-600 mb-1">Demanda Ciudadana</div>
                    <div className="text-gray-700 text-sm">Eficiencia y transparencia</div>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="font-bold text-blue-600 mb-1">Gobernanza</div>
                    <div className="text-gray-700 text-sm">Fortalecimiento institucional</div>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="font-bold text-red-600 mb-1">Anti-burocracia</div>
                    <div className="text-gray-700 text-sm">Eliminación de trámites innecesarios</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Legal Framework */}
            <div className="bg-gray-900 rounded-3xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6 text-center">Fundamentos Legales Existentes</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {fundamentosLegales.map((ley, index) => (
                  <a 
                    key={index} 
                    href={ley.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/10 backdrop-blur rounded-xl p-4 hover:bg-white/20 transition-all duration-300 group"
                  >
                    <div className="font-bold text-cyan-400 mb-2 group-hover:text-cyan-300">{ley.nombre}</div>
                    <div className="text-sm text-gray-300 mb-2">{ley.numero}</div>
                    <div className="text-xs text-gray-400 mb-3">{ley.descripcion}</div>
                    <div className="text-xs text-cyan-500 group-hover:text-cyan-400">Ver documento →</div>
                  </a>
                ))}
              </div>
              <div className="text-center mt-6">
                <div className="text-gray-400 text-sm">
                  Propuesta fundamentada en legislación chilena vigente
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Process Automation */}
        <section id="procesos" className="py-24 bg-gradient-to-br from-blue-50 to-cyan-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 bg-blue-600 rounded-full px-6 py-3 text-white font-semibold mb-6">
                <Cpu className="w-5 h-5" />
                <span>PROCESOS PRIORITARIOS</span>
              </div>
              
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-8">
                Cinco Áreas
                <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent"> Estratégicas</span>
              </h2>

              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Cada proceso automatizado representa ahorros reales y mejor calidad de vida para los ciudadanos
              </p>
            </div>

            {/* Interactive Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {procesosAutomatizar.map((proceso) => (
                <button
                  key={proceso.id}
                  onClick={() => setActiveTab(proceso.id)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center space-x-2 ${
                    activeTab === proceso.id
                      ? 'bg-blue-600 text-white shadow-lg scale-105'
                      : 'bg-white text-gray-600 hover:bg-blue-50'
                  }`}
                >
                  <div className="w-6 h-6">{proceso.icon}</div>
                  <span>{proceso.name}</span>
                </button>
              ))}
            </div>

            {/* Active Process Details */}
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              {procesosAutomatizar.map((proceso) => (
                <div
                  key={proceso.id}
                  className={`${activeTab === proceso.id ? 'block' : 'hidden'}`}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/* Info Panel */}
                    <div className="p-12 bg-gradient-to-br from-blue-600 to-cyan-500 text-white">
                      <div className="flex items-center space-x-4 mb-6">
                        <div className="p-4 bg-white/20 rounded-2xl">
                          {proceso.icon}
                        </div>
                        <div>
                          <h3 className="text-3xl font-black">{proceso.name}</h3>
                          <p className="text-cyan-100">{proceso.descripcion}</p>
                        </div>
                      </div>

                      {/* Financial Metrics */}
                      <div className="grid grid-cols-3 gap-4 mb-8">
                        <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
                          <div className="text-2xl font-black">{proceso.costoInicial}</div>
                          <div className="text-sm text-cyan-200">Inversión</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
                          <div className="text-2xl font-black">{proceso.ahorroAnual}</div>
                          <div className="text-sm text-cyan-200">Ahorro/año</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
                          <div className="text-2xl font-black">{proceso.tiempoRetorno}</div>
                          <div className="text-sm text-cyan-200">Retorno</div>
                        </div>
                      </div>

                      {/* Citizen Example */}
                      <div className="bg-yellow-400/20 border border-yellow-400/30 rounded-xl p-6">
                        <div className="flex items-start space-x-3">
                          <div className="p-2 bg-yellow-400 rounded-full">
                            <Users className="w-4 h-4 text-yellow-900" />
                          </div>
                          <div>
                            <div className="font-bold mb-2">Ejemplo para la ciudadanía:</div>
                            <div className="text-yellow-100">{proceso.ejemplo}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Benefits Panel */}
                    <div className="p-12 bg-gray-50">
                      <h4 className="text-2xl font-bold text-gray-900 mb-8">Beneficios Específicos</h4>
                      <div className="space-y-6">
                        {proceso.beneficios.map((beneficio, idx) => (
                          <div key={idx} className="flex items-start space-x-4">
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                              <CheckCircle className="w-5 h-5 text-green-600" />
                            </div>
                            <div className="text-gray-700">{beneficio}</div>
                          </div>
                        ))}
                      </div>

                      {/* Action Button */}
                      <div className="mt-8">
                        <button 
                          onClick={() => startSimulation(proceso.id)}
                          className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold py-4 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
                        >
                          <Play className="w-5 h-5" />
                          <span>SIMULAR PROCESO IA</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Economic Analysis Interactive */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 bg-green-100 rounded-full px-6 py-3 text-green-800 font-semibold mb-6">
                <Calculator className="w-5 h-5" />
                <span>ANÁLISIS ECONÓMICO DETALLADO</span>
              </div>
              
              <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-8">
                Inversión Inteligente,
                <span className="text-green-600"> Retorno Garantizado</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
              {/* Investment Sources */}
              <div className="space-y-8">
                <h3 className="text-3xl font-bold text-gray-900">Fuentes de Financiamiento</h3>
                <div className="space-y-4">
                  {[
                    { fuente: 'Impuestos sueldos altos', monto: '$500B', porcentaje: '62.5%' },
                    { fuente: 'Formalización arriendos', monto: '$500-800B', porcentaje: '62.5-100%' },
                    { fuente: 'Fondo minero', monto: '$500B', porcentaje: '62.5%' },
                    { fuente: 'BID/CAF apoyo', monto: '$200B', porcentaje: '25%' }
                  ].map((item, index) => (
                    <div key={index} className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-bold text-gray-900">{item.fuente}</div>
                          <div className="text-sm text-gray-600">Contribución al presupuesto</div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-black text-green-600">{item.monto}</div>
                          <div className="text-sm text-gray-500">{item.porcentaje}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ROI Projections */}
              <div className="space-y-8">
                <h3 className="text-3xl font-bold text-gray-900">Proyección de Retorno</h3>
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-8 border border-blue-100">
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="text-4xl font-black text-blue-600 mb-2">$500B</div>
                      <div className="text-gray-600">Ahorro anual desde año 3</div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                        <div className="text-2xl font-bold text-green-600">2-3 años</div>
                        <div className="text-sm text-gray-600">Recuperación inversión</div>
                      </div>
                      <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                        <div className="text-2xl font-bold text-purple-600">US$550M</div>
                        <div className="text-sm text-gray-600">Equivalente USD</div>
                      </div>
                    </div>

                    <div className="bg-yellow-100 rounded-xl p-4 border border-yellow-200">
                      <div className="font-bold text-yellow-800 mb-2">Ejemplo para la ciudadanía:</div>
                      <div className="text-yellow-700 text-sm">
                        Con los ahorros, el gobierno podría financiar 10 nuevos hospitales 
                        o aumentar las pensiones en un 15%, beneficiando directamente a tu familia.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Cost Table */}
            <div className="bg-gray-900 rounded-3xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-8 text-center">Tabla Detallada de Costos y Ahorros</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-4 px-4">Proceso</th>
                      <th className="text-center py-4 px-4">Costo Inicial</th>
                      <th className="text-center py-4 px-4">Ahorro Anual</th>
                      <th className="text-center py-4 px-4">Retorno</th>
                    </tr>
                  </thead>
                  <tbody>
                    {procesosAutomatizar.map((proceso, index) => (
                      <tr key={index} className="border-b border-gray-800 hover:bg-white/5 transition-colors">
                        <td className="py-4 px-4 font-semibold text-cyan-400">{proceso.name}</td>
                        <td className="py-4 px-4 text-center text-red-400">{proceso.costoInicial}</td>
                        <td className="py-4 px-4 text-center text-green-400">{proceso.ahorroAnual}</td>
                        <td className="py-4 px-4 text-center text-yellow-400">{proceso.tiempoRetorno}</td>
                      </tr>
                    ))}
                    <tr className="border-t-2 border-cyan-500 font-bold text-lg">
                      <td className="py-4 px-4 text-cyan-300">TOTAL</td>
                      <td className="py-4 px-4 text-center text-red-300">$600B</td>
                      <td className="py-4 px-4 text-center text-green-300">$300B</td>
                      <td className="py-4 px-4 text-center text-yellow-300">2-3 años</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Regional Impact Interactive */}
        <section className="py-24 bg-gradient-to-br from-gray-900 via-blue-900 to-cyan-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 text-white font-semibold mb-6">
                <MapPin className="w-5 h-5" />
                <span>ENFOQUE REGIONAL</span>
              </div>
              
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-8">
                Desarrollo
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"> Territorial</span>
              </h2>
              
              <p className="text-xl text-gray-300 max-w-4xl mx-auto">
                Cada región tendrá un enfoque específico según sus fortalezas y necesidades
              </p>
            </div>

            {/* Region Selector */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {impactoRegional.map((region) => (
                <button
                  key={region.id}
                  onClick={() => setActiveRegion(region.id)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center space-x-2 ${
                    activeRegion === region.id
                      ? 'bg-white text-gray-900 shadow-lg scale-105'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  {region.icon}
                  <span>{region.name}</span>
                </button>
              ))}
            </div>

            {/* Active Region Details */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 overflow-hidden">
              {impactoRegional.map((region) => (
                <div
                  key={region.id}
                  className={`${activeRegion === region.id ? 'block' : 'hidden'}`}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
                    {/* Region Overview */}
                    <div className="text-white space-y-6">
                      <div className="flex items-center space-x-4">
                        <div className="p-4 bg-white/20 rounded-2xl">
                          {region.icon}
                        </div>
                        <div>
                          <h3 className="text-3xl font-black">{region.name}</h3>
                          <p className="text-cyan-200">{region.enfoque}</p>
                        </div>
                      </div>

                      <div className="bg-white/10 rounded-xl p-6">
                        <div className="text-2xl font-black mb-2">{region.poblacion}</div>
                        <div className="text-cyan-200 mb-4">habitantes beneficiados</div>
                        <div className="text-3xl font-black text-green-400">{region.inversion}</div>
                        <div className="text-cyan-200">inversión total</div>
                      </div>

                      <div className="bg-yellow-400/20 border border-yellow-400/30 rounded-xl p-4">
                        <div className="font-bold mb-2 text-yellow-200">Ejemplo ciudadano:</div>
                        <div className="text-yellow-100 text-sm">{region.ejemplo}</div>
                      </div>
                    </div>

                    {/* Benefits Grid */}
                    <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-1 gap-6">
                      {region.beneficios.map((beneficio, idx) => (
                        <div key={idx} className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20">
                          <div className="flex justify-between items-start mb-4">
                            <h4 className="text-xl font-bold text-white">{beneficio.titulo}</h4>
                            <div className="text-2xl font-black text-green-400">{beneficio.monto}</div>
                          </div>
                          <p className="text-gray-300">{beneficio.descripcion}</p>
                          
                          {/* Progress bar simulation */}
                          <div className="mt-4">
                            <div className="w-full bg-white/20 rounded-full h-2">
                              <div 
                                className="bg-gradient-to-r from-green-400 to-blue-400 h-2 rounded-full transition-all duration-1000"
                                style={{ width: `${75 + (idx * 10)}%` }}
                              ></div>
                            </div>
                            <div className="text-xs text-gray-400 mt-1">Proyección de impacto</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Implementation Timeline Interactive */}
        <section className="py-24 bg-gradient-to-br from-blue-50 to-cyan-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 bg-blue-600 rounded-full px-6 py-3 text-white font-semibold mb-6">
                <Clock className="w-5 h-5" />
                <span>ESTRATEGIA DE IMPLEMENTACIÓN</span>
              </div>
              
              <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-8">
                Plan Ejecutivo
                <span className="text-blue-600"> Detallado</span>
              </h2>
            </div>

            {/* Phase Navigation */}
            <div className="flex justify-center space-x-4 mb-12">
              {cronogramaImplementacion.map((fase, index) => (
                <button
                  key={index}
                  onClick={() => setActiveFase(index)}
                  className={`px-6 py-3 rounded-full font-bold transition-all duration-300 ${
                    activeFase === index
                      ? 'bg-blue-600 text-white shadow-lg scale-105'
                      : 'bg-white text-gray-600 hover:bg-blue-50'
                  }`}
                >
                  Fase {index + 1}
                </button>
              ))}
            </div>

            {/* Active Phase Details */}
            <div className="relative">
              {cronogramaImplementacion.map((fase, index) => (
                <div
                  key={index}
                  className={`${activeFase === index ? 'block' : 'hidden'} transition-all duration-500`}
                >
                  <div className={`bg-gradient-to-br ${fase.color} rounded-3xl p-8 text-white shadow-2xl`}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Phase Info */}
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-3xl font-black mb-2">{fase.fase}</h3>
                          <p className="text-xl opacity-90">{fase.duracion}</p>
                        </div>

                        <div className="bg-white/20 backdrop-blur rounded-xl p-6">
                          <div className="text-3xl font-black mb-2">{fase.costo}</div>
                          <div className="opacity-90">Inversión requerida</div>
                        </div>

                        <div className="space-y-3">
                          <h4 className="text-xl font-bold">Objetivos Principales:</h4>
                          {fase.objetivos.map((objetivo, idx) => (
                            <div key={idx} className="flex items-start space-x-3">
                              <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" />
                              <span className="opacity-90">{objetivo}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Timeline */}
                      <div className="space-y-6">
                        <h4 className="text-xl font-bold">Hitos Clave:</h4>
                        <div className="space-y-4">
                          {fase.hitos.map((hito, idx) => (
                            <div key={idx} className="flex items-center space-x-4">
                              <div className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center">
                                <span className="font-bold text-sm">{idx + 1}</span>
                              </div>
                              <div className="bg-white/10 backdrop-blur rounded-lg p-3 flex-1">
                                <span className="opacity-90">{hito}</span>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Progress Indicator */}
                        <div className="bg-white/20 rounded-xl p-4">
                          <div className="flex justify-between text-sm mb-2">
                            <span>Progreso estimado</span>
                            <span>{((index + 1) / cronogramaImplementacion.length * 100).toFixed(0)}%</span>
                          </div>
                          <div className="w-full bg-white/30 rounded-full h-3">
                            <div
                              className="bg-white h-3 rounded-full transition-all duration-1000"
                              style={{ width: `${((index + 1) / cronogramaImplementacion.length * 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Timeline */}
            <div className="mt-16 bg-white rounded-3xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Cronograma Completo</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-4 px-4">Fase</th>
                      <th className="text-center py-4 px-4">Duración</th>
                      <th className="text-center py-4 px-4">Hitos Clave</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cronogramaImplementacion.map((fase, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4 font-semibold text-blue-600">{fase.fase}</td>
                        <td className="py-4 px-4 text-center">{fase.duracion}</td>
                        <td className="py-4 px-4 text-center text-sm text-gray-600">
                          {fase.objetivos[0]}...
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-8 bg-green-100 rounded-xl p-6 border border-green-200">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <div>
                    <div className="font-bold text-green-800">Ejemplo para la ciudadanía:</div>
                    <div className="text-green-700">
                      En 100 días, los temuquenses registrarán nacimientos en línea; 
                      en 2 años, todos usarán notarías digitales desde casa.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Inclusion and Ethics */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 bg-purple-100 rounded-full px-6 py-3 text-purple-800 font-semibold mb-6">
                <Heart className="w-5 h-5" />
                <span>INCLUSIÓN Y ÉTICA</span>
              </div>
              
              <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-8">
                Tecnología para
                <span className="text-purple-600"> Todos</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 border border-purple-100">
                <div className="p-4 bg-purple-600 rounded-2xl w-fit mb-6">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Internet Rural</h3>
                <div className="space-y-4">
                  <div className="text-3xl font-black text-purple-600">$100B</div>
                  <div className="text-gray-600">1,000 puntos de acceso digital</div>
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="font-bold text-purple-600 mb-2">Ejemplo ciudadano:</div>
                    <div className="text-gray-700 text-sm">
                      Una abuela en Magallanes hará trámites desde un punto de internet cercano, 
                      sin viajar a la ciudad.
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-8 border border-blue-100">
                <div className="p-4 bg-blue-600 rounded-2xl w-fit mb-6">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Capacitación Masiva</h3>
                <div className="space-y-4">
                  <div className="text-3xl font-black text-blue-600">100,000</div>
                  <div className="text-gray-600">Ciudadanos formados en tecnología</div>
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="font-bold text-blue-600 mb-2">Beneficio:</div>
                    <div className="text-gray-700 text-sm">
                      Nadie se queda atrás en la transformación digital del Estado.
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 border border-green-100">
                <div className="p-4 bg-green-600 rounded-2xl w-fit mb-6">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Supervisión Ética</h3>
                <div className="space-y-4">
                  <div className="text-2xl font-black text-green-600">Consejo IA</div>
                  <div className="text-gray-600">Supervisión independiente (Minciencia)</div>
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="font-bold text-green-600 mb-2">Garantía:</div>
                    <div className="text-gray-700 text-sm">
                      Uso responsable y transparente de la inteligencia artificial.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Enhanced */}
        <section className="py-24 bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-500">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="space-y-8">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight">
                <span className="block">CHILE DIGITAL</span>
                <span className="block">ES POSIBLE</span>
              </h2>
              
              <p className="text-xl sm:text-2xl text-white/90 max-w-4xl mx-auto">
                Con bases técnicas sólidas, viabilidad económica demostrada y compromiso político real, 
                transformaremos el Estado chileno con beneficios tangibles para todos los ciudadanos.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
                <button 
                  onClick={() => {
                    window.open('mailto:contacto@melinao2026.cl?subject=Apoyo%20Reforma%20IA%20Estado&body=Hola%20Juan%20Pablo,%0A%0AQuiero%20apoyar%20la%20reforma%20de%20Automatizaci\u00f3n%20del%20Estado%20con%20IA.%0A%0AEsta%20propuesta%20integral%20de:%0A\u2022 Ahorro%20de%20$500B%20anuales%0A\u2022 Tr\u00e1mites%20en%205%20minutos%0A\u2022 Estado%20eficiente%2024/7%0A\u2022 Desarrollo%20regional%20equitativo%0A%0AEs%20exactamente%20lo%20que%20Chile%20necesita.%0A%0A\u00bfC\u00f3mo%20puedo%20ayudar%20a%20difundir%20esta%20propuesta%20t\u00e9cnica?%0A%0ASaludos', '_blank');
                  }}
                  className="px-12 py-6 bg-white text-blue-600 font-black text-xl rounded-full hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  APOYAR ESTA REFORMA
                </button>
                
                <button 
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: 'Automatización del Estado con IA - Melinao 2026',
                        text: '🚀 REFORMA ESTRUCTURAL: Estado eficiente con IA, ahorro $500B anuales, trámites en 5 minutos. ¡Chile Digital es posible!',
                        url: window.location.href
                      });
                    } else {
                      navigator.clipboard.writeText(window.location.href).then(() => {
                        alert('🔗 ¡Enlace copiado!\\n\\nComparte esta reforma estructural:\\n\\n\"Automatización del Estado con IA - Estado eficiente, ahorro $500B anuales, trámites en 5 minutos. ¡Chile Digital con Melinao 2026!\"\\n\\n' + window.location.href);
                      });
                    }
                  }}
                  className="px-12 py-6 border-2 border-white text-white font-black text-xl rounded-full hover:bg-white hover:text-blue-600 transition-all duration-300"
                >
                  COMPARTIR PROPUESTA
                </button>
              </div>

              {/* References */}
              <div className="pt-12 border-t border-white/20">
                <div className="text-white/70 text-lg font-semibold mb-6 text-center">Referencias Técnicas y Legales</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-6xl mx-auto">
                  <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/20">
                    <div className="text-white font-semibold mb-2">[1] Ley de Transformación Digital (N° 21.180)</div>
                    <a 
                      href="https://digital.gob.cl/transformacion-digital/ley-de-transformacion-digital/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-300 hover:text-cyan-200 text-sm break-all"
                    >
                      digital.gob.cl/transformacion-digital/ley-de-transformacion-digital/
                    </a>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/20">
                    <div className="text-white font-semibold mb-2">[2] Política Nacional de IA</div>
                    <a 
                      href="https://www.minciencia.gob.cl/areas/inteligencia-artificial/politica-nacional-de-inteligencia-artificial/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-300 hover:text-cyan-200 text-sm break-all"
                    >
                      minciencia.gob.cl/areas/inteligencia-artificial/politica-nacional-de-inteligencia-artificial/
                    </a>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/20">
                    <div className="text-white font-semibold mb-2">[3] ILIA 2024 (CEPAL)</div>
                    <a 
                      href="https://www.cepal.org/es/publicaciones/69126-estrategia-transformacion-digital-chile-digital-2035-plan-conectividad-efectiva"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-300 hover:text-cyan-200 text-sm break-all"
                    >
                      cepal.org/es/publicaciones/69126-estrategia-transformacion-digital-chile-digital-2035
                    </a>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/20">
                    <div className="text-white font-semibold mb-2">[4] Programa de Supercómputo</div>
                    <a 
                      href="https://blog.investchile.gob.cl/chile-impulsa-la-inteligencia-artificial-con-programa-de-supercomputo"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-300 hover:text-cyan-200 text-sm break-all"
                    >
                      blog.investchile.gob.cl/chile-impulsa-la-inteligencia-artificial-con-programa-de-supercomputo
                    </a>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/20">
                    <div className="text-white font-semibold mb-2">[5] Circular de Uso Responsable de IA</div>
                    <a 
                      href="https://minciencia.gob.cl/noticias/gobierno-publica-circular-para-un-uso-responsable-de-la-ia-en-los-servicios-publicos/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-300 hover:text-cyan-200 text-sm break-all"
                    >
                      minciencia.gob.cl/noticias/gobierno-publica-circular-para-un-uso-responsable-de-la-ia
                    </a>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/20">
                    <div className="text-white font-semibold mb-2">[6] Digital Government Review Chile 2020</div>
                    <a 
                      href="https://www.oecd.org/gov/digital-government-review-of-chile-2020.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-300 hover:text-cyan-200 text-sm break-all"
                    >
                      oecd.org/gov/digital-government-review-of-chile-2020.pdf
                    </a>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/20">
                    <div className="text-white font-semibold mb-2">[7] Encuesta Cadem 2025</div>
                    <a 
                      href="https://www.cadem.cl/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-300 hover:text-cyan-200 text-sm break-all"
                    >
                      cadem.cl/
                    </a>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/20">
                    <div className="text-white font-semibold mb-2">[8] INE Chile</div>
                    <a 
                      href="https://www.ine.cl/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-300 hover:text-cyan-200 text-sm break-all"
                    >
                      ine.cl/
                    </a>
                  </div>
                </div>
                
                <div className="text-center mt-8">
                  <div className="text-white/60 text-sm">
                    Propuesta basada en marcos legales existentes y mejores prácticas internacionales
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Calculator Modal */}
        {showCalculator && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Calculadora de Ahorros IA</h3>
                <button 
                  onClick={() => setShowCalculator(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                    <div className="text-2xl font-black text-green-600">$500B</div>
                    <div className="text-sm text-green-700">Ahorro anual total</div>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                    <div className="text-2xl font-black text-blue-600">154M</div>
                    <div className="text-sm text-blue-700">Horas ahorradas/año</div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="font-bold mb-4">Desglose por proceso:</h4>
                  <div className="space-y-3">
                    {procesosAutomatizar.map((proceso, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="font-medium">{proceso.name}</span>
                        <span className="text-green-600 font-bold">{proceso.ahorroAnual}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
                  <div className="font-bold text-yellow-800 mb-2">💡 ¿Qué significa para ti?</div>
                  <div className="text-yellow-700 text-sm">
                    Con estos ahorros, podrías financiar 10 hospitales nuevos, 
                    aumentar pensiones 15%, o reducir impuestos significativamente.
                  </div>
                </div>

                <button 
                  onClick={() => setShowCalculator(false)} 
                  className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-colors"
                >
                  Cerrar Calculadora
                </button>
              </div>
            </div>
          </div>
        )}

        {/* AI Simulator Modal */}
        {showSimulator && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              
              {/* Step 0: Process Selection */}
              {simulatorStep === 0 && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-3xl font-bold">🤖 Simulador IA del Estado</h3>
                    <button 
                      onClick={resetSimulator}
                      className="p-2 hover:bg-gray-100 rounded-full"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <p className="text-gray-600 mb-8 text-lg">
                    Experimenta cómo funcionará el Estado con inteligencia artificial. 
                    Selecciona un trámite para ver la magia en acción:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {procesosAutomatizar.map((proceso) => (
                      <button
                        key={proceso.id}
                        onClick={() => startSimulation(proceso.id)}
                        className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-100 hover:shadow-lg transition-all duration-300 text-left group"
                      >
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="p-3 bg-blue-600 rounded-lg text-white group-hover:scale-110 transition-transform">
                            {proceso.icon}
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900">{proceso.name}</h4>
                            <p className="text-sm text-gray-600">{proceso.tiempoRetorno}</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700">{proceso.descripcion}</p>
                        <div className="mt-4 text-green-600 font-bold">{proceso.ahorroAnual} ahorro anual</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 1: User Data Input */}
              {simulatorStep === 1 && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-3xl font-bold">📝 Datos del Ciudadano</h3>
                    <button 
                      onClick={resetSimulator}
                      className="p-2 hover:bg-gray-100 rounded-full"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="bg-blue-50 rounded-xl p-6 border border-blue-200 mb-8">
                    <h4 className="font-bold text-blue-800 mb-2">
                      Proceso seleccionado: {procesosAutomatizar.find(p => p.id === simulatorData.proceso)?.name}
                    </h4>
                    <p className="text-blue-700">
                      {procesosAutomatizar.find(p => p.id === simulatorData.proceso)?.descripcion}
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre completo
                      </label>
                      <input
                        type="text"
                        value={simulatorData.nombre}
                        onChange={(e) => setSimulatorData({...simulatorData, nombre: e.target.value})}
                        placeholder="Ingresa tu nombre completo"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        RUT (sin puntos ni guión)
                      </label>
                      <input
                        type="text"
                        value={simulatorData.rut}
                        onChange={(e) => setSimulatorData({...simulatorData, rut: e.target.value})}
                        placeholder="12345678"
                        maxLength="8"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tipo de documento a procesar
                      </label>
                      <select
                        value={simulatorData.documento}
                        onChange={(e) => setSimulatorData({...simulatorData, documento: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Selecciona un documento</option>
                        {simulatorData.proceso === 'registro' && (
                          <>
                            <option value="certificado-nacimiento">Certificado de Nacimiento</option>
                            <option value="certificado-matrimonio">Certificado de Matrimonio</option>
                            <option value="certificado-defuncion">Certificado de Defunción</option>
                          </>
                        )}
                        {simulatorData.proceso === 'sii' && (
                          <>
                            <option value="declaracion-renta">Declaración de Renta</option>
                            <option value="inicio-actividades">Inicio de Actividades</option>
                            <option value="facturacion-electronica">Facturación Electrónica</option>
                          </>
                        )}
                        {simulatorData.proceso === 'notarias' && (
                          <>
                            <option value="contrato-arriendo">Contrato de Arriendo</option>
                            <option value="compraventa">Compraventa</option>
                            <option value="poder-notarial">Poder Notarial</option>
                          </>
                        )}
                        {simulatorData.proceso === 'registro-social' && (
                          <>
                            <option value="ficha-social">Actualización Ficha Social</option>
                            <option value="subsidio-habitacional">Subsidio Habitacional</option>
                            <option value="bono-marzo">Bono de Marzo</option>
                          </>
                        )}
                        {simulatorData.proceso === 'salud' && (
                          <>
                            <option value="hora-medica">Solicitud Hora Médica</option>
                            <option value="receta-digital">Receta Digital</option>
                            <option value="interconsulta">Interconsulta Especialista</option>
                          </>
                        )}
                      </select>
                    </div>

                    <div className="flex space-x-4">
                      <button
                        onClick={() => setSimulatorStep(0)}
                        className="flex-1 bg-gray-500 text-white font-bold py-3 rounded-xl hover:bg-gray-600 transition-colors"
                      >
                        Volver
                      </button>
                      <button
                        onClick={processSimulation}
                        disabled={!simulatorData.nombre || !simulatorData.rut || !simulatorData.documento}
                        className="flex-1 bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Procesar con IA
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: AI Processing */}
              {simulatorStep === 2 && (
                <div className="text-center">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-3xl font-bold">🧠 IA Procesando...</h3>
                    <button 
                      onClick={resetSimulator}
                      className="p-2 hover:bg-gray-100 rounded-full"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-12 text-white mb-8">
                    <div className="animate-spin w-16 h-16 border-4 border-white border-t-transparent rounded-full mx-auto mb-6"></div>
                    <h4 className="text-2xl font-bold mb-4">Inteligencia Artificial en Acción</h4>
                    <div className="space-y-3 text-left max-w-md mx-auto">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-300" />
                        <span>Validando identidad con reconocimiento biométrico...</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-300" />
                        <span>Consultando bases de datos gubernamentales...</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-300" />
                        <span>Procesando con algoritmos de machine learning...</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Timer className="w-5 h-5 text-yellow-300 animate-pulse" />
                        <span>Generando documentos con blockchain...</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600">
                    La IA está analizando tu solicitud en tiempo real. 
                    En el Estado actual esto tomaría semanas...
                  </p>
                </div>
              )}

              {/* Step 3: Results */}
              {simulatorStep === 3 && simulatorData.resultado && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-3xl font-bold">🎉 ¡Trámite Completado!</h3>
                    <button 
                      onClick={resetSimulator}
                      className="p-2 hover:bg-gray-100 rounded-full"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="bg-green-50 rounded-xl p-6 border border-green-200 mb-8">
                    <div className="flex items-center space-x-3 mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                      <div>
                        <h4 className="text-xl font-bold text-green-800">
                          Proceso completado exitosamente
                        </h4>
                        <p className="text-green-700">
                          Hola {simulatorData.nombre}, tu trámite ha sido procesado
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-blue-50 rounded-xl p-6 border border-blue-200 text-center">
                      <Timer className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                      <div className="text-2xl font-black text-blue-600">{simulatorData.resultado.tiempo}</div>
                      <div className="text-sm text-blue-700">Tiempo total</div>
                    </div>
                    <div className="bg-green-50 rounded-xl p-6 border border-green-200 text-center">
                      <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-3" />
                      <div className="text-2xl font-black text-green-600">{simulatorData.resultado.ahorro}</div>
                      <div className="text-sm text-green-700">Ahorro vs Estado actual</div>
                    </div>
                    <div className="bg-purple-50 rounded-xl p-6 border border-purple-200 text-center">
                      <FileText className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                      <div className="text-2xl font-black text-purple-600">{simulatorData.resultado.documentos.length}</div>
                      <div className="text-sm text-purple-700">Documentos generados</div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6 mb-8">
                    <h5 className="font-bold text-gray-900 mb-4">📄 Documentos Generados:</h5>
                    <div className="space-y-2">
                      {simulatorData.resultado.documentos.map((doc, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <CheckSquare className="w-5 h-5 text-green-600" />
                          <span className="text-gray-700">{doc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200 mb-8">
                    <h5 className="font-bold text-yellow-800 mb-2">🔥 Siguiente paso automático:</h5>
                    <p className="text-yellow-700">{simulatorData.resultado.siguiente}</p>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={() => setSimulatorStep(0)}
                      className="flex-1 bg-gray-500 text-white font-bold py-3 rounded-xl hover:bg-gray-600 transition-colors"
                    >
                      Probar Otro Trámite
                    </button>
                    <button
                      onClick={() => {
                        alert('🎊 ¡Increíble! Has experimentado el futuro del Estado chileno.\\n\\n✨ Con Melinao 2026, esto será realidad:\\n\\n• Trámites en minutos, no semanas\\n• Ahorro masivo para ciudadanos\\n• Estado eficiente 24/7\\n• Tecnología al servicio de la gente\\n\\n¡Vota por el cambio digital!');
                        resetSimulator();
                      }}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 rounded-xl hover:shadow-lg transition-all duration-300"
                    >
                      ¡Apoyar Esta Visión!
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Consultas Ciudadanas */}
        <div className=\"pb-20 lg:pb-0\">\n          <ConsultasCiudadanas 
          tema="ia" 
          titulo="Mejora la Reforma de Automatización con IA"
          descripcion="¿Qué otros trámites te gustaría automatizar? Tu experiencia nos ayuda a priorizar"
          showStats={true}
        />
        </div>

      </div>
    </SEOWrapper>
  );
};

export default AutomatizacionIA;