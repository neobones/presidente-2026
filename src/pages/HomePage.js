import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Cpu, DollarSign, Shield, Users, Heart, ArrowRight, Menu, X, Play, Star, Zap, Globe, TrendingUp } from 'lucide-react';
import SEOWrapper from '../components/SEOWrapper';
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
      subtitle: "Revolución Digital",
      description: "Automatización completa de servicios públicos. Trámites en 5 minutos, no 5 semanas.",
      metric: "$500 mil millones",
      detail: "ahorro anual",
      color: "from-cyan-500 to-blue-600",
      bgColor: "bg-gradient-to-br from-cyan-50 to-blue-50",
      features: ["Registro Civil automatizado", "SII con IA predictiva", "Notarías digitales 24/7"],
      link: "/reformas/automatizacion-estado-inteligencia-artificial"
    },
    {
      icon: <DollarSign className="w-12 h-12" />,
      title: "Economía Real",
      subtitle: "Más Plata en tu Bolsillo",
      description: "IVA 5% canasta básica. Sueldo mínimo $900k. Formalización que genera empleos.",
      metric: "10% menos",
      detail: "costo de vida",
      color: "from-emerald-500 to-green-600",
      bgColor: "bg-gradient-to-br from-emerald-50 to-green-50",
      features: ["IVA reducido productos básicos", "Sueldo mínimo digno", "Formalización masiva"],
      link: "/reformas/reduccion-costo-vida-impuestos"
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: "Fronteras Inteligentes",
      subtitle: "Seguridad + Humanidad",
      description: "Tecnología satelital en fronteras. Acuerdos internacionales. Prevención, no represión.",
      metric: "50% menos",
      detail: "migración ilegal",
      color: "from-orange-500 to-red-600",
      bgColor: "bg-gradient-to-br from-orange-50 to-red-50",
      features: ["Drones en fronteras", "Centros humanitarios", "Acuerdos Bolivia-Perú"],
      link: "/reformas/fronteras-seguras-migracion-controlada"
    },
    {
      icon: <Heart className="w-12 h-12" />,
      title: "Justicia Histórica",
      subtitle: "Pagamos las Deudas",
      description: "Deuda histórica profesores. Fin de privilegios políticos. Equidad real para todos.",
      metric: "57,000",
      detail: "profesores beneficiados",
      color: "from-purple-500 to-pink-600",
      bgColor: "bg-gradient-to-br from-purple-50 to-pink-50",
      features: ["$4.5 millones por profesor", "Fin sueldos vitalicios", "Salud y educación dignas"],
      link: "/reformas/justicia-social-profesores-privilegios"
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: "Chile Unido",
      subtitle: "Diversidad es Fortaleza",
      description: "Desarrollo en La Araucanía. Reconocimiento cultural. Diálogo, no confrontación.",
      metric: "$300 mil millones",
      detail: "inversión desarrollo",
      color: "from-indigo-500 to-violet-600",
      bgColor: "bg-gradient-to-br from-indigo-50 to-violet-50",
      features: ["Desarrollo Araucanía", "Educación intercultural", "Consejo Reconciliación"],
      link: "/reformas/unidad-nacional-araucania-desarrollo"
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
        {/* Enhanced Navigation */}
        <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md shadow-xl z-50 border-b border-gray-100">
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
              <div className="hidden lg:flex space-x-12">
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

              <div className="hidden lg:flex items-center space-x-4">
                <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                  Únete Ya
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden bg-white/95 backdrop-blur-md shadow-2xl border-t border-gray-100">
              <div className="px-4 py-6 space-y-4">
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
                    className="block w-full text-left px-4 py-3 text-lg font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300"
                  >
                    {item.name}
                  </button>
                ))}
                <button className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full mt-4">
                  Únete Ya
                </button>
              </div>
            </div>
          )}
        </nav>

        {/* Rest of the HomePage component content would go here - I'll include just the hero section for brevity */}
        {/* Hero Section - Cinematográfico */}
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen">
              {/* Text Content */}
              <div className="text-center lg:text-left space-y-8">
                <div className="space-y-4">
                  <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 text-white">
                    <Star className="w-5 h-5 text-yellow-400" />
                    <span className="font-semibold">CANDIDATO PRESIDENCIAL 2026</span>
                  </div>
                  
                  <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-tight">
                    <span className="block text-white mb-2">CHILE</span>
                    <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
                      INNOVADOR
                    </span>
                  </h1>
                  
                  <p className="text-xl sm:text-2xl lg:text-3xl text-gray-200 font-light max-w-2xl">
                    <span className="font-bold text-white">Juan Pablo Melinao González</span>
                    <br />
                    Ingeniero • Emprendedor • Mapuche
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="text-lg sm:text-xl text-gray-300 max-w-xl">
                    Tecnología para automatizar el Estado. Economía para tu bolsillo. 
                    Unidad para construir el Chile que todos merecemos.
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button 
                      onClick={() => scrollToSection('vision')}
                      className="group px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 text-white font-bold text-lg rounded-full hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3"
                    >
                      <span>VER PROPUESTAS</span>
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </button>
                    
                    <button 
                      onClick={() => scrollToSection('historia')}
                      className="group px-8 py-4 border-3 border-white text-white font-bold text-lg rounded-full hover:bg-white hover:text-gray-900 transition-all duration-300 flex items-center justify-center space-x-3"
                    >
                      <Play className="w-6 h-6" />
                      <span>MI HISTORIA</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Stats Dashboard */}
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 group">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-blue-500/20 rounded-full">
                        <Zap className="w-8 h-8 text-blue-400" />
                      </div>
                      <div>
                        <div className="text-3xl font-black text-white group-hover:scale-110 transition-transform">$500B</div>
                        <div className="text-sm text-gray-300">Ahorro con IA</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 group">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-green-500/20 rounded-full">
                        <TrendingUp className="w-8 h-8 text-green-400" />
                      </div>
                      <div>
                        <div className="text-3xl font-black text-white group-hover:scale-110 transition-transform">70%</div>
                        <div className="text-sm text-gray-300">Buscan alivio</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 group">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-purple-500/20 rounded-full">
                        <Globe className="w-8 h-8 text-purple-400" />
                      </div>
                      <div>
                        <div className="text-3xl font-black text-white group-hover:scale-110 transition-transform">50%</div>
                        <div className="text-sm text-gray-300">Menos trámites</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 group">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-yellow-500/20 rounded-full">
                        <Heart className="w-8 h-8 text-yellow-400" />
                      </div>
                      <div>
                        <div className="text-3xl font-black text-white group-hover:scale-110 transition-transform">57K</div>
                        <div className="text-sm text-gray-300">Profesores</div>
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
                5 Reformas que 
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"> Cambian Todo</span>
              </h2>
              
              <p className="text-xl sm:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Propuestas concretas, con números reales y plazos definidos. 
                No son promesas: son compromisos técnicamente viables.
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
                            <div key={idx} className="flex items-center space-x-4">
                              <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                              <span className="text-lg text-gray-600">{feature}</span>
                            </div>
                          ))}
                        </div>
                        
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

        {/* Continue with other sections... */}
      </div>
    </SEOWrapper>
  );
};

export default HomePage;