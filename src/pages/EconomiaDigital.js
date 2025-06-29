import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle, Calculator, DollarSign, Users, TrendingUp, Shield, Globe, PieChart, Home, FileText, Timer, CheckSquare, Target, Building, Percent, Receipt, X, Play, Briefcase, Store, Factory, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOWrapper from '../components/SEOWrapper';
import { seoConfigs } from '../data/seoConfigs';

const EconomiaDigital = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState('iva');
  const [activeRegion, setActiveRegion] = useState('araucania');
  const [activeFase, setActiveFase] = useState(0);
  const [showCalculator, setShowCalculator] = useState(false);
  const [showSimulator, setShowSimulator] = useState(false);
  const [simulatorStep, setSimulatorStep] = useState(0);
  const [simulatorData, setSimulatorData] = useState({
    ingreso: '',
    gastosMes: '',
    tipoTrabajo: '',
    familia: '',
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

  // Datos basados en el contenido técnico
  const keyStats = [
    {
      icon: <Percent className="w-8 h-8" />,
      title: "5%",
      subtitle: "IVA canasta básica",
      description: "Reducción desde 19% actual",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "$900K",
      subtitle: "sueldo mínimo",
      description: "Aumento con subsidios PYME",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Receipt className="w-8 h-8" />,
      title: "80%",
      subtitle: "formalización",
      description: "Facturas electrónicas obligatorias",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "$1.1T",
      subtitle: "superávit proyectado",
      description: "Sostenibilidad fiscal garantizada",
      color: "from-orange-500 to-red-500"
    }
  ];

  const medidasEconomicas = [
    {
      id: 'iva',
      name: 'Reducción IVA',
      icon: <Percent className="w-12 h-12" />,
      costo: '$1.2T',
      beneficio: '5-10% reducción precios',
      poblacion: '60% hogares',
      descripcion: 'IVA 5% canasta básica, 10% otros bienes',
      detalles: [
        'Pan, leche, huevos: IVA 5% (antes 19%)',
        'Medicamentos básicos: IVA 5%',
        'Ropa y calzado: IVA 10% (antes 19%)',
        'Combustibles: IVA 10%'
      ],
      ejemplo: 'Una familia que gasta $400,000 en supermercado ahorrará $40,000 mensuales'
    },
    {
      id: 'sueldo',
      name: 'Sueldo Mínimo $900K',
      icon: <DollarSign className="w-12 h-12" />,
      costo: '$400B',
      beneficio: '+70% ingresos',
      poblacion: '40% trabajadores',
      descripcion: 'Aumento gradual con subsidios a PYMES',
      detalles: [
        'Incremento de $529,000 (2025) a $900,000',
        'Subsidio estatal 50% para empresas <50 trabajadores',
        'Implementación gradual en 18 meses',
        'Beneficia 1.8 millones de trabajadores'
      ],
      ejemplo: 'Un trabajador de retail pasará de ganar $529,000 a $900,000, mejorando significativamente su calidad de vida'
    },
    {
      id: 'formalizacion',
      name: 'Formalización Digital',
      icon: <Receipt className="w-12 h-12" />,
      costo: '$100B',
      beneficio: '$500-800B recaudación',
      poblacion: '27% trabajadores informales',
      descripcion: 'Facturas electrónicas arriendos, comercio, fundaciones',
      detalles: [
        'Facturas electrónicas obligatorias arriendos',
        'Digitalización comercio informal',
        'Transparencia fundaciones y ONGs',
        'Sistema integrado con SII'
      ],
      ejemplo: 'Un arrendador que antes evadía ahora paga impuestos justos, financiando hospitales'
    },
    {
      id: 'impuesto-alto',
      name: 'Impuesto Sueldos Altos',
      icon: <Building className="w-12 h-12" />,
      costo: '$0',
      beneficio: '$1.5-2T recaudación',
      poblacion: '5% mayores ingresos',
      descripcion: '50% impuesto para ingresos sobre $3 millones (20% fuerzas armadas)',
      detalles: [
        'Afecta solo al 5% de mayores ingresos',
        'Progresivo: 30% entre $2-3M, 50% sobre $3M (20% FFAA)',
        'Fuerzas Armadas: tasa especial 20% (reconocimiento servicio patria)',
        'Exenciones para inversión productiva',
        'Destinado 100% a programas sociales'
      ],
      ejemplo: 'Un ejecutivo que gana $5 millones aporta más para financiar educación y salud pública'
    }
  ];

  const beneficiosRegionales = [
    {
      id: 'araucania',
      name: 'La Araucanía',
      icon: <Store className="w-8 h-8" />,
      poblacion: '957,224',
      inversion: '$50B',
      enfoque: 'Formalización Emprendimientos Mapuche',
      medidas: [
        {
          titulo: 'Digitalización Negocios Locales',
          monto: '$30B',
          descripcion: '5,000 emprendimientos mapuche formalizados'
        },
        {
          titulo: 'Conectividad Rural',
          monto: '$15B',
          descripcion: 'Internet para facturación electrónica'
        },
        {
          titulo: 'Capacitación Digital',
          monto: '$5B',
          descripcion: 'Educación financiera y tributaria'
        }
      ],
      impacto: '+10% ingreso familiar en 20,000 hogares',
      ejemplo: 'Una artesana mapuche vende online con factura electrónica, accediendo a créditos bancarios'
    },
    {
      id: 'antofagasta',
      name: 'Antofagasta',
      icon: <Factory className="w-8 h-8" />,
      poblacion: '691,854',
      inversion: '$100B',
      enfoque: 'Formalización Minera y Comercial',
      medidas: [
        {
          titulo: 'Regularización Mineros Artesanales',
          monto: '$60B',
          descripcion: 'Pequeños productores en sistema formal'
        },
        {
          titulo: 'Hub Comercial Digital',
          monto: '$25B',
          descripcion: 'Plataforma regional de comercio'
        },
        {
          titulo: 'Incentivos Fiscales',
          monto: '$15B',
          descripcion: 'Reducción impuestos para nuevas empresas'
        }
      ],
      impacto: '+15% recaudación minera ($200B adicionales)',
      ejemplo: 'Un minero artesanal formalizado accede a seguros y créditos, mejorando seguridad laboral'
    },
    {
      id: 'santiago',
      name: 'Santiago',
      icon: <Building className="w-8 h-8" />,
      poblacion: '7,112,808',
      inversion: '$300B',
      enfoque: 'Reducción Costo Vida Metropolitano',
      medidas: [
        {
          titulo: 'IVA Reducido Supermercados',
          monto: '$200B',
          descripcion: 'Beneficia 50% hogares metropolitanos'
        },
        {
          titulo: 'Formalización Arriendos',
          monto: '$70B',
          descripcion: 'Sistema digital obligatorio'
        },
        {
          titulo: 'Subsidio PYME Sueldo Mínimo',
          monto: '$30B',
          descripcion: 'Apoyo empresas para nuevo sueldo'
        }
      ],
      impacto: 'Ahorro $50,000 mensuales promedio por familia',
      ejemplo: 'Una familia en Maipú ahorra en supermercado y el padre gana sueldo mínimo $900,000'
    }
  ];

  const cronogramaImplementacion = [
    {
      fase: 'FASE 1: LANZAMIENTO',
      duracion: 'Primeros 100 días',
      costo: '$50B',
      objetivos: [
        'Presentar ley reducción IVA y aumento sueldo mínimo',
        'Implementar facturación electrónica arriendos',
        'Piloto en Santiago y Temuco'
      ],
      hitos: [
        '30 días: Proyecto de ley en Congreso',
        '60 días: Facturación arriendos obligatoria',
        '100 días: IVA 10% alimentos básicos'
      ],
      color: 'from-green-500 to-emerald-600'
    },
    {
      fase: 'FASE 2: EXPANSIÓN',
      duracion: 'Año 1-2',
      costo: '$300B',
      objetivos: [
        'Extender facturación a comercio y fundaciones',
        'Subsidios PYMES para sueldo mínimo',
        'Escalamiento nacional'
      ],
      hitos: [
        '6 meses: Sueldo $900K en 25% empresas',
        '12 meses: Formalización comercio',
        '24 meses: 50% trabajadores con nuevo sueldo'
      ],
      color: 'from-blue-500 to-cyan-600'
    },
    {
      fase: 'FASE 3: CONSOLIDACIÓN',
      duracion: 'Año 3-5',
      costo: '$200B',
      objetivos: [
        'Formalización 80% economía',
        'IA para monitoreo tributario',
        'Reinversión en salud y educación'
      ],
      hitos: [
        '36 meses: 80% formalización lograda',
        '48 meses: Sistema IA funcionando',
        '60 meses: $800B recaudación adicional'
      ],
      color: 'from-purple-500 to-pink-600'
    }
  ];

  // Simulador Functions
  const startEconomicSimulation = () => {
    setSimulatorStep(1);
    setShowSimulator(true);
  };

  const processEconomicSimulation = () => {
    setSimulatorStep(2);
    setTimeout(() => {
      const ingreso = parseInt(simulatorData.ingreso) || 0;
      const gastos = parseInt(simulatorData.gastosMes) || 0;
      
      // Cálculos reales basados en la reforma
      const ahorroIVA = gastos * 0.1; // 10% ahorro promedio en gastos
      const nuevoSueldo = ingreso < 700000 ? 900000 : ingreso;
      const aumentoSueldo = nuevoSueldo - ingreso;
      const ahorroTotal = ahorroIVA + aumentoSueldo;
      const porcentajeMejora = ((ahorroTotal / ingreso) * 100).toFixed(1);
      
      setSimulatorData({
        ...simulatorData,
        resultado: {
          ahorroIVA,
          nuevoSueldo,
          aumentoSueldo,
          ahorroTotal,
          porcentajeMejora,
          beneficiosExtra: [
            'Acceso a créditos por formalización',
            'Mejor poder adquisitivo familiar',
            'Contribución a fondos de pensión',
            'Acceso a seguros de salud complementarios'
          ]
        }
      });
      setSimulatorStep(3);
    }, 3000);
  };

  const resetEconomicSimulator = () => {
    setSimulatorStep(0);
    setSimulatorData({
      ingreso: '',
      gastosMes: '',
      tipoTrabajo: '',
      familia: '',
      resultado: null
    });
    setShowSimulator(false);
  };

  return (
    <SEOWrapper seoConfig={seoConfigs.economia}>
      <div className="min-h-screen bg-gray-50">
        {/* Header Navigation */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link 
                to="/" 
                className="flex items-center space-x-3 text-gray-900 hover:text-green-600 transition-colors"
              >
                <Home className="w-6 h-6" />
                <span className="font-bold">Volver al Menú Principal</span>
              </Link>
              
              <div className="flex items-center space-x-4">
                <button
                  onClick={startEconomicSimulation}
                  className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition-colors"
                >
                  <Calculator className="w-4 h-4" />
                  <span>Simular Ahorros</span>
                </button>
                
                <button
                  onClick={() => setShowCalculator(true)}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors"
                >
                  <PieChart className="w-4 h-4" />
                  <span>Calculadora</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative min-h-screen bg-gradient-to-br from-green-800 via-emerald-700 to-blue-800 overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 via-transparent to-blue-500/20"></div>
            <div 
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(34, 197, 94, 0.3) 0%, transparent 70%), radial-gradient(circle at 75% 80%, rgba(59, 130, 246, 0.3) 0%, transparent 70%)',
                transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
              }}
            ></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 flex flex-col justify-center min-h-screen">
            <div className="text-center space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-md rounded-full px-8 py-4 border border-white/20">
                <DollarSign className="w-6 h-6 text-green-400" />
                <span className="text-white font-bold text-lg">REFORMA ECONÓMICA</span>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>

              {/* Main Title */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight">
                <span className="block text-white">MENOS IMPUESTOS</span>
                <span className="block text-white">MÁS SUELDO</span>
                <span className="block bg-gradient-to-r from-green-400 via-emerald-400 to-blue-400 bg-clip-text text-transparent">
                  CHILE PRÓSPERO
                </span>
              </h1>

              {/* Enhanced Subtitle */}
              <div className="max-w-5xl mx-auto space-y-4">
                <p className="text-xl sm:text-2xl lg:text-3xl text-gray-200">
                  <span className="font-bold text-white">Reducción de impuestos y formalización</span>
                  <br />
                  <span className="text-green-300">IVA 5% canasta básica • Sueldo mínimo $900,000</span>
                </p>
                <p className="text-lg sm:text-xl text-gray-300 max-w-4xl mx-auto">
                  Respondiendo al 70% de chilenos que buscan alivio económico
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
                    <div className="text-sm text-green-300 font-semibold mb-1">{stat.subtitle}</div>
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
                  className="group px-8 py-4 bg-gradient-to-r from-green-500 via-emerald-500 to-blue-500 text-white font-bold text-lg rounded-full hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3"
                >
                  <span>VER PLAN ECONÓMICO COMPLETO</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </button>
                
                <button 
                  onClick={startEconomicSimulation}
                  className="px-8 py-4 border-2 border-white text-white font-bold text-lg rounded-full hover:bg-white hover:text-gray-900 transition-all duration-300 flex items-center justify-center space-x-3"
                >
                  <Calculator className="w-6 h-6" />
                  <span>SIMULAR MIS AHORROS</span>
                </button>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="flex flex-col items-center space-y-2 text-white">
              <span className="text-sm">Descubre los beneficios</span>
              <ArrowRight className="w-6 h-6 rotate-90" />
            </div>
          </div>
        </section>

        {/* Context Section */}
        <section id="contexto" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 bg-green-100 rounded-full px-6 py-3 text-green-800 font-semibold mb-6">
                <TrendingUp className="w-5 h-5" />
                <span>CONTEXTO ECONÓMICO Y SOCIAL</span>
              </div>
              
              <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-8">
                Chile enfrenta 
                <span className="text-red-600"> desafíos estructurales</span> que 
                <span className="text-green-600"> podemos resolver</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
              {/* Problems */}
              <div className="space-y-8">
                <h3 className="text-3xl font-bold text-gray-900">Problemas Actuales</h3>
                <div className="space-y-6">
                  <div className="bg-red-50 rounded-xl p-6 border border-red-200">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-red-500 rounded-full">
                        <TrendingUp className="w-5 h-5 text-white rotate-180" />
                      </div>
                      <h4 className="text-xl font-bold text-red-800">Desigualdad Extrema</h4>
                    </div>
                    <div className="text-red-700">
                      <div className="text-2xl font-black mb-2">Gini 0.44</div>
                      <div className="text-sm">Uno de los más altos de la OCDE</div>
                    </div>
                  </div>

                  <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-orange-500 rounded-full">
                        <Percent className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="text-xl font-bold text-orange-800">IVA Regresivo</h4>
                    </div>
                    <div className="text-orange-700">
                      <div className="text-2xl font-black mb-2">19% IVA</div>
                      <div className="text-sm">Afecta al 60% de hogares bajos y medios</div>
                    </div>
                  </div>

                  <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-purple-500 rounded-full">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="text-xl font-bold text-purple-800">Informalidad Alta</h4>
                    </div>
                    <div className="text-purple-700">
                      <div className="text-2xl font-black mb-2">27%</div>
                      <div className="text-sm">Trabajadores informales = $800B menos recaudación</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Solutions */}
              <div className="space-y-8">
                <h3 className="text-3xl font-bold text-gray-900">Nuestras Soluciones</h3>
                <div className="space-y-6">
                  <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-green-500 rounded-full">
                        <Percent className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="text-xl font-bold text-green-800">IVA Progresivo</h4>
                    </div>
                    <div className="text-green-700">
                      <div className="text-2xl font-black mb-2">5% y 10%</div>
                      <div className="text-sm">Canasta básica 5%, otros bienes 10%</div>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-blue-500 rounded-full">
                        <DollarSign className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="text-xl font-bold text-blue-800">Sueldo Digno</h4>
                    </div>
                    <div className="text-blue-700">
                      <div className="text-2xl font-black mb-2">$900,000</div>
                      <div className="text-sm">+58% aumento con subsidio PYME</div>
                    </div>
                  </div>

                  <div className="bg-cyan-50 rounded-xl p-6 border border-cyan-200">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-cyan-500 rounded-full">
                        <Receipt className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="text-xl font-bold text-cyan-800">Formalización Digital</h4>
                    </div>
                    <div className="text-cyan-700">
                      <div className="text-2xl font-black mb-2">+$800B</div>
                      <div className="text-sm">Recaudación por facturas electrónicas</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Citizen Demand */}
            <div className="bg-gradient-to-br from-blue-600 to-green-600 rounded-3xl p-8 text-white text-center">
              <h3 className="text-3xl font-bold mb-6">Demanda Ciudadana Clara</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/20 backdrop-blur rounded-xl p-6">
                  <div className="text-4xl font-black mb-2">70%</div>
                  <div className="text-sm">Chilenos buscan alivio económico</div>
                </div>
                <div className="bg-white/20 backdrop-blur rounded-xl p-6">
                  <div className="text-4xl font-black mb-2">65%</div>
                  <div className="text-sm">Desconfía de privilegios políticos</div>
                </div>
                <div className="bg-white/20 backdrop-blur rounded-xl p-6">
                  <div className="text-4xl font-black mb-2">80%</div>
                  <div className="text-sm">Quiere más justicia fiscal</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Economic Measures Interactive */}
        <section id="medidas" className="py-24 bg-gradient-to-br from-green-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 bg-green-600 rounded-full px-6 py-3 text-white font-semibold mb-6">
                <Calculator className="w-5 h-5" />
                <span>MEDIDAS ECONÓMICAS ESPECÍFICAS</span>
              </div>
              
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-8">
                Cuatro Pilares
                <span className="bg-gradient-to-r from-green-600 to-blue-500 bg-clip-text text-transparent"> Fundamentales</span>
              </h2>

              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Cada medida está calculada técnicamente para garantizar beneficios reales y sostenibilidad fiscal
              </p>
            </div>

            {/* Interactive Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {medidasEconomicas.map((medida) => (
                <button
                  key={medida.id}
                  onClick={() => setActiveTab(medida.id)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center space-x-2 ${
                    activeTab === medida.id
                      ? 'bg-green-600 text-white shadow-lg scale-105'
                      : 'bg-white text-gray-600 hover:bg-green-50'
                  }`}
                >
                  <div className="w-6 h-6">{medida.icon}</div>
                  <span>{medida.name}</span>
                </button>
              ))}
            </div>

            {/* Active Measure Details */}
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              {medidasEconomicas.map((medida) => (
                <div
                  key={medida.id}
                  className={`${activeTab === medida.id ? 'block' : 'hidden'}`}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/* Info Panel */}
                    <div className="p-12 bg-gradient-to-br from-green-600 to-blue-500 text-white">
                      <div className="flex items-center space-x-4 mb-6">
                        <div className="p-4 bg-white/20 rounded-2xl">
                          {medida.icon}
                        </div>
                        <div>
                          <h3 className="text-3xl font-black">{medida.name}</h3>
                          <p className="text-green-100">{medida.descripcion}</p>
                        </div>
                      </div>

                      {/* Financial Metrics */}
                      <div className="grid grid-cols-3 gap-4 mb-8">
                        <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
                          <div className="text-2xl font-black">{medida.costo}</div>
                          <div className="text-sm text-green-200">Costo</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
                          <div className="text-2xl font-black">{medida.beneficio}</div>
                          <div className="text-sm text-green-200">Beneficio</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
                          <div className="text-2xl font-black">{medida.poblacion}</div>
                          <div className="text-sm text-green-200">Población</div>
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
                            <div className="text-yellow-100">{medida.ejemplo}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Details Panel */}
                    <div className="p-12 bg-gray-50">
                      <h4 className="text-2xl font-bold text-gray-900 mb-8">Detalles Técnicos</h4>
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
                          onClick={startEconomicSimulation}
                          className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold py-4 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
                        >
                          <Calculator className="w-5 h-5" />
                          <span>CALCULAR MIS BENEFICIOS</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Regional Benefits Interactive */}
        <section className="py-24 bg-gradient-to-br from-gray-900 via-green-900 to-blue-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 text-white font-semibold mb-6">
                <Globe className="w-5 h-5" />
                <span>BENEFICIOS REGIONALES</span>
              </div>
              
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-8">
                Desarrollo
                <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent"> Territorial</span>
                <span className="block">Equitativo</span>
              </h2>
              
              <p className="text-xl text-gray-300 max-w-4xl mx-auto">
                Cada región tendrá beneficios específicos según sus características económicas
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
                          <p className="text-green-200">{region.enfoque}</p>
                        </div>
                      </div>

                      <div className="bg-white/10 rounded-xl p-6">
                        <div className="text-2xl font-black mb-2">{region.poblacion}</div>
                        <div className="text-green-200 mb-4">habitantes beneficiados</div>
                        <div className="text-3xl font-black text-green-400">{region.inversion}</div>
                        <div className="text-green-200">inversión regional</div>
                      </div>

                      <div className="bg-yellow-400/20 border border-yellow-400/30 rounded-xl p-4">
                        <div className="font-bold mb-2 text-yellow-200">Impacto esperado:</div>
                        <div className="text-yellow-100 text-sm font-semibold">{region.impacto}</div>
                      </div>

                      <div className="bg-blue-400/20 border border-blue-400/30 rounded-xl p-4">
                        <div className="font-bold mb-2 text-blue-200">Ejemplo ciudadano:</div>
                        <div className="text-blue-100 text-sm">{region.ejemplo}</div>
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
                          <p className="text-gray-300">{medida.descripcion}</p>
                          
                          {/* Progress bar simulation */}
                          <div className="mt-4">
                            <div className="w-full bg-white/20 rounded-full h-2">
                              <div 
                                className="bg-gradient-to-r from-green-400 to-blue-400 h-2 rounded-full transition-all duration-1000"
                                style={{ width: `${70 + (idx * 15)}%` }}
                              ></div>
                            </div>
                            <div className="text-xs text-gray-400 mt-1">Implementación prevista</div>
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
        <section className="py-24 bg-gradient-to-br from-blue-50 to-green-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 bg-green-600 rounded-full px-6 py-3 text-white font-semibold mb-6">
                <Timer className="w-5 h-5" />
                <span>CRONOGRAMA DE IMPLEMENTACIÓN</span>
              </div>
              
              <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-8">
                Plan Ejecutivo
                <span className="text-green-600"> Paso a Paso</span>
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
                      ? 'bg-green-600 text-white shadow-lg scale-105'
                      : 'bg-white text-gray-600 hover:bg-green-50'
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
          </div>
        </section>

        {/* Call to Action Enhanced */}
        <section className="py-24 bg-gradient-to-br from-green-600 via-emerald-600 to-blue-500">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="space-y-8">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight">
                <span className="block">ECONOMÍA JUSTA</span>
                <span className="block">PARA TODOS</span>
              </h2>
              
              <p className="text-xl sm:text-2xl text-white/90 max-w-4xl mx-auto">
                Con medidas técnicas sólidas, beneficios comprobables y sostenibilidad fiscal garantizada, 
                transformaremos la economía chilena para que funcione para las familias, no para los privilegios.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
                <button 
                  onClick={() => {
                    window.open('mailto:contacto@chiledigno.cl?subject=Apoyo%20Reforma%20Economica&body=Hola%20Juan%20Pablo,%0A%0AQuiero%20apoyar%20la%20reforma%20económica%20de%20reducción%20de%20impuestos%20y%20formalización.%0A%0AEsta%20propuesta%20de:%0A\u2022 IVA%205%%20canasta%20básica%0A\u2022 Sueldo%20mínimo%20$900,000%0A\u2022 Formalización%20digital%0A\u2022 Impuestos%20justos%20a%20sueldos%20altos%0A%0AEs%20exactamente%20lo%20que%20necesitamos%20para%20un%20Chile%20más%20justo.%0A%0A\u00bfCómo%20puedo%20ayudar%20a%20difundir%20esta%20propuesta?%0A%0ASaludos', '_blank');
                  }}
                  className="px-12 py-6 bg-white text-green-600 font-black text-xl rounded-full hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  APOYAR ESTA REFORMA
                </button>
                
                <button 
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: 'Reforma Económica - Menos Impuestos, Más Sueldo - Melinao 2026',
                        text: '💰 ECONOMÍA JUSTA: IVA 5% canasta básica, sueldo mínimo $900K, formalización digital. ¡Chile próspero para todos!',
                        url: window.location.href
                      });
                    } else {
                      navigator.clipboard.writeText(window.location.href).then(() => {
                        alert('🔗 ¡Enlace copiado!\\n\\nComparte esta reforma económica:\\n\\n\"Menos Impuestos, Más Sueldo - IVA 5% canasta básica, sueldo mínimo $900K. ¡Chile próspero con Melinao 2026!\"\\n\\n' + window.location.href);
                      });
                    }
                  }}
                  className="px-12 py-6 border-2 border-white text-white font-black text-xl rounded-full hover:bg-white hover:text-green-600 transition-all duration-300"
                >
                  COMPARTIR PROPUESTA
                </button>
              </div>

              {/* References */}
              <div className="pt-12 border-t border-white/20">
                <div className="text-white/70 text-lg font-semibold mb-6 text-center">Referencias Técnicas y Legales</div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
                  <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/20">
                    <div className="text-white font-semibold mb-2">Encuesta Cadem 2025</div>
                    <a 
                      href="https://www.cadem.cl/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-300 hover:text-green-200 text-sm break-all"
                    >
                      cadem.cl/
                    </a>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/20">
                    <div className="text-white font-semibold mb-2">INE Chile 2022</div>
                    <a 
                      href="https://www.ine.cl/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-300 hover:text-green-200 text-sm break-all"
                    >
                      ine.cl/
                    </a>
                  </div>

                  <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/20">
                    <div className="text-white font-semibold mb-2">CASEN 2022</div>
                    <a 
                      href="https://www.ine.cl/estadisticas/sociales/ingresos-y-gastos/casen"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-300 hover:text-green-200 text-sm break-all"
                    >
                      ine.cl/estadisticas/sociales/ingresos-y-gastos/casen
                    </a>
                  </div>

                  <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/20">
                    <div className="text-white font-semibold mb-2">OIT 2023</div>
                    <a 
                      href="https://www.ilo.org/santiago/publicaciones/WCMS_892605/lang--es/index.htm"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-300 hover:text-green-200 text-sm break-all"
                    >
                      ilo.org/santiago/publicaciones/WCMS_892605
                    </a>
                  </div>

                  <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/20">
                    <div className="text-white font-semibold mb-2">SII 2023</div>
                    <a 
                      href="https://www.sii.cl/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-300 hover:text-green-200 text-sm break-all"
                    >
                      sii.cl/
                    </a>
                  </div>

                  <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/20">
                    <div className="text-white font-semibold mb-2">CELAG 2025</div>
                    <a 
                      href="https://www.celag.org/chile-hacia-las-elecciones-presidenciales-2025/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-300 hover:text-green-200 text-sm break-all"
                    >
                      celag.org/chile-hacia-las-elecciones-presidenciales-2025
                    </a>
                  </div>
                </div>
                
                <div className="text-center mt-8">
                  <div className="text-white/60 text-sm">
                    Propuesta fundamentada en datos oficiales y demanda ciudadana comprobada
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Economic Simulator Modal */}
        {showSimulator && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              
              {/* Step 0: Welcome */}
              {simulatorStep === 0 && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-3xl font-bold">💰 Simulador de Beneficios Económicos</h3>
                    <button 
                      onClick={resetEconomicSimulator}
                      className="p-2 hover:bg-gray-100 rounded-full"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="text-center space-y-6">
                    <p className="text-gray-600 text-lg">
                      Descubre cuánto dinero ahorrarás y ganarás con nuestras reformas económicas
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                      <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                        <div className="text-3xl font-black text-green-600 mb-2">IVA 5%</div>
                        <div className="text-green-700">Canasta básica más barata</div>
                      </div>
                      <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                        <div className="text-3xl font-black text-blue-600">$900K</div>
                        <div className="text-blue-700">Nuevo sueldo mínimo</div>
                      </div>
                    </div>

                    <button
                      onClick={() => setSimulatorStep(1)}
                      className="bg-gradient-to-r from-green-600 to-blue-600 text-white font-bold py-4 px-8 rounded-xl hover:shadow-lg transition-all duration-300"
                    >
                      CALCULAR MIS BENEFICIOS
                    </button>
                  </div>
                </div>
              )}

              {/* Step 1: Data Input */}
              {simulatorStep === 1 && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-3xl font-bold">📝 Información Personal</h3>
                    <button 
                      onClick={resetEconomicSimulator}
                      className="p-2 hover:bg-gray-100 rounded-full"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Sueldo actual mensual (líquido)
                      </label>
                      <input
                        type="number"
                        value={simulatorData.ingreso}
                        onChange={(e) => setSimulatorData({...simulatorData, ingreso: e.target.value})}
                        placeholder="Ej: 400000"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Gastos mensuales en supermercado/alimentación
                      </label>
                      <input
                        type="number"
                        value={simulatorData.gastosMes}
                        onChange={(e) => setSimulatorData({...simulatorData, gastosMes: e.target.value})}
                        placeholder="Ej: 200000"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Situación laboral
                      </label>
                      <select
                        value={simulatorData.tipoTrabajo}
                        onChange={(e) => setSimulatorData({...simulatorData, tipoTrabajo: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      >
                        <option value="">Selecciona tu situación</option>
                        <option value="sueldo-minimo">Trabajo con sueldo mínimo</option>
                        <option value="trabajador-formal">Trabajador formal</option>
                        <option value="trabajador-informal">Trabajador informal</option>
                        <option value="emprendedor">Emprendedor/Comerciante</option>
                        <option value="pensionado">Pensionado</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tamaño del grupo familiar
                      </label>
                      <select
                        value={simulatorData.familia}
                        onChange={(e) => setSimulatorData({...simulatorData, familia: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      >
                        <option value="">Selecciona</option>
                        <option value="1">Solo/a</option>
                        <option value="2">2 personas</option>
                        <option value="3">3 personas</option>
                        <option value="4">4 personas</option>
                        <option value="5+">5 o más personas</option>
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
                        onClick={processEconomicSimulation}
                        disabled={!simulatorData.ingreso || !simulatorData.gastosMes || !simulatorData.tipoTrabajo}
                        className="flex-1 bg-green-600 text-white font-bold py-3 rounded-xl hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        CALCULAR BENEFICIOS
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Processing */}
              {simulatorStep === 2 && (
                <div className="text-center">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-3xl font-bold">💰 Calculando...</h3>
                    <button 
                      onClick={resetEconomicSimulator}
                      className="p-2 hover:bg-gray-100 rounded-full"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="bg-gradient-to-br from-green-600 to-blue-600 rounded-3xl p-12 text-white mb-8">
                    <div className="animate-spin w-16 h-16 border-4 border-white border-t-transparent rounded-full mx-auto mb-6"></div>
                    <h4 className="text-2xl font-bold mb-4">Análisis Económico en Proceso</h4>
                    <div className="space-y-3 text-left max-w-md mx-auto">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-300" />
                        <span>Calculando reducción IVA en tus compras...</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-300" />
                        <span>Evaluando impacto sueldo mínimo...</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-300" />
                        <span>Analizando beneficios por formalización...</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Timer className="w-5 h-5 text-yellow-300 animate-pulse" />
                        <span>Generando reporte personalizado...</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600">
                    Estamos calculando cuánto dinero extra tendrás cada mes...
                  </p>
                </div>
              )}

              {/* Step 3: Results */}
              {simulatorStep === 3 && simulatorData.resultado && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-3xl font-bold">🎉 ¡Tus Beneficios Calculados!</h3>
                    <button 
                      onClick={resetEconomicSimulator}
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
                          ¡Grandes beneficios para tu familia!
                        </h4>
                        <p className="text-green-700">
                          Con las reformas de Melinao tendrás más dinero cada mes
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-green-50 rounded-xl p-6 border border-green-200 text-center">
                      <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-3" />
                      <div className="text-2xl font-black text-green-600">${simulatorData.resultado.ahorroIVA.toLocaleString()}</div>
                      <div className="text-sm text-green-700">Ahorro mensual IVA</div>
                    </div>
                    <div className="bg-blue-50 rounded-xl p-6 border border-blue-200 text-center">
                      <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                      <div className="text-2xl font-black text-blue-600">${simulatorData.resultado.nuevoSueldo.toLocaleString()}</div>
                      <div className="text-sm text-blue-700">Tu nuevo sueldo</div>
                    </div>
                    <div className="bg-purple-50 rounded-xl p-6 border border-purple-200 text-center">
                      <Target className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                      <div className="text-2xl font-black text-purple-600">{simulatorData.resultado.porcentajeMejora}%</div>
                      <div className="text-sm text-purple-700">Mejora en tu economía</div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 mb-8">
                    <h5 className="font-bold text-gray-900 mb-4">💰 Resumen de beneficios mensuales:</h5>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Ahorro en supermercado (IVA reducido):</span>
                        <span className="font-bold text-green-600">+${simulatorData.resultado.ahorroIVA.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Aumento de sueldo:</span>
                        <span className="font-bold text-blue-600">+${simulatorData.resultado.aumentoSueldo.toLocaleString()}</span>
                      </div>
                      <div className="border-t pt-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-900 font-bold">Total extra mensual:</span>
                          <span className="font-black text-green-600 text-xl">+${simulatorData.resultado.ahorroTotal.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6 mb-8">
                    <h5 className="font-bold text-gray-900 mb-4">🎁 Beneficios adicionales:</h5>
                    <div className="space-y-2">
                      {simulatorData.resultado.beneficiosExtra.map((beneficio, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <CheckSquare className="w-5 h-5 text-green-600" />
                          <span className="text-gray-700">{beneficio}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200 mb-8">
                    <h5 className="font-bold text-yellow-800 mb-2">🚀 En un año ahorrarás:</h5>
                    <p className="text-yellow-700 text-2xl font-black">
                      ${(simulatorData.resultado.ahorroTotal * 12).toLocaleString()}
                    </p>
                    <p className="text-yellow-700 text-sm mt-2">
                      Suficiente para vacaciones familiares, emergencias o ahorros para el futuro
                    </p>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={() => setSimulatorStep(0)}
                      className="flex-1 bg-gray-500 text-white font-bold py-3 rounded-xl hover:bg-gray-600 transition-colors"
                    >
                      Simular Otra Situación
                    </button>
                    <button
                      onClick={() => {
                        alert('🎊 ¡Increíble! Has visto el impacto real de nuestras reformas económicas.\\n\\n✨ Con Melinao 2026:\\n\\n• Más dinero en tu bolsillo cada mes\\n• IVA justo para familias chilenas\\n• Sueldo digno garantizado\\n• Economía que funciona para todos\\n\\n¡Vota por el cambio económico!');
                        resetEconomicSimulator();
                      }}
                      className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 text-white font-bold py-3 rounded-xl hover:shadow-lg transition-all duration-300"
                    >
                      ¡Apoyar Esta Visión!
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Calculator Modal */}
        {showCalculator && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Calculadora Económica Rápida</h3>
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
                    <div className="text-2xl font-black text-green-600">$1.1T</div>
                    <div className="text-sm text-green-700">Superávit fiscal proyectado</div>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                    <div className="text-2xl font-black text-blue-600">70%</div>
                    <div className="text-sm text-blue-700">Familias beneficiadas</div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="font-bold mb-4">Costos e ingresos (billones CLP):</h4>
                  <div className="space-y-3">
                    {medidasEconomicas.map((medida, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="font-medium">{medida.name}</span>
                        <span className="text-green-600 font-bold">{medida.costo}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
                  <div className="font-bold text-yellow-800 mb-2">💡 Beneficio para ti:</div>
                  <div className="text-yellow-700 text-sm">
                    Una familia promedio ahorrará entre $50,000 y $120,000 mensuales 
                    entre IVA reducido y mejor sueldo.
                  </div>
                </div>

                <button 
                  onClick={() => setShowCalculator(false)} 
                  className="w-full bg-green-600 text-white font-bold py-3 rounded-xl hover:bg-green-700 transition-colors"
                >
                  Cerrar Calculadora
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </SEOWrapper>
  );
};

export default EconomiaDigital;