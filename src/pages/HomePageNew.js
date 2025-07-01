import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Cpu, DollarSign, Shield, Users, Heart, ArrowRight, Menu, X, Play, Star, Zap, Globe, TrendingUp, PiggyBank, Calculator, Clock, Target, CheckCircle, ChevronLeft, ChevronRight, MapPin, Phone, Mail, Share2, Vote, Eye, Award, Timer, BarChart3, TrendingDownIcon as TrendingDown } from 'lucide-react';
import SEOWrapper from '../components/SEOWrapper';
import ConsultasCiudadanas from '../components/ConsultasCiudadanas';
import AuthStatus from '../components/AuthStatus';
import { seoConfigs } from '../data/seoConfigs';
import { campaignMetrics, testimoniosPorReforma, calculadoraBeneficios, beforeAfterData, urgencyElements } from '../data/campaignData';
import { formatChileanNumber } from '../utils/numberFormat';

const HomePageNew = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeTestimonio, setActiveTestimonio] = useState(0);
  const [activeReforma, setActiveReforma] = useState(0);
  const [showCalculator, setShowCalculator] = useState(false);
  const [calculatorInputs, setCalculatorInputs] = useState({
    ingresoFamiliar: 800000,
    numeroHijos: 2,
    region: 'Metropolitana',
    esProfesor: false,
    trabajaInformal: false,
    gastoSemanal: 120000
  });
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0 });
  const [liveMetrics, setLiveMetrics] = useState(campaignMetrics);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      const sections = ['hero', 'momentum', 'reformas', 'testimonios', 'calculadora', 'impacto', 'antes-despues', 'accion'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // Countdown timer
    const updateCountdown = () => {
      const electionDate = new Date('2026-11-15T09:00:00');
      const now = new Date();
      const diff = electionDate - now;
      
      if (diff > 0) {
        setCountdown({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
        });
      }
    };

    // Live metrics simulation
    const updateLiveMetrics = () => {
      setLiveMetrics(prev => ({
        ...prev,
        apoyosRecolectados: prev.apoyosRecolectados + Math.floor(Math.random() * 5),
        nuevosApoyosHoy: prev.nuevosApoyosHoy + Math.floor(Math.random() * 3)
      }));
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 60000); // Update every minute
    const metricsInterval = setInterval(updateLiveMetrics, 30000); // Update every 30 seconds
    
    // Auto-advance testimonios
    const testimonioInterval = setInterval(() => {
      setActiveTestimonio(prev => (prev + 1) % 3);
    }, 8000);
    
    // Auto-advance reformas
    const reformaInterval = setInterval(() => {
      setActiveReforma(prev => (prev + 1) % reformas.length);
    }, 7000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(countdownInterval);
      clearInterval(metricsInterval);
      clearInterval(testimonioInterval);
      clearInterval(reformaInterval);
    };
  }, []);

  const reformas = [
    {
      icon: <Cpu className="w-12 h-12" />,
      title: "IA en el Estado",
      subtitle: "Trámites en 2 Minutos",
      description: "Con IA, sacas tu carnet de identidad en 2 minutos desde tu celular. El SII detecta automáticamente tus descuentos. Las notarías funcionan 24/7 sin colas.",
      metric: "$500 mil millones",
      detail: "ahorro anual garantizado",
      color: "from-cyan-500 to-blue-600",
      bgColor: "bg-gradient-to-br from-cyan-50 to-blue-50",
      features: [
        "📱 Carnet de identidad desde tu celular", 
        "🏦 SII calcula tus impuestos automáticamente", 
        "📄 Notarías digitales abiertas 24/7",
        "🔒 Transparencia total con blockchain"
      ],
      link: "/reformas/automatizacion-estado-inteligencia-artificial",
      testimonios: testimoniosPorReforma.automatizacionIA
    },
    {
      icon: <DollarSign className="w-12 h-12" />,
      title: "Economía Real",
      subtitle: "$50.000 Más al Mes",
      description: "Pagas IVA 5% en pan, leche y carne. Tu sueldo mínimo sube a $900.000. Los arriendos se formalizan y bajan. Tu familia ahorra $50.000 mensuales.",
      metric: "$50.000",
      detail: "ahorro familiar mensual",
      color: "from-emerald-500 to-green-600",
      bgColor: "bg-gradient-to-br from-emerald-50 to-green-50",
      features: [
        "🛒 IVA 5% en canasta básica (pan, leche, carne)", 
        "💰 Sueldo mínimo $900.000 con subsidio PYME", 
        "🏠 Arriendos con factura: precios justos",
        "📊 Trabajadores informales se formalizan con beneficios"
      ],
      link: "/reformas/reduccion-costo-vida-impuestos",
      testimonios: testimoniosPorReforma.economiaReal
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: "Fronteras Inteligentes",
      subtitle: "Calles Seguras, Migración Ordenada",
      description: "Drones detectan cruces ilegales en tiempo real. Centros humanitarios dignos para migrantes. Programas de prevención para jóvenes en riesgo.",
      metric: "50% menos",
      detail: "migración ilegal y delitos",
      color: "from-orange-500 to-red-600",
      bgColor: "bg-gradient-to-br from-orange-50 to-red-50",
      features: [
        "🛡️ Drones 24/7 en fronteras norte (Arica-Antofagasta)", 
        "🏥 Centros humanitarios dignos para familias migrantes", 
        "🤝 Acuerdos con Bolivia y Perú para control conjunto",
        "👮 IA predice delitos: más carabineros donde se necesitan"
      ],
      link: "/reformas/fronteras-inteligentes-seguridad-nacional",
      testimonios: testimoniosPorReforma.fronterasInteligentes
    },
    {
      icon: <Heart className="w-12 h-12" />,
      title: "Justicia Histórica",
      subtitle: "Pagamos Lo Que Se Debe",
      description: "57,000 profesores reciben $4.5 millones cada uno. Todos los docentes activos ganan $900,000. Se acaban los sueldos vitalicios de ex-presidentes.",
      metric: "57,000",
      detail: "profesores recibirán justicia",
      color: "from-purple-500 to-pink-600",
      bgColor: "bg-gradient-to-br from-purple-50 to-pink-50",
      features: [
        "💰 $4.5 millones a cada profesor con deuda histórica", 
        "👩‍🏫 Sueldo $900,000 para 200,000 docentes activos", 
        "❌ Fin de sueldos vitalicios ex-presidentes/parlamentarios",
        "🏥 Sistema universal de salud con lista de espera cero"
      ],
      link: "/reformas/justicia-social-equidad-fin-privilegios",
      testimonios: testimoniosPorReforma.justiciaHistorica
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: "Chile Unido",
      subtitle: "Araucanía Próspera, Chile Fuerte",
      description: "Bosques protegidos generan turismo mapuche. Escuelas enseñan cultura ancestral. 5,000 empleos en turismo sustentable. Desarrollo que respeta el medio ambiente.",
      metric: "5,000",
      detail: "empleos turismo sostenible",
      color: "from-indigo-500 to-violet-600",
      bgColor: "bg-gradient-to-br from-indigo-50 to-violet-50",
      features: [
        "🌲 Protección bosques nativos: 50,000 hectáreas seguras", 
        "🏫 Educación intercultural en 500 escuelas públicas", 
        "🚌 20 centros turísticos culturales mapuche",
        "🌍 Reducción 15% contaminación ambiental regional"
      ],
      link: "/reformas/chile-unido-desarrollo-araucania",
      testimonios: testimoniosPorReforma.chileUnido
    },
    {
      icon: <PiggyBank className="w-12 h-12" />,
      title: "Fin de Privilegios",
      subtitle: "Política Sin Privilegios",
      description: "Se acabaron los sueldos vitalicios de ex presidentes y parlamentarios. Los partidos se autofinancian sin tus impuestos. Política transparente y justa para todos.",
      metric: "$3.460M",
      detail: "ahorro anual para el pueblo",
      color: "from-red-500 to-pink-600",
      bgColor: "bg-gradient-to-br from-red-50 to-pink-50",
      features: [
        "❌ Fin sueldos vitalicios ex presidentes/parlamentarios", 
        "💸 Partidos se autofinancian sin fondos públicos", 
        "🔍 Transparencia total en donaciones políticas",
        "⚖️ Límite 15 años para remuneraciones estatales"
      ],
      link: "/reformas/eliminacion-privilegios-politicos-transparencia",
      testimonios: testimoniosPorReforma.finPrivilegios
    }
  ];

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const calculateBenefits = () => {
    return calculadoraBeneficios.calcular(calculatorInputs);
  };

  const beneficiosCalculados = calculateBenefits();
  const progressPercentage = (liveMetrics.apoyosRecolectados / 1000000) * 100;

  return (
    <SEOWrapper seoConfig={seoConfigs.home}>
      <div className="min-h-screen bg-gray-50 overflow-x-hidden">
        
        {/* Enhanced Navigation - Desktop Only */}
        <nav className="hidden lg:block fixed top-0 w-full bg-white/95 backdrop-blur-md shadow-xl z-50 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <Link to="/" className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-14 h-14 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-all duration-300">
                    <span className="text-white font-bold text-xl">JM</span>
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <div className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                    Melinao 2026
                  </div>
                  <div className="text-xs text-blue-600 font-semibold">PRESIDENTE DE CHILE</div>
                </div>
              </Link>
              
              {/* Desktop Menu */}
              <div className="flex space-x-8">
                {[
                  { name: 'Momentum', id: 'momentum' },
                  { name: 'Reformas', id: 'reformas' },
                  { name: 'Testimonios', id: 'testimonios' },
                  { name: 'Calculadora', id: 'calculadora' },
                  { name: 'Impacto', id: 'impacto' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`text-lg font-semibold transition-all duration-300 hover:text-blue-600 relative group ${
                      activeSection === item.id ? 'text-blue-600' : 'text-gray-700'
                    }`}
                  >
                    {item.name}
                    <div className={`absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-purple-600 transform origin-left transition-transform duration-300 ${
                      activeSection === item.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}></div>
                  </button>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowCalculator(true)}
                  className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-medium rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-sm flex items-center gap-2"
                >
                  <Calculator className="w-4 h-4" />
                  Tu Beneficio
                </button>
                <Link 
                  to="/reformas/eliminacion-privilegios-politicos-transparencia"
                  className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white font-medium rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-sm"
                >
                  Fin Privilegios
                </Link>
                <Link 
                  to="/participacion-ciudadana"
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  Únete Ya
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Mobile Header - Simplified */}
        <header className="lg:hidden bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200 sticky top-0 z-40">
          <div className="px-4 py-3">
            <div className="flex justify-between items-center">
              <Link to="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">JM</span>
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-900">Melinao 2026</div>
                  <div className="text-xs text-blue-600 font-medium">PRESIDENTE</div>
                </div>
              </Link>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowCalculator(true)}
                  className="px-3 py-2 bg-blue-600 text-white text-sm rounded-lg flex items-center gap-1"
                >
                  <Calculator className="w-4 h-4" />
                  Calcula
                </button>
                <Link 
                  to="/participacion-ciudadana"
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-lg"
                >
                  Únete
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* HERO SECTION MODERNIZADO */}
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
          {/* Animated Background */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-40 right-32 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute bottom-32 left-1/3 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
          </div>

          {/* Parallax Elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div 
              className="absolute top-1/4 left-12 text-6xl opacity-10"
              style={{
                transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
              }}
            >
              <Zap className="w-24 h-24 text-blue-400" />
            </div>
            <div 
              className="absolute top-1/3 right-16 text-4xl opacity-10"
              style={{
                transform: `translate(${mousePosition.x * -0.015}px, ${mousePosition.y * -0.015}px)`
              }}
            >
              <Heart className="w-16 h-16 text-red-400" />
            </div>
            <div 
              className="absolute bottom-1/4 left-1/4 text-5xl opacity-10"
              style={{
                transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`
              }}
            >
              <Target className="w-20 h-20 text-green-400" />
            </div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-6xl mx-auto text-center">
              
              {/* Live Status Badge */}
              <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/30 text-green-200 px-4 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                Campaña en vivo • {formatChileanNumber(liveMetrics.nuevosApoyosHoy)} nuevos apoyos hoy
              </div>

              {/* Main Headline */}
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Chile Próspero
                </span>
                <br />
                <span className="text-white">
                  y Justo
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
                <span className="text-cyan-400 font-bold">Tecnología</span> + 
                <span className="text-green-400 font-bold"> Justicia Social</span> = 
                <span className="text-blue-400 font-bold"> Chile Digno</span>
              </p>

              {/* Countdown */}
              <div className="mb-12">
                <div className="text-lg text-gray-400 mb-4">Faltan para las elecciones:</div>
                <div className="flex justify-center gap-4 md:gap-8">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-white/20">
                    <div className="text-3xl md:text-4xl font-bold text-white">{countdown.days}</div>
                    <div className="text-sm text-gray-300">Días</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-white/20">
                    <div className="text-3xl md:text-4xl font-bold text-white">{countdown.hours}</div>
                    <div className="text-sm text-gray-300">Horas</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-white/20">
                    <div className="text-3xl md:text-4xl font-bold text-white">{countdown.minutes}</div>
                    <div className="text-sm text-gray-300">Minutos</div>
                  </div>
                </div>
              </div>

              {/* Multi CTA */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
                <button
                  onClick={() => setShowCalculator(true)}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-6 py-4 rounded-xl font-bold transition-all hover:scale-105 hover:shadow-2xl group flex flex-col items-center gap-2"
                >
                  <Calculator className="w-8 h-8 group-hover:rotate-12 transition-transform" />
                  <span className="text-sm">Calcula tu Ahorro</span>
                </button>
                
                <Link
                  to="/participacion-ciudadana"
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-4 rounded-xl font-bold transition-all hover:scale-105 hover:shadow-2xl group flex flex-col items-center gap-2"
                >
                  <Users className="w-8 h-8 group-hover:scale-110 transition-transform" />
                  <span className="text-sm">Únete al Movimiento</span>
                </Link>
                
                <button
                  onClick={() => scrollToSection('testimonios')}
                  className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-6 py-4 rounded-xl font-bold transition-all hover:scale-105 hover:shadow-2xl group flex flex-col items-center gap-2"
                >
                  <Play className="w-8 h-8 group-hover:scale-110 transition-transform" />
                  <span className="text-sm">Ve Testimonios</span>
                </button>
                
                <Link
                  to="/patrocinios"
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-4 rounded-xl font-bold transition-all hover:scale-105 hover:shadow-2xl group flex flex-col items-center gap-2"
                >
                  <Vote className="w-8 h-8 group-hover:scale-110 transition-transform" />
                  <span className="text-sm">Apoyar Candidatura</span>
                </Link>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="text-3xl font-bold text-blue-400 mb-2">{liveMetrics.encuestas.intencionVoto}%</div>
                  <div className="text-sm text-gray-300">Intención de voto</div>
                  <div className="text-xs text-green-400 mt-1">{liveMetrics.encuestas.tendencia}</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="text-3xl font-bold text-green-400 mb-2">${formatChileanNumber(520)}</div>
                  <div className="text-sm text-gray-300">Ahorro familiar mensual promedio</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="text-3xl font-bold text-purple-400 mb-2">6</div>
                  <div className="text-sm text-gray-300">Reformas transformadoras</div>
                </div>
              </div>

            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-8 h-8 text-white/60" />
          </div>
        </section>

        {/* MOMENTUM SECTION */}
        <section id="momentum" className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  El Momentum de Chile
                </h2>
                <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                  Cada día más chilenos se suman al cambio. El futuro está en nuestras manos.
                </p>
              </div>

              {/* Live Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                
                {/* Apoyos Progress */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="flex items-center justify-between mb-4">
                    <Users className="w-8 h-8 text-blue-300" />
                    <div className="text-sm text-blue-200">En vivo</div>
                  </div>
                  <div className="text-3xl font-bold mb-2">{formatChileanNumber(liveMetrics.apoyosRecolectados)}</div>
                  <div className="text-sm text-blue-200 mb-4">Apoyos recolectados</div>
                  <div className="w-full bg-blue-800/50 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-400 to-blue-400 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-blue-200 mt-2">{progressPercentage.toFixed(1)}% de la meta</div>
                </div>

                {/* Nuevos Apoyos Hoy */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="flex items-center justify-between mb-4">
                    <TrendingUp className="w-8 h-8 text-green-300" />
                    <div className="text-sm text-green-200">Hoy</div>
                  </div>
                  <div className="text-3xl font-bold mb-2">+{formatChileanNumber(liveMetrics.nuevosApoyosHoy)}</div>
                  <div className="text-sm text-green-200">Nuevos apoyos</div>
                  <div className="text-xs text-green-300 mt-2">↗ +15% vs ayer</div>
                </div>

                {/* Encuesta */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="flex items-center justify-between mb-4">
                    <BarChart3 className="w-8 h-8 text-purple-300" />
                    <div className="text-sm text-purple-200">Cadem</div>
                  </div>
                  <div className="text-3xl font-bold mb-2">{liveMetrics.encuestas.intencionVoto}%</div>
                  <div className="text-sm text-purple-200">Intención de voto</div>
                  <div className="text-xs text-purple-300 mt-2">{liveMetrics.encuestas.tendencia}</div>
                </div>

                {/* Confianza */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="flex items-center justify-between mb-4">
                    <Award className="w-8 h-8 text-yellow-300" />
                    <div className="text-sm text-yellow-200">Confianza</div>
                  </div>
                  <div className="text-3xl font-bold mb-2">{liveMetrics.encuestas.confianza}%</div>
                  <div className="text-sm text-yellow-200">Aprobación ciudadana</div>
                  <div className="text-xs text-yellow-300 mt-2">↗ Líderes en transparencia</div>
                </div>

              </div>

              {/* Regiones Liderando */}
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-8">Regiones que Lideran el Cambio</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {liveMetrics.regionesLiderando.map((region, index) => (
                    <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                      <div className="text-xl font-bold mb-2">{region.nombre}</div>
                      <div className="text-3xl font-bold text-blue-300 mb-2">{region.porcentaje}%</div>
                      <div className="text-sm text-blue-200">Intención de voto</div>
                      <div className="text-xs text-green-300 mt-1">{region.tendencia}</div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* CALCULADORA MODAL */}
        {showCalculator && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-3xl font-bold text-gray-800">Calculadora de Beneficios Personales</h3>
                <button
                  onClick={() => setShowCalculator(false)}
                  className="text-gray-500 hover:text-gray-700 p-2"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-6">
                {/* Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ingreso Familiar Mensual
                    </label>
                    <input
                      type="number"
                      value={calculatorInputs.ingresoFamiliar}
                      onChange={(e) => setCalculatorInputs({...calculatorInputs, ingresoFamiliar: parseInt(e.target.value) || 0})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="800000"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Número de Hijos
                    </label>
                    <input
                      type="number"
                      value={calculatorInputs.numeroHijos}
                      onChange={(e) => setCalculatorInputs({...calculatorInputs, numeroHijos: parseInt(e.target.value) || 0})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Región
                    </label>
                    <select
                      value={calculatorInputs.region}
                      onChange={(e) => setCalculatorInputs({...calculatorInputs, region: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      {Object.keys(calculadoraBeneficios.factores.regiones).map(region => (
                        <option key={region} value={region}>{region}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gasto Semanal en Supermercado
                    </label>
                    <input
                      type="number"
                      value={calculatorInputs.gastoSemanal}
                      onChange={(e) => setCalculatorInputs({...calculatorInputs, gastoSemanal: parseInt(e.target.value) || 0})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="120000"
                    />
                  </div>
                </div>

                {/* Checkboxes */}
                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={calculatorInputs.esProfesor}
                      onChange={(e) => setCalculatorInputs({...calculatorInputs, esProfesor: e.target.checked})}
                      className="mr-2"
                    />
                    Soy profesor(a)
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={calculatorInputs.trabajaInformal}
                      onChange={(e) => setCalculatorInputs({...calculatorInputs, trabajaInformal: e.target.checked})}
                      className="mr-2"
                    />
                    Trabajo informal
                  </label>
                </div>

                {/* Resultados */}
                <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 border-2 border-blue-200">
                  <h4 className="text-2xl font-bold text-gray-800 mb-4">Tu Beneficio Personal</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-white rounded-lg p-4">
                      <div className="text-sm text-gray-600">Ahorro IVA mensual</div>
                      <div className="text-2xl font-bold text-green-600">
                        ${formatChileanNumber(beneficiosCalculados.ahorroIVA)}
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <div className="text-sm text-gray-600">Beneficio sueldo</div>
                      <div className="text-2xl font-bold text-blue-600">
                        ${formatChileanNumber(beneficiosCalculados.beneficioSueldo)}
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <div className="text-sm text-gray-600">Ahorro trámites</div>
                      <div className="text-2xl font-bold text-purple-600">
                        ${formatChileanNumber(beneficiosCalculados.ahorroTramites)}
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <div className="text-sm text-gray-600">Beneficio educación</div>
                      <div className="text-2xl font-bold text-orange-600">
                        ${formatChileanNumber(beneficiosCalculados.beneficioEducacion)}
                      </div>
                    </div>
                  </div>

                  {beneficiosCalculados.deudaHistorica > 0 && (
                    <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-4 mb-4">
                      <div className="text-sm text-yellow-800">Deuda histórica profesores</div>
                      <div className="text-3xl font-bold text-yellow-600">
                        ${formatChileanNumber(beneficiosCalculados.deudaHistorica)}
                      </div>
                      <div className="text-xs text-yellow-700">Pago único</div>
                    </div>
                  )}

                  <div className="border-t-2 border-gray-200 pt-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-lg font-semibold text-gray-700">Total Beneficio Mensual:</div>
                        <div className="text-lg font-semibold text-gray-700">Total Beneficio Anual:</div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-green-600">
                          ${formatChileanNumber(beneficiosCalculados.totalMensual)}
                        </div>
                        <div className="text-2xl font-bold text-blue-600">
                          ${formatChileanNumber(beneficiosCalculados.totalAnual)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="flex gap-4">
                  <Link
                    to="/participacion-ciudadana"
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-bold text-center hover:shadow-lg transition-all"
                    onClick={() => setShowCalculator(false)}
                  >
                    Únete para Hacer Realidad estos Beneficios
                  </Link>
                  <button
                    onClick={() => {
                      // Share functionality could go here
                      navigator.share && navigator.share({
                        title: 'Mi beneficio con Melinao 2026',
                        text: `Con las reformas de Melinao, mi familia se beneficiaría con $${formatChileanNumber(beneficiosCalculados.totalMensual)} mensuales adicionales.`,
                        url: window.location.href
                      });
                    }}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition-all flex items-center gap-2"
                  >
                    <Share2 className="w-5 h-5" />
                    Compartir
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* REFORMAS SECTION CON TESTIMONIOS INTEGRADOS */}
        <section id="reformas" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  <span className="text-gray-800">6 Reformas</span>
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Transformadoras</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Cada reforma con impacto directo en tu vida diaria. Escucha las historias de quienes ya experimentan el cambio.
                </p>
              </div>

              {/* Reforma Activa */}
              <div className="mb-12">
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    
                    {/* Info de la Reforma */}
                    <div className={`p-8 lg:p-12 ${reformas[activeReforma].bgColor}`}>
                      <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${reformas[activeReforma].color} flex items-center justify-center mb-6 transform hover:scale-110 transition-transform`}>
                        {reformas[activeReforma].icon}
                      </div>
                      
                      <h3 className="text-3xl font-bold text-gray-800 mb-4">{reformas[activeReforma].title}</h3>
                      <p className="text-xl font-semibold text-gray-600 mb-6">{reformas[activeReforma].subtitle}</p>
                      <p className="text-gray-700 mb-8 leading-relaxed">{reformas[activeReforma].description}</p>
                      
                      <div className="space-y-3 mb-8">
                        {reformas[activeReforma].features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between mb-8">
                        <div>
                          <div className={`text-3xl font-bold bg-gradient-to-r ${reformas[activeReforma].color} bg-clip-text text-transparent`}>
                            {reformas[activeReforma].metric}
                          </div>
                          <div className="text-sm text-gray-600">{reformas[activeReforma].detail}</div>
                        </div>
                        <Link
                          to={reformas[activeReforma].link}
                          className={`bg-gradient-to-r ${reformas[activeReforma].color} text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all hover:scale-105 flex items-center gap-2`}
                        >
                          Ver Detalles
                          <ArrowRight className="w-5 h-5" />
                        </Link>
                      </div>
                    </div>

                    {/* Testimonio Activo */}
                    <div className="p-8 lg:p-12 bg-gradient-to-br from-gray-800 to-gray-900 text-white">
                      {reformas[activeReforma].testimonios && reformas[activeReforma].testimonios[activeTestimonio] && (
                        <div>
                          <div className="flex items-center gap-4 mb-6">
                            <img
                              src={reformas[activeReforma].testimonios[activeTestimonio].avatar || '/images/citizens/placeholder.jpg'}
                              alt={reformas[activeReforma].testimonios[activeTestimonio].nombre}
                              className="w-16 h-16 rounded-full object-cover border-2 border-white/20"
                            />
                            <div>
                              <div className="font-bold text-lg">{reformas[activeReforma].testimonios[activeTestimonio].nombre}</div>
                              <div className="text-gray-300 text-sm">{reformas[activeReforma].testimonios[activeTestimonio].profesion}</div>
                              <div className="text-gray-400 text-xs">{reformas[activeReforma].testimonios[activeTestimonio].ciudad}, {reformas[activeReforma].testimonios[activeTestimonio].region}</div>
                            </div>
                            {reformas[activeReforma].testimonios[activeTestimonio].verificado && (
                              <CheckCircle className="w-6 h-6 text-green-400 ml-auto" />
                            )}
                          </div>

                          <blockquote className="text-lg italic leading-relaxed mb-6">
                            "{reformas[activeReforma].testimonios[activeTestimonio].testimonio}"
                          </blockquote>

                          <div className="bg-white/10 rounded-xl p-4 mb-6">
                            <div className="text-sm text-gray-300 mb-1">Beneficio Personal:</div>
                            <div className="text-xl font-bold text-green-400">
                              {reformas[activeReforma].testimonios[activeTestimonio].beneficioPersonal}
                            </div>
                            {reformas[activeReforma].testimonios[activeTestimonio].beneficioEconomico && (
                              <div className="text-sm text-gray-300 mt-2">
                                {reformas[activeReforma].testimonios[activeTestimonio].beneficioEconomico}
                              </div>
                            )}
                          </div>

                          {reformas[activeReforma].testimonios[activeTestimonio].videoUrl && (
                            <button className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors">
                              <Play className="w-5 h-5" />
                              <span>Ver video testimonio</span>
                            </button>
                          )}
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              </div>

              {/* Controles del Carrusel */}
              <div className="flex justify-center items-center gap-4 mb-8">
                <button
                  onClick={() => setActiveReforma(prev => prev === 0 ? reformas.length - 1 : prev - 1)}
                  className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all border border-gray-200"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-600" />
                </button>
                
                <div className="flex gap-2">
                  {reformas.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveReforma(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        activeReforma === index ? 'bg-blue-600 w-8' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
                
                <button
                  onClick={() => setActiveReforma(prev => (prev + 1) % reformas.length)}
                  className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all border border-gray-200"
                >
                  <ChevronRight className="w-6 h-6 text-gray-600" />
                </button>
              </div>

              {/* Mini Cards de Todas las Reformas */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {reformas.map((reforma, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveReforma(index)}
                    className={`p-4 rounded-xl border-2 transition-all hover:scale-105 ${
                      activeReforma === index 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${reforma.color} flex items-center justify-center mb-3 mx-auto`}>
                      {React.cloneElement(reforma.icon, { className: "w-6 h-6 text-white" })}
                    </div>
                    <div className="text-sm font-bold text-gray-800 text-center">{reforma.title}</div>
                    <div className="text-xs text-gray-600 text-center mt-1">{reforma.metric}</div>
                  </button>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* SECTION BEFORE/AFTER VISUAL */}
        <section id="antes-despues" className="py-20 bg-gradient-to-br from-slate-800 to-slate-900 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  <span className="text-white">El Chile de</span>
                  <span className="bg-gradient-to-r from-red-400 to-yellow-400 bg-clip-text text-transparent"> Antes vs Después</span>
                </h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Compara cómo será tu vida antes y después de nuestras reformas
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {Object.entries(beforeAfterData).map(([key, data], index) => (
                  <div key={key} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                    <h3 className="text-2xl font-bold mb-8 text-center capitalize">
                      {key === 'tramites' ? 'Trámites' : 
                       key === 'economia' ? 'Economía' :
                       key === 'seguridad' ? 'Seguridad' :
                       key === 'educacion' ? 'Educación' :
                       key === 'privilegios' ? 'Privilegios Políticos' : key}
                    </h3>
                    
                    <div className="space-y-6">
                      {/* Antes */}
                      <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-6">
                        <h4 className="text-lg font-bold text-red-300 mb-4 flex items-center gap-2">
                          <X className="w-5 h-5" />
                          Chile de Antes
                        </h4>
                        <div className="space-y-2 text-sm">
                          {Object.entries(data.antes).map(([subkey, value]) => (
                            <div key={subkey} className="flex justify-between">
                              <span className="text-gray-300 capitalize">{subkey.replace(/([A-Z])/g, ' $1')}:</span>
                              <span className="text-red-300 font-semibold">{value}</span>
                            </div>
                          ))}
                        </div>
                        <p className="text-xs text-gray-400 mt-4 italic">{data.antes.descripcion}</p>
                      </div>

                      {/* Arrow */}
                      <div className="flex justify-center">
                        <ArrowRight className="w-8 h-8 text-blue-400" />
                      </div>

                      {/* Después */}
                      <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-6">
                        <h4 className="text-lg font-bold text-green-300 mb-4 flex items-center gap-2">
                          <CheckCircle className="w-5 h-5" />
                          Chile con Melinao
                        </h4>
                        <div className="space-y-2 text-sm">
                          {Object.entries(data.despues).map(([subkey, value]) => (
                            <div key={subkey} className="flex justify-between">
                              <span className="text-gray-300 capitalize">{subkey.replace(/([A-Z])/g, ' $1')}:</span>
                              <span className="text-green-300 font-semibold">{value}</span>
                            </div>
                          ))}
                        </div>
                        <p className="text-xs text-gray-400 mt-4 italic">{data.despues.descripcion}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* TESTIMONIOS SECTION INDEPENDIENTE */}
        <section id="testimonios" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  <span className="text-gray-800">Voces</span>
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Reales</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Escucha a chilenos de todas las regiones que ya sienten el impacto de nuestras propuestas
                </p>
              </div>

              {/* Grid de Testimonios Destacados */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Seleccionar 6 testimonios destacados */}
                {[
                  testimoniosPorReforma.automatizacionIA[0],
                  testimoniosPorReforma.economiaReal[0],
                  testimoniosPorReforma.fronterasInteligentes[0],
                  testimoniosPorReforma.justiciaHistorica[0],
                  testimoniosPorReforma.chileUnido[0],
                  testimoniosPorReforma.finPrivilegios[0]
                ].map((testimonio, index) => (
                  <div key={testimonio.id} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:scale-105 border border-gray-100">
                    
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={testimonio.avatar || '/images/citizens/placeholder.jpg'}
                        alt={testimonio.nombre}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="font-bold text-gray-800">{testimonio.nombre}</div>
                        <div className="text-sm text-gray-600">{testimonio.profesion}</div>
                        <div className="text-xs text-gray-500">{testimonio.ciudad}</div>
                      </div>
                      {testimonio.verificado && (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      )}
                    </div>

                    <blockquote className="text-gray-700 italic leading-relaxed mb-4 text-sm">
                      "{testimonio.testimonio.slice(0, 120)}..."
                    </blockquote>

                    <div className="bg-blue-50 rounded-lg p-3 mb-4">
                      <div className="text-xs text-gray-600 mb-1">Beneficio:</div>
                      <div className="text-sm font-bold text-blue-600">
                        {testimonio.beneficioPersonal}
                      </div>
                    </div>

                    {testimonio.videoUrl && (
                      <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors text-sm">
                        <Play className="w-4 h-4" />
                        <span>Ver video</span>
                      </button>
                    )}

                  </div>
                ))}
              </div>

              {/* CTA para Ver Todos */}
              <div className="text-center mt-12">
                <button
                  onClick={() => scrollToSection('reformas')}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold hover:shadow-lg transition-all hover:scale-105 inline-flex items-center gap-2"
                >
                  Ver Más Testimonios
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

            </div>
          </div>
        </section>

        {/* SECTION CALCULADORA PREVIEW */}
        <section id="calculadora" className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                ¿Cuánto Te Beneficiarías?
              </h2>
              <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto">
                Descubre tu beneficio personal con nuestras reformas. Calculadora basada en datos reales y proyecciones oficiales.
              </p>

              {/* Preview de Beneficios Promedio */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="text-3xl font-bold mb-2">$520.000</div>
                  <div className="text-sm text-blue-200">Ahorro mensual promedio familia</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="text-3xl font-bold mb-2">$4.5M</div>
                  <div className="text-sm text-blue-200">Deuda histórica profesores</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="text-3xl font-bold mb-2">180 min</div>
                  <div className="text-sm text-blue-200">Menos tiempo en trámites/mes</div>
                </div>
              </div>

              <button
                onClick={() => setShowCalculator(true)}
                className="bg-white text-blue-600 px-12 py-6 rounded-2xl font-bold text-xl hover:shadow-2xl transition-all hover:scale-105 inline-flex items-center gap-3"
              >
                <Calculator className="w-8 h-8" />
                Calcular Mi Beneficio Personal
                <ArrowRight className="w-8 h-8" />
              </button>

            </div>
          </div>
        </section>

        {/* FINAL CALL TO ACTION */}
        <section id="accion" className="py-20 bg-gradient-to-br from-slate-900 to-blue-900 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="text-white">El Cambio</span>
                <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent"> Empieza Contigo</span>
              </h2>
              
              <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
                {formatChileanNumber(liveMetrics.apoyosRecolectados)} chilenos ya se sumaron. 
                Faltan {formatChileanNumber(1000000 - liveMetrics.apoyosRecolectados)} para asegurar el cambio. 
                ¿Serás parte de la historia?
              </p>

              {/* Progress Bar */}
              <div className="mb-12">
                <div className="bg-white/20 rounded-full h-4 mb-4">
                  <div 
                    className="bg-gradient-to-r from-green-400 to-blue-400 h-4 rounded-full transition-all duration-1000"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
                <div className="text-lg font-semibold">
                  {progressPercentage.toFixed(1)}% de la meta alcanzada
                </div>
              </div>

              {/* Multi-CTA */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                <Link
                  to="/participacion-ciudadana"
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-4 rounded-xl font-bold transition-all hover:scale-105 flex flex-col items-center gap-2"
                >
                  <Users className="w-8 h-8" />
                  <span>Únete al Movimiento</span>
                </Link>
                
                <Link
                  to="/patrocinios"
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-6 py-4 rounded-xl font-bold transition-all hover:scale-105 flex flex-col items-center gap-2"
                >
                  <Award className="w-8 h-8" />
                  <span>Patrocinar</span>
                </Link>
                
                <button
                  onClick={() => setShowCalculator(true)}
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-4 rounded-xl font-bold transition-all hover:scale-105 flex flex-col items-center gap-2"
                >
                  <Calculator className="w-8 h-8" />
                  <span>Mi Beneficio</span>
                </button>
                
                <button
                  onClick={() => {
                    navigator.share && navigator.share({
                      title: 'Melinao 2026 - Chile Próspero y Justo',
                      text: 'Conoce las 6 reformas que transformarán Chile. Tecnología + Justicia Social = Chile Digno',
                      url: window.location.href
                    });
                  }}
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-6 py-4 rounded-xl font-bold transition-all hover:scale-105 flex flex-col items-center gap-2"
                >
                  <Share2 className="w-8 h-8" />
                  <span>Compartir</span>
                </button>
              </div>

              {/* Countdown Final */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="text-lg text-gray-300 mb-4">Tiempo restante para cambiar Chile:</div>
                <div className="flex justify-center gap-8">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-white">{countdown.days}</div>
                    <div className="text-sm text-gray-300">Días</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-white">{countdown.hours}</div>
                    <div className="text-sm text-gray-300">Horas</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-white">{countdown.minutes}</div>
                    <div className="text-sm text-gray-300">Minutos</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        <ConsultasCiudadanas />
        <AuthStatus />

      </div>
    </SEOWrapper>
  );
};

export default HomePageNew;