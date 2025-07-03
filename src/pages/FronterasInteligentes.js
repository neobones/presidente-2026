import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle, Shield, Zap, Users, TrendingUp, Target, Globe, Camera, Satellite, Drone, MapPin, Clock, DollarSign, AlertTriangle, Heart, Home, Play, Calculator, X, Timer, CheckSquare, FileText, Building, Mountain, TreePine, Crosshair, Radio, Eye, UserCheck, Scale, Handshake } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOWrapper from '../components/SEOWrapper';
import ConsultasCiudadanas from '../components/ConsultasCiudadanas';
import { seoConfigs } from '../data/seoConfigs';

const FronterasInteligentes = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState('fronteras');
  const [activeRegion, setActiveRegion] = useState('arica');
  const [activeFase, setActiveFase] = useState(0);
  const [showCalculator, setShowCalculator] = useState(false);
  const [showSimulator, setShowSimulator] = useState(false);
  const [simulatorStep, setSimulatorStep] = useState(0);
  const [simulatorData, setSimulatorData] = useState({
    region: '',
    tipoIncidente: '',
    severidad: '',
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
      icon: <Drone className="w-8 h-8" />,
      title: "50%",
      subtitle: "reducción migración ilegal",
      description: "En 2 años con tecnología",
      color: "from-red-500 to-orange-500"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "20%",
      subtitle: "menos delitos violentos",
      description: "En 3 años con prevención",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "$650B",
      subtitle: "inversión total",
      description: "Financiada con superávit",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "90%",
      subtitle: "percibe inseguridad",
      description: "ENUSC 2022 - Necesidad urgente",
      color: "from-purple-500 to-pink-500"
    }
  ];

  const medidasSeguridad = [
    {
      id: 'fronteras',
      name: 'Vigilancia Fronteriza',
      icon: <Drone className="w-12 h-12" />,
      inversion: '$200B',
      beneficio: '50% menos migración ilegal',
      cobertura: '4,329 km fronteras',
      descripcion: 'Drones, satélites y centros de monitoreo 24/7',
      detalles: [
        'Drones de vigilancia en Arica, Tarapacá y Antofagasta',
        'Cámaras satelitales con visión nocturna térmica',
        'Centros de control integrados con FFAA',
        'Comunicación en tiempo real con Bolivia y Perú'
      ],
      ejemplo: 'Un drone detecta cruce ilegal en el desierto y alerta a Carabineros en tiempo real'
    },
    {
      id: 'centros',
      name: 'Centros Humanitarios',
      icon: <Heart className="w-12 h-12" />,
      inversion: '$50B',
      beneficio: 'Dignidad en migración',
      cobertura: '5 centros regionales',
      descripcion: 'Instalaciones dignas para procesos migratorios',
      detalles: [
        'Atención médica y psicológica básica',
        'Instalaciones familiares separadas',
        'Procesos administrativos expeditos',
        'Deportación humanitaria cumpliendo DDHH'
      ],
      ejemplo: 'Una familia migrante recibe atención médica mientras se procesa su situación legal'
    },
    {
      id: 'prevencion',
      name: 'Prevención Social',
      icon: <Users className="w-12 h-12" />,
      inversion: '$100B',
      beneficio: '15% menos delincuencia juvenil',
      cobertura: 'Zonas vulnerables',
      descripcion: 'Programas sociales en comunidades de riesgo',
      detalles: [
        'Capacitación laboral para jóvenes en riesgo',
        'Programas deportivos y culturales',
        'Becas educativas en regiones vulnerables',
        'Diálogo comunitario con líderes locales'
      ],
      ejemplo: 'Un joven en Iquique aprende programación en lugar de caer en redes criminales'
    },
    {
      id: 'policial',
      name: 'Fortalecimiento Policial',
      icon: <Shield className="w-12 h-12" />,
      inversion: '$300B',
      beneficio: '20% más efectividad',
      cobertura: 'Nacional',
      descripcion: 'Recursos y tecnología para Carabineros y PDI',
      detalles: [
        'Unidades especializadas anticriminalidad',
        'Tecnología IA para predicción delictual',
        'Mejores sueldos y equipamiento policial',
        'Tribunales especializados para delitos menores'
      ],
      ejemplo: 'La IA predice un asalto en Las Condes y despliega patrullas preventivamente'
    }
  ];

  const beneficiosRegionales = [
    {
      id: 'arica',
      name: 'Arica y Parinacota',
      icon: <Mountain className="w-8 h-8" />,
      poblacion: '226,068',
      inversion: '$100B',
      enfoque: 'Primera Línea de Defensa Fronteriza',
      medidas: [
        {
          titulo: 'Centro Control Fronterizo',
          monto: '$60B',
          descripcion: 'Hub tecnológico vigilancia con Bolivia'
        },
        {
          titulo: 'Centro Humanitario Principal',
          monto: '$25B',
          descripcion: 'Instalación modelo para migrantes'
        },
        {
          titulo: 'Programas Comunitarios',
          monto: '$15B',
          descripcion: 'Prevención en barrios fronterizos'
        }
      ],
      impacto: '70% reducción cruces ilegales frontera Bolivia',
      ejemplo: 'Una abuela ariqueña camina tranquila sabiendo que la frontera está protegida'
    },
    {
      id: 'araucania',
      name: 'La Araucanía',
      icon: <TreePine className="w-8 h-8" />,
      poblacion: '957,224',
      inversion: '$50B',
      enfoque: 'Prevención Social y Diálogo Intercultural',
      medidas: [
        {
          titulo: 'Programas Juventud Mapuche',
          monto: '$30B',
          descripcion: '5,000 jóvenes en capacitación laboral'
        },
        {
          titulo: 'Diálogo Comunitario',
          monto: '$10B',
          descripcion: 'Mesa permanente seguridad intercultural'
        },
        {
          titulo: 'Tecnología Preventiva',
          monto: '$10B',
          descripcion: 'Cámaras comunitarias consensuadas'
        }
      ],
      impacto: '15% reducción delitos juveniles, mayor confianza',
      ejemplo: 'Un joven mapuche aprende ciberseguridad financiado por esta reforma'
    },
    {
      id: 'antofagasta',
      name: 'Antofagasta',
      icon: <Building className="w-8 h-8" />,
      poblacion: '691,854',
      inversion: '$100B',
      enfoque: 'Vigilancia Tecnológica Desierto',
      medidas: [
        {
          titulo: 'Red Drones Desierto',
          monto: '$70B',
          descripcion: 'Vigilancia 24/7 rutas del desierto'
        },
        {
          titulo: 'Centro Regional IA',
          monto: '$20B',
          descripcion: 'Análisis predictivo criminal'
        },
        {
          titulo: 'Fortalecimiento PDI',
          monto: '$10B',
          descripcion: 'Unidad especializada crimen organizado'
        }
      ],
      impacto: '50% reducción contrabando y tráfico',
      ejemplo: 'Un minero trabaja seguro sabiendo que el Tren de Aragua no opera en la región'
    }
  ];

  const cronogramaImplementacion = [
    {
      fase: 'FASE 1: LANZAMIENTO',
      duracion: 'Primeros 100 días',
      costo: '$100B',
      objetivos: [
        'Establecer base tecnológica y legal',
        'Implementar drones en Arica y Tarapacá',
        'Lanzar programas sociales piloto en Araucanía'
      ],
      hitos: [
        '30 días: Proyecto de ley penas más duras',
        '60 días: Primeros drones operativos',
        '100 días: Centros humanitarios funcionando'
      ],
      color: 'from-red-500 to-orange-600'
    },
    {
      fase: 'FASE 2: EXPANSIÓN',
      duracion: 'Año 1-2',
      costo: '$300B',
      objetivos: [
        'Escalar vigilancia y prevención',
        'Extender tecnología a Antofagasta y Atacama',
        'Crear tribunales especializados'
      ],
      hitos: [
        '6 meses: Cobertura 70% fronteras norte',
        '12 meses: Programas sociales Santiago-Valparaíso',
        '24 meses: 15% reducción delitos violentos'
      ],
      color: 'from-blue-500 to-cyan-600'
    },
    {
      fase: 'FASE 3: CONSOLIDACIÓN',
      duracion: 'Año 3-5',
      costo: '$250B',
      objetivos: [
        'Alcanzar seguridad integral',
        'Integrar IA para predicción criminal',
        'Establecer acuerdos permanentes Bolivia-Perú'
      ],
      hitos: [
        '36 meses: IA predictiva nacional',
        '48 meses: Acuerdos internacionales',
        '60 meses: 20% reducción delitos, 50% migración ilegal'
      ],
      color: 'from-purple-500 to-pink-600'
    }
  ];

  const fundamentosLegales = [
    {
      nombre: 'Constitución Política Art. 102',
      descripcion: 'Ministerio del Interior, orden público y seguridad',
      url: 'https://www.bcn.cl/leychile/navegar?idNorma=242302'
    },
    {
      nombre: 'Ley N° 18.314 Seguridad del Estado',
      descripcion: 'Medidas de control del orden público',
      url: 'https://www.bcn.cl/leychile/navegar?idNorma=29731'
    },
    {
      nombre: 'Ley N° 20.000 Drogas',
      descripcion: 'Sanciones y procedimientos contra tráfico',
      url: 'https://www.bcn.cl/leychile/navegar?idNorma=235507'
    },
    {
      nombre: 'DL N° 1.094 Extranjería',
      descripcion: 'Control migración y procedimientos',
      url: 'https://www.bcn.cl/leychile/navegar?idNorma=6483'
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
        'arica-contrabando-alta': {
          tiempo: '3 minutos 45 segundos',
          tecnologia: 'Drone térmico + Satélite + IA',
          accion: 'Interceptación exitosa en frontera',
          detenidos: '5 contrabandistas',
          incautado: '$50 millones mercancía ilegal',
          siguiente: 'Proceso judicial expedito en tribunal especializado'
        },
        'temuco-delito-media': {
          tiempo: '8 minutos 20 segundos',
          tecnologia: 'IA predictiva + Cámaras + GPS',
          accion: 'Prevención exitosa robo vehicular',
          prevenidos: 'Familia protegida',
          ahorro: '$15 millones vehículo no robado',
          siguiente: 'Patrulla comunitaria reforzada en la zona'
        },
        'iquique-migracion-alta': {
          tiempo: '15 minutos 30 segundos',
          tecnologia: 'Drones nocturnos + Sensores + Centro control',
          accion: 'Detección y atención humanitaria',
          atendidos: '12 migrantes en situación vulnerable',
          proceso: 'Centro humanitario con dignidad',
          siguiente: 'Evaluación legal y deportación según protocolo'
        }
      };
      
      const key = `${simulatorData.region}-${simulatorData.tipoIncidente}-${simulatorData.severidad}`;
      const defaultResult = {
        tiempo: '5 minutos 15 segundos',
        tecnologia: 'Sistema integrado IA + Vigilancia',
        accion: 'Respuesta coordinada exitosa',
        resultado: 'Situación controlada eficientemente',
        ahorro: 'Recursos optimizados',
        siguiente: 'Seguimiento preventivo activado'
      };
      
      setSimulatorData({ 
        ...simulatorData, 
        resultado: resultados[key] || defaultResult
      });
      setSimulatorStep(3);
    }, 4000);
  };

  const resetSimulator = () => {
    setSimulatorStep(0);
    setSimulatorData({
      region: '',
      tipoIncidente: '',
      severidad: '',
      resultado: null
    });
    setShowSimulator(false);
  };

  return (
    <SEOWrapper seoConfig={seoConfigs.fronterasInteligentes}>
      <div className="min-h-screen bg-gray-50">
        {/* Header Navigation - Mobile Optimized */}
        <header className="hidden lg:block fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-14 lg:h-16">
              <Link 
                to="/" 
                className="flex items-center space-x-2 lg:space-x-3 text-gray-900 hover:text-red-600 transition-colors"
              >
                <Home className="w-5 h-5 lg:w-6 lg:h-6" />
                <span className="font-bold text-sm lg:text-base">Volver al Menú Principal</span>
              </Link>
              
              <div className="flex items-center space-x-2 lg:space-x-4">
                <button
                  onClick={() => setShowSimulator(true)}
                  className="flex items-center space-x-1 lg:space-x-2 bg-red-600 text-white px-3 lg:px-4 py-2 rounded-full hover:bg-red-700 transition-colors text-xs lg:text-sm"
                >
                  <Play className="w-4 h-4" />
                  <span className="hidden sm:inline">Simulador Seguridad</span>
                  <span className="sm:hidden">Simular</span>
                </button>
                
                <button
                  onClick={() => setShowCalculator(true)}
                  className="flex items-center space-x-1 lg:space-x-2 bg-green-600 text-white px-3 lg:px-4 py-2 rounded-full hover:bg-green-700 transition-colors text-xs lg:text-sm"
                >
                  <Calculator className="w-4 h-4" />
                  <span className="hidden sm:inline">Calculadora</span>
                  <span className="sm:hidden">Calc</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section Enhanced - Mobile Optimized */}
        <section className="relative min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-orange-900 overflow-hidden pt-14 lg:pt-16">
          {/* Background Effects */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 via-transparent to-orange-500/20"></div>
            <div 
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(239, 68, 68, 0.3) 0%, transparent 70%), radial-gradient(circle at 75% 80%, rgba(234, 88, 12, 0.3) 0%, transparent 70%)',
                transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
              }}
            ></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 lg:pt-20 pb-16 flex flex-col justify-center min-h-screen">
            <div className="text-center space-y-6 lg:space-y-8">
              {/* Badge - Mobile Optimized */}
              <div className="inline-flex items-center space-x-2 lg:space-x-3 bg-white/10 backdrop-blur-md rounded-full px-4 lg:px-8 py-3 lg:py-4 border border-white/20">
                <Shield className="w-5 h-5 lg:w-6 lg:h-6 text-orange-400" />
                <span className="text-white font-bold text-sm lg:text-lg">REFORMA DE SEGURIDAD NACIONAL</span>
                <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
              </div>

              {/* Main Title - Mobile Optimized */}
              <h1 className="text-2xl sm:text-3xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-black leading-tight">
                <span className="block text-white">FRONTERAS</span>
                <span className="block text-white">INTELIGENTES</span>
                <span className="block bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent text-xl sm:text-2xl lg:text-4xl xl:text-5xl 2xl:text-6xl">
                  SEGURAS, CALLES TRANQUILAS
                </span>
              </h1>

              {/* Enhanced Subtitle - Mobile Optimized */}
              <div className="max-w-5xl mx-auto space-y-3 lg:space-y-4">
                <p className="text-base lg:text-xl xl:text-2xl 2xl:text-3xl text-gray-200">
                  <span className="font-bold text-white">Plan integral de Juan Pablo Melinao González</span>
                  <br />
                  <span className="text-orange-300 text-sm lg:text-base xl:text-xl 2xl:text-2xl">Ingeniero informático, emprendedor mapuche, candidato presidencial independiente</span>
                </p>
                <p className="text-lg sm:text-xl text-gray-300 max-w-4xl mx-auto">
                  Tecnología + Prevención Social + Enfoque Humanitario = Chile Seguro
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
                    <div className="text-sm text-orange-300 font-semibold mb-1">{stat.subtitle}</div>
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
                  className="group px-8 py-4 bg-gradient-to-r from-red-500 via-orange-500 to-pink-500 text-white font-bold text-lg rounded-full hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3"
                >
                  <span>VER PLAN DE SEGURIDAD COMPLETO</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </button>
                
                <button 
                  onClick={() => {
                    setShowCalculator(true);
                  }}
                  className="px-8 py-4 border-2 border-white text-white font-bold text-lg rounded-full hover:bg-white hover:text-gray-900 transition-all duration-300 flex items-center justify-center space-x-3"
                >
                  <Calculator className="w-6 h-6" />
                  <span>CALCULADORA DE IMPACTO</span>
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
              <div className="inline-flex items-center space-x-2 bg-red-100 rounded-full px-6 py-3 text-red-800 font-semibold mb-6">
                <AlertTriangle className="w-5 h-5" />
                <span>CONTEXTO TÉCNICO, ECONÓMICO Y POLÍTICO</span>
              </div>
              
              <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-8">
                Chile enfrenta desafíos 
                <span className="text-red-600"> críticos</span> en seguridad
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              {/* Situación Actual */}
              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-3xl p-8 border border-red-100">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-red-600 rounded-full">
                    <AlertTriangle className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Situación Actual</h3>
                </div>
                <div className="space-y-4">
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="font-bold text-red-600 mb-1">90% percibe inseguridad</div>
                    <div className="text-gray-700 text-sm">ENUSC 2022 - Crisis de percepción</div>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="font-bold text-orange-600 mb-1">Tren de Aragua</div>
                    <div className="text-gray-700 text-sm">Crimen organizado en el norte (Insight Crime)</div>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="font-bold text-red-600 mb-1">910 deportaciones 2024</div>
                    <div className="text-gray-700 text-sm">Migración irregular (HRW 2024)</div>
                  </div>
                </div>
              </div>

              {/* Oportunidad Tecnológica */}
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-8 border border-blue-100">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-blue-600 rounded-full">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Oportunidad Tecnológica</h3>
                </div>
                <div className="space-y-4">
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="text-3xl font-black text-blue-600 mb-1">$650B</div>
                    <div className="text-gray-700 text-sm">Inversión en tecnología</div>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="text-2xl font-bold text-green-600 mb-1">Modelo Bukele</div>
                    <div className="text-gray-700 text-sm">70% reducción homicidios (adaptado)</div>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="font-bold text-purple-600 mb-1">IA + DDHH</div>
                    <div className="text-gray-700 text-sm">Eficacia con debido proceso</div>
                  </div>
                </div>
              </div>

              {/* Dimensión Política */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 border border-green-100">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-green-600 rounded-full">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Dimensión Política</h3>
                </div>
                <div className="space-y-4">
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="font-bold text-green-600 mb-1">80% busca estabilidad</div>
                    <div className="text-gray-700 text-sm">Cadem 2025 - Demanda ciudadana</div>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="font-bold text-blue-600 mb-1">Enfoque Humanitario</div>
                    <div className="text-gray-700 text-sm">Diferenciación de modelos autoritarios</div>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="font-bold text-orange-600 mb-1">Inclusión Mapuche</div>
                    <div className="text-gray-700 text-sm">Prevención en Araucanía</div>
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
                    <div className="font-bold text-orange-400 mb-2 group-hover:text-orange-300">{ley.nombre}</div>
                    <div className="text-xs text-gray-400 mb-3">{ley.descripcion}</div>
                    <div className="text-xs text-orange-500 group-hover:text-orange-400">Ver documento →</div>
                  </a>
                ))}
              </div>
              <div className="text-center mt-6">
                <div className="text-gray-400 text-sm">
                  Propuesta fundamentada en legislación chilena vigente y tratados internacionales
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Security Measures */}
        <section id="medidas" className="py-24 bg-gradient-to-br from-red-50 to-orange-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 bg-red-600 rounded-full px-6 py-3 text-white font-semibold mb-6">
                <Shield className="w-5 h-5" />
                <span>MEDIDAS ESTRATÉGICAS</span>
              </div>
              
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-8">
                Cuatro Pilares
                <span className="bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent"> Fundamentales</span>
              </h2>

              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Cada medida combina tecnología avanzada con enfoque humanitario y prevención social
              </p>
            </div>

            {/* Interactive Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {medidasSeguridad.map((medida) => (
                <button
                  key={medida.id}
                  onClick={() => setActiveTab(medida.id)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center space-x-2 ${
                    activeTab === medida.id
                      ? 'bg-red-600 text-white shadow-lg scale-105'
                      : 'bg-white text-gray-600 hover:bg-red-50'
                  }`}
                >
                  <div className="w-6 h-6">{medida.icon}</div>
                  <span>{medida.name}</span>
                </button>
              ))}
            </div>

            {/* Active Measure Details */}
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              {medidasSeguridad.map((medida) => (
                <div
                  key={medida.id}
                  className={`${activeTab === medida.id ? 'block' : 'hidden'}`}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/* Info Panel */}
                    <div className="p-12 bg-gradient-to-br from-red-600 to-orange-500 text-white">
                      <div className="flex items-center space-x-4 mb-6">
                        <div className="p-4 bg-white/20 rounded-2xl">
                          {medida.icon}
                        </div>
                        <div>
                          <h3 className="text-3xl font-black">{medida.name}</h3>
                          <p className="text-orange-100">{medida.descripcion}</p>
                        </div>
                      </div>

                      {/* Metrics */}
                      <div className="grid grid-cols-3 gap-4 mb-8">
                        <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
                          <div className="text-2xl font-black">{medida.inversion}</div>
                          <div className="text-sm text-orange-200">Inversión</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
                          <div className="text-2xl font-black">{medida.beneficio}</div>
                          <div className="text-sm text-orange-200">Beneficio</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
                          <div className="text-2xl font-black">{medida.cobertura}</div>
                          <div className="text-sm text-orange-200">Cobertura</div>
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
                          className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold py-4 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
                        >
                          <Play className="w-5 h-5" />
                          <span>SIMULAR RESPUESTA DE SEGURIDAD</span>
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
                Inversión Inteligente,
                <span className="text-green-600"> Seguridad Garantizada</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
              {/* Investment Sources */}
              <div className="space-y-8">
                <h3 className="text-3xl font-bold text-gray-900">Fuentes de Financiamiento</h3>
                <div className="space-y-4">
                  {[
                    { fuente: 'Impuesto sueldos altos', monto: '$1.5-2T', porcentaje: '230-307%' },
                    { fuente: 'Formalización arriendos/comercio', monto: '$500-800B', porcentaje: '77-123%' },
                    { fuente: 'Ahorros automatización', monto: '$200B', porcentaje: '31%' },
                    { fuente: 'Fondo minero', monto: '$500B', porcentaje: '77%' }
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

              {/* Investment Breakdown */}
              <div className="space-y-8">
                <h3 className="text-3xl font-bold text-gray-900">Distribución de Inversión</h3>
                <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-3xl p-8 border border-red-100">
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="text-4xl font-black text-red-600 mb-2">$650B</div>
                      <div className="text-gray-600">Inversión total anual</div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                        <div className="text-2xl font-bold text-orange-600">$300B</div>
                        <div className="text-sm text-gray-600">Fortalecimiento policial</div>
                      </div>
                      <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                        <div className="text-2xl font-bold text-blue-600">$200B</div>
                        <div className="text-sm text-gray-600">Tecnología fronteras</div>
                      </div>
                      <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                        <div className="text-2xl font-bold text-green-600">$100B</div>
                        <div className="text-sm text-gray-600">Prevención social</div>
                      </div>
                      <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                        <div className="text-2xl font-bold text-purple-600">$50B</div>
                        <div className="text-sm text-gray-600">Centros humanitarios</div>
                      </div>
                    </div>

                    <div className="bg-yellow-100 rounded-xl p-4 border border-yellow-200">
                      <div className="font-bold text-yellow-800 mb-2">Ejemplo para la ciudadanía:</div>
                      <div className="text-yellow-700 text-sm">
                        Con esta inversión, tu familia caminará tranquila sabiendo que las fronteras 
                        están protegidas y las calles son seguras para todos.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cost Table */}
            <div className="bg-gray-900 rounded-3xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-8 text-center">Tabla Detallada de Costos e Impactos</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-4 px-4">Medida</th>
                      <th className="text-center py-4 px-4">Costo Anual</th>
                      <th className="text-center py-4 px-4">Impacto Esperado</th>
                      <th className="text-center py-4 px-4">Timeline</th>
                    </tr>
                  </thead>
                  <tbody>
                    {medidasSeguridad.map((medida, index) => (
                      <tr key={index} className="border-b border-gray-800 hover:bg-white/5 transition-colors">
                        <td className="py-4 px-4 font-semibold text-orange-400">{medida.name}</td>
                        <td className="py-4 px-4 text-center text-red-400">{medida.inversion}</td>
                        <td className="py-4 px-4 text-center text-green-400">{medida.beneficio}</td>
                        <td className="py-4 px-4 text-center text-yellow-400">1-3 años</td>
                      </tr>
                    ))}
                    <tr className="border-t-2 border-orange-500 font-bold text-lg">
                      <td className="py-4 px-4 text-orange-300">TOTAL</td>
                      <td className="py-4 px-4 text-center text-red-300">$650B</td>
                      <td className="py-4 px-4 text-center text-green-300">Chile Seguro</td>
                      <td className="py-4 px-4 text-center text-yellow-300">5 años</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Regional Impact Interactive */}
        <section className="py-24 bg-gradient-to-br from-gray-900 via-red-900 to-orange-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 text-white font-semibold mb-6">
                <MapPin className="w-5 h-5" />
                <span>IMPACTO REGIONAL</span>
              </div>
              
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-8">
                Seguridad
                <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent"> Territorial</span>
              </h2>
              
              <p className="text-xl text-gray-300 max-w-4xl mx-auto">
                Cada región tendrá un enfoque específico según sus desafíos de seguridad
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
                          <p className="text-orange-200">{region.enfoque}</p>
                        </div>
                      </div>

                      <div className="bg-white/10 rounded-xl p-6">
                        <div className="text-2xl font-black mb-2">{region.poblacion}</div>
                        <div className="text-orange-200 mb-4">habitantes protegidos</div>
                        <div className="text-3xl font-black text-green-400">{region.inversion}</div>
                        <div className="text-orange-200">inversión total</div>
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
                                className="bg-gradient-to-r from-green-400 to-orange-400 h-2 rounded-full transition-all duration-1000"
                                style={{ width: `${70 + (idx * 15)}%` }}
                              ></div>
                            </div>
                            <div className="text-xs text-gray-400 mt-1">Proyección de efectividad</div>
                          </div>
                        </div>
                      ))}
                      
                      {/* Regional Impact Summary */}
                      <div className="bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-xl p-6 border border-green-400/30">
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
                <span>ESTRATEGIA DE IMPLEMENTACIÓN</span>
              </div>
              
              <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-8">
                Cronograma
                <span className="text-blue-600"> Ejecutivo</span>
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
                      En 100 días, las fronteras en Arica tendrán drones vigilando; 
                      en 2 años, tu barrio en cualquier ciudad estará más seguro con tecnología preventiva.
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
                Seguridad con
                <span className="text-purple-600"> Humanidad</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-8 border border-blue-100">
                <div className="p-4 bg-blue-600 rounded-2xl w-fit mb-6">
                  <Scale className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Debido Proceso</h3>
                <div className="space-y-4">
                  <div className="text-3xl font-black text-blue-600">100%</div>
                  <div className="text-gray-600">Respeto a derechos humanos</div>
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="font-bold text-blue-600 mb-2">Garantía:</div>
                    <div className="text-gray-700 text-sm">
                      Tribunales especializados y supervisión internacional aseguran 
                      el respeto total a los derechos fundamentales.
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 border border-green-100">
                <div className="p-4 bg-green-600 rounded-2xl w-fit mb-6">
                  <Handshake className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Diálogo Mapuche</h3>
                <div className="space-y-4">
                  <div className="text-2xl font-black text-green-600">$50B</div>
                  <div className="text-gray-600">Programas preventivos en Araucanía</div>
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="font-bold text-green-600 mb-2">Inclusión:</div>
                    <div className="text-gray-700 text-sm">
                      Comunidades mapuche participan en el diseño e implementación 
                      de medidas de seguridad culturalmente pertinentes.
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl p-8 border border-orange-100">
                <div className="p-4 bg-orange-600 rounded-2xl w-fit mb-6">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Centros Humanitarios</h3>
                <div className="space-y-4">
                  <div className="text-2xl font-black text-orange-600">Dignos</div>
                  <div className="text-gray-600">Instalaciones para migrantes</div>
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="font-bold text-orange-600 mb-2">Estándar:</div>
                    <div className="text-gray-700 text-sm">
                      Atención médica, separación familiar y procesos expeditos 
                      que respetan la dignidad humana en todo momento.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Enhanced */}
        <section className="py-24 bg-gradient-to-br from-red-600 via-orange-600 to-pink-500">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="space-y-8">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight">
                <span className="block">CHILE SEGURO</span>
                <span className="block">ES POSIBLE</span>
              </h2>
              
              <p className="text-xl sm:text-2xl text-white/90 max-w-4xl mx-auto">
                Con tecnología inteligente, prevención social y enfoque humanitario, 
                transformaremos Chile en el país más seguro de América Latina, 
                donde familias caminen tranquilas y fronteras estén protegidas.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
                <button 
                  onClick={() => {
                    window.open('mailto:contacto@melinao2026.cl?subject=Apoyo%20Fronteras%20Inteligentes&body=Hola%20Juan%20Pablo,%0A%0AQuiero%20apoyar%20la%20reforma%20de%20Fronteras%20Inteligentes.%0A%0AEsta%20propuesta%20integral%20de:%0A\u2022 50%25%20reducci\u00f3n%20migraci\u00f3n%20ilegal%0A\u2022 20%25%20menos%20delitos%20violentos%0A\u2022 Tecnolog\u00eda%20%2B%20humanidad%0A\u2022 Prevenci\u00f3n%20social%20inclusiva%0A%0AEs%20exactamente%20lo%20que%20Chile%20necesita%20para%20estar%20seguro.%0A%0A\u00bfC\u00f3mo%20puedo%20ayudar%20a%20difundir%20esta%20propuesta?%0A%0ASaludos', '_blank');
                  }}
                  className="px-12 py-6 bg-white text-red-600 font-black text-xl rounded-full hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  APOYAR FRONTERAS INTELIGENTES
                </button>
                
                <button 
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: 'Fronteras Inteligentes - Seguridad Nacional Melinao 2026',
                        text: '🛡️ FRONTERAS INTELIGENTES: Drones, IA y prevención social. 50% menos migración ilegal, 20% menos delitos. ¡Chile seguro con humanidad!',
                        url: window.location.href
                      });
                    } else {
                      navigator.clipboard.writeText(window.location.href).then(() => {
                        alert('🔗 ¡Enlace copiado!\\n\\nComparte esta reforma de seguridad:\\n\\n\"Fronteras Inteligentes - Tecnología + Humanidad para Chile Seguro. 50% menos migración ilegal, 20% menos delitos violentos con Melinao 2026!\"\\n\\n' + window.location.href);
                      });
                    }
                  }}
                  className="px-12 py-6 border-2 border-white text-white font-black text-xl rounded-full hover:bg-white hover:text-red-600 transition-all duration-300"
                >
                  COMPARTIR PROPUESTA
                </button>
              </div>

              {/* References */}
              <div className="pt-12 border-t border-white/20">
                <div className="text-white/70 text-lg font-semibold mb-6 text-center">Referencias Técnicas y Legales</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-6xl mx-auto">
                  <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/20">
                    <div className="text-white font-semibold mb-2">[1] ENUSC 2022 - Encuesta Nacional Seguridad Ciudadana</div>
                    <a 
                      href="https://www.ine.cl/docs/default-source/encuesta-nacional-urbana-de-seguridad-ciudadana/publicaciones-y-anuarios/2022/informe-nacional-anual-enusc-2022.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-300 hover:text-orange-200 text-sm break-all"
                    >
                      ine.cl/docs/enusc-2022.pdf
                    </a>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/20">
                    <div className="text-white font-semibold mb-2">[2] Cadem 2025 - Prioridades Ciudadanas</div>
                    <a 
                      href="https://www.cadem.cl/encuestas"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-300 hover:text-orange-200 text-sm break-all"
                    >
                      cadem.cl/encuestas
                    </a>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/20">
                    <div className="text-white font-semibold mb-2">[3] Insight Crime 2023 - Crimen Organizado Chile</div>
                    <a 
                      href="https://insightcrime.org/news"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-300 hover:text-orange-200 text-sm break-all"
                    >
                      insightcrime.org/news
                    </a>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/20">
                    <div className="text-white font-semibold mb-2">[4] Human Rights Watch 2024 - Chile Report</div>
                    <a 
                      href="https://www.hrw.org/world-report/2024/country-chapters/chile"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-300 hover:text-orange-200 text-sm break-all"
                    >
                      hrw.org/world-report/2024/country-chapters/chile
                    </a>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/20">
                    <div className="text-white font-semibold mb-2">[5] Reuters 2023 - Seguridad El Salvador</div>
                    <a 
                      href="https://www.reuters.com/world/americas"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-300 hover:text-orange-200 text-sm break-all"
                    >
                      reuters.com/world/americas
                    </a>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/20">
                    <div className="text-white font-semibold mb-2">[6] SIPRI 2024 - Gasto Defensa Chile</div>
                    <a 
                      href="https://www.sipri.org/publications"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-300 hover:text-orange-200 text-sm break-all"
                    >
                      sipri.org/publications
                    </a>
                  </div>
                </div>
                
                <div className="text-center mt-8">
                  <div className="text-white/60 text-sm">
                    Propuesta basada en legislación chilena vigente, tratados internacionales y mejores prácticas mundiales
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
                <h3 className="text-2xl font-bold">Calculadora de Impacto Seguridad</h3>
                <button 
                  onClick={() => setShowCalculator(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                    <div className="text-2xl font-black text-red-600">50%</div>
                    <div className="text-sm text-red-700">Reducción migración ilegal</div>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                    <div className="text-2xl font-black text-blue-600">20%</div>
                    <div className="text-sm text-blue-700">Menos delitos violentos</div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="font-bold mb-4">Inversión por área:</h4>
                  <div className="space-y-3">
                    {medidasSeguridad.map((medida, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="font-medium">{medida.name}</span>
                        <span className="text-red-600 font-bold">{medida.inversion}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                  <div className="font-bold text-green-800 mb-2">💡 ¿Qué significa para ti?</div>
                  <div className="text-green-700 text-sm">
                    Tu familia caminará tranquila por calles seguras, las fronteras estarán protegidas 
                    con tecnología de punta, y los jóvenes tendrán oportunidades en lugar de caer en la delincuencia.
                  </div>
                </div>

                <button 
                  onClick={() => setShowCalculator(false)} 
                  className="w-full bg-red-600 text-white font-bold py-3 rounded-xl hover:bg-red-700 transition-colors"
                >
                  Cerrar Calculadora
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Security Simulator Modal */}
        {showSimulator && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              
              {/* Step 0: Scenario Selection */}
              {simulatorStep === 0 && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-3xl font-bold">🛡️ Simulador Fronteras Inteligentes</h3>
                    <button 
                      onClick={resetSimulator}
                      className="p-2 hover:bg-gray-100 rounded-full"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <p className="text-gray-600 mb-8 text-lg">
                    Experimenta cómo funcionará el sistema de seguridad inteligente. 
                    Selecciona un escenario para ver la respuesta tecnológica en acción:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { region: 'Arica', tipo: 'Contrabando', color: 'from-red-50 to-orange-50 border-red-100', icon: '🚁' },
                      { region: 'Temuco', tipo: 'Delito urbano', color: 'from-blue-50 to-cyan-50 border-blue-100', icon: '📱' },
                      { region: 'Iquique', tipo: 'Migración ilegal', color: 'from-green-50 to-emerald-50 border-green-100', icon: '🛰️' }
                    ].map((escenario, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setSimulatorData({
                            region: escenario.region.toLowerCase(),
                            tipoIncidente: escenario.tipo.split(' ')[0].toLowerCase(),
                            severidad: 'alta',
                            resultado: null
                          });
                          setSimulatorStep(1);
                        }}
                        className={`p-6 bg-gradient-to-br ${escenario.color} rounded-xl border hover:shadow-lg transition-all duration-300 text-left group`}
                      >
                        <div className="text-4xl mb-4">{escenario.icon}</div>
                        <h4 className="font-bold text-gray-900 mb-2">{escenario.region}</h4>
                        <p className="text-sm text-gray-700 mb-3">{escenario.tipo}</p>
                        <div className="text-sm text-blue-600 font-medium">Simular respuesta →</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 1: Incident Details */}
              {simulatorStep === 1 && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-3xl font-bold">📊 Configuración del Incidente</h3>
                    <button 
                      onClick={resetSimulator}
                      className="p-2 hover:bg-gray-100 rounded-full"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="bg-red-50 rounded-xl p-6 border border-red-200 mb-8">
                    <h4 className="font-bold text-red-800 mb-2">
                      Simulando incidente en: {simulatorData.region?.charAt(0).toUpperCase() + simulatorData.region?.slice(1)}
                    </h4>
                    <p className="text-red-700">
                      El sistema de fronteras inteligentes detectará y responderá automáticamente
                    </p>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={() => setSimulatorStep(0)}
                      className="flex-1 bg-gray-500 text-white font-bold py-3 rounded-xl hover:bg-gray-600 transition-colors"
                    >
                      Cambiar Escenario
                    </button>
                    <button
                      onClick={processSimulation}
                      className="flex-1 bg-red-600 text-white font-bold py-3 rounded-xl hover:bg-red-700 transition-colors"
                    >
                      Activar Sistema de Seguridad
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Processing */}
              {simulatorStep === 2 && (
                <div className="text-center">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-3xl font-bold">🧠 Sistema Activado...</h3>
                    <button 
                      onClick={resetSimulator}
                      className="p-2 hover:bg-gray-100 rounded-full"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="bg-gradient-to-br from-red-600 to-orange-600 rounded-3xl p-12 text-white mb-8">
                    <div className="animate-spin w-16 h-16 border-4 border-white border-t-transparent rounded-full mx-auto mb-6"></div>
                    <h4 className="text-2xl font-bold mb-4">Fronteras Inteligentes en Acción</h4>
                    <div className="space-y-3 text-left max-w-md mx-auto">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-300" />
                        <span>Drones detectando movimiento anómalo...</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-300" />
                        <span>Satélites confirmando ubicación exacta...</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-300" />
                        <span>IA analizando patrones de comportamiento...</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Timer className="w-5 h-5 text-yellow-300 animate-pulse" />
                        <span>Coordinando respuesta humanitaria...</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600">
                    El sistema integrado está procesando el incidente en tiempo real. 
                    Sin esta tecnología, la respuesta tomaría horas o días...
                  </p>
                </div>
              )}

              {/* Step 3: Results */}
              {simulatorStep === 3 && simulatorData.resultado && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-3xl font-bold">🎯 ¡Incidente Resuelto!</h3>
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
                          Respuesta exitosa del sistema
                        </h4>
                        <p className="text-green-700">
                          Fronteras inteligentes funcionando perfectamente
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                      <Timer className="w-8 h-8 text-blue-600 mb-3" />
                      <div className="text-2xl font-black text-blue-600">{simulatorData.resultado.tiempo}</div>
                      <div className="text-sm text-blue-700">Tiempo de respuesta total</div>
                    </div>
                    <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                      <Zap className="w-8 h-8 text-purple-600 mb-3" />
                      <div className="text-lg font-black text-purple-600">{simulatorData.resultado.tecnologia}</div>
                      <div className="text-sm text-purple-700">Tecnología utilizada</div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6 mb-8">
                    <h5 className="font-bold text-gray-900 mb-4">📋 Resultado de la Operación:</h5>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <CheckSquare className="w-5 h-5 text-green-600" />
                        <span className="text-gray-700"><strong>Acción:</strong> {simulatorData.resultado.accion}</span>
                      </div>
                      {simulatorData.resultado.detenidos && (
                        <div className="flex items-center space-x-3">
                          <CheckSquare className="w-5 h-5 text-green-600" />
                          <span className="text-gray-700"><strong>Detenidos:</strong> {simulatorData.resultado.detenidos}</span>
                        </div>
                      )}
                      {simulatorData.resultado.atendidos && (
                        <div className="flex items-center space-x-3">
                          <CheckSquare className="w-5 h-5 text-green-600" />
                          <span className="text-gray-700"><strong>Personas atendidas:</strong> {simulatorData.resultado.atendidos}</span>
                        </div>
                      )}
                      {simulatorData.resultado.ahorro && (
                        <div className="flex items-center space-x-3">
                          <CheckSquare className="w-5 h-5 text-green-600" />
                          <span className="text-gray-700"><strong>Prevención:</strong> {simulatorData.resultado.ahorro}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200 mb-8">
                    <h5 className="font-bold text-yellow-800 mb-2">🚀 Siguiente paso automático:</h5>
                    <p className="text-yellow-700">{simulatorData.resultado.siguiente}</p>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={() => setSimulatorStep(0)}
                      className="flex-1 bg-gray-500 text-white font-bold py-3 rounded-xl hover:bg-gray-600 transition-colors"
                    >
                      Probar Otro Escenario
                    </button>
                    <button
                      onClick={() => {
                        alert('🎊 ¡Impresionante! Has visto el futuro de la seguridad chilena.\\n\\n✨ Con Fronteras Inteligentes de Melinao 2026:\\n\\n• Respuesta en minutos, no horas\\n• Tecnología + humanidad\\n• Fronteras protegidas 24/7\\n• Prevención social efectiva\\n\\n¡Vota por un Chile seguro!');
                        resetSimulator();
                      }}
                      className="flex-1 bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold py-3 rounded-xl hover:shadow-lg transition-all duration-300"
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
        <div className="pb-20 lg:pb-0">
          <ConsultasCiudadanas 
          tema="seguridad" 
          titulo="Mejora la Reforma de Fronteras Inteligentes"
          descripcion="¿Qué aspectos de seguridad son más importantes para tu región? Tu experiencia fortalece nuestra propuesta"
          showStats={true}
        />
        </div>

      </div>
    </SEOWrapper>
  );
};

export default FronterasInteligentes;