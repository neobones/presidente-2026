import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Cpu, DollarSign, Shield, Users, Heart, ArrowRight, Menu, X, Play, Star, Zap, Globe, TrendingUp, PiggyBank } from 'lucide-react';
import SEOWrapper from '../components/SEOWrapper';
import ConsultasCiudadanas from '../components/ConsultasCiudadanas';
import { seoConfigs } from '../data/seoConfigs';

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      const sections = ['hero', 'vision', 'reformas', 'impacto', 'historia', 'accion'];
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

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
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
      ejemplo: "María en Temuco renueva su carnet sin salir de casa. Juan en Santiago hace su declaración de impuestos en un click.",
      secundarias: ["Transparencia digital: cada peso público será rastreado", "Empleos digitales: 50,000 capacitaciones gratuitas"],
      link: "/reformas/automatizacion-estado-inteligencia-artificial"
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
      ejemplo: "Ana en La Pintana paga $2.000 menos por sus compras semanales. Pedro en Valparaíso gana $370.000 más como sueldo mínimo.",
      secundarias: ["Empleo masivo: 200.000 nuevos empleos formales", "Emprendimiento: microcréditos hasta $5 millones"],
      link: "/reformas/reduccion-costo-vida-impuestos"
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
      ejemplo: "En Arica, un drone detecta contrabando y alerta a Carabineros al instante. En Temuco, jóvenes en riesgo reciben capacitación laboral.",
      secundarias: ["Seguridad urbana: cámaras IA en 500 puntos críticos", "Prevención: 20,000 jóvenes en programas deportivos y laborales"],
      link: "/reformas/fronteras-inteligentes-seguridad-nacional"
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
      ejemplo: "Don Carlos, profesor jubilado en Valdivia, recibe $4.5 millones. Profesora Elena en Antofagasta gana $900,000 mensuales.",
      secundarias: ["Educación digna: becas para 100,000 estudiantes vulnerables", "Salud universal: acceso garantizado sin importar ingresos"],
      link: "/reformas/justicia-social-equidad-fin-privilegios"
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
      ejemplo: "Familia mapuche en Temuco abre ruka turística y genera $800,000 mensuales. Niños en Santiago aprenden mapudungun en su escuela.",
      secundarias: ["Medio ambiente: reforestación de 100,000 árboles anuales", "Reconciliación: Consejo Nacional con participación indígena real"],
      link: "/reformas/chile-unido-desarrollo-araucania"
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
      ejemplo: "Con lo que recibe un ex presidente al mes ($3.5M), se financian 35 pensiones dignas. Los ahorros van directo a salud y educación.",
      secundarias: ["Equidad política: mismas reglas para políticos y trabajadores", "Reinversión social: $3.460M anuales para programas ciudadanos"],
      link: "/reformas/eliminacion-privilegios-politicos-transparencia"
    }
  ];

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const parallaxOffset = scrollY * 0.5;
  const heroParallax = scrollY * 0.3;

  return (
    <SEOWrapper seoConfig={seoConfigs.home}>
      <div className="min-h-screen bg-gray-50 overflow-x-hidden">
        {/* Enhanced Navigation - Desktop Only */}
        <nav className="hidden lg:block fixed top-0 w-full bg-white/90 backdrop-blur-md shadow-xl z-50 border-b border-gray-100">
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
              <div className="flex space-x-12">
                {[
                  { name: 'Visión', id: 'vision' },
                  { name: 'Reformas', id: 'reformas' },
                  { name: 'Impacto', id: 'impacto' },
                  { name: 'Historia', id: 'historia' },
                  { name: 'Actúa', id: 'accion' }
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

              <div className="flex items-center space-x-4">
                <Link 
                  to="/reformas/eliminacion-privilegios-politicos-transparencia"
                  className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white font-medium rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-sm"
                >
                  Fin Privilegios
                </Link>
                <Link 
                  to="/patrocinios"
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  Únete Ya
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Mobile Header - Simple */}
        <header className="lg:hidden bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200 sticky top-0 z-40">
          <div className="px-4 py-3">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">JM</span>
              </div>
              <div>
                <div className="text-lg font-bold text-gray-900">Melinao 2026</div>
                <div className="text-xs text-blue-600 font-semibold">PRESIDENTE DE CHILE</div>
              </div>
            </Link>
          </div>
        </header>

        {/* Hero Section - Cinematográfico */}
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden lg:pt-20">
          {/* Dynamic Background with Parallax */}
          <div className="absolute inset-0">
            <div 
              className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900"
              style={{
                transform: `translateY(${heroParallax}px)`,
              }}
            >
              <div className="absolute inset-0 bg-black/30"></div>
            </div>
            
            {/* Floating Elements */}
            <div 
              className="absolute top-20 left-10 w-40 h-40 bg-blue-500/20 rounded-full blur-xl animate-pulse"
              style={{
                transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
              }}
            ></div>
            <div 
              className="absolute bottom-20 right-10 w-60 h-60 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-700"
              style={{
                transform: `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * -0.01}px)`,
              }}
            ></div>
            <div 
              className="absolute top-1/2 left-1/3 w-32 h-32 bg-cyan-500/20 rounded-full blur-lg animate-bounce delay-1000"
              style={{
                transform: `translate(${mousePosition.x * 0.015}px, ${mousePosition.y * 0.015}px)`,
              }}
            ></div>
            
            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="grid grid-cols-12 h-full">
                {[...Array(144)].map((_, i) => (
                  <div key={i} className="border border-white/10 animate-pulse" style={{animationDelay: `${i * 50}ms`}}></div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-screen py-8 lg:py-0">
              {/* Text Content */}
              <div className="text-center lg:text-left space-y-6 lg:space-y-8">
                <div className="space-y-3 lg:space-y-4">
                  <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 lg:px-6 py-2 lg:py-3 text-white">
                    <Star className="w-4 lg:w-5 h-4 lg:h-5 text-yellow-400" />
                    <span className="font-semibold text-sm lg:text-base">CANDIDATO PRESIDENCIAL 2026</span>
                  </div>
                  
                  <h1 className="text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-black leading-tight">
                    <span className="block text-white mb-1 lg:mb-2">CHILE</span>
                    <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
                      INNOVADOR
                    </span>
                  </h1>
                  
                  <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-gray-200 font-light max-w-2xl">
                    <span className="font-bold text-white">Juan Pablo Melinao González</span>
                    <br />
                    Ingeniero • Emprendedor • Mapuche
                  </p>
                </div>

                <div className="space-y-4 lg:space-y-6">
                  <div className="text-base lg:text-lg xl:text-xl text-gray-300 max-w-xl">
                    Como ingeniero mapuche, combino tecnología de vanguardia con justicia social. 
                    Tu carnet en 2 minutos, $50,000 más al mes en tu bolsillo, y un Chile unido que respeta nuestra diversidad.
                  </div>

                  <div className="flex flex-col gap-3 lg:gap-4">
                    <Link 
                      to="/patrocinios"
                      className="group px-6 lg:px-8 py-3 lg:py-4 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white font-bold text-base lg:text-lg rounded-full hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3 touch-manipulation animate-pulse"
                    >
                      <Users className="w-5 lg:w-6 h-5 lg:h-6" />
                      <span>PATROCINAR CANDIDATURA</span>
                      <ArrowRight className="w-5 lg:w-6 h-5 lg:h-6 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    
                    <button 
                      onClick={() => scrollToSection('reformas')}
                      className="group px-6 lg:px-8 py-3 lg:py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 text-white font-bold text-base lg:text-lg rounded-full hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3 touch-manipulation"
                    >
                      <span>VER PROPUESTAS</span>
                      <ArrowRight className="w-5 lg:w-6 h-5 lg:h-6 group-hover:translate-x-1 transition-transform" />
                    </button>
                    
                    <button 
                      onClick={() => scrollToSection('historia')}
                      className="group px-6 lg:px-8 py-3 lg:py-4 border-2 lg:border-3 border-white text-white font-bold text-base lg:text-lg rounded-full hover:bg-white hover:text-gray-900 transition-all duration-300 flex items-center justify-center space-x-3 touch-manipulation"
                    >
                      <Play className="w-5 lg:w-6 h-5 lg:h-6" />
                      <span>MI HISTORIA</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Stats Dashboard */}
              <div className="space-y-4 lg:space-y-6">
                <div className="grid grid-cols-2 gap-3 lg:gap-6">
                  <div className="bg-white/10 backdrop-blur-md rounded-xl lg:rounded-2xl p-3 lg:p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 group">
                    <div className="flex flex-col lg:flex-row items-center lg:space-x-4 space-y-2 lg:space-y-0">
                      <div className="p-2 lg:p-3 bg-blue-500/20 rounded-full">
                        <Cpu className="w-5 lg:w-8 h-5 lg:h-8 text-blue-400" />
                      </div>
                      <div className="text-center lg:text-left">
                        <div className="text-xl lg:text-3xl font-black text-white group-hover:scale-110 transition-transform">2 min</div>
                        <div className="text-xs lg:text-sm text-gray-300">Trámites con IA</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-md rounded-xl lg:rounded-2xl p-3 lg:p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 group">
                    <div className="flex flex-col lg:flex-row items-center lg:space-x-4 space-y-2 lg:space-y-0">
                      <div className="p-2 lg:p-3 bg-green-500/20 rounded-full">
                        <DollarSign className="w-5 lg:w-8 h-5 lg:h-8 text-green-400" />
                      </div>
                      <div className="text-center lg:text-left">
                        <div className="text-xl lg:text-3xl font-black text-white group-hover:scale-110 transition-transform">$50K</div>
                        <div className="text-xs lg:text-sm text-gray-300">Más al mes</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-md rounded-xl lg:rounded-2xl p-3 lg:p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 group">
                    <div className="flex flex-col lg:flex-row items-center lg:space-x-4 space-y-2 lg:space-y-0">
                      <div className="p-2 lg:p-3 bg-orange-500/20 rounded-full">
                        <Shield className="w-5 lg:w-8 h-5 lg:h-8 text-orange-400" />
                      </div>
                      <div className="text-center lg:text-left">
                        <div className="text-xl lg:text-3xl font-black text-white group-hover:scale-110 transition-transform">50%</div>
                        <div className="text-xs lg:text-sm text-gray-300">Menos delitos</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-md rounded-xl lg:rounded-2xl p-3 lg:p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 group">
                    <div className="flex flex-col lg:flex-row items-center lg:space-x-4 space-y-2 lg:space-y-0">
                      <div className="p-2 lg:p-3 bg-purple-500/20 rounded-full">
                        <Heart className="w-5 lg:w-8 h-5 lg:h-8 text-purple-400" />
                      </div>
                      <div className="text-center lg:text-left">
                        <div className="text-xl lg:text-3xl font-black text-white group-hover:scale-110 transition-transform">57K</div>
                        <div className="text-xs lg:text-sm text-gray-300">Profesores pagados</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                  <h3 className="text-2xl font-bold text-white mb-4">Chile Digital 2030</h3>
                  <p className="text-gray-300 mb-6">
                    Un país donde la tecnología trabaja para las personas, no al revés. 
                    Donde la innovación reduce costos y la tradición fortalece nuestra identidad.
                  </p>
                  <div className="flex space-x-4">
                    <div className="flex-1 bg-white/10 rounded-lg p-3 text-center">
                      <div className="text-lg font-bold text-cyan-400">IA</div>
                      <div className="text-xs text-gray-400">Automatización</div>
                    </div>
                    <div className="flex-1 bg-white/10 rounded-lg p-3 text-center">
                      <div className="text-lg font-bold text-green-400">+</div>
                      <div className="text-xs text-gray-400">Economía</div>
                    </div>
                    <div className="flex-1 bg-white/10 rounded-lg p-3 text-center">
                      <div className="text-lg font-bold text-purple-400">=</div>
                      <div className="text-xs text-gray-400">Progreso</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-10 h-10 text-white" />
          </div>
        </section>

        {/* Reformas Section with Links */}
        <section id="reformas" className="py-24 bg-gray-900 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900"></div>
            <div 
              className="absolute top-0 left-0 w-full h-full opacity-10"
              style={{
                backgroundImage: `radial-gradient(circle at ${mousePosition.x * 0.1}px ${mousePosition.y * 0.1}px, rgba(59, 130, 246, 0.3) 0%, transparent 50%)`
              }}
            ></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 text-white font-semibold mb-6">
                <Zap className="w-5 h-5" />
                <span>TRANSFORMACIÓN TOTAL</span>
              </div>
              
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-8">
                5 Reformas con 
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"> Beneficios Reales</span>
              </h2>
              
              <p className="text-xl sm:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Cada reforma incluye ejemplos concretos de cómo mejorará tu vida diaria. 
                Con números reales, plazos definidos y beneficios que puedes calcular.
              </p>
            </div>

            <div className="space-y-12">
              {reformas.map((reforma, index) => (
                <div key={index} className="group">
                  <div className="bg-white rounded-3xl overflow-hidden shadow-2xl hover:shadow-4xl transition-all duration-500 transform hover:scale-[1.02]">
                    <div className="flex flex-col xl:flex-row">
                      {/* Icon Section */}
                      <div className={`xl:w-2/5 bg-gradient-to-br ${reforma.color} p-12 flex items-center justify-center text-white relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-black/10"></div>
                        <div className="relative z-10 text-center max-w-sm">
                          <div className="mb-6 flex justify-center transform group-hover:scale-110 transition-transform duration-300">
                            {reforma.icon}
                          </div>
                          <h3 className="text-3xl sm:text-4xl font-black mb-3">{reforma.title}</h3>
                          <p className="text-xl opacity-90 mb-8">{reforma.subtitle}</p>
                          
                          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
                            <div className="text-4xl font-black mb-2">{reforma.metric}</div>
                            <div className="text-lg font-semibold opacity-90">{reforma.detail}</div>
                          </div>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="xl:w-3/5 p-12">
                        <p className="text-xl text-gray-700 leading-relaxed mb-8">
                          {reforma.description}
                        </p>
                        
                        <div className="space-y-4 mb-8">
                          {reforma.features.map((feature, idx) => (
                            <div key={idx} className="flex items-start space-x-4">
                              <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-lg text-gray-600">{feature}</span>
                            </div>
                          ))}
                        </div>

                        {/* Ejemplo Real */}
                        {reforma.ejemplo && (
                          <div className="bg-gray-50 rounded-2xl p-6 mb-8">
                            <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                              <Star className="w-5 h-5 text-yellow-500" />
                              Ejemplo Real
                            </h4>
                            <p className="text-gray-700 italic">{reforma.ejemplo}</p>
                          </div>
                        )}

                        {/* Reformas Secundarias */}
                        {reforma.secundarias && (
                          <div className="mb-8">
                            <h4 className="text-lg font-bold text-gray-900 mb-4">También incluye:</h4>
                            <div className="space-y-2">
                              {reforma.secundarias.map((secundaria, idx) => (
                                <div key={idx} className="flex items-start space-x-3">
                                  <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                                  <span className="text-gray-600">{secundaria}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        <Link 
                          to={reforma.link}
                          className="group/btn inline-flex items-center space-x-3 text-blue-600 font-bold text-lg hover:text-blue-800 transition-colors"
                        >
                          <span>Ver plan completo</span>
                          <ArrowRight className="w-6 h-6 group-hover/btn:translate-x-2 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Vision Section */}
      <section id="vision" className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 bg-blue-100 rounded-full px-6 py-3 text-blue-800 font-semibold mb-6">
              <Cpu className="w-5 h-5" />
              <span>VISIÓN 2030</span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-8">
              El Futuro es 
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 bg-clip-text text-transparent"> Ahora</span>
            </h2>
            
            <p className="text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Un Chile que lidera la revolución tecnológica mundial, donde cada ciudadano 
              tiene acceso a servicios digitales de clase mundial y la prosperidad se distribuye justamente.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
            {[
              {
                number: "2026",
                title: "Automatización Masiva",
                description: "100% de trámites básicos automatizados con IA. Chile líder en gobierno digital.",
                icon: <Cpu className="w-12 h-12" />,
                color: "from-blue-500 to-cyan-500"
              },
              {
                number: "2027",
                title: "Economía Renovada",
                description: "Costo de vida reducido 15%. Empleo formal masivo. Sueldo mínimo digno universal.",
                icon: <TrendingUp className="w-12 h-12" />,
                color: "from-green-500 to-emerald-500"
              },
              {
                number: "2030",
                title: "Chile Unido",
                description: "Modelo mundial de integración cultural. Araucanía próspera. Sociedad cohesionada.",
                icon: <Heart className="w-12 h-12" />,
                color: "from-purple-500 to-pink-500"
              }
            ].map((vision, index) => (
              <div key={index} className="group">
                <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-gray-100">
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${vision.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {vision.icon}
                  </div>
                  
                  <div className="text-3xl font-black text-gray-900 mb-2">{vision.number}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{vision.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{vision.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section - Estilo Americano */}
      <section id="impacto" className="py-24 bg-gradient-to-br from-blue-50 to-purple-50 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-64 h-64 bg-blue-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 bg-blue-600 rounded-full px-6 py-3 text-white font-semibold mb-6">
              <Star className="w-5 h-5" />
              <span>IMPACTO REAL</span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-8">
              Números que 
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Importan</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="bg-white rounded-3xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Tu Familia Ahorra</h3>
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">IVA Canasta Básica (5%)</span>
                    <span className="text-2xl font-bold text-green-600">-$50,000/mes</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Trámites Automatizados</span>
                    <span className="text-2xl font-bold text-blue-600">-20 horas/año</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Sueldo Mínimo Digno</span>
                    <span className="text-2xl font-bold text-purple-600">+$470,000</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-gray-900">Total Beneficio</span>
                      <span className="text-3xl font-black text-green-600">+$520,000/mes</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {[
                { value: "2 min", label: "Renovar carnet", color: "text-blue-600" },
                { value: "5 min", label: "Registrar empresa", color: "text-purple-600" },
                { value: "1 min", label: "Certificado nacimiento", color: "text-green-600" },
                { value: "3 min", label: "Permiso construcción", color: "text-orange-600" },
                { value: "24/7", label: "Servicios disponibles", color: "text-cyan-600" },
                { value: "0%", label: "Corrupción trámites", color: "text-red-600" }
              ].map((stat, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <div className={`text-3xl font-black mb-2 ${stat.color}`}>{stat.value}</div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Historia Personal - Más Cinematográfico */}
      <section id="historia" className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full px-6 py-3 text-blue-800 font-semibold">
                  <Heart className="w-5 h-5" />
                  <span>MI HISTORIA</span>
                </div>
                
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900">
                  Un Puente entre 
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Mundos</span>
                </h2>
              </div>

              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p className="text-xl">
                  <span className="font-bold text-gray-900">Ingeniero en Informática.</span> He visto cómo la tecnología 
                  puede transformar vidas cuando se usa con propósito.
                </p>
                <p className="text-xl">
                  <span className="font-bold text-gray-900">Emprendedor.</span> Entiendo los desafíos reales de crear 
                  valor en una economía que debe funcionar para todos.
                </p>
                <p className="text-xl">
                  <span className="font-bold text-gray-900">Mapuche.</span> Conozco la riqueza de nuestra diversidad 
                  y el poder de la unidad sin uniformidad.
                </p>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
                <blockquote className="text-2xl font-semibold text-gray-900 italic">
                  "Chile necesita un líder que entienda tanto el código como la cultura, 
                  que pueda automatizar procesos y humanizar políticas."
                </blockquote>
                <cite className="block mt-4 text-lg text-gray-600">— Juan Pablo Melinao González</cite>
              </div>

              <button 
                onClick={() => scrollToSection('vision')}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg rounded-full hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-3"
              >
                <span>Conoce mi visión completa</span>
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-blue-900 to-purple-900 rounded-3xl p-12 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20"></div>
                
                <div className="relative z-10 space-y-8">
                  <div className="text-center">
                    <div className="w-32 h-32 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mx-auto flex items-center justify-center mb-6 shadow-2xl">
                      <span className="text-4xl font-black text-white">JM</span>
                    </div>
                    <h3 className="text-3xl font-black">Juan Pablo Melinao González</h3>
                    <p className="text-xl text-gray-300">Candidato Presidencial 2026</p>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                      <div className="text-3xl font-black text-cyan-400">10+</div>
                      <div className="text-sm text-gray-300">Años Tech</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                      <div className="text-3xl font-black text-blue-400">5</div>
                      <div className="text-sm text-gray-300">Reformas</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                      <div className="text-3xl font-black text-purple-400">1</div>
                      <div className="text-sm text-gray-300">Chile</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <Cpu className="w-8 h-8 text-cyan-400" />
                      <span className="text-lg">Ingeniero en Informática</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <TrendingUp className="w-8 h-8 text-blue-400" />
                      <span className="text-lg">Emprendedor Serial</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Heart className="w-8 h-8 text-purple-400" />
                      <span className="text-lg">Líder Mapuche</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action - Estilo Campaña USA */}
      <section id="accion" className="py-24 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  opacity: Math.random() * 0.3
                }}
              ></div>
            ))}
          </div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 text-white font-semibold">
              <Star className="w-5 h-5 text-yellow-400" />
              <span>EL MOMENTO ES AHORA</span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-tight">
              <span className="block">CHILE NOS</span>
              <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                NECESITA UNIDOS
              </span>
            </h2>
            
            <p className="text-xl sm:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
              Este es el momento de la transformación. Únete a un movimiento que combina 
              tecnología de punta con justicia social. Juntos construiremos el Chile próspero y unido que todos merecemos.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
              <button 
                onClick={() => window.open('mailto:contacto@melinao2026.cl?subject=Quiero apoyar la campaña Melinao 2026', '_blank')}
                className="group px-12 py-6 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 text-white font-black text-xl rounded-full hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-4"
              >
                <span>APOYAR CAMPAÑA</span>
                <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
              </button>
              
              <button 
                onClick={() => window.open('mailto:voluntarios@melinao2026.cl?subject=Quiero ser voluntario - Melinao 2026', '_blank')}
                className="px-12 py-6 border-3 border-white text-white font-black text-xl rounded-full hover:bg-white hover:text-gray-900 transition-all duration-300"
              >
                SER VOLUNTARIO
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-16 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-4">Dona</h3>
                <p className="text-gray-300 mb-6">Financia el cambio tecnológico que Chile necesita</p>
                <button 
                  onClick={() => alert('Sistema de donaciones en desarrollo. Mientras tanto, puedes contactarnos en contacto@melinao2026.cl')}
                  className="w-full px-6 py-3 bg-white text-gray-900 font-semibold rounded-full hover:bg-gray-100 transition-colors"
                >
                  Contribuir
                </button>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-4">Voluntario</h3>
                <p className="text-gray-300 mb-6">Sé parte activa de la transformación digital</p>
                <button 
                  onClick={() => window.open('mailto:voluntarios@melinao2026.cl?subject=Formulario de Voluntariado&body=Nombre:%0D%0ARegión:%0D%0AÁrea de interés:%0D%0ADisponibilidad:%0D%0ATe contactaremos en 24-48 horas.', '_blank')}
                  className="w-full px-6 py-3 bg-white text-gray-900 font-semibold rounded-full hover:bg-gray-100 transition-colors"
                >
                  Unirse
                </button>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-4">Comparte</h3>
                <p className="text-gray-300 mb-6">Difunde la visión de un Chile innovador</p>
                <button 
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: 'Juan Pablo Melinao 2026 - Presidente de Chile',
                        text: 'Conoce las propuestas de Juan Pablo Melinao para Chile 2026: Tecnología para Todos, Unidad para Chile',
                        url: window.location.href
                      });
                    } else {
                      navigator.clipboard.writeText(window.location.href);
                      alert('¡Enlace copiado! Compártelo en tus redes sociales.');
                    }
                  }}
                  className="w-full px-6 py-3 bg-white text-gray-900 font-semibold rounded-full hover:bg-gray-100 transition-colors"
                >
                  Compartir
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
            <Link to="/" className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">JM</span>
              </div>
              <div>
                <div className="text-white font-bold text-xl">Melinao 2026</div>
                <div className="text-gray-400 text-sm">Tecnología para Todos, Unidad para Chile</div>
              </div>
            </Link>
            
            <div className="text-gray-400 text-center lg:text-right">
              <p>&copy; 2025 Campaña Juan Pablo Melinao González</p>
              <p className="text-sm">Autorizada por el Servicio Electoral de Chile</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Consultas Ciudadanas */}
      <ConsultasCiudadanas 
        tema="general" 
        titulo="Participa en la Construcción del Chile que Queremos"
        descripcion="Tu voz es fundamental. Comparte tus ideas para mejorar nuestro país"
        showStats={true}
      />

      </div>
    </SEOWrapper>
  );
};

export default HomePage;