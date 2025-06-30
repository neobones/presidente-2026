import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle, Heart, Scale, GraduationCap, Users, TrendingUp, Target, Globe, BookOpen, Award, MapPin, Clock, DollarSign, AlertTriangle, Home, Play, Calculator, X, Timer, CheckSquare, FileText, Building, TreePine, Banknote, Receipt, UserX, Handshake, School, Baby, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOWrapper from '../components/SEOWrapper';
import ConsultasCiudadanas from '../components/ConsultasCiudadanas';
import { seoConfigs } from '../data/seoConfigs';

const JusticiaSocial = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState('deuda-historica');
  const [activeRegion, setActiveRegion] = useState('araucania');
  const [activeFase, setActiveFase] = useState(0);
  const [showCalculator, setShowCalculator] = useState(false);
  const [showSimulator, setShowSimulator] = useState(false);
  const [simulatorStep, setSimulatorStep] = useState(0);
  const [simulatorData, setSimulatorData] = useState({
    tipoProfesor: '',
    añosServicio: '',
    region: '',
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

  // Datos basados en el contenido de la reforma
  const keyStats = [
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: "57,000",
      subtitle: "profesores beneficiados",
      description: "$4.5 millones cada uno",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "$900K",
      subtitle: "sueldo docente",
      description: "Para 200,000 profesores activos",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <UserX className="w-8 h-8" />,
      title: "$1.5B",
      subtitle: "ahorro anual",
      description: "Eliminando sueldos vitalicios",
      color: "from-red-500 to-orange-500"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "65%",
      subtitle: "rechaza privilegios",
      description: "Cadem 2025 - Demanda ciudadana",
      color: "from-blue-500 to-cyan-500"
    }
  ];

  const medidasJusticia = [
    {
      id: 'deuda-historica',
      name: 'Deuda Histórica',
      icon: <GraduationCap className="w-12 h-12" />,
      inversion: '$256.5B',
      beneficio: '57,000 profesores',
      plazo: '2025-2031',
      descripcion: '$4.5 millones por docente, priorizando jubilados',
      detalles: [
        'Pago de $4.5 millones a cada uno de los 57,000 docentes',
        'Prioridad a profesores jubilados y mayores de edad',
        'Transferencia directa vía ChileAtiende digitalizado',
        'Cronograma transparente publicado en chiledigno.cl'
      ],
      ejemplo: 'Un profesor jubilado en Temuco recibirá $4.5 millones para complementar su pensión'
    },
    {
      id: 'sueldo-docente',
      name: 'Sueldo Docente Digno',
      icon: <School className="w-12 h-12" />,
      inversion: '$600B',
      beneficio: '200,000 docentes activos',
      plazo: 'Anual',
      descripcion: 'Sueldo base $900,000 + bonos rurales',
      detalles: [
        'Sueldo base $900,000 para todos los docentes del país',
        'Bonos adicionales $100,000 para zonas rurales/vulnerables',
        'Capacitación continua y desarrollo profesional',
        'Reconocimiento especial docentes mapuche y interculturales'
      ],
      ejemplo: 'Una profesora en una escuela rural de Magallanes ganará $1 millón mensual'
    },
    {
      id: 'privilegios',
      name: 'Fin de Privilegios',
      icon: <UserX className="w-12 h-12" />,
      inversion: '$50B',
      beneficio: 'Ahorro $1.5B anual',
      plazo: 'Gradual 5 años',
      descripcion: 'Eliminación sueldos vitalicios ex presidentes/parlamentarios',
      detalles: [
        'Reducción gradual sueldos vitalicios de $16M a $0',
        'Fondo de transición laboral para ex políticos',
        'Transparencia total: publicar todos los privilegios',
        'Reinversión 100% en programas sociales'
      ],
      ejemplo: 'Los $16 millones mensuales de ex presidentes financiarán 16 becas universitarias'
    },
    {
      id: 'programas-sociales',
      name: 'Programas Sociales',
      icon: <Heart className="w-12 h-12" />,
      inversion: '$100B',
      beneficio: 'Zonas vulnerables',
      plazo: 'Permanente',
      descripcion: 'Reinversión ahorros en salud y educación',
      detalles: [
        'Hospitales y consultorios en comunas vulnerables',
        'Jardines infantiles en zonas rurales',
        'Programas alimentarios escolares mejorados',
        'Infraestructura educativa digna en todas las regiones'
      ],
      ejemplo: 'Los ahorros de privilegios construirán un hospital en La Pintana'
    }
  ];

  const beneficiosRegionales = [
    {
      id: 'araucania',
      name: 'La Araucanía',
      icon: <TreePine className="w-8 h-8" />,
      poblacion: '957,224',
      inversion: '$50B',
      enfoque: 'Educación Intercultural y Docentes Mapuche',
      medidas: [
        {
          titulo: 'Capacitación Docentes Mapuche',
          monto: '$30B',
          descripcion: '10,000 docentes en educación intercultural'
        },
        {
          titulo: 'Escuelas Interculturales',
          monto: '$15B',
          descripcion: 'Infraestructura que respeta cultura mapuche'
        },
        {
          titulo: 'Programas Comunitarios',
          monto: '$5B',
          descripcion: 'Educación familiar y kimches (sabios)'
        }
      ],
      impacto: '15% mejora calidad educativa, reconocimiento cultural',
      ejemplo: 'Un niño mapuche aprenderá mapudungun y castellano con profesores capacitados'
    },
    {
      id: 'santiago',
      name: 'Santiago',
      icon: <Building className="w-8 h-8" />,
      poblacion: '7,112,808',
      inversion: '$200B',
      enfoque: 'Equidad Educativa en Comunas Vulnerables',
      medidas: [
        {
          titulo: 'Infraestructura Educativa',
          monto: '$120B',
          descripcion: 'Escuelas dignas en La Pintana, Puente Alto'
        },
        {
          titulo: 'Programas Alimentarios',
          monto: '$50B',
          descripcion: 'Desayunos y almuerzos de calidad'
        },
        {
          titulo: 'Tecnología Educativa',
          monto: '$30B',
          descripcion: 'Tablets y internet para todos los estudiantes'
        }
      ],
      impacto: '20% reducción brecha educacional entre comunas',
      ejemplo: 'Un niño en La Pintana tendrá la misma calidad educativa que en Las Condes'
    },
    {
      id: 'antofagasta',
      name: 'Antofagasta',
      icon: <Briefcase className="w-8 h-8" />,
      poblacion: '691,854',
      inversion: '$100B',
      enfoque: 'Salud y Educación Técnica Minera',
      medidas: [
        {
          titulo: 'Hospital Regional',
          monto: '$60B',
          descripcion: 'Reducir listas de espera en 20%'
        },
        {
          titulo: 'Educación Técnica',
          monto: '$25B',
          descripcion: 'Liceos mineros de excelencia'
        },
        {
          titulo: 'Salud Comunitaria',
          monto: '$15B',
          descripcion: 'Consultorios en campamentos mineros'
        }
      ],
      impacto: 'Salud y educación técnica de clase mundial',
      ejemplo: 'Un joven minero estudiará ingeniería en un liceo técnico financiado por esta reforma'
    }
  ];

  const cronogramaImplementacion = [
    {
      fase: 'FASE 1: LANZAMIENTO',
      duracion: 'Primeros 100 días',
      costo: '$50B',
      objetivos: [
        'Iniciar pago deuda histórica profesores más ancianos',
        'Presentar proyecto ley eliminación sueldos vitalicios',
        'Lanzar registro transparente de privilegios políticos'
      ],
      hitos: [
        '30 días: Identificación 57,000 docentes beneficiarios',
        '60 días: Primeros 10,000 pagos $4.5M realizados',
        '100 días: Proyecto ley privilegios en Congreso'
      ],
      color: 'from-purple-500 to-pink-600'
    },
    {
      fase: 'FASE 2: EXPANSIÓN',
      duracion: 'Año 1-2',
      costo: '$300B',
      objetivos: [
        'Completar 30,000 pagos deuda histórica',
        'Implementar sueldo $900K en 50% escuelas',
        'Crear fondo transición para ex políticos'
      ],
      hitos: [
        '6 meses: 20,000 docentes cobran deuda histórica',
        '12 meses: Sueldo $900K en escuelas públicas urbanas',
        '24 meses: Reducción 50% sueldos vitalicios'
      ],
      color: 'from-green-500 to-emerald-600'
    },
    {
      fase: 'FASE 3: CONSOLIDACIÓN',
      duracion: 'Año 3-5',
      costo: '$250B',
      objetivos: [
        'Finalizar todos los pagos deuda histórica',
        'Sueldo $900K universal para docentes',
        'Eliminar completamente sueldos vitalicios'
      ],
      hitos: [
        '36 meses: 50,000 docentes con deuda saldada',
        '48 meses: Sueldo digno 100% docentes país',
        '60 meses: Privilegios políticos eliminados'
      ],
      color: 'from-blue-500 to-cyan-600'
    }
  ];

  const fundamentosLegales = [
    {
      nombre: 'Ley N° 20.903 Carrera Docente',
      descripcion: 'Marco legal desarrollo profesional docente',
      url: 'https://www.bcn.cl/leychile/navegar?idNorma=1087343'
    },
    {
      nombre: 'Constitución Art. 19 N° 11',
      descripcion: 'Derecho a la educación y libertad enseñanza',
      url: 'https://www.bcn.cl/leychile/navegar?idNorma=242302'
    },
    {
      nombre: 'Ley N° 18.834 Estatuto Funcionarios',
      descripcion: 'Derechos y deberes empleados públicos',
      url: 'https://www.bcn.cl/leychile/navegar?idNorma=30210'
    },
    {
      nombre: 'Protocolo Deuda Histórica 2024',
      descripcion: 'Acuerdo gobierno-profesores reparación',
      url: 'https://www.gob.cl/noticias/propuesta-del-gobierno-para-reparar-la-deuda-historica-de-profesores/'
    }
  ];

  // Simulador Functions
  const startSimulation = () => {
    setSimulatorStep(1);
    setShowSimulator(true);
  };

  const processSimulation = () => {
    setSimulatorStep(2);
    setTimeout(() => {
      const resultados = {
        'jubilado-30-rural': {
          deudaHistorica: '$4.500.000',
          cronologia: 'Prioridad máxima - primeros 6 meses',
          sueldoAnterior: '$450.000 pensión',
          sueldoNuevo: '$750.000 con complemento',
          beneficiosAdicionales: 'Bono rural, atención salud preferencial',
          impacto: 'Mejora 67% en ingresos familiares'
        },
        'activo-15-urbano': {
          deudaHistorica: '$4.500.000',
          cronologia: 'Año 1-2 según edad',
          sueldoAnterior: '$650.000',
          sueldoNuevo: '$900.000',
          beneficiosAdicionales: 'Capacitación, desarrollo profesional',
          impacto: 'Mejora 38% salario + pago histórico'
        },
        'activo-20-rural': {
          deudaHistorica: '$4.500.000',
          cronologia: 'Año 1 por antigüedad',
          sueldoAnterior: '$580.000',
          sueldoNuevo: '$1.000.000 (con bono rural)',
          beneficiosAdicionales: 'Bono rural $100K, vivienda docente',
          impacto: 'Mejora 72% + incentivos permanencia'
        }
      };
      
      const key = `${simulatorData.tipoProfesor}-${simulatorData.añosServicio}-${simulatorData.region}`;
      const defaultResult = {
        deudaHistorica: '$4.500.000',
        cronologia: 'Según cronograma establecido',
        sueldoAnterior: 'Sueldo actual',
        sueldoNuevo: '$900.000 mínimo',
        beneficiosAdicionales: 'Desarrollo profesional',
        impacto: 'Mejora significativa calidad de vida'
      };
      
      setSimulatorData({ 
        ...simulatorData, 
        resultado: resultados[key] || defaultResult
      });
      setSimulatorStep(3);
    }, 3000);
  };

  const resetSimulator = () => {
    setSimulatorStep(0);
    setSimulatorData({
      tipoProfesor: '',
      añosServicio: '',
      region: '',
      resultado: null
    });
    setShowSimulator(false);
  };

  return (
    <SEOWrapper seoConfig={seoConfigs.justiciaSocial}>
      <div className="min-h-screen bg-gray-50">
        {/* Header Navigation */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link 
                to="/" 
                className="flex items-center space-x-3 text-gray-900 hover:text-purple-600 transition-colors"
              >
                <Home className="w-6 h-6" />
                <span className="font-bold">Volver al Menú Principal</span>
              </Link>
              
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowSimulator(true)}
                  className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition-colors"
                >
                  <Play className="w-4 h-4" />
                  <span>Simulador Docente</span>
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
        <section className="relative min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-transparent to-pink-500/20"></div>
            <div 
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(168, 85, 247, 0.3) 0%, transparent 70%), radial-gradient(circle at 75% 80%, rgba(236, 72, 153, 0.3) 0%, transparent 70%)',
                transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
              }}
            ></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 flex flex-col justify-center min-h-screen">
            <div className="text-center space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-md rounded-full px-8 py-4 border border-white/20">
                <Scale className="w-6 h-6 text-pink-400" />
                <span className="text-white font-bold text-lg">REFORMA DE JUSTICIA SOCIAL</span>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              </div>

              {/* Main Title */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight">
                <span className="block text-white">JUSTICIA SOCIAL</span>
                <span className="block text-white">REAL</span>
                <span className="block bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  EQUIDAD Y FIN DE PRIVILEGIOS
                </span>
              </h1>

              {/* Enhanced Subtitle */}
              <div className="max-w-5xl mx-auto space-y-4">
                <p className="text-xl sm:text-2xl lg:text-3xl text-gray-200">
                  <span className="font-bold text-white">Plan integral de Juan Pablo Melinao González</span>
                  <br />
                  <span className="text-pink-300">Ingeniero informático, emprendedor mapuche, candidato presidencial independiente</span>
                </p>
                <p className="text-lg sm:text-xl text-gray-300 max-w-4xl mx-auto">
                  Pagamos a profesores, eliminamos privilegios políticos, construimos equidad
                </p>
              </div>

              {/* Key Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                {keyStats.map((stat, index) => (
                  <div 
                    key={index} 
                    className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center hover:bg-white/20 transition-all duration-300 group cursor-pointer"
                    onClick={() => setShowCalculator(true)}
                  >
                    <div className={`inline-flex p-3 rounded-full bg-gradient-to-r ${stat.color} text-white mb-4 group-hover:scale-110 transition-transform`}>
                      {stat.icon}
                    </div>
                    <div className="text-3xl font-black text-white mb-2">{stat.title}</div>
                    <div className="text-sm text-pink-300 font-semibold mb-1">{stat.subtitle}</div>
                    <div className="text-xs text-gray-300">{stat.description}</div>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                <button 
                  onClick={() => {
                    document.getElementById('contexto')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="group px-8 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 text-white font-bold text-lg rounded-full hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3"
                >
                  <span>VER PLAN DE JUSTICIA COMPLETO</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </button>
                
                <button 
                  onClick={() => {
                    setShowCalculator(true);
                  }}
                  className="px-8 py-4 border-2 border-white text-white font-bold text-lg rounded-full hover:bg-white hover:text-gray-900 transition-all duration-300 flex items-center justify-center space-x-3"
                >
                  <Calculator className="w-6 h-6" />
                  <span>CALCULADORA DE BENEFICIOS</span>
                </button>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="flex flex-col items-center space-y-2 text-white">
              <span className="text-sm">Descubre el contexto</span>
              <ArrowRight className="w-6 h-6 rotate-90" />
            </div>
          </div>
        </section>

        {/* Context Section */}
        <section id="contexto" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 bg-purple-100 rounded-full px-6 py-3 text-purple-800 font-semibold mb-6">
                <AlertTriangle className="w-5 h-5" />
                <span>CONTEXTO TÉCNICO, ECONÓMICO Y POLÍTICO</span>
              </div>
              
              <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-8">
                Chile debe saldar 
                <span className="text-purple-600"> deudas históricas</span> y eliminar 
                <span className="text-red-600"> privilegios</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              {/* Situación Actual */}
              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-3xl p-8 border border-red-100">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-red-600 rounded-full">
                    <AlertTriangle className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Deudas Pendientes</h3>
                </div>
                <div className="space-y-4">
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="font-bold text-red-600 mb-1">57,000 profesores</div>
                    <div className="text-gray-700 text-sm">Deuda histórica desde 1981 (Gob.cl 2024)</div>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="font-bold text-orange-600 mb-1">$4.5 millones c/u</div>
                    <div className="text-gray-700 text-sm">Compromiso 2025-2031 pendiente</div>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="font-bold text-red-600 mb-1">Municipalización 1981</div>
                    <div className="text-gray-700 text-sm">Origen deuda no resuelta 43 años</div>
                  </div>
                </div>
              </div>

              {/* Privilegios Políticos */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 border border-purple-100">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-purple-600 rounded-full">
                    <UserX className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Privilegios Excesivos</h3>
                </div>
                <div className="space-y-4">
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="text-3xl font-black text-purple-600 mb-1">$16M</div>
                    <div className="text-gray-700 text-sm">Ex presidentes mensual (El Mostrador)</div>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="text-2xl font-bold text-pink-600 mb-1">$6M</div>
                    <div className="text-gray-700 text-sm">Ex parlamentarios hasta</div>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="font-bold text-red-600 mb-1">65% ciudadanos</div>
                    <div className="text-gray-700 text-sm">Rechazan privilegios (Cadem 2025)</div>
                  </div>
                </div>
              </div>

              {/* Demanda Social */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 border border-green-100">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-green-600 rounded-full">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Demanda Ciudadana</h3>
                </div>
                <div className="space-y-4">
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="font-bold text-green-600 mb-1">70% busca alivio</div>
                    <div className="text-gray-700 text-sm">Económico familias (Cadem 2025)</div>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="font-bold text-blue-600 mb-1">80% quiere estabilidad</div>
                    <div className="text-gray-700 text-sm">Social y económica</div>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="font-bold text-purple-600 mb-1">Justicia Histórica</div>
                    <div className="text-gray-700 text-sm">Para trabajadores vs políticos</div>
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
                    <div className="font-bold text-pink-400 mb-2 group-hover:text-pink-300">{ley.nombre}</div>
                    <div className="text-xs text-gray-400 mb-3">{ley.descripcion}</div>
                    <div className="text-xs text-pink-500 group-hover:text-pink-400">Ver documento →</div>
                  </a>
                ))}
              </div>
              <div className="text-center mt-6">
                <div className="text-gray-400 text-sm">
                  Propuesta fundamentada en legislación chilena vigente y compromisos gubernamentales
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Justice Measures */}
        <section id="medidas" className="py-24 bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 bg-purple-600 rounded-full px-6 py-3 text-white font-semibold mb-6">
                <Scale className="w-5 h-5" />
                <span>MEDIDAS DE JUSTICIA</span>
              </div>
              
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-8">
                Cuatro Acciones
                <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent"> Transformadoras</span>
              </h2>

              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Cada medida combina justicia histórica con eliminación de privilegios para construir un Chile equitativo
              </p>
            </div>

            {/* Interactive Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {medidasJusticia.map((medida) => (
                <button
                  key={medida.id}
                  onClick={() => setActiveTab(medida.id)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center space-x-2 ${
                    activeTab === medida.id
                      ? 'bg-purple-600 text-white shadow-lg scale-105'
                      : 'bg-white text-gray-600 hover:bg-purple-50'
                  }`}
                >
                  <div className="w-6 h-6">{medida.icon}</div>
                  <span>{medida.name}</span>
                </button>
              ))}
            </div>

            {/* Active Measure Details */}
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              {medidasJusticia.map((medida) => (
                <div
                  key={medida.id}
                  className={`${activeTab === medida.id ? 'block' : 'hidden'}`}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/* Info Panel */}
                    <div className="p-12 bg-gradient-to-br from-purple-600 to-pink-500 text-white">
                      <div className="flex items-center space-x-4 mb-6">
                        <div className="p-4 bg-white/20 rounded-2xl">
                          {medida.icon}
                        </div>
                        <div>
                          <h3 className="text-3xl font-black">{medida.name}</h3>
                          <p className="text-pink-100">{medida.descripcion}</p>
                        </div>
                      </div>

                      {/* Metrics */}
                      <div className="grid grid-cols-3 gap-4 mb-8">
                        <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
                          <div className="text-2xl font-black">{medida.inversion}</div>
                          <div className="text-sm text-pink-200">Inversión</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
                          <div className="text-2xl font-black">{medida.beneficio}</div>
                          <div className="text-sm text-pink-200">Beneficio</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
                          <div className="text-2xl font-black">{medida.plazo}</div>
                          <div className="text-sm text-pink-200">Plazo</div>
                        </div>
                      </div>

                      {/* Example */}
                      <div className="bg-yellow-400/20 border border-yellow-400/30 rounded-xl p-6">
                        <div className="flex items-start space-x-3">
                          <div className="p-2 bg-yellow-400 rounded-full">
                            <Users className="w-4 h-4 text-yellow-900" />
                          </div>
                          <div>
                            <div className="font-bold mb-2">Ejemplo para la ciudadanía:</div>
                            <div className="text-yellow-100">{medida.ejemplo}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Benefits Panel */}
                    <div className="p-12 bg-gray-50">
                      <h4 className="text-2xl font-bold text-gray-900 mb-8">Acciones Específicas</h4>
                      <div className="space-y-6">
                        {medida.detalles.map((detalle, idx) => (
                          <div key={idx} className="flex items-start space-x-4">
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                              <CheckCircle className="w-5 h-5 text-green-600" />
                            </div>
                            <div className="text-gray-700">{detalle}</div>
                          </div>
                        ))}
                      </div>

                      {/* Action Button */}
                      <div className="mt-8">
                        <button 
                          onClick={() => startSimulation()}
                          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
                        >
                          <Play className="w-5 h-5" />
                          <span>SIMULAR BENEFICIOS DOCENTE</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Economic Analysis */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 bg-green-100 rounded-full px-6 py-3 text-green-800 font-semibold mb-6">
                <Calculator className="w-5 h-5" />
                <span>ANÁLISIS ECONÓMICO DETALLADO</span>
              </div>
              
              <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-8">
                Inversión Justa,
                <span className="text-green-600"> Financiamiento Sostenible</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
              {/* Investment Breakdown */}
              <div className="space-y-8">
                <h3 className="text-3xl font-bold text-gray-900">Distribución de Inversión</h3>
                <div className="space-y-4">
                  {[
                    { concepto: 'Deuda histórica profesores', monto: '$256.5B', periodo: '2025-2031' },
                    { concepto: 'Sueldo docente $900K', monto: '$600B', periodo: 'Anual' },
                    { concepto: 'Bonos rurales docentes', monto: '$100B', periodo: 'Anual' },
                    { concepto: 'Fondo transición políticos', monto: '$50B', periodo: 'Una vez' }
                  ].map((item, index) => (
                    <div key={index} className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-bold text-gray-900">{item.concepto}</div>
                          <div className="text-sm text-gray-600">{item.periodo}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-black text-purple-600">{item.monto}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Funding Sources */}
              <div className="space-y-8">
                <h3 className="text-3xl font-bold text-gray-900">Fuentes de Financiamiento</h3>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 border border-green-100">
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="text-4xl font-black text-green-600 mb-2">$795B</div>
                      <div className="text-gray-600">Costo total anual</div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                        <div className="text-2xl font-bold text-green-600">$1.5-2T</div>
                        <div className="text-sm text-gray-600">Impuesto sueldos altos</div>
                      </div>
                      <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                        <div className="text-2xl font-bold text-blue-600">$500-800B</div>
                        <div className="text-sm text-gray-600">Formalización arriendos</div>
                      </div>
                      <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                        <div className="text-2xl font-bold text-orange-600">$500B</div>
                        <div className="text-sm text-gray-600">Fondo minero</div>
                      </div>
                      <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                        <div className="text-2xl font-bold text-red-600">$1.5B</div>
                        <div className="text-sm text-gray-600">Ahorro privilegios</div>
                      </div>
                    </div>

                    <div className="bg-yellow-100 rounded-xl p-4 border border-yellow-200">
                      <div className="font-bold text-yellow-800 mb-2">Ejemplo para la ciudadanía:</div>
                      <div className="text-yellow-700 text-sm">
                        Los $16 millones mensuales que recibe un ex presidente financiarán 
                        16 becas universitarias completas para jóvenes de tu comunidad.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cost-Benefit Table */}
            <div className="bg-gray-900 rounded-3xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-8 text-center">Tabla Detallada de Costos y Beneficios</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-4 px-4">Medida</th>
                      <th className="text-center py-4 px-4">Costo</th>
                      <th className="text-center py-4 px-4">Beneficiarios</th>
                      <th className="text-center py-4 px-4">Impacto</th>
                    </tr>
                  </thead>
                  <tbody>
                    {medidasJusticia.map((medida, index) => (
                      <tr key={index} className="border-b border-gray-800 hover:bg-white/5 transition-colors">
                        <td className="py-4 px-4 font-semibold text-pink-400">{medida.name}</td>
                        <td className="py-4 px-4 text-center text-red-400">{medida.inversion}</td>
                        <td className="py-4 px-4 text-center text-green-400">{medida.beneficio}</td>
                        <td className="py-4 px-4 text-center text-yellow-400">{medida.plazo}</td>
                      </tr>
                    ))}
                    <tr className="border-t-2 border-pink-500 font-bold text-lg">
                      <td className="py-4 px-4 text-pink-300">TOTAL</td>
                      <td className="py-4 px-4 text-center text-red-300">$795B</td>
                      <td className="py-4 px-4 text-center text-green-300">257,000+</td>
                      <td className="py-4 px-4 text-center text-yellow-300">Chile Justo</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Regional Impact Interactive */}
        <section className="py-24 bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 text-white font-semibold mb-6">
                <MapPin className="w-5 h-5" />
                <span>IMPACTO REGIONAL</span>
              </div>
              
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-8">
                Justicia
                <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent"> Territorial</span>
              </h2>
              
              <p className="text-xl text-gray-300 max-w-4xl mx-auto">
                Cada región tendrá programas específicos según sus necesidades educativas y sociales
              </p>
            </div>

            {/* Region Selector */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {beneficiosRegionales.map((region) => (
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
              {beneficiosRegionales.map((region) => (
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
                          <p className="text-pink-200">{region.enfoque}</p>
                        </div>
                      </div>

                      <div className="bg-white/10 rounded-xl p-6">
                        <div className="text-2xl font-black mb-2">{region.poblacion}</div>
                        <div className="text-pink-200 mb-4">habitantes beneficiados</div>
                        <div className="text-3xl font-black text-green-400">{region.inversion}</div>
                        <div className="text-pink-200">inversión total</div>
                      </div>

                      <div className="bg-yellow-400/20 border border-yellow-400/30 rounded-xl p-4">
                        <div className="font-bold mb-2 text-yellow-200">Ejemplo ciudadano:</div>
                        <div className="text-yellow-100 text-sm">{region.ejemplo}</div>
                      </div>
                    </div>

                    {/* Benefits Grid */}
                    <div className="lg:col-span-2 grid grid-cols-1 gap-6">
                      {region.medidas.map((medida, idx) => (
                        <div key={idx} className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20">
                          <div className="flex justify-between items-start mb-4">
                            <h4 className="text-xl font-bold text-white">{medida.titulo}</h4>
                            <div className="text-2xl font-black text-green-400">{medida.monto}</div>
                          </div>
                          <p className="text-gray-300 mb-4">{medida.descripcion}</p>
                          
                          {/* Progress bar simulation */}
                          <div className="mt-4">
                            <div className="w-full bg-white/20 rounded-full h-2">
                              <div 
                                className="bg-gradient-to-r from-green-400 to-pink-400 h-2 rounded-full transition-all duration-1000"
                                style={{ width: `${70 + (idx * 15)}%` }}
                              ></div>
                            </div>
                            <div className="text-xs text-gray-400 mt-1">Proyección de impacto</div>
                          </div>
                        </div>
                      ))}
                      
                      {/* Regional Impact Summary */}
                      <div className="bg-gradient-to-r from-green-400/20 to-purple-400/20 rounded-xl p-6 border border-green-400/30">
                        <h4 className="text-xl font-bold text-white mb-2">Impacto Regional Total</h4>
                        <p className="text-green-300 text-lg font-semibold">{region.impacto}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Implementation Timeline */}
        <section className="py-24 bg-gradient-to-br from-blue-50 to-cyan-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 bg-blue-600 rounded-full px-6 py-3 text-white font-semibold mb-6">
                <Clock className="w-5 h-5" />
                <span>CRONOGRAMA DE IMPLEMENTACIÓN</span>
              </div>
              
              <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-8">
                Plan de
                <span className="text-blue-600"> Ejecución</span>
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

            {/* Example Section */}
            <div className="mt-16 bg-white rounded-3xl p-8 shadow-lg">
              <div className="bg-green-100 rounded-xl p-6 border border-green-200">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <div>
                    <div className="font-bold text-green-800">Ejemplo para la ciudadanía:</div>
                    <div className="text-green-700">
                      En 100 días, los profesores más ancianos empezarán a recibir $4.5 millones; 
                      en 2 años, tu hijo tendrá un profesor con sueldo digno de $900 mil.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ethics and Transparency */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 bg-green-100 rounded-full px-6 py-3 text-green-800 font-semibold mb-6">
                <Handshake className="w-5 h-5" />
                <span>TRANSPARENCIA Y ÉTICA</span>
              </div>
              
              <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-8">
                Justicia con
                <span className="text-green-600"> Transparencia Total</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-8 border border-blue-100">
                <div className="p-4 bg-blue-600 rounded-2xl w-fit mb-6">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Registro Público</h3>
                <div className="space-y-4">
                  <div className="text-3xl font-black text-blue-600">chiledigno.cl</div>
                  <div className="text-gray-600">Transparencia total pagos y ahorros</div>
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="font-bold text-blue-600 mb-2">Incluye:</div>
                    <div className="text-gray-700 text-sm">
                      Registro de cada pago a profesores, eliminación de privilegios 
                      y reinversión en programas sociales.
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 border border-purple-100">
                <div className="p-4 bg-purple-600 rounded-2xl w-fit mb-6">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Participación Docente</h3>
                <div className="space-y-4">
                  <div className="text-2xl font-black text-purple-600">Colegio Profesores</div>
                  <div className="text-gray-600">Alianza estratégica implementación</div>
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="font-bold text-purple-600 mb-2">Garantía:</div>
                    <div className="text-gray-700 text-sm">
                      Profesores participan activamente en diseño e implementación 
                      de todos los programas educativos.
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 border border-green-100">
                <div className="p-4 bg-green-600 rounded-2xl w-fit mb-6">
                  <Scale className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Equidad Regional</h3>
                <div className="space-y-4">
                  <div className="text-2xl font-black text-green-600">Prioridad</div>
                  <div className="text-gray-600">Docentes rurales y mapuche</div>
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="font-bold text-green-600 mb-2">Compromiso:</div>
                    <div className="text-gray-700 text-sm">
                      Bonos especiales para zonas vulnerables y reconocimiento 
                      específico a la educación intercultural.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Enhanced */}
        <section className="py-24 bg-gradient-to-br from-purple-600 via-pink-600 to-cyan-500">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="space-y-8">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight">
                <span className="block">CHILE JUSTO</span>
                <span className="block">ES POSIBLE</span>
              </h2>
              
              <p className="text-xl sm:text-2xl text-white/90 max-w-4xl mx-auto">
                Con justicia histórica para profesores, eliminación de privilegios políticos 
                y transparencia total, transformaremos Chile en el país equitativo que 
                merecen todos los trabajadores, donde la educación sea valorada y respetada.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
                <button 
                  onClick={() => {
                    window.open('mailto:contacto@chiledigno.cl?subject=Apoyo%20Justicia%20Social&body=Hola%20Juan%20Pablo,%0A%0AQuiero%20apoyar%20la%20reforma%20de%20Justicia%20Social.%0A%0AEsta%20propuesta%20integral%20de:%0A\u2022 $4.5%20millones%20a%2057,000%20profesores%0A\u2022 Sueldo%20docente%20$900K%0A\u2022 Eliminaci\u00f3n%20sueldos%20vitalicios%0A\u2022 Transparencia%20total%20chiledigno.cl%0A%0AEs%20exactamente%20la%20justicia%20que%20Chile%20necesita.%0A%0A\u00bfC\u00f3mo%20puedo%20ayudar%20a%20difundir%20esta%20propuesta?%0A%0ASaludos', '_blank');
                  }}
                  className="px-12 py-6 bg-white text-purple-600 font-black text-xl rounded-full hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  APOYAR JUSTICIA SOCIAL
                </button>
                
                <button 
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: 'Justicia Social - Equidad y Fin Privilegios Melinao 2026',
                        text: '⚖️ JUSTICIA SOCIAL: $4.5M a 57,000 profesores, sueldo docente $900K, fin privilegios políticos. ¡Chile justo para trabajadores!',
                        url: window.location.href
                      });
                    } else {
                      navigator.clipboard.writeText(window.location.href).then(() => {
                        alert('🔗 ¡Enlace copiado!\\n\\nComparte esta reforma de justicia:\\n\\n\"Justicia Social: $4.5 millones a profesores, eliminación privilegios políticos. Chile justo con Melinao 2026!\"\\n\\n' + window.location.href);
                      });
                    }
                  }}
                  className="px-12 py-6 border-2 border-white text-white font-black text-xl rounded-full hover:bg-white hover:text-purple-600 transition-all duration-300"
                >
                  COMPARTIR PROPUESTA
                </button>
              </div>

              {/* References */}
              <div className="pt-12 border-t border-white/20">
                <div className="text-white/70 text-lg font-semibold mb-6 text-center">Referencias Técnicas y Legales</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-6xl mx-auto">
                  <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/20">
                    <div className="text-white font-semibold mb-2">[1] Cadem 2025 - Encuesta Plaza Pública</div>
                    <a 
                      href="https://www.cadem.cl/encuestas/encuesta-plaza-publica-cadem-2da-semana-de-enero-2025/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink-300 hover:text-pink-200 text-sm break-all"
                    >
                      cadem.cl/encuestas/encuesta-plaza-publica-cadem-2da-semana-de-enero-2025/
                    </a>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/20">
                    <div className="text-white font-semibold mb-2">[2] Gob.cl 2024 - Propuesta Deuda Histórica</div>
                    <a 
                      href="https://www.gob.cl/noticias/propuesta-del-gobierno-para-reparar-la-deuda-historica-de-profesores/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink-300 hover:text-pink-200 text-sm break-all"
                    >
                      gob.cl/noticias/propuesta-del-gobierno-para-reparar-la-deuda-historica-de-profesores/
                    </a>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/20">
                    <div className="text-white font-semibold mb-2">[3] El Mostrador 2023 - Sueldos Vitalicios</div>
                    <a 
                      href="https://www.elmostrador.cl/noticias/pais/2023/05/15/pensiones-de-expresidentes-y-parlamentarios-un-costo-fiscal-controversial/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink-300 hover:text-pink-200 text-sm break-all"
                    >
                      elmostrador.cl/noticias/pais/2023/05/15/pensiones-de-expresidentes-y-parlamentarios
                    </a>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/20">
                    <div className="text-white font-semibold mb-2">[4] INE 2022 - Estadísticas Mercado Laboral</div>
                    <a 
                      href="https://www.ine.cl/estadisticas/sociales/mercado-laboral/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink-300 hover:text-pink-200 text-sm break-all"
                    >
                      ine.cl/estadisticas/sociales/mercado-laboral/
                    </a>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/20">
                    <div className="text-white font-semibold mb-2">[5] CASEN 2022 - Distribución Ingresos</div>
                    <a 
                      href="https://www.ine.cl/estadisticas/sociales/ingresos-y-gastos/casen"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink-300 hover:text-pink-200 text-sm break-all"
                    >
                      ine.cl/estadisticas/sociales/ingresos-y-gastos/casen
                    </a>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/20">
                    <div className="text-white font-semibold mb-2">[6] SII 2023 - Datos Tributarios</div>
                    <a 
                      href="https://www.sii.cl/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink-300 hover:text-pink-200 text-sm break-all"
                    >
                      sii.cl/
                    </a>
                  </div>
                </div>
                
                <div className="text-center mt-8">
                  <div className="text-white/60 text-sm">
                    Propuesta basada en legislación chilena vigente, acuerdos gubernamentales y demanda ciudadana real
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
                <h3 className="text-2xl font-bold">Calculadora de Beneficios Justicia Social</h3>
                <button 
                  onClick={() => setShowCalculator(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                    <div className="text-2xl font-black text-purple-600">57,000</div>
                    <div className="text-sm text-purple-700">Profesores beneficiados</div>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                    <div className="text-2xl font-black text-green-600">$4.5M</div>
                    <div className="text-sm text-green-700">Por cada profesor</div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="font-bold mb-4">Inversión por medida:</h4>
                  <div className="space-y-3">
                    {medidasJusticia.map((medida, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="font-medium">{medida.name}</span>
                        <span className="text-purple-600 font-bold">{medida.inversion}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                  <div className="font-bold text-blue-800 mb-2">💡 ¿Qué significa para ti?</div>
                  <div className="text-blue-700 text-sm">
                    Tu profesor recibirá justicia histórica, tus hijos tendrán educación de calidad 
                    con docentes dignamente remunerados, y los privilegios políticos se eliminarán 
                    para financiar programas sociales en tu comunidad.
                  </div>
                </div>

                <button 
                  onClick={() => setShowCalculator(false)} 
                  className="w-full bg-purple-600 text-white font-bold py-3 rounded-xl hover:bg-purple-700 transition-colors"
                >
                  Cerrar Calculadora
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Teacher Benefits Simulator Modal */}
        {showSimulator && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              
              {/* Step 0: Teacher Profile Selection */}
              {simulatorStep === 0 && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-3xl font-bold">🎓 Simulador Beneficios Docente</h3>
                    <button 
                      onClick={resetSimulator}
                      className="p-2 hover:bg-gray-100 rounded-full"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <p className="text-gray-600 mb-8 text-lg">
                    Descubre cuánto recibirás con la reforma de justicia social. 
                    Selecciona tu perfil docente para ver tus beneficios específicos:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { tipo: 'Profesor jubilado', años: '30+ años', región: 'Rural', descripción: 'Pensionado, zona rural', color: 'from-purple-50 to-pink-50 border-purple-100' },
                      { tipo: 'Profesor activo', años: '15 años', región: 'Urbano', descripción: 'En ejercicio, ciudad', color: 'from-blue-50 to-cyan-50 border-blue-100' },
                      { tipo: 'Profesor activo', años: '20+ años', región: 'Rural', descripción: 'En ejercicio, zona rural', color: 'from-green-50 to-emerald-50 border-green-100' }
                    ].map((perfil, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setSimulatorData({
                            tipoProfesor: perfil.tipo === 'Profesor jubilado' ? 'jubilado' : 'activo',
                            añosServicio: perfil.años.includes('30') ? '30' : perfil.años.includes('20') ? '20' : '15',
                            region: perfil.región.toLowerCase(),
                            resultado: null
                          });
                          setSimulatorStep(1);
                        }}
                        className={`p-6 bg-gradient-to-br ${perfil.color} rounded-xl border hover:shadow-lg transition-all duration-300 text-left group`}
                      >
                        <div className="text-2xl mb-4">
                          {perfil.tipo === 'Profesor jubilado' ? '👴' : '👨‍🏫'}
                        </div>
                        <h4 className="font-bold text-gray-900 mb-2">{perfil.tipo}</h4>
                        <p className="text-sm text-gray-700 mb-1">{perfil.años} servicio</p>
                        <p className="text-sm text-gray-700 mb-3">{perfil.descripción}</p>
                        <div className="text-sm text-purple-600 font-medium">Ver mis beneficios →</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 1: Processing */}
              {simulatorStep === 1 && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-3xl font-bold">📊 Calculando Beneficios</h3>
                    <button 
                      onClick={resetSimulator}
                      className="p-2 hover:bg-gray-100 rounded-full"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="bg-purple-50 rounded-xl p-6 border border-purple-200 mb-8">
                    <h4 className="font-bold text-purple-800 mb-2">
                      Analizando perfil: {simulatorData.tipoProfesor} - {simulatorData.añosServicio} años - Zona {simulatorData.region}
                    </h4>
                    <p className="text-purple-700">
                      Calculando deuda histórica, nuevo sueldo y beneficios adicionales...
                    </p>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={() => setSimulatorStep(0)}
                      className="flex-1 bg-gray-500 text-white font-bold py-3 rounded-xl hover:bg-gray-600 transition-colors"
                    >
                      Cambiar Perfil
                    </button>
                    <button
                      onClick={processSimulation}
                      className="flex-1 bg-purple-600 text-white font-bold py-3 rounded-xl hover:bg-purple-700 transition-colors"
                    >
                      Calcular Mis Beneficios
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Processing Animation */}
              {simulatorStep === 2 && (
                <div className="text-center">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-3xl font-bold">🧮 Calculando...</h3>
                    <button 
                      onClick={resetSimulator}
                      className="p-2 hover:bg-gray-100 rounded-full"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-12 text-white mb-8">
                    <div className="animate-spin w-16 h-16 border-4 border-white border-t-transparent rounded-full mx-auto mb-6"></div>
                    <h4 className="text-2xl font-bold mb-4">Sistema de Justicia Social Procesando</h4>
                    <div className="space-y-3 text-left max-w-md mx-auto">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-300" />
                        <span>Calculando deuda histórica personal...</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-300" />
                        <span>Determinando nuevo sueldo digno...</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-300" />
                        <span>Evaluando bonos regionales...</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Timer className="w-5 h-5 text-yellow-300 animate-pulse" />
                        <span>Generando cronograma de pagos...</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600">
                    Procesando tu perfil docente para determinar todos los beneficios 
                    que recibirás con la reforma de justicia social...
                  </p>
                </div>
              )}

              {/* Step 3: Results */}
              {simulatorStep === 3 && simulatorData.resultado && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-3xl font-bold">🎉 ¡Tus Beneficios Calculados!</h3>
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
                          Beneficios confirmados para tu perfil docente
                        </h4>
                        <p className="text-green-700">
                          Justicia social real para educadores chilenos
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                      <GraduationCap className="w-8 h-8 text-purple-600 mb-3" />
                      <div className="text-2xl font-black text-purple-600">{simulatorData.resultado.deudaHistorica}</div>
                      <div className="text-sm text-purple-700">Deuda histórica total</div>
                      <div className="text-xs text-gray-600 mt-2">{simulatorData.resultado.cronologia}</div>
                    </div>
                    <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                      <DollarSign className="w-8 h-8 text-green-600 mb-3" />
                      <div className="text-lg font-black text-green-600">{simulatorData.resultado.sueldoNuevo}</div>
                      <div className="text-sm text-green-700">Nuevo sueldo mensual</div>
                      <div className="text-xs text-gray-600 mt-2">Antes: {simulatorData.resultado.sueldoAnterior}</div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6 mb-8">
                    <h5 className="font-bold text-gray-900 mb-4">📋 Beneficios Adicionales:</h5>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <CheckSquare className="w-5 h-5 text-green-600" />
                        <span className="text-gray-700">{simulatorData.resultado.beneficiosAdicionales}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckSquare className="w-5 h-5 text-green-600" />
                        <span className="text-gray-700">Registro transparente en chiledigno.cl</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckSquare className="w-5 h-5 text-green-600" />
                        <span className="text-gray-700">Participación en diseño programas educativos</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200 mb-8">
                    <h5 className="font-bold text-yellow-800 mb-2">📈 Impacto en tu vida:</h5>
                    <p className="text-yellow-700">{simulatorData.resultado.impacto}</p>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={() => setSimulatorStep(0)}
                      className="flex-1 bg-gray-500 text-white font-bold py-3 rounded-xl hover:bg-gray-600 transition-colors"
                    >
                      Probar Otro Perfil
                    </button>
                    <button
                      onClick={() => {
                        alert('🎊 ¡Increíble! Has visto la justicia que recibirás.\\n\\n✨ Con Justicia Social de Melinao 2026:\\n\\n• $4.5 millones deuda histórica\\n• Sueldo docente $900K digno\\n• Fin privilegios políticos\\n• Transparencia total\\n\\n¡Vota por la justicia que mereces!');
                        resetSimulator();
                      }}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 rounded-xl hover:shadow-lg transition-all duration-300"
                    >
                      ¡Apoyar Esta Justicia!
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Consultas Ciudadanas */}
        <ConsultasCiudadanas 
          tema="justicia" 
          titulo="Mejora la Reforma de Justicia Social"
          descripcion="¿Qué otros aspectos de equidad social consideras importantes? Tu experiencia fortalece nuestra propuesta"
          showStats={true}
        />

      </div>
    </SEOWrapper>
  );
};

export default JusticiaSocial;