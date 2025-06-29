import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle, Cpu, Clock, DollarSign, Users, Zap, TrendingUp, Shield, Globe, BarChart3, Smartphone, Monitor, Building2, MapPin, Star } from 'lucide-react';
import SEOWrapper from '../components/SEOWrapper';
import { seoConfigs } from '../data/seoConfigs';

const AutomatizacionIA = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState('registro');

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

  const beneficios = [
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Trámites en Minutos",
      description: "De semanas a 5 minutos con IA",
      metric: "99.9%",
      detail: "reducción tiempo",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Ahorro Masivo",
      description: "$500 mil millones anuales",
      metric: "$1.65T",
      detail: "inversión total",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Acceso Universal",
      description: "24/7 desde cualquier región",
      metric: "100%",
      detail: "disponibilidad",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Seguridad Total",
      description: "Blockchain + Fuerzas Armadas",
      metric: "0%",
      detail: "corrupción",
      color: "from-orange-500 to-red-500"
    }
  ];

  const procesos = [
    {
      id: 'registro',
      name: 'Registro Civil',
      icon: <Building2 className="w-12 h-12" />,
      ahorro: '$100 mil millones',
      tiempo: '2 minutos',
      descripcion: 'Registros de nacimiento, matrimonio y defunción automatizados con IA',
      caracteristicas: [
        'Validación automática de documentos',
        'Certificados instantáneos',
        'Integración con hospitales',
        'Archivo digital permanente'
      ]
    },
    {
      id: 'sii',
      name: 'SII',
      icon: <BarChart3 className="w-12 h-12" />,
      ahorro: '$150 mil millones',
      tiempo: '5 minutos',
      descripcion: 'Auditorías automáticas y asesoramiento tributario personalizado',
      caracteristicas: [
        'Detección automática de fraudes',
        'Asesoramiento tributario IA',
        'Declaraciones pre-llenadas',
        'Recaudación optimizada 10%'
      ]
    },
    {
      id: 'notarias',
      name: 'Notarías',
      icon: <Monitor className="w-12 h-12" />,
      ahorro: '$200 mil millones',
      tiempo: '3 minutos',
      descripcion: 'Autenticación digital con blockchain y IA',
      caracteristicas: [
        'Documentos 100% digitales',
        'Autenticación blockchain',
        'Validación biométrica',
        'Archivo inmutable'
      ]
    }
  ];

  const regiones = [
    {
      name: 'Santiago',
      poblacion: '7.1M',
      impacto: '$200B ahorro',
      enfoque: 'Centro de operaciones IA',
      icon: <Building2 className="w-6 h-6" />
    },
    {
      name: 'Araucanía',
      poblacion: '1M',
      impacto: '$30B desarrollo',
      enfoque: 'Inclusión digital mapuche',
      icon: <MapPin className="w-6 h-6" />
    },
    {
      name: 'Antofagasta',
      poblacion: '650K',
      impacto: '$50B minería',
      enfoque: 'Automatización minera',
      icon: <Globe className="w-6 h-6" />
    },
    {
      name: 'Valparaíso',
      poblacion: '1.8M',
      impacto: '$80B puertos',
      enfoque: 'Comercio exterior digital',
      icon: <TrendingUp className="w-6 h-6" />
    }
  ];

  const timeline = [
    {
      fase: 'Primeros 100 días',
      titulo: 'Pilotos Inmediatos',
      items: ['Registro Civil online', 'SII auditorías IA', 'Centro Nacional IA']
    },
    {
      fase: 'Año 1-2',
      titulo: 'Expansión Nacional',
      items: ['Notarías digitales', 'RSH automatizado', 'Capacitación 50K empleados']
    },
    {
      fase: 'Año 3-5',
      titulo: 'Chile Digital Total',
      items: ['90% trámites automatizados', 'Conectividad rural', 'IA políticas públicas']
    }
  ];

  const parallaxOffset = scrollY * 0.3;

  return (
    <SEOWrapper seoConfig={seoConfigs.automatizacion}>
      <div className="min-h-screen bg-gray-50 overflow-x-hidden">
        
        {/* Hero Section - Estilo campaña USA */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
          {/* Dynamic Background */}
          <div className="absolute inset-0">
            <div 
              className="absolute inset-0"
              style={{ transform: `translateY(${parallaxOffset}px)` }}
            >
              <div className="absolute inset-0 bg-black/30"></div>
            </div>
            
            {/* Floating Tech Elements */}
            <div 
              className="absolute top-20 left-10 w-40 h-40 bg-blue-500/20 rounded-full blur-xl animate-pulse"
              style={{ transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)` }}
            ></div>
            <div 
              className="absolute bottom-20 right-10 w-60 h-60 bg-cyan-500/20 rounded-full blur-xl animate-pulse delay-700"
              style={{ transform: `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * -0.01}px)` }}
            ></div>
            
            {/* Tech Grid Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="grid grid-cols-12 h-full">
                {[...Array(144)].map((_, i) => (
                  <div key={i} className="border border-blue-400/20 animate-pulse" style={{animationDelay: `${i * 50}ms`}}></div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 text-white">
                <Cpu className="w-5 h-5 text-cyan-400" />
                <span className="font-semibold">REFORMA #1: AUTOMATIZACIÓN IA</span>
              </div>
              
              {/* Main Title */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black leading-tight text-white">
                <span className="block">CHILE</span>
                <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  DIGITAL 2026
                </span>
              </h1>
              
              {/* Subtitle */}
              <p className="text-xl sm:text-2xl lg:text-3xl text-gray-200 max-w-4xl mx-auto">
                <span className="font-bold text-white">Inteligencia Artificial</span> para revolucionar el Estado.
                <br />
                <span className="text-cyan-300">Trámites en minutos, ahorro de $500 mil millones.</span>
              </p>

              {/* Key Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
                {beneficios.map((beneficio, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center hover:bg-white/20 transition-all duration-300 group">
                    <div className={`inline-flex p-3 rounded-full bg-gradient-to-r ${beneficio.color} text-white mb-4 group-hover:scale-110 transition-transform`}>
                      {beneficio.icon}
                    </div>
                    <div className="text-2xl font-black text-white mb-1">{beneficio.metric}</div>
                    <div className="text-sm text-gray-300">{beneficio.detail}</div>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="group px-8 py-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 text-white font-bold text-lg rounded-full hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3">
                  <span>VER PLAN COMPLETO</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </button>
                
                <button className="px-8 py-4 border-2 border-white text-white font-bold text-lg rounded-full hover:bg-white hover:text-gray-900 transition-all duration-300">
                  SIMULAR TRÁMITE IA
                </button>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="flex flex-col items-center space-y-2 text-white">
              <span className="text-sm">Descubre cómo</span>
              <ArrowRight className="w-6 h-6 rotate-90" />
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="space-y-6">
                  <div className="inline-flex items-center space-x-2 bg-red-100 rounded-full px-6 py-3 text-red-800 font-semibold">
                    <Zap className="w-5 h-5" />
                    <span>PROBLEMA ACTUAL</span>
                  </div>
                  
                  <h2 className="text-4xl sm:text-5xl font-black text-gray-900">
                    El Estado 
                    <span className="text-red-600"> te hace perder</span> tiempo y dinero
                  </h2>
                  
                  <p className="text-xl text-gray-600 leading-relaxed">
                    Solo el <span className="font-bold text-gray-900">43% de los trámites</span> están 
                    completamente digitalizados. Los chilenos pierden <span className="font-bold text-red-600">semanas 
                    en burocracia</span> que podrían resolverse en minutos con Inteligencia Artificial.
                  </p>
                </div>

                <div className="space-y-4">
                  {[
                    'Renovar carnet: 2-3 semanas → Con IA: 2 minutos',
                    'Registrar empresa: 1-2 meses → Con IA: 5 minutos', 
                    'Certificado nacimiento: 1 semana → Con IA: 1 minuto',
                    'Permiso construcción: 3-6 meses → Con IA: 3 minutos'
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-red-600 font-bold text-sm">{index + 1}</span>
                      </div>
                      <span className="text-lg text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-3xl p-8 border border-red-100">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Costos de la Burocracia</h3>
                  <div className="space-y-6">
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                      <div className="text-3xl font-black text-red-600 mb-2">$1.65 Trillones</div>
                      <div className="text-gray-600">Costo anual operativo actual</div>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                      <div className="text-3xl font-black text-orange-600 mb-2">154M Horas</div>
                      <div className="text-gray-600">Tiempo perdido ciudadanos/año</div>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                      <div className="text-3xl font-black text-red-600 mb-2">57%</div>
                      <div className="text-gray-600">Procesos NO automatizados</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Solution Section - Interactive Tabs */}
        <section className="py-24 bg-gradient-to-br from-blue-50 to-cyan-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 bg-blue-600 rounded-full px-6 py-3 text-white font-semibold mb-6">
                <Cpu className="w-5 h-5" />
                <span>SOLUCIÓN IA</span>
              </div>
              
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-8">
                Automatización
                <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent"> Total</span>
              </h2>
            </div>

            {/* Tabs Navigation */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {procesos.map((proceso) => (
                <button
                  key={proceso.id}
                  onClick={() => setActiveTab(proceso.id)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    activeTab === proceso.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white text-gray-600 hover:bg-blue-50'
                  }`}
                >
                  {proceso.name}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              {procesos.map((proceso) => (
                <div
                  key={proceso.id}
                  className={`${activeTab === proceso.id ? 'block' : 'hidden'}`}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="p-12 bg-gradient-to-br from-blue-600 to-cyan-500 text-white">
                      <div className="flex items-center space-x-4 mb-6">
                        <div className="p-4 bg-white/20 rounded-full">
                          {proceso.icon}
                        </div>
                        <div>
                          <h3 className="text-3xl font-black">{proceso.name}</h3>
                          <p className="text-blue-100">Automatizado con IA</p>
                        </div>
                      </div>
                      
                      <p className="text-xl mb-8 text-blue-50">
                        {proceso.descripcion}
                      </p>

                      <div className="grid grid-cols-2 gap-6">
                        <div className="bg-white/10 rounded-xl p-4">
                          <div className="text-2xl font-black">{proceso.ahorro}</div>
                          <div className="text-blue-200">Ahorro anual</div>
                        </div>
                        <div className="bg-white/10 rounded-xl p-4">
                          <div className="text-2xl font-black">{proceso.tiempo}</div>
                          <div className="text-blue-200">Tiempo trámite</div>
                        </div>
                      </div>
                    </div>

                    <div className="p-12">
                      <h4 className="text-2xl font-bold text-gray-900 mb-6">Características</h4>
                      <div className="space-y-4">
                        {proceso.caracteristicas.map((caracteristica, index) => (
                          <div key={index} className="flex items-center space-x-4">
                            <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                            <span className="text-lg text-gray-700">{caracteristica}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-8 p-6 bg-gray-50 rounded-xl">
                        <h5 className="font-bold text-gray-900 mb-2">Impacto Directo</h5>
                        <p className="text-gray-600">
                          Cada ciudadano ahorrará <span className="font-bold text-blue-600">80% del tiempo</span> y 
                          <span className="font-bold text-green-600"> $50.000 anuales</span> en costos de trámites.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Regional Impact */}
        <section className="py-24 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 text-white font-semibold mb-6">
                <MapPin className="w-5 h-5" />
                <span>IMPACTO REGIONAL</span>
              </div>
              
              <h2 className="text-4xl sm:text-5xl font-black text-white mb-8">
                De
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"> Arica a Punta Arenas</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {regiones.map((region, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center hover:bg-white/20 transition-all duration-300 group">
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    <div className="p-2 bg-blue-500/20 rounded-full">
                      {region.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white">{region.name}</h3>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="text-2xl font-black text-cyan-400">{region.poblacion}</div>
                      <div className="text-sm text-gray-300">habitantes</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-green-400">{region.impacto}</div>
                      <div className="text-sm text-gray-300">impacto económico</div>
                    </div>
                    <div className="pt-4 border-t border-white/20">
                      <div className="text-sm text-white font-semibold">{region.enfoque}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Implementation Timeline */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-8">
                Plan de
                <span className="text-blue-600"> Implementación</span>
              </h2>
            </div>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-cyan-500"></div>

              <div className="space-y-16">
                {timeline.map((fase, index) => (
                  <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className="w-1/2 px-8">
                      <div className={`bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-8 shadow-lg ${index % 2 === 0 ? 'mr-8' : 'ml-8'}`}>
                        <div className="text-sm font-bold text-blue-600 mb-2">{fase.fase}</div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">{fase.titulo}</h3>
                        <div className="space-y-2">
                          {fase.items.map((item, idx) => (
                            <div key={idx} className="flex items-center space-x-3">
                              <Star className="w-4 h-4 text-blue-500" />
                              <span className="text-gray-700">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-lg relative z-10">
                      {index + 1}
                    </div>
                    
                    <div className="w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-24 bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-500">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="space-y-8">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight">
                <span className="block">EL FUTURO</span>
                <span className="block">ES AHORA</span>
              </h2>
              
              <p className="text-xl sm:text-2xl text-white/90 max-w-4xl mx-auto">
                Únete a la revolución digital que transformará Chile. 
                Con IA, haremos un Estado eficiente que trabaje para ti.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
                <button className="px-12 py-6 bg-white text-blue-600 font-black text-xl rounded-full hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                  APOYAR ESTA REFORMA
                </button>
                
                <button className="px-12 py-6 border-2 border-white text-white font-black text-xl rounded-full hover:bg-white hover:text-blue-600 transition-all duration-300">
                  COMPARTIR PROPUESTA
                </button>
              </div>
            </div>
          </div>
        </section>

      </div>
    </SEOWrapper>
  );
};

export default AutomatizacionIA;