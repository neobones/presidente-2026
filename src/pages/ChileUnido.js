import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle, Heart, Users, Trees, Globe, TrendingUp, Target, BookOpen, Award, MapPin, Clock, DollarSign, AlertTriangle, Home, Play, Calculator, X, Timer, CheckSquare, FileText, Building, TreePine, Handshake, School, Baby, Briefcase, Star, Mountain, Leaf, Sun, Eye, Camera, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOWrapper from '../components/SEOWrapper';
import ConsultasCiudadanas from '../components/ConsultasCiudadanas';
import { seoConfigs } from '../data/seoConfigs';

const ChileUnido = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState('desarrollo-sostenible');
  const [activeRegion, setActiveRegion] = useState('araucania');
  const [activeFase, setActiveFase] = useState(0);
  const [showCalculator, setShowCalculator] = useState(false);
  const [showSimulator, setShowSimulator] = useState(false);
  const [simulatorStep, setSimulatorStep] = useState(0);
  const [simulatorData, setSimulatorData] = useState({
    tipoProyecto: '',
    comunidad: '',
    inversion: '',
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
      icon: <Trees className="w-8 h-8" />,
      title: "5,000",
      subtitle: "empleos turismo",
      description: "Desarrollo sostenible Araucanía",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <School className="w-8 h-8" />,
      title: "50,000",
      subtitle: "estudiantes",
      description: "Educación intercultural",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "$470B",
      subtitle: "inversión total",
      description: "Desarrollo integral región",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "80%",
      subtitle: "busca estabilidad",
      description: "Cadem 2025 - Unidad nacional",
      color: "from-orange-500 to-red-500"
    }
  ];

  const medidasUnidad = [
    {
      id: 'desarrollo-sostenible',
      name: 'Desarrollo Sostenible',
      icon: <Trees className="w-12 h-12" />,
      inversion: '$200B',
      beneficio: 'Protección ambiental integral',
      cobertura: 'Región Araucanía completa',
      descripcion: 'Reforestación y manejo sustentable de recursos',
      detalles: [
        '$100B para reforestación y protección bosques nativos',
        'Manejo sustentable de residuos en 20 comunas',
        'Reducción 15% contaminación en 5 años',
        'Monitoreo con IA para transparencia'
      ],
      ejemplo: 'Una comunidad mapuche en Temuco protegerá sus bosques sagrados mientras genera ingresos con turismo cultural'
    },
    {
      id: 'reconocimiento-cultural',
      name: 'Reconocimiento Cultural',
      icon: <Heart className="w-12 h-12" />,
      inversion: '$70B',
      beneficio: 'Educación intercultural',
      cobertura: '500 escuelas públicas',
      descripcion: 'Idioma y cultura mapuche en educación',
      detalles: [
        'Implementación idioma mapuche en 500 escuelas',
        'Capacitación 5,000 profesores cultura mapuche',
        'Materiales educativos interculturales',
        'Programas educación cívica unidad nacional'
      ],
      ejemplo: 'En Santiago, los niños aprenderán sobre la rica cultura mapuche, fortaleciendo la identidad nacional'
    },
    {
      id: 'derechos-territoriales',
      name: 'Derechos Territoriales',
      icon: <Mountain className="w-12 h-12" />,
      inversion: '$30B',
      beneficio: '5,000 familias beneficiadas',
      cobertura: 'Regularización transparente',
      descripcion: 'Proceso justo de reconocimiento territorial',
      detalles: [
        'Regularización transparente tierras mapuche',
        'Procesos participativos con comunidades',
        'Registro digital en melinao2026.cl',
        'Mediación para resolución conflictos'
      ],
      ejemplo: 'Una familia mapuche en Angol obtendrá títulos definitivos de sus tierras ancestrales'
    },
    {
      id: 'turismo-sostenible',
      name: 'Turismo Sostenible',
      icon: <Camera className="w-12 h-12" />,
      inversion: '$50B',
      beneficio: '20 centros turísticos',
      cobertura: '2,000 empleos directos',
      descripcion: 'Turismo cultural responsable',
      detalles: [
        '20 centros turísticos culturales mapuche',
        'Capacitación emprendimiento turístico',
        'Marketing digital destinos culturales',
        'Certificación turismo sustentable'
      ],
      ejemplo: 'Turistas internacionales visitarán rukas auténticas y aprenderán textilería mapuche'
    }
  ];

  const impactoRegional = [
    {
      id: 'araucania',
      nombre: 'Araucanía',
      inversion: '$300B',
      poblacion: '100,000 personas',
      empleos: '3,000 directos',
      proyectos: [
        'Consejo Regional Desarrollo Sostenible',
        '200 escuelas con educación intercultural',
        '15 centros turísticos culturales',
        'Protección 50,000 hectáreas bosque nativo'
      ],
      impacto: 'Transformación en modelo desarrollo sostenible',
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 'santiago',
      nombre: 'Santiago',
      inversion: '$100B',
      poblacion: '7.1M habitantes',
      empleos: '1,500 indirectos',
      proyectos: [
        'Educación intercultural 1M estudiantes',
        'Programas cohesión social urbana',
        'Centro Nacional Cultura Mapuche',
        'Capacitación funcionarios públicos'
      ],
      impacto: 'Mayor integración cultural nacional',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      id: 'antofagasta',
      nombre: 'Antofagasta',
      inversion: '$50B',
      poblacion: '650,000 habitantes',
      empleos: '500 directos',
      proyectos: [
        'Programas capacitación turismo',
        'Intercambio cultural norte-sur',
        'Desarrollo sustentable minero',
        'Educación ambiental escolar'
      ],
      impacto: 'Modelo integración intercultural',
      color: 'from-orange-500 to-red-600'
    }
  ];

  const fasesImplementacion = [
    {
      fase: 0,
      titulo: "Primeros 100 Días",
      descripcion: "Bases institucionales y diálogo",
      duracion: "3 meses",
      acciones: [
        "Creación Consejo Regional Desarrollo Sostenible",
        "Inicio programas reforestación piloto",
        "Implementación idioma mapuche 100 escuelas",
        "Primera mesa diálogo intercomunitario"
      ],
      presupuesto: "$100B",
      hito: "Consejo operativo y programas ambientales iniciados"
    },
    {
      fase: 1,
      titulo: "Expansión (Año 1-2)",
      descripcion: "Integración social y desarrollo",
      duracion: "24 meses",
      acciones: [
        "Regularización tierras 2,500 familias",
        "Construcción 50 escuelas interculturales",
        "Lanzamiento 10 centros turísticos",
        "Capacitación 2,500 profesores"
      ],
      presupuesto: "$200B",
      hito: "Derechos territoriales asegurados y turismo en marcha"
    },
    {
      fase: 2,
      titulo: "Consolidación (Año 3-5)",
      descripcion: "Desarrollo sostenible integral",
      duracion: "36 meses",
      acciones: [
        "Educación cívica 1,000 escuelas",
        "20 centros turísticos adicionales",
        "Evaluación participativa políticas",
        "Araucanía modelo nacional"
      ],
      presupuesto: "$170B",
      hito: "Araucanía referente desarrollo sostenible"
    }
  ];

  const calculadoraDesarrollo = (tipoProyecto, comunidad, inversion) => {
    const multipliers = {
      'centro-turistico': { empleo: 15, ingreso: 25000, impacto: 500 },
      'escuela-intercultural': { empleo: 8, ingreso: 15000, impacto: 300 },
      'proyecto-ambiental': { empleo: 12, ingreso: 20000, impacto: 400 },
      'regularizacion-tierra': { empleo: 3, ingreso: 10000, impacto: 200 }
    };
    
    const factors = {
      'rural': { factor: 1.2, nombre: 'Rural' },
      'urbana': { factor: 1.0, nombre: 'Urbana' },
      'mapuche': { factor: 1.3, nombre: 'Mapuche' },
      'mixta': { factor: 1.1, nombre: 'Mixta' }
    };
    
    const baseInversion = parseInt(inversion) || 0;
    const mult = multipliers[tipoProyecto] || multipliers['centro-turistico'];
    const fact = factors[comunidad] || factors['rural'];
    
    return {
      empleosDirectos: Math.round((baseInversion / 1000) * mult.empleo * fact.factor),
      ingresoPromedio: Math.round(mult.ingreso * fact.factor),
      familiasBeneficiadas: Math.round((baseInversion / 1000) * mult.impacto * fact.factor),
      tiempoImplementacion: tipoProyecto === 'regularizacion-tierra' ? 12 : 18,
      retornoInversion: Math.round(baseInversion * 1.8),
      impactoAmbiental: tipoProyecto === 'proyecto-ambiental' ? 'Alto' : 'Medio'
    };
  };

  const handleSimulatorNext = () => {
    if (simulatorStep === 0 && simulatorData.tipoProyecto) {
      setSimulatorStep(1);
    } else if (simulatorStep === 1 && simulatorData.comunidad) {
      setSimulatorStep(2);
    } else if (simulatorStep === 2 && simulatorData.inversion) {
      const resultado = calculadoraDesarrollo(
        simulatorData.tipoProyecto,
        simulatorData.comunidad,
        simulatorData.inversion
      );
      setSimulatorData({...simulatorData, resultado});
      setSimulatorStep(3);
    }
  };

  const resetSimulator = () => {
    setSimulatorData({
      tipoProyecto: '',
      comunidad: '',
      inversion: '',
      resultado: null
    });
    setSimulatorStep(0);
  };

  const parallaxOffset = scrollY * 0.5;

  return (
    <SEOWrapper config={seoConfigs.chileUnido}>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 overflow-hidden">
        
        {/* Background Effects */}
        <div className="fixed inset-0 z-0">
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(34, 197, 94, 0.15), transparent 40%)`
            }}
          />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%2322c55e" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" />
        </div>

        {/* Hero Section */}
        <section className="relative z-10 min-h-screen flex items-center justify-center px-4 py-20">
          <div className="max-w-7xl mx-auto text-center">
            <div className="relative">
              <div 
                className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-blue-600/20 blur-3xl"
                style={{ transform: `translateY(${parallaxOffset}px)` }}
              />
              
              <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20">
                <div className="flex items-center justify-center mb-6">
                  <div className="bg-gradient-to-r from-green-500 to-blue-500 p-4 rounded-2xl">
                    <Users className="w-12 h-12 text-white" />
                  </div>
                </div>
                
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                  <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                    Chile Unido
                  </span>
                </h1>
                
                <h2 className="text-xl md:text-2xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed">
                  Desarrollo Sostenible e Integración en la Araucanía
                </h2>
                
                <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
                  Como ingeniero mapuche, construiré un Chile donde todas las comunidades tengan oportunidades, 
                  respetando nuestra diversidad cultural y protegiendo el medio ambiente para las futuras generaciones.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                  <button
                    onClick={() => setShowSimulator(true)}
                    className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Calculator className="w-5 h-5" />
                    Simular Desarrollo Regional
                  </button>
                  <Link
                    to="/participacion-ciudadana"
                    className="bg-white text-green-600 px-8 py-4 rounded-full font-semibold border-2 border-green-600 hover:bg-green-50 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Heart className="w-5 h-5" />
                    Comparte tu Visión
                  </Link>
                </div>

                {/* Key Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {keyStats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-r ${stat.color} mb-3`}>
                        <div className="text-white">
                          {stat.icon}
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-gray-900">{stat.title}</div>
                      <div className="text-sm font-medium text-gray-700">{stat.subtitle}</div>
                      <div className="text-xs text-gray-500">{stat.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Context Section */}
        <section className="relative z-10 py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                ¿Por qué Chile necesita <span className="text-green-600">Unidad Nacional</span>?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                La Araucanía enfrenta desafíos históricos que requieren un enfoque integral de desarrollo 
                sostenible, reconocimiento cultural y cohesión social.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-red-100 p-3 rounded-xl">
                      <AlertTriangle className="w-6 h-6 text-red-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Conflictos Socioculturales</h3>
                  </div>
                  <p className="text-gray-600">
                    Tensiones históricas entre comunidades mapuche y el Estado requieren diálogo 
                    y reconocimiento de derechos territoriales y culturales.
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-orange-100 p-3 rounded-xl">
                      <TrendingUp className="w-6 h-6 text-orange-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Bajo Desarrollo Regional</h3>
                  </div>
                  <p className="text-gray-600">
                    La Araucanía tiene uno de los índices más bajos de desarrollo humano, 
                    con alta pobreza y falta de oportunidades económicas.
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-green-100 p-3 rounded-xl">
                      <Leaf className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Degradación Ambiental</h3>
                  </div>
                  <p className="text-gray-600">
                    Deforestación y contaminación afectan ecosistemas únicos. 
                    Necesitamos protección ambiental con desarrollo sustentable.
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-600 to-blue-600 rounded-3xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">Mi Compromiso como Mapuche</h3>
                <blockquote className="text-lg italic mb-6">
                  "Como emprendedor mapuche, sé lo que es unir tradición y progreso. 
                  Mi gobierno hará de la Araucanía un modelo de convivencia donde 
                  el desarrollo sostenible respete nuestra cultura ancestral."
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <div className="font-bold">Juan Pablo Melinao González</div>
                    <div className="opacity-90">Ingeniero Mapuche, Candidato Presidencial</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Medidas Section */}
        <section className="relative z-10 py-20 px-4 bg-white/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                4 Pilares para <span className="text-green-600">Chile Unido</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Una estrategia integral que combina desarrollo sostenible, reconocimiento cultural 
                y cohesión social para transformar la Araucanía.
              </p>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {medidasUnidad.map((medida) => (
                <button
                  key={medida.id}
                  onClick={() => setActiveTab(medida.id)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 ${
                    activeTab === medida.id
                      ? 'bg-green-600 text-white shadow-lg'
                      : 'bg-white text-gray-600 hover:bg-green-50'
                  }`}
                >
                  <div className="w-5 h-5">
                    {medida.icon}
                  </div>
                  {medida.name}
                </button>
              ))}
            </div>

            {/* Content */}
            {medidasUnidad.map((medida) => (
              activeTab === medida.id && (
                <div key={medida.id} className="bg-white rounded-3xl p-8 shadow-xl">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <div className="flex items-center gap-4 mb-6">
                        <div className="bg-green-100 p-4 rounded-2xl">
                          {medida.icon}
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900">{medida.name}</h3>
                          <p className="text-green-600 font-semibold">{medida.descripcion}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="text-center p-4 bg-green-50 rounded-xl">
                          <div className="text-2xl font-bold text-green-600">{medida.inversion}</div>
                          <div className="text-sm text-gray-600">Inversión</div>
                        </div>
                        <div className="text-center p-4 bg-blue-50 rounded-xl">
                          <div className="text-sm font-bold text-blue-600">{medida.beneficio}</div>
                          <div className="text-sm text-gray-600">Beneficio</div>
                        </div>
                        <div className="text-center p-4 bg-purple-50 rounded-xl">
                          <div className="text-sm font-bold text-purple-600">{medida.cobertura}</div>
                          <div className="text-sm text-gray-600">Cobertura</div>
                        </div>
                      </div>

                      <ul className="space-y-3">
                        {medida.detalles.map((detalle, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{detalle}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-6">
                      <h4 className="text-lg font-bold text-gray-900 mb-4">Ejemplo Real</h4>
                      <p className="text-gray-700 mb-6">{medida.ejemplo}</p>
                      
                      <div className="bg-white rounded-xl p-4">
                        <h5 className="font-bold text-gray-900 mb-2">Impacto Esperado:</h5>
                        <div className="flex items-center gap-2 text-green-600">
                          <Star className="w-4 h-4" />
                          <span className="text-sm font-medium">
                            {medida.id === 'desarrollo-sostenible' && '15% reducción contaminación'}
                            {medida.id === 'reconocimiento-cultural' && '50,000 estudiantes beneficiados'}
                            {medida.id === 'derechos-territoriales' && '5,000 familias con tierras seguras'}
                            {medida.id === 'turismo-sostenible' && '2,000 empleos directos creados'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            ))}
          </div>
        </section>

        {/* Economic Analysis */}
        <section className="relative z-10 py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Análisis <span className="text-green-600">Económico</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Una inversión estratégica de $470 mil millones que se autofinancia y genera 
                desarrollo sostenible para toda la región.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Costos */}
              <div className="bg-white rounded-3xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Inversión Anual</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-red-50 rounded-xl">
                    <span className="font-medium text-gray-700">Consejo Regional</span>
                    <span className="font-bold text-red-600">$50B</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-orange-50 rounded-xl">
                    <span className="font-medium text-gray-700">Protección Ambiental</span>
                    <span className="font-bold text-orange-600">$100B</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-blue-50 rounded-xl">
                    <span className="font-medium text-gray-700">Educación Intercultural</span>
                    <span className="font-bold text-blue-600">$20B</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-purple-50 rounded-xl">
                    <span className="font-medium text-gray-700">Infraestructura</span>
                    <span className="font-bold text-purple-600">$200B</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-green-50 rounded-xl">
                    <span className="font-medium text-gray-700">Turismo Sostenible</span>
                    <span className="font-bold text-green-600">$50B</span>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-900">Total Anual</span>
                    <span className="text-2xl font-bold text-red-600">$470B</span>
                  </div>
                </div>
              </div>

              {/* Ingresos */}
              <div className="bg-white rounded-3xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Fuentes de Financiamiento</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-green-50 rounded-xl">
                    <span className="font-medium text-gray-700">Impuesto Sueldos Altos</span>
                    <span className="font-bold text-green-600">$1.5-2T</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-blue-50 rounded-xl">
                    <span className="font-medium text-gray-700">Formalización Digital</span>
                    <span className="font-bold text-blue-600">$500-800B</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-orange-50 rounded-xl">
                    <span className="font-medium text-gray-700">Fondo Minero</span>
                    <span className="font-bold text-orange-600">$500B</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-purple-50 rounded-xl">
                    <span className="font-medium text-gray-700">Ahorros Automatización</span>
                    <span className="font-bold text-purple-600">$200B</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-cyan-50 rounded-xl">
                    <span className="font-medium text-gray-700">Cooperación Internacional</span>
                    <span className="font-bold text-cyan-600">$100B</span>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-900">Total Disponible</span>
                    <span className="text-2xl font-bold text-green-600">$2.8-3.6T</span>
                  </div>
                  <div className="mt-2 text-center">
                    <span className="text-lg font-bold text-green-600">Superávit: $2.3-3.1T</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 bg-gradient-to-r from-green-600 to-blue-600 rounded-3xl p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-4">Sostenibilidad Fiscal Garantizada</h3>
              <p className="text-lg mb-4">
                Por cada peso invertido en desarrollo sostenible, generamos 6 pesos de retorno económico 
                a través de empleos, turismo y mayor productividad regional.
              </p>
              <div className="flex justify-center items-center gap-4">
                <DollarSign className="w-8 h-8" />
                <span className="text-xl font-bold">ROI: 600%</span>
              </div>
            </div>
          </div>
        </section>

        {/* Regional Impact */}
        <section className="relative z-10 py-20 px-4 bg-white/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Impacto <span className="text-green-600">Regional</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Desarrollo equilibrado que beneficia a todas las regiones, 
                con foco especial en la transformación de la Araucanía.
              </p>
            </div>

            {/* Region Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {impactoRegional.map((region) => (
                <button
                  key={region.id}
                  onClick={() => setActiveRegion(region.id)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    activeRegion === region.id
                      ? `bg-gradient-to-r ${region.color} text-white shadow-lg`
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {region.nombre}
                </button>
              ))}
            </div>

            {/* Region Content */}
            {impactoRegional.map((region) => (
              activeRegion === region.id && (
                <div key={region.id} className="bg-white rounded-3xl p-8 shadow-xl">
                  <div className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-2">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">{region.nombre}</h3>
                      <p className="text-gray-600 mb-6">{region.impacto}</p>
                      
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="text-center p-4 bg-green-50 rounded-xl">
                          <div className="text-xl font-bold text-green-600">{region.inversion}</div>
                          <div className="text-sm text-gray-600">Inversión</div>
                        </div>
                        <div className="text-center p-4 bg-blue-50 rounded-xl">
                          <div className="text-sm font-bold text-blue-600">{region.poblacion}</div>
                          <div className="text-sm text-gray-600">Población</div>
                        </div>
                        <div className="text-center p-4 bg-purple-50 rounded-xl">
                          <div className="text-sm font-bold text-purple-600">{region.empleos}</div>
                          <div className="text-sm text-gray-600">Empleos</div>
                        </div>
                      </div>

                      <h4 className="text-lg font-bold text-gray-900 mb-4">Proyectos Clave:</h4>
                      <ul className="space-y-2">
                        {region.proyectos.map((proyecto, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{proyecto}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className={`bg-gradient-to-br ${region.color} rounded-2xl p-6 text-white`}>
                      <MapPin className="w-12 h-12 mb-4" />
                      <h4 className="text-xl font-bold mb-4">Transformación Regional</h4>
                      <p className="mb-4">
                        {region.id === 'araucania' && 'Centro de desarrollo sostenible y turismo cultural mapuche'}
                        {region.id === 'santiago' && 'Capital de la integración cultural nacional'}
                        {region.id === 'antofagasta' && 'Modelo de desarrollo minero sustentable'}
                      </p>
                      <div className="bg-white/20 rounded-xl p-4">
                        <div className="text-2xl font-bold">{region.empleos.split(' ')[0]}</div>
                        <div className="text-sm opacity-90">Empleos esperados</div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            ))}
          </div>
        </section>

        {/* Implementation Timeline */}
        <section className="relative z-10 py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Cronograma de <span className="text-green-600">Implementación</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Un plan estructurado en 3 fases para transformar gradualmente la Araucanía 
                en un modelo de desarrollo sostenible e integración social.
              </p>
            </div>

            {/* Timeline Navigation */}
            <div className="flex justify-center mb-12">
              <div className="flex bg-white rounded-2xl p-2 shadow-lg">
                {fasesImplementacion.map((fase, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveFase(index)}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      activeFase === index
                        ? 'bg-green-600 text-white shadow-md'
                        : 'text-gray-600 hover:bg-green-50'
                    }`}
                  >
                    Fase {index + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Timeline Content */}
            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-green-100 p-4 rounded-2xl">
                      <Clock className="w-8 h-8 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {fasesImplementacion[activeFase].titulo}
                      </h3>
                      <p className="text-green-600 font-semibold">
                        {fasesImplementacion[activeFase].descripcion}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-4 bg-green-50 rounded-xl">
                      <div className="text-xl font-bold text-green-600">
                        {fasesImplementacion[activeFase].duracion}
                      </div>
                      <div className="text-sm text-gray-600">Duración</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-xl">
                      <div className="text-xl font-bold text-blue-600">
                        {fasesImplementacion[activeFase].presupuesto}
                      </div>
                      <div className="text-sm text-gray-600">Presupuesto</div>
                    </div>
                  </div>

                  <h4 className="text-lg font-bold text-gray-900 mb-4">Acciones Principales:</h4>
                  <ul className="space-y-3 mb-6">
                    {fasesImplementacion[activeFase].acciones.map((accion, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckSquare className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{accion}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="bg-green-50 rounded-xl p-4">
                    <h5 className="font-bold text-gray-900 mb-2">Hito de la Fase:</h5>
                    <p className="text-green-700">{fasesImplementacion[activeFase].hito}</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-4">Progreso Esperado</h4>
                  
                  {/* Progress visualization */}
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Desarrollo Sostenible</span>
                        <span>{activeFase === 0 ? '25%' : activeFase === 1 ? '60%' : '100%'}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: activeFase === 0 ? '25%' : activeFase === 1 ? '60%' : '100%' }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Integración Cultural</span>
                        <span>{activeFase === 0 ? '20%' : activeFase === 1 ? '70%' : '100%'}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: activeFase === 0 ? '20%' : activeFase === 1 ? '70%' : '100%' }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Desarrollo Económico</span>
                        <span>{activeFase === 0 ? '15%' : activeFase === 1 ? '50%' : '100%'}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-purple-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: activeFase === 0 ? '15%' : activeFase === 1 ? '50%' : '100%' }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 bg-white rounded-xl p-4">
                    <h5 className="font-bold text-gray-900 mb-2">Resultado Final:</h5>
                    <p className="text-gray-700 text-sm">
                      {activeFase === 0 && 'Bases sólidas para el desarrollo sostenible con participación comunitaria activa'}
                      {activeFase === 1 && 'Infraestructura educativa y turística funcionando, familias con tierras seguras'}
                      {activeFase === 2 && 'Araucanía convertida en modelo nacional de desarrollo sostenible e integración'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ethics and Transparency */}
        <section className="relative z-10 py-20 px-4 bg-white/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Transparencia y <span className="text-green-600">Ética</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Como ingeniero mapuche, mi compromiso es con la transparencia total 
                y la participación genuina de todas las comunidades.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="bg-blue-100 p-4 rounded-2xl mb-4 w-fit">
                  <Eye className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Transparencia Total</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Reportes mensuales en melinao2026.cl</li>
                  <li>• Presupuestos públicos detallados</li>
                  <li>• Seguimiento IA de todos los proyectos</li>
                  <li>• Auditorías ciudadanas participativas</li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="bg-green-100 p-4 rounded-2xl mb-4 w-fit">
                  <Users className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Participación Inclusiva</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Consejo con líderes mapuche y no mapuche</li>
                  <li>• Consultas comunitarias vinculantes</li>
                  <li>• Decisiones por consenso cultural</li>
                  <li>• Respeto protocolos ancestrales</li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="bg-purple-100 p-4 rounded-2xl mb-4 w-fit">
                  <Shield className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Equidad Regional</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Prioridad comunidades vulnerables</li>
                  <li>• Distribución equitativa recursos</li>
                  <li>• Acceso igualitario oportunidades</li>
                  <li>• Protección derechos territoriales</li>
                </ul>
              </div>
            </div>

            <div className="mt-12 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-4">Compromiso Histórico</h3>
              <p className="text-lg max-w-3xl mx-auto">
                "Cada peso invertido será transparente, cada decisión será participativa, 
                cada proyecto respetará nuestra cultura. Así construiremos el Chile unido que merecemos."
              </p>
            </div>
          </div>
        </section>

        {/* Simulator Modal */}
        {showSimulator && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Simulador Desarrollo Regional</h3>
                <button
                  onClick={() => {
                    setShowSimulator(false);
                    resetSimulator();
                  }}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {simulatorStep === 0 && (
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-4">1. Selecciona el tipo de proyecto</h4>
                  <div className="space-y-3">
                    {[
                      { id: 'centro-turistico', name: 'Centro Turístico Cultural', desc: 'Turismo mapuche sustentable' },
                      { id: 'escuela-intercultural', name: 'Escuela Intercultural', desc: 'Educación bilingüe mapuche-español' },
                      { id: 'proyecto-ambiental', name: 'Proyecto Ambiental', desc: 'Reforestación y protección bosques' },
                      { id: 'regularizacion-tierra', name: 'Regularización Territorial', desc: 'Títulos de propiedad mapuche' }
                    ].map(proyecto => (
                      <button
                        key={proyecto.id}
                        onClick={() => setSimulatorData({...simulatorData, tipoProyecto: proyecto.id})}
                        className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                          simulatorData.tipoProyecto === proyecto.id
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200 hover:border-green-300'
                        }`}
                      >
                        <div className="font-semibold text-gray-900">{proyecto.name}</div>
                        <div className="text-sm text-gray-600">{proyecto.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {simulatorStep === 1 && (
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-4">2. Tipo de comunidad</h4>
                  <div className="space-y-3">
                    {[
                      { id: 'rural', name: 'Rural', desc: 'Comunidad rural tradicional' },
                      { id: 'urbana', name: 'Urbana', desc: 'Zona urbana o semi-urbana' },
                      { id: 'mapuche', name: 'Mapuche', desc: 'Comunidad mapuche ancestral' },
                      { id: 'mixta', name: 'Mixta', desc: 'Comunidad mapuche y no mapuche' }
                    ].map(comunidad => (
                      <button
                        key={comunidad.id}
                        onClick={() => setSimulatorData({...simulatorData, comunidad: comunidad.id})}
                        className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                          simulatorData.comunidad === comunidad.id
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200 hover:border-green-300'
                        }`}
                      >
                        <div className="font-semibold text-gray-900">{comunidad.name}</div>
                        <div className="text-sm text-gray-600">{comunidad.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {simulatorStep === 2 && (
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-4">3. Inversión en millones CLP</h4>
                  <input
                    type="number"
                    placeholder="Ej: 1000 (para $1,000 millones)"
                    value={simulatorData.inversion}
                    onChange={(e) => setSimulatorData({...simulatorData, inversion: e.target.value})}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"
                  />
                  <p className="text-sm text-gray-600 mt-2">
                    Rango recomendado: $500M - $5,000M según el tipo de proyecto
                  </p>
                </div>
              )}

              {simulatorStep === 3 && simulatorData.resultado && (
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-6">Resultados del Proyecto</h4>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-green-50 p-4 rounded-xl">
                      <div className="text-2xl font-bold text-green-600">{simulatorData.resultado.empleosDirectos}</div>
                      <div className="text-sm text-gray-600">Empleos Directos</div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-xl">
                      <div className="text-2xl font-bold text-blue-600">${simulatorData.resultado.ingresoPromedio.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">Ingreso Promedio</div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-xl">
                      <div className="text-2xl font-bold text-purple-600">{simulatorData.resultado.familiasBeneficiadas}</div>
                      <div className="text-sm text-gray-600">Familias Beneficiadas</div>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-xl">
                      <div className="text-2xl font-bold text-orange-600">{simulatorData.resultado.tiempoImplementacion} meses</div>
                      <div className="text-sm text-gray-600">Tiempo Implementación</div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-green-100 to-blue-100 p-6 rounded-xl">
                    <h5 className="font-bold text-gray-900 mb-2">Impacto Total:</h5>
                    <p className="text-gray-700">
                      Este proyecto generará un retorno de <strong>${simulatorData.resultado.retornoInversion.toLocaleString()} millones</strong> en 5 años, 
                      con un impacto ambiental <strong>{simulatorData.resultado.impactoAmbiental.toLowerCase()}</strong> y beneficiando 
                      directamente a <strong>{simulatorData.resultado.familiasBeneficiadas} familias</strong> en la región.
                    </p>
                  </div>
                </div>
              )}

              <div className="flex justify-between mt-8">
                {simulatorStep > 0 && simulatorStep < 3 && (
                  <button
                    onClick={() => setSimulatorStep(simulatorStep - 1)}
                    className="px-6 py-3 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
                  >
                    Anterior
                  </button>
                )}
                
                {simulatorStep < 3 ? (
                  <button
                    onClick={handleSimulatorNext}
                    disabled={
                      (simulatorStep === 0 && !simulatorData.tipoProyecto) ||
                      (simulatorStep === 1 && !simulatorData.comunidad) ||
                      (simulatorStep === 2 && !simulatorData.inversion)
                    }
                    className="ml-auto px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    Siguiente
                  </button>
                ) : (
                  <button
                    onClick={resetSimulator}
                    className="ml-auto px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                  >
                    Nuevo Proyecto
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <section className="relative z-10 py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-3xl p-12 text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Construyamos Juntos el Chile Unido
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Tu voz es fundamental para crear un país donde la diversidad sea nuestra fortaleza. 
                Comparte tu visión de desarrollo sostenible para la Araucanía.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/participacion-ciudadana"
                  className="bg-white text-green-600 px-8 py-4 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Heart className="w-5 h-5" />
                  Comparte tu Propuesta
                </Link>
                <Link
                  to="/"
                  className="bg-green-700 text-white px-8 py-4 rounded-full font-semibold hover:bg-green-800 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <ArrowRight className="w-5 h-5" />
                  Ver Todas las Reformas
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Consultation Section */}
        <section className="relative z-10 py-20 px-4 bg-white/50">
          <div className="max-w-4xl mx-auto">
            <ConsultasCiudadanas tema="unidad-nacional" />
          </div>
        </section>

      </div>
    </SEOWrapper>
  );
};

export default ChileUnido;