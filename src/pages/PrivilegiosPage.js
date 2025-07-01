import React, { useState, useEffect } from 'react';
import { formatChileanNumber } from '../utils/numberFormat';
import { ArrowRight, ChevronLeft, ChevronRight, CheckCircle, Users, Target, Heart, Clock, Star, Award, MapPin, Quote, Play, Calculator, X, Timer, CheckSquare, FileText, Building, TreePine, Handshake, School, Baby, Briefcase, Shield, Globe, TrendingUp, DollarSign, Eye, Camera, Send, MessageSquare, Zap, Cpu, Wrench, Lightbulb, Key, Lock, Check, ChevronDown, Calendar, Share, ThumbsUp, Medal, ExternalLink, AlertTriangle, Scale, Gavel, PiggyBank, TrendingDown, Trash2, Minus, Plus, BarChart3, RefreshCw, Ban } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOWrapper from '../components/SEOWrapper';
import ConsultasCiudadanas from '../components/ConsultasCiudadanas';
import AuthStatus from '../components/AuthStatus';

const PrivilegiosPage = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeReforma, setActiveReforma] = useState(0);
  const [openFAQ, setOpenFAQ] = useState(null);
  const [showVideo, setShowVideo] = useState(false);
  const [activeImpacto, setActiveImpacto] = useState(0);
  const [showCalculator, setShowCalculator] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    // Auto-advance carrusel de reformas
    const interval = setInterval(() => {
      setActiveReforma(prev => (prev + 1) % reformasClave.length);
    }, 6000);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, []);

  const reformasClave = [
    {
      id: 1,
      titulo: "Eliminación de Sueldos Vitalicios",
      descripcion: "Fin a los privilegios de ex presidentes, parlamentarios y ministros",
      ahorro: "1.660-2.160 millones anuales",
      plazo: "5 años",
      color: "from-red-500 to-rose-500",
      icon: <Ban className="w-8 h-8" />,
      detalles: [
        "Ex presidentes: $660M anuales",
        "Ex parlamentarios: $1.000-1.500M",
        "Límite 15 años de servicio",
        "Fondo de transición 5-10 años"
      ]
    },
    {
      id: 2,
      titulo: "Autofinanciamiento de Partidos",
      descripcion: "Eliminación del financiamiento estatal a partidos políticos",
      ahorro: "1.000-1.500 millones anuales",
      plazo: "2 años",
      color: "from-blue-500 to-cyan-500",
      icon: <PiggyBank className="w-8 h-8" />,
      detalles: [
        "Derogación Ley N° 19.884",
        "Solo donaciones privadas",
        "Registro público transparente",
        "Fiscalización reforzada"
      ]
    },
    {
      id: 3,
      titulo: "Transparencia Total",
      descripcion: "Publicación en tiempo real de todos los beneficios políticos",
      ahorro: "Mejor fiscalización",
      plazo: "1 año",
      color: "from-green-500 to-emerald-500",
      icon: <Eye className="w-8 h-8" />,
      detalles: [
        "Registro público de beneficios",
        "Auditorías ciudadanas",
        "Plataforma digital",
        "Sanciones por incumplimiento"
      ]
    }
  ];

  const impactoFiscal = [
    {
      concepto: "Sueldos Vitalicios Ex Presidentes",
      actual: 660,
      nuevo: 0,
      ahorro: 660,
      descripcion: "Eliminación gradual en 5 años"
    },
    {
      concepto: "Pensiones Ex Parlamentarios",
      actual: 1500,
      nuevo: 300,
      ahorro: 1200,
      descripcion: "Sistema contributivo estándar"
    },
    {
      concepto: "Financiamiento Estatal Partidos",
      actual: 1200,
      nuevo: 0,
      ahorro: 1200,
      descripcion: "Autofinanciamiento total"
    },
    {
      concepto: "Beneficios Ex Ministros",
      actual: 400,
      nuevo: 0,
      ahorro: 400,
      descripcion: "Solo pensiones AFP"
    }
  ];

  const timeline = [
    {
      año: "2026",
      hito: "Inicio de Reformas",
      acciones: [
        "Auditoría legal completa",
        "Proyectos de ley presentados",
        "Campaña ciudadana masiva"
      ],
      progreso: 0
    },
    {
      año: "2027",
      hito: "Primeras Eliminaciones",
      acciones: [
        "Fin financiamiento estatal partidos",
        "Reducción 20% sueldos vitalicios",
        "Transparencia total implementada"
      ],
      progreso: 25
    },
    {
      año: "2028-2030",
      hito: "Eliminación Gradual",
      acciones: [
        "Reducción anual 20% privilegios",
        "Fondo de transición activo",
        "Sistema AFP para ex autoridades"
      ],
      progreso: 60
    },
    {
      año: "2031",
      hito: "Chile sin Privilegios",
      acciones: [
        "100% eliminación sueldos vitalicios",
        "Partidos autofinanciados",
        "Ahorro total: $3.460M anuales"
      ],
      progreso: 100
    }
  ];

  const comparacion = [
    {
      autoridad: "Ex Presidente",
      actual: "$3.500.000/mes",
      propuesto: "$0/mes",
      equivalencia: "35 pensiones dignas",
      impacto: "100% ahorro"
    },
    {
      autoridad: "Ex Parlamentario",
      actual: "$6.000.000/mes",
      propuesto: "$400.000/mes",
      equivalencia: "56 pensiones AFP",
      impacto: "93% ahorro"
    },
    {
      autoridad: "Ex Ministro",
      actual: "$2.800.000/mes",
      propuesto: "$0/mes",
      equivalencia: "28 pensiones dignas",
      impacto: "100% ahorro"
    }
  ];

  const faqData = [
    {
      pregunta: "¿Cómo se implementará la eliminación gradual?",
      respuesta: "La eliminación será progresiva: 20% anual durante 5 años para ex autoridades actuales, y 100% para futuras autoridades. Esto permite una transición ordenada y reduce la resistencia política."
    },
    {
      pregunta: "¿Qué pasa con los ex presidentes actuales?",
      respuesta: "Los ex presidentes actuales verán reducidos sus beneficios en 20% anual hasta eliminarlos completamente en 5 años. Se creará un fondo de transición para apoyar su reinserción laboral."
    },
    {
      pregunta: "¿Cómo se financiarán los partidos sin fondos públicos?",
      respuesta: "Los partidos deberán autofinanciarse mediante donaciones privadas transparentes, con límites por donante (100 UTM anuales) y registro público en tiempo real de todos los aportes."
    },
    {
      pregunta: "¿Qué dice la ley actual sobre estos beneficios?",
      respuesta: "La Ley N° 19.884 (modificada por Ley N° 20.900) regula el financiamiento de partidos. Los sueldos vitalicios están en la Ley de Presupuestos y decretos específicos que identificaremos en la auditoría legal."
    },
    {
      pregunta: "¿Cuánto ahorraría Chile con estas reformas?",
      respuesta: "El ahorro estimado es de $2.660-3.660 millones anuales: $1.660-2.160M por sueldos vitalicios y $1.000-1.500M por financiamiento de partidos. Recursos que irán a salud, educación y pensiones."
    }
  ];

  const Calculator = () => {
    const [selectedPrivilegio, setSelectedPrivilegio] = useState('expresidente');
    const [meses, setMeses] = useState(12);
    
    const privilegios = {
      expresidente: { nombre: "Ex Presidente", monto: 3500000 },
      exparlamentario: { nombre: "Ex Parlamentario", monto: 6000000 },
      exministro: { nombre: "Ex Ministro", monto: 2800000 }
    };
    
    const total = privilegios[selectedPrivilegio].monto * meses;
    const pensiones = Math.floor(total / 100000);
    const becas = Math.floor(total / 180000);
    const consultas = Math.floor(total / 15000);
    
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800">Calculadora de Privilegios</h3>
            <button
              onClick={() => setShowCalculator(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Privilegio
              </label>
              <select
                value={selectedPrivilegio}
                onChange={(e) => setSelectedPrivilegio(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {Object.entries(privilegios).map(([key, value]) => (
                  <option key={key} value={key}>{value.nombre}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Período (meses): {meses}
              </label>
              <input
                type="range"
                min="1"
                max="60"
                value={meses}
                onChange={(e) => setMeses(parseInt(e.target.value))}
                className="w-full"
              />
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-bold text-lg mb-2">Con ${formatChileanNumber(total)} se puede financiar:</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Pensiones dignas ($100k):</span>
                  <span className="font-bold">{formatChileanNumber(pensiones)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Becas estudiantiles ($180k):</span>
                  <span className="font-bold">{formatChileanNumber(becas)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Consultas médicas ($15k):</span>
                  <span className="font-bold">{formatChileanNumber(consultas)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const VideoPlayer = () => (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="relative max-w-4xl w-full">
        <button
          onClick={() => setShowVideo(false)}
          className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
        >
          <X className="w-8 h-8" />
        </button>
        <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
          <iframe
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
            title="Eliminación de Privilegios Políticos"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
      </div>
    </div>
  );

  return (
    <SEOWrapper 
      title="Eliminación de Privilegios Políticos - Juan Pablo Melinao 2026"
      description="Propuesta para eliminar sueldos vitalicios y financiamiento estatal a partidos políticos. Ahorro de $2.660-3.660 millones anuales para salud, educación y pensiones dignas."
      keywords="eliminación privilegios políticos, sueldos vitalicios, financiamiento partidos, reforma política Chile, transparencia, Juan Pablo Melinao"
      path="/privilegios"
    >
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white overflow-hidden">
        
        {/* Navigation Header */}
        <div className="absolute top-4 left-4 z-20">
          <Link 
            to="/"
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-full font-medium transition-all hover:scale-105 border border-white/20"
          >
            <ChevronLeft className="w-5 h-5" />
            Volver al Home
          </Link>
        </div>

        {/* Floating Video Button */}
        <div className="fixed bottom-6 right-6 z-30">
          <button
            onClick={() => setShowVideo(true)}
            className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all group"
          >
            <Play className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </button>
        </div>

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-72 h-72 bg-red-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-40 right-32 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute bottom-32 left-1/3 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
          </div>

          {/* Parallax Elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div 
              className="absolute top-1/4 left-12 text-6xl opacity-10"
              style={{
                transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
              }}
            >
              <Scale className="w-24 h-24" />
            </div>
            <div 
              className="absolute top-1/3 right-16 text-4xl opacity-10"
              style={{
                transform: `translate(${mousePosition.x * -0.015}px, ${mousePosition.y * -0.015}px)`
              }}
            >
              <Gavel className="w-16 h-16" />
            </div>
            <div 
              className="absolute bottom-1/4 left-1/4 text-5xl opacity-10"
              style={{
                transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`
              }}
            >
              <Ban className="w-20 h-20" />
            </div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-6xl mx-auto text-center">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-red-500/20 border border-red-500/30 text-red-200 px-4 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
                <AlertTriangle className="w-4 h-4" />
                Reforma Política Urgente
              </div>

              {/* Main Title */}
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-red-400 via-pink-400 to-red-600 bg-clip-text text-transparent">
                  Eliminación de
                </span>
                <br />
                <span className="text-white">
                  Privilegios Políticos
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
                Fin a los sueldos vitalicios y financiamiento estatal de partidos políticos. 
                <span className="text-red-400 font-bold"> Ahorro de $2.660-3.660 millones anuales</span> 
                para salud, educación y pensiones dignas.
              </p>

              {/* Key Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="text-3xl font-bold text-red-400 mb-2">65%</div>
                  <div className="text-sm text-gray-300">de chilenos desconfían de privilegios políticos</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="text-3xl font-bold text-blue-400 mb-2">$3.660M</div>
                  <div className="text-sm text-gray-300">ahorro anual máximo estimado</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="text-3xl font-bold text-green-400 mb-2">5 años</div>
                  <div className="text-sm text-gray-300">para eliminación completa</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  onClick={() => setShowCalculator(true)}
                  className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 hover:shadow-2xl group flex items-center gap-2"
                >
                  <Calculator className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                  Calculadora de Privilegios
                </button>
                <button
                  onClick={() => setShowVideo(true)}
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 border border-white/30 flex items-center gap-2"
                >
                  <Play className="w-6 h-6" />
                  Ver Video Explicativo
                </button>
              </div>

            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-8 h-8 text-white/60" />
          </div>
        </section>

        {/* Reformas Clave Section */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  <span className="text-white">Reformas</span>
                  <span className="bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent"> Clave</span>
                </h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Tres pilares fundamentales para eliminar los privilegios políticos y construir un Chile más justo
                </p>
              </div>

              {/* Reforma Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                {reformasClave.map((reforma, index) => (
                  <div
                    key={reforma.id}
                    className={`group relative overflow-hidden rounded-2xl border border-white/20 transition-all hover:scale-105 hover:shadow-2xl ${
                      activeReforma === index ? 'bg-white/10 backdrop-blur-sm' : 'bg-white/5 backdrop-blur-sm'
                    }`}
                  >
                    <div className="p-8">
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${reforma.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                        {reforma.icon}
                      </div>
                      
                      <h3 className="text-2xl font-bold text-white mb-4">{reforma.titulo}</h3>
                      <p className="text-gray-300 mb-6">{reforma.descripcion}</p>
                      
                      <div className="space-y-3 mb-6">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-400">Ahorro Anual</span>
                          <span className="font-bold text-green-400">${reforma.ahorro}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-400">Plazo</span>
                          <span className="font-bold text-blue-400">{reforma.plazo}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {reforma.detalles.map((detalle, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                            <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                            <span>{detalle}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Carousel Controls */}
              <div className="flex justify-center items-center gap-4">
                <button
                  onClick={() => setActiveReforma(prev => prev === 0 ? reformasClave.length - 1 : prev - 1)}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                
                <div className="flex gap-2">
                  {reformasClave.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveReforma(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        activeReforma === index ? 'bg-red-400 w-8' : 'bg-white/30'
                      }`}
                    />
                  ))}
                </div>
                
                <button
                  onClick={() => setActiveReforma(prev => (prev + 1) % reformasClave.length)}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

            </div>
          </div>
        </section>

        {/* Impacto Fiscal Section */}
        <section className="py-20 bg-gradient-to-r from-blue-900/30 to-purple-900/30 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  <span className="text-white">Impacto</span>
                  <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent"> Fiscal</span>
                </h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Desglose detallado de los ahorros estimados con la eliminación de privilegios políticos
                </p>
              </div>

              {/* Tabla de Impacto */}
              <div className="overflow-x-auto">
                <table className="w-full bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="p-4 text-left text-white font-bold">Concepto</th>
                      <th className="p-4 text-center text-white font-bold">Actual (Millones)</th>
                      <th className="p-4 text-center text-white font-bold">Propuesto (Millones)</th>
                      <th className="p-4 text-center text-white font-bold">Ahorro (Millones)</th>
                      <th className="p-4 text-center text-white font-bold">Descripción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {impactoFiscal.map((item, index) => (
                      <tr key={index} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                        <td className="p-4 font-medium text-white">{item.concepto}</td>
                        <td className="p-4 text-center text-red-400 font-bold">${formatChileanNumber(item.actual)}</td>
                        <td className="p-4 text-center text-blue-400 font-bold">${formatChileanNumber(item.nuevo)}</td>
                        <td className="p-4 text-center text-green-400 font-bold">${formatChileanNumber(item.ahorro)}</td>
                        <td className="p-4 text-center text-gray-300 text-sm">{item.descripcion}</td>
                      </tr>
                    ))}
                    <tr className="bg-white/10 font-bold">
                      <td className="p-4 text-white">TOTAL AHORRO ANUAL</td>
                      <td className="p-4 text-center text-red-400">${formatChileanNumber(3760)}</td>
                      <td className="p-4 text-center text-blue-400">${formatChileanNumber(300)}</td>
                      <td className="p-4 text-center text-green-400 text-xl">${formatChileanNumber(3460)}</td>
                      <td className="p-4 text-center text-gray-300">Recursos para prioridades sociales</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Uso de Recursos */}
              <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                      <Heart className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Salud</h3>
                    <p className="text-3xl font-bold text-green-400 mb-2">${formatChileanNumber(1200)}M</p>
                    <p className="text-sm text-gray-300">Nuevos hospitales y consultorios</p>
                  </div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                      <School className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Educación</h3>
                    <p className="text-3xl font-bold text-blue-400 mb-2">${formatChileanNumber(1260)}M</p>
                    <p className="text-sm text-gray-300">Deuda histórica profesores</p>
                  </div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Pensiones</h3>
                    <p className="text-3xl font-bold text-purple-400 mb-2">${formatChileanNumber(1000)}M</p>
                    <p className="text-sm text-gray-300">Pensiones dignas para adultos mayores</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  <span className="text-white">Cronograma de</span>
                  <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent"> Implementación</span>
                </h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Plan detallado para la eliminación gradual y ordenada de los privilegios políticos
                </p>
              </div>

              {/* Timeline */}
              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-red-500 to-blue-500 rounded-full"></div>
                
                <div className="space-y-16">
                  {timeline.map((item, index) => (
                    <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                      <div className="flex-1 px-8">
                        <div className={`bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 ${index % 2 === 0 ? 'mr-8' : 'ml-8'}`}>
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-2xl font-bold text-white">{item.año}</h3>
                            <div className="text-sm text-gray-300">{item.progreso}% completado</div>
                          </div>
                          <h4 className="text-xl font-bold text-blue-400 mb-4">{item.hito}</h4>
                          <div className="space-y-2">
                            {item.acciones.map((accion, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                                <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                                <span>{accion}</span>
                              </div>
                            ))}
                          </div>
                          <div className="mt-4 bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-red-500 to-blue-500 h-2 rounded-full transition-all duration-1000"
                              style={{ width: `${item.progreso}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg z-10 border-4 border-white/20">
                        {index + 1}
                      </div>
                      
                      <div className="flex-1"></div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Comparación Section */}
        <section className="py-20 bg-gradient-to-r from-purple-900/30 to-red-900/30 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  <span className="text-white">Antes vs</span>
                  <span className="bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent"> Después</span>
                </h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Comparación directa del impacto de las reformas en los privilegios políticos
                </p>
              </div>

              {/* Comparison Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {comparacion.map((item, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <h3 className="text-xl font-bold text-white mb-6 text-center">{item.autoridad}</h3>
                    
                    <div className="space-y-4">
                      <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4">
                        <div className="text-sm text-red-200 mb-1">Actual</div>
                        <div className="text-2xl font-bold text-red-400">{item.actual}</div>
                      </div>
                      
                      <div className="flex justify-center">
                        <ArrowRight className="w-8 h-8 text-white/60" />
                      </div>
                      
                      <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
                        <div className="text-sm text-green-200 mb-1">Propuesto</div>
                        <div className="text-2xl font-bold text-green-400">{item.propuesto}</div>
                      </div>
                    </div>
                    
                    <div className="mt-6 pt-4 border-t border-white/20">
                      <div className="text-sm text-gray-300 mb-2">Equivale a:</div>
                      <div className="font-bold text-blue-400">{item.equivalencia}</div>
                      <div className="text-sm text-gray-400 mt-2">{item.impacto}</div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  <span className="text-white">Preguntas</span>
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent"> Frecuentes</span>
                </h2>
                <p className="text-xl text-gray-300">
                  Respuestas a las dudas más comunes sobre la eliminación de privilegios políticos
                </p>
              </div>

              <div className="space-y-4">
                {faqData.map((faq, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden">
                    <button
                      onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                      className="w-full p-6 text-left flex justify-between items-center hover:bg-white/5 transition-colors"
                    >
                      <span className="font-bold text-white pr-4">{faq.pregunta}</span>
                      <ChevronDown 
                        className={`w-6 h-6 text-white/60 flex-shrink-0 transition-transform ${
                          openFAQ === index ? 'rotate-180' : ''
                        }`} 
                      />
                    </button>
                    
                    {openFAQ === index && (
                      <div className="px-6 pb-6 text-gray-300 leading-relaxed">
                        {faq.respuesta}
                      </div>
                    )}
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-red-900/50 to-blue-900/50 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="text-white">Únete al</span>
                <span className="bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent"> Cambio</span>
              </h2>
              
              <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
                Los privilegios políticos terminan con tu apoyo. Juntos construiremos un Chile más justo 
                donde los recursos públicos se destinen a las verdaderas prioridades del país.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="text-3xl font-bold text-green-400 mb-2">$3.460M</div>
                  <div className="text-sm text-gray-300">Ahorro anual para Chile</div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="text-3xl font-bold text-blue-400 mb-2">34.600</div>
                  <div className="text-sm text-gray-300">Pensiones dignas adicionales</div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="text-3xl font-bold text-purple-400 mb-2">100%</div>
                  <div className="text-sm text-gray-300">Transparencia política</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/patrocinios"
                  className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 hover:shadow-2xl inline-flex items-center justify-center gap-2"
                >
                  <Award className="w-6 h-6" />
                  Apoyar Candidatura
                  <ArrowRight className="w-6 h-6" />
                </Link>
                
                <button
                  onClick={() => setShowCalculator(true)}
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 border border-white/30 inline-flex items-center justify-center gap-2"
                >
                  <Calculator className="w-6 h-6" />
                  Calcular Impacto
                </button>
              </div>

            </div>
          </div>
        </section>

        {/* Consultas Ciudadanas */}
        <ConsultasCiudadanas />

        {/* Modals */}
        {showVideo && <VideoPlayer />}
        {showCalculator && <Calculator />}

        {/* Auth Status */}
        <AuthStatus />

      </div>
    </SEOWrapper>
  );
};

export default PrivilegiosPage;