import React, { useState, useEffect } from 'react';
import { formatChileanNumber } from '../utils/numberFormat';
import { ArrowRight, ChevronLeft, ChevronRight, CheckCircle, Users, Target, Heart, Clock, Star, Award, MapPin, Quote, Play, Calculator, X, Timer, CheckSquare, FileText, Building, TreePine, Handshake, School, Baby, Briefcase, Shield, Globe, TrendingUp, DollarSign, Eye, Camera, Send, MessageSquare, Zap, Cpu, Wrench, Lightbulb, Key, Lock, Check, ChevronDown, Calendar, Share, ThumbsUp, Medal, ExternalLink, UserPlus, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOWrapper from '../components/SEOWrapper';
import ConsultasCiudadanas from '../components/ConsultasCiudadanas';
import AuthStatus from '../components/AuthStatus';

const PatrociniosNew = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeProposal, setActiveProposal] = useState(0);
  const [openFAQ, setOpenFAQ] = useState(null);
  const [showVideo, setShowVideo] = useState(false);
  const [patrociniosData, setPatrociniosData] = useState({
    actual: 0,
    meta: 35361,
    porcentaje: 0,
    diasRestantes: 0
  });
  const [testimonios, setTestimonios] = useState([]);
  const [activeTestimonio, setActiveTestimonio] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    // Cargar datos de patrocinios
    fetchPatrociniosData();
    fetchTestimonios();
    
    // Auto-advance carrusel de propuestas
    const interval = setInterval(() => {
      setActiveProposal(prev => (prev + 1) % propuestasClave.length);
    }, 5000);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, []);

  // Función para calcular días restantes hasta el 16 de noviembre de 2025
  const calcularDiasRestantes = () => {
    const fechaLimite = new Date('2025-11-16T23:59:59');
    const ahora = new Date();
    const diferencia = fechaLimite.getTime() - ahora.getTime();
    const dias = Math.max(0, Math.ceil(diferencia / (1000 * 60 * 60 * 24)));
    return dias;
  };

  const fetchPatrociniosData = async () => {
    try {
      const response = await fetch('/api/patrocinios/stats');
      const data = await response.json();
      const diasRestantes = calcularDiasRestantes();
      setPatrociniosData({
        actual: data.actual || 0,
        meta: data.meta || 35361,
        porcentaje: Math.min((data.actual / (data.meta || 35361)) * 100, 100),
        diasRestantes: diasRestantes
      });
    } catch (error) {
      console.error('Error cargando datos de patrocinios:', error);
      // En caso de error, aún calcular días restantes
      setPatrociniosData(prev => ({
        ...prev,
        diasRestantes: calcularDiasRestantes()
      }));
    }
  };

  const fetchTestimonios = async () => {
    try {
      const response = await fetch('/api/testimonios/aprobados');
      const data = await response.json();
      setTestimonios(data || []);
    } catch (error) {
      console.error('Error cargando testimonios:', error);
    }
  };

  const credenciales = [
    {
      icon: <Wrench className="w-12 h-12" />,
      titulo: "Ingeniero y Emprendedor",
      descripcion: "Más de 10 años transformando empresas con tecnología",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Handshake className="w-12 h-12" />,
      titulo: "Puente entre Mundos",
      descripcion: "Uniendo tradición mapuche con innovación digital",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Lightbulb className="w-12 h-12" />,
      titulo: "Visión Clara",
      descripcion: "Estado eficiente con IA, menos impuestos, más oportunidades",
      color: "from-purple-500 to-pink-500"
    }
  ];

  const propuestasClave = [
    {
      titulo: "Estado Digital",
      subtitulo: "Trámites en 5 minutos con IA",
      descripcion: "Revoluciona la burocracia: obtén tu carnet, haz declaración de impuestos y tramita documentos desde tu celular en minutos, no semanas.",
      icon: <Cpu className="w-16 h-16" />,
      color: "from-blue-600 to-cyan-600",
      beneficio: "Ahorro de $500 mil millones anuales",
      link: "/#reformas"
    },
    {
      titulo: "Menos Impuestos",
      subtitulo: "IVA al 5% en canasta básica",
      descripcion: "Tu familia ahorrará $50.000 mensuales: pan, leche, carne y medicamentos básicos con IVA reducido del 19% al 5%.",
      icon: <DollarSign className="w-16 h-16" />,
      color: "from-green-600 to-emerald-600",
      beneficio: "10% reducción costo de vida",
      link: "/#reformas"
    },
    {
      titulo: "Sueldo Mínimo $900.000",
      subtitulo: "Justicia económica real",
      descripcion: "Aumento gradual con subsidio estatal a PYMEs. 1.8 millones de trabajadores ganarán $370.000 más cada mes.",
      icon: <TrendingUp className="w-16 h-16" />,
      color: "from-yellow-600 to-orange-600",
      beneficio: "+70% ingresos trabajadores",
      link: "/#reformas"
    },
    {
      titulo: "Unidad Nacional",
      subtitulo: "Desarrollo y respeto en la Araucanía",
      descripcion: "$300 mil millones de inversión en desarrollo sustentable, educación intercultural y reconciliación mapuche.",
      icon: <Heart className="w-16 h-16" />,
      color: "from-red-600 to-pink-600",
      beneficio: "5.000 empleos nuevos región",
      link: "/#reformas"
    },
    {
      titulo: "Fin a Privilegios",
      subtitulo: "No más sueldos vitalicios",
      descripcion: "Eliminación gradual de privilegios políticos. $1.5 billones anuales ahorrados se destinan a educación y salud.",
      icon: <Shield className="w-16 h-16" />,
      color: "from-purple-600 to-indigo-600",
      beneficio: "$1.5B para servicios públicos",
      link: "/#reformas"
    }
  ];

  const procesoPatrocinio = [
    {
      numero: 1,
      titulo: "Ingresa con ClaveÚnica",
      descripcion: "Accede al sistema con tu ClaveÚnica del Registro Civil",
      detalle: "¿No tienes ClaveÚnica? Obtén la tuya gratis aquí",
      icon: <Key className="w-12 h-12" />,
      link: "https://clave.gob.cl"
    },
    {
      numero: 2,
      titulo: "Selecciona 'Patrocinar'",
      descripcion: "En el menú principal, haz clic en la opción 'Patrocinar'",
      detalle: "Es la primera opción que verás en pantalla",
      icon: <UserPlus className="w-12 h-12" />
    },
    {
      numero: 3,
      titulo: "Elige 'Presidente'",
      descripcion: "Selecciona la categoría 'Presidente de la República'",
      detalle: "Entre las opciones disponibles de cargos a patrocinar",
      icon: <Crown className="w-12 h-12" />
    },
    {
      numero: 4,
      titulo: "Busca 'Melinao' y patrocina",
      descripcion: "En el buscador escribe 'Melinao' y presiona 'Patrocinar' en Juan Pablo Melinao González",
      detalle: "¡Listo! Ya confirmas tu apoyo al cambio",
      icon: <Check className="w-12 h-12" />
    }
  ];

  const faqData = [
    {
      pregunta: "¿Cuál es la diferencia entre patrocinio y donación?",
      respuesta: "Un patrocinio es tu firma digital GRATUITA que valida el apoyo a una candidatura independiente. Una donación es dinero que se entrega a partidos políticos para financiar campañas. Juan Pablo necesita patrocinios (no dinero) para poder participar en las elecciones."
    },
    {
      pregunta: "¿El patrocinio me cuesta dinero?",
      respuesta: "NO. El patrocinio es completamente gratuito. Solo necesitas tu ClaveÚnica y 2-5 minutos de tu tiempo. Si alguien te pide dinero por un 'patrocinio', es una estafa - reporta inmediatamente."
    },
    {
      pregunta: "¿Qué es un patrocinio exactamente?",
      respuesta: "Es tu firma digital que valida que apoyas la candidatura. Es completamente gratuito y te toma menos de 5 minutos. Es requisito legal para que cualquier candidato independiente pueda participar en las elecciones presidenciales."
    },
    {
      pregunta: "¿Puedo patrocinar si ya patrociné a otro candidato?",
      respuesta: "No, según la ley electoral chilena, cada ciudadano puede patrocinar solo a un candidato por elección. Si ya patrocinaste a otro, no podrás patrocinar a Juan Pablo hasta la próxima elección."
    },
    {
      pregunta: "¿Es seguro el proceso online?",
      respuesta: "Absolutamente. Usamos el sistema oficial del SERVEL con encriptación de grado bancario. Tus datos están protegidos por las mismas medidas de seguridad que usa el Estado para trámites oficiales."
    },
    {
      pregunta: "¿Cuántos patrocinios necesitamos?",
      respuesta: "Necesitamos exactamente 35.361 patrocinios válidos según la ley electoral. Buscamos conseguir 40.000 para tener margen de seguridad en caso de que algunos no sean validados por el SERVEL."
    },
    {
      pregunta: "¿Hasta cuándo puedo patrocinar?",
      respuesta: "El plazo vence el 16 de noviembre de 2025 a las 23:59 horas. Sin embargo, recomendamos patrocinar cuanto antes para asegurar que tu firma sea procesada correctamente por el SERVEL."
    },
    {
      pregunta: "¿Patrocinar me compromete a votar por Juan Pablo?",
      respuesta: "No. El patrocinio solo permite que Juan Pablo participe en la elección. El día de la votación, tu voto es completamente libre y secreto. Puedes votar por quien quieras."
    },
    {
      pregunta: "¿Juan Pablo solicita donaciones actualmente?",
      respuesta: "NO. En esta etapa solo necesitamos patrocinios para validar la candidatura. No solicitamos ni recolectamos dinero. Cualquier solicitud de dinero en nombre de Juan Pablo debe ser reportada como posible estafa."
    }
  ];

  const testimoniosData = testimonios.length > 0 ? testimonios : [
    {
      contenido: "Finalmente un candidato que entiende tanto de tecnología como de justicia social. Su propuesta de IA en el Estado me convence totalmente.",
      nombre_publico: "Carlos Mendoza",
      ocupacion: "Ingeniero en Software",
      region: "Metropolitana"
    },
    {
      contenido: "Como profesora, me emociona que alguien realmente comprenda nuestros problemas. La deuda histórica es fundamental para dignificar nuestra profesión.",
      nombre_publico: "María González",
      ocupacion: "Profesora de Básica",
      region: "Araucanía"
    },
    {
      contenido: "Un mapuche ingeniero que puede unir Chile es exactamente lo que necesitamos. Su visión de desarrollo con respeto cultural es revolucionaria.",
      nombre_publico: "Roberto Huanca",
      ocupacion: "Emprendedor",
      region: "Biobío"
    }
  ];

  const metaDiaria = Math.ceil((patrociniosData.meta - patrociniosData.actual) / patrociniosData.diasRestantes);

  return (
    <SEOWrapper 
      title="Patrocina el Cambio: Tecnología para Todos, Unidad para Chile - Juan Pablo Melinao 2026"
      description="Patrocina la candidatura presidencial independiente de Juan Pablo Melinao González. Ingeniero mapuche con visión de Estado digital, menos impuestos y unidad nacional."
      keywords="patrocinio, Juan Pablo Melinao, candidato independiente, presidente 2026, tecnología, mapuche, Chile"
      canonicalUrl="https://melinao2026.cl/patrocinios"
    >
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        
        {/* Desktop Header Navigation */}
        <header className="hidden lg:block fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200" style={{ marginTop: '48px' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link 
                to="/" 
                className="flex items-center gap-3 text-gray-900 hover:text-blue-600 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
                <span className="font-semibold">Volver al Home</span>
              </Link>
              
              <div className="flex items-center gap-6">
                <Link to="/reformas" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                  Reformas
                </Link>
                <Link to="/noticias" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                  Noticias
                </Link>
                <Link to="/#historia" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                  Juan Pablo
                </Link>
              </div>
            </div>
          </div>
        </header>
        
        {/* HERO SECTION */}
        <section className="relative min-h-screen lg:min-h-screen flex items-center justify-center overflow-hidden py-20 lg:py-0 lg:pt-32">
          {/* Background con parallax */}
          <div 
            className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800"
            style={{
              transform: `translateY(${scrollY * 0.5}px)`
            }}
          />
          
          {/* Elementos decorativos */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 w-32 h-32 bg-yellow-400 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-48 h-48 bg-green-400 rounded-full blur-xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-400 rounded-full blur-xl animate-pulse delay-2000"></div>
          </div>
          
          {/* Navigation Header */}
          <div className="absolute top-4 left-4 z-20 lg:hidden">
            <Link 
              to="/"
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-full font-medium transition-all hover:scale-105 border border-white/20"
            >
              <ChevronLeft className="w-5 h-5" />
              Volver al Home
            </Link>
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              
              {/* Contenido textual */}
              <div className="text-center lg:text-left text-white">
                <h1 className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight">
                  <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                    Patrocina el Cambio:
                  </span>
                  <br />
                  <span className="text-white">
                    Tecnología para Todos,
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-green-300 to-blue-300 bg-clip-text text-transparent">
                    Unidad para Chile
                  </span>
                </h1>
                
                <p className="text-lg sm:text-xl lg:text-2xl mb-4 text-blue-100">
                  <strong>Juan Pablo Melinao González</strong>
                </p>
                <p className="text-base sm:text-lg mb-8 text-blue-200">
                  Candidato Independiente a Presidente 2026
                </p>
                
                {/* Contador en tiempo real */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 mb-8">
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-yellow-300 mb-2">
                      Ya somos {formatChileanNumber(patrociniosData.actual)} patrocinantes
                    </div>
                    <div className="text-lg text-blue-100 mb-4">
                      de {formatChileanNumber(patrociniosData.meta)} necesarios
                    </div>
                    
                    {/* Barra de progreso */}
                    <div className="w-full bg-white/20 rounded-full h-4 mb-4">
                      <div 
                        className="bg-gradient-to-r from-yellow-300 to-orange-300 h-4 rounded-full transition-all duration-1000 flex items-center justify-end pr-2"
                        style={{ width: `${Math.max(patrociniosData.porcentaje, 5)}%` }}
                      >
                        <span className="text-xs font-bold text-blue-900">
                          {patrociniosData.porcentaje.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                    
                    <div className="text-sm text-blue-200">
                      Faltan {formatChileanNumber(patrociniosData.meta - patrociniosData.actual)} patrocinios
                    </div>
                  </div>
                </div>
                
                {/* CTA Principal */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <a 
                    href="https://patrocinantes.servel.cl/auth/login"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-300 hover:to-orange-300 text-blue-900 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-lg sm:text-xl transition-all transform hover:scale-105 flex items-center justify-center gap-2 shadow-2xl"
                  >
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    PATROCINAR AHORA
                  </a>
                  <button 
                    onClick={() => setShowVideo(true)}
                    className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-lg sm:text-xl transition-all flex items-center justify-center gap-2"
                  >
                    <Play className="w-6 h-6" />
                    Ver Tutorial
                  </button>
                </div>
              </div>
              
              {/* Imagen profesional */}
              <div className="relative">
                <div className="relative z-10 bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-3xl p-8">
                  {/* Placeholder para foto profesional */}
                  <div className="w-full aspect-[4/5] bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl flex items-center justify-center">
                    <div className="text-center text-white">
                      <Users className="w-24 h-24 mx-auto mb-4 opacity-50" />
                      <p className="text-lg font-medium">Foto Profesional</p>
                      <p className="text-sm opacity-75">Juan Pablo Melinao González</p>
                      <p className="text-xs opacity-50 mt-2">Ingeniero + Tradición Mapuche</p>
                    </div>
                  </div>
                </div>
                
                {/* Elementos decorativos alrededor */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full opacity-20 animate-bounce"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-green-400 rounded-full opacity-20 animate-pulse"></div>
              </div>
            </div>
          </div>
          
          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
            <ChevronDown className="w-8 h-8" />
          </div>
        </section>

        {/* Banner de urgencia flotante */}
        <div className={`fixed top-0 left-0 right-0 z-50 px-4 py-2 lg:py-3 text-center text-sm lg:text-base font-medium text-white ${
          patrociniosData.diasRestantes === 0 
            ? 'bg-gray-800' 
            : patrociniosData.diasRestantes <= 7 
            ? 'bg-red-600 animate-pulse' 
            : 'bg-red-600'
        }`}>
          {patrociniosData.diasRestantes === 0 ? (
            <span>📅 Plazo de patrocinios finalizado el 16 de noviembre de 2025</span>
          ) : patrociniosData.diasRestantes === 1 ? (
            <span>🚨 ¡ÚLTIMO DÍA! El plazo vence el 16 de noviembre a las 23:59 hrs</span>
          ) : patrociniosData.diasRestantes <= 7 ? (
            <span>🚨 ¡URGENTE! Quedan solo {patrociniosData.diasRestantes} días - Plazo: 16 noviembre 2025</span>
          ) : (
            <>
              ⏰ Quedan {patrociniosData.diasRestantes} días para completar patrocinios (Plazo: 16 nov 2025)
              <span className="ml-4 font-bold">
                Meta de hoy: {formatChileanNumber(metaDiaria)} patrocinantes más
              </span>
            </>
          )}
        </div>

        {/* SECCIÓN EDUCATIVA: DIFERENCIA ENTRE DONACIÓN Y PATROCINIO */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50 relative mt-12 lg:mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
                ¿Qué es un
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {' '}Patrocinio?
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Muchas personas confunden patrocinio con donación. Te explicamos la diferencia de manera clara y simple.
              </p>
            </div>

            {/* Comparación Visual */}
            <div className="grid lg:grid-cols-2 gap-8 mb-16">
              {/* Patrocinio */}
              <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-green-200">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Patrocinio</h3>
                  <p className="text-green-600 font-semibold">✅ Es lo que necesitamos</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">Es tu firma digital</p>
                      <p className="text-gray-600 text-sm">Apoyo ciudadano para validar candidatura independiente</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">Completamente gratuito</p>
                      <p className="text-gray-600 text-sm">No cuesta dinero, solo tu apoyo ciudadano</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">Requisito legal obligatorio</p>
                      <p className="text-gray-600 text-sm">Sin patrocinios, ningún candidato independiente puede participar</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">Regulado por SERVEL</p>
                      <p className="text-gray-600 text-sm">Sistema oficial del Estado con máxima seguridad</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">No compromete tu voto</p>
                      <p className="text-gray-600 text-sm">El día de la elección votas por quien quieras</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-green-50 rounded-xl">
                  <p className="text-green-800 font-medium text-center">
                    <Timer className="w-5 h-5 inline mr-2" />
                    Proceso: 2-5 minutos máximo
                  </p>
                </div>
              </div>

              {/* Donación */}
              <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-orange-200">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <DollarSign className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Donación</h3>
                  <p className="text-orange-600 font-semibold">ℹ️ Es diferente</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <DollarSign className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">Aporte económico</p>
                      <p className="text-gray-600 text-sm">Dinero para financiar campañas y partidos políticos</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <DollarSign className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">Tiene costo monetario</p>
                      <p className="text-gray-600 text-sm">Implica transferir tu dinero</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Building className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">Para sostener partidos</p>
                      <p className="text-gray-600 text-sm">Financia actividades de organizaciones políticas</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">Límites legales</p>
                      <p className="text-gray-600 text-sm">Máximo 300-500 UF anuales según la ley</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Eye className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">Reportes obligatorios</p>
                      <p className="text-gray-600 text-sm">Debe informarse al SERVEL y SII</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-orange-50 rounded-xl">
                  <p className="text-orange-800 font-medium text-center">
                    <Calculator className="w-5 h-5 inline mr-2" />
                    Actualmente NO solicitamos donaciones
                  </p>
                </div>
              </div>
            </div>

            {/* Resumen clave */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-blue-200">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  📝 Resumen: ¿Qué necesita Juan Pablo ahora?
                </h3>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <UserPlus className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                  <h4 className="font-bold text-gray-900 mb-2">PATROCINIOS</h4>
                  <p className="text-gray-600 text-sm">Tu firma digital para que pueda participar en las elecciones</p>
                </div>
                
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <X className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <h4 className="font-bold text-gray-900 mb-2">NO DONACIONES</h4>
                  <p className="text-gray-600 text-sm">Actualmente no solicitamos ni recolectamos dinero</p>
                </div>
                
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <Clock className="w-12 h-12 text-green-600 mx-auto mb-3" />
                  <h4 className="font-bold text-gray-900 mb-2">PLAZO LÍMITE</h4>
                  <p className="text-gray-600 text-sm">16 noviembre 2025 - Quedan {patrociniosData.diasRestantes} días</p>
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-center text-white">
                <h4 className="text-xl font-bold mb-2">¿Ya entendiste la diferencia?</h4>
                <p className="mb-4 opacity-90">Tu patrocinio es la llave para que Juan Pablo pueda competir por la presidencia</p>
                <a 
                  href="https://patrocinantes.servel.cl/auth/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all"
                >
                  <ArrowRight className="w-5 h-5" />
                  PATROCINAR AHORA
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* SECCIÓN DE CREDENCIALES */}
        <section className="py-20 bg-white relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
                ¿Por qué patrocinar a 
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {' '}Juan Pablo Melinao?
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Un líder único que combina innovación tecnológica, justicia social y unidad nacional
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {credenciales.map((credencial, index) => (
                <div 
                  key={index}
                  className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-100"
                >
                  <div className={`w-20 h-20 bg-gradient-to-br ${credencial.color} rounded-2xl flex items-center justify-center mx-auto mb-6 text-white group-hover:scale-110 transition-transform`}>
                    {credencial.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                    {credencial.titulo}
                  </h3>
                  <p className="text-gray-600 text-center leading-relaxed">
                    {credencial.descripcion}
                  </p>
                  
                  {/* Efecto hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Modal de Video */}
        {showVideo && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
              <div className="flex justify-between items-center p-6 border-b">
                <h3 className="text-2xl font-bold text-gray-900">
                  Juan Pablo te explica cómo patrocinar en 2 minutos
                </h3>
                <button 
                  onClick={() => setShowVideo(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="p-6">
                <div className="aspect-video bg-gray-200 rounded-xl flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <Play className="w-16 h-16 mx-auto mb-4" />
                    <p className="text-lg font-medium">Video Tutorial Patrocinio</p>
                    <p className="text-sm">Placeholder para video explicativo</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PROPUESTAS CLAVE - Carrusel interactivo */}
        <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
                Propuestas que
                <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  {' '}Transforman Chile
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Soluciones concretas para los problemas reales de las familias chilenas
              </p>
            </div>

            {/* Carrusel */}
            <div className="relative">
              <div className="overflow-hidden rounded-3xl">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${activeProposal * 100}%)` }}
                >
                  {propuestasClave.map((propuesta, index) => (
                    <div key={index} className="w-full flex-shrink-0">
                      <div className={`bg-gradient-to-br ${propuesta.color} rounded-3xl p-8 lg:p-12 text-white mx-2`}>
                        <div className="grid lg:grid-cols-2 gap-8 items-center">
                          <div>
                            <div className="flex items-center gap-4 mb-6">
                              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                                {propuesta.icon}
                              </div>
                              <div>
                                <h3 className="text-2xl lg:text-3xl font-bold">
                                  {propuesta.titulo}
                                </h3>
                                <p className="text-lg opacity-90">
                                  {propuesta.subtitulo}
                                </p>
                              </div>
                            </div>
                            
                            <p className="text-lg lg:text-xl mb-6 leading-relaxed opacity-95">
                              {propuesta.descripcion}
                            </p>
                            
                            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 mb-6">
                              <div className="flex items-center gap-2">
                                <Star className="w-5 h-5 text-yellow-300" />
                                <span className="font-bold text-yellow-300">
                                  Impacto: {propuesta.beneficio}
                                </span>
                              </div>
                            </div>
                            
                            {/* Botón para ver más detalles */}
                            <Link
                              to={propuesta.link}
                              className="inline-flex items-center gap-2 bg-white/30 hover:bg-white/40 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-bold transition-all hover:scale-105 border border-white/30"
                            >
                              <Eye className="w-5 h-5" />
                              Ver detalles completos
                              <ArrowRight className="w-4 h-4" />
                            </Link>
                          </div>
                          
                          <div className="relative">
                            <div className="aspect-square bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center">
                              <div className="text-white/50">
                                {React.cloneElement(propuesta.icon, { className: "w-32 h-32" })}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Controles del carrusel */}
              <button
                onClick={() => setActiveProposal(prev => prev === 0 ? propuestasClave.length - 1 : prev - 1)}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white backdrop-blur-sm rounded-full p-3 shadow-lg transition-all"
              >
                <ChevronLeft className="w-6 h-6 text-gray-800" />
              </button>
              <button
                onClick={() => setActiveProposal(prev => (prev + 1) % propuestasClave.length)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white backdrop-blur-sm rounded-full p-3 shadow-lg transition-all"
              >
                <ChevronRight className="w-6 h-6 text-gray-800" />
              </button>
              
              {/* Indicadores */}
              <div className="flex justify-center mt-8 gap-2">
                {propuestasClave.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveProposal(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === activeProposal 
                        ? 'bg-blue-600 w-8' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PROCESO PASO A PASO */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
                Patrocinar es
                <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  {' '}fácil y rápido
                </span>
              </h2>
              <p className="text-xl text-gray-600">
                Solo 4 pasos simples para ser parte del cambio que Chile necesita
              </p>
            </div>

            <div className="relative">
              {/* Línea conectora */}
              <div className="hidden lg:block absolute top-24 left-1/2 transform -translate-x-1/2 w-2/3 h-1 bg-gradient-to-r from-blue-300 via-green-300 to-purple-300 rounded-full"></div>
              
              <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
                {procesoPatrocinio.map((paso, index) => (
                  <div key={index} className="relative">
                    <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-100">
                      {/* Número del paso */}
                      <div className="absolute -top-6 left-8 w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                        {paso.numero}
                      </div>
                      
                      <div className="pt-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white">
                          {paso.icon}
                        </div>
                        
                        <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                          {paso.titulo}
                        </h3>
                        
                        <p className="text-gray-600 text-center mb-4 leading-relaxed">
                          {paso.descripcion}
                        </p>
                        
                        <div className="bg-blue-50 rounded-xl p-4 text-center">
                          {paso.link ? (
                            <a 
                              href={paso.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-700 font-medium flex items-center justify-center gap-2"
                            >
                              {paso.detalle}
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          ) : (
                            <p className="text-blue-700 font-medium text-sm">
                              {paso.detalle}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* CTA después del proceso */}
              <div className="text-center mt-16">
                <a 
                  href="https://patrocinantes.servel.cl/auth/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-500 hover:to-blue-500 text-white px-8 py-4 rounded-xl font-bold text-xl transition-all transform hover:scale-105 shadow-xl"
                >
                  <Key className="w-6 h-6" />
                  Comenzar Patrocinio Online
                  <ArrowRight className="w-6 h-6" />
                </a>
                <p className="text-gray-500 mt-4 text-sm">
                  Proceso oficial validado por SERVEL • 100% seguro
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PREGUNTAS FRECUENTES */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Preguntas Frecuentes
              </h2>
              <p className="text-xl text-gray-600">
                Resolvemos tus dudas sobre el proceso de patrocinio
              </p>
            </div>

            <div className="space-y-4">
              {faqData.map((faq, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <button
                    onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                    className="w-full px-6 py-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 pr-4">
                      {faq.pregunta}
                    </h3>
                    <ChevronDown 
                      className={`w-6 h-6 text-gray-400 transition-transform ${
                        openFAQ === index ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  
                  {openFAQ === index && (
                    <div className="px-6 pb-6">
                      <p className="text-gray-600 leading-relaxed">
                        {faq.respuesta}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIOS */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Lo que dicen quienes ya patrocinaron
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Ciudadanos de todo Chile confían en Juan Pablo para transformar nuestro país
              </p>
            </div>

            <div className="relative">
              <div className="grid md:grid-cols-3 gap-8">
                {testimoniosData.map((testimonio, index) => (
                  <div 
                    key={index}
                    className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                  >
                    <Quote className="w-12 h-12 text-blue-600 mb-6" />
                    
                    <p className="text-gray-700 mb-6 leading-relaxed italic text-lg">
                      "{testimonio.contenido}"
                    </p>
                    
                    <div className="border-t pt-6">
                      <div className="font-bold text-gray-900 text-lg">
                        {testimonio.nombre_publico}
                      </div>
                      <div className="text-sm text-gray-600">
                        {testimonio.ocupacion}
                      </div>
                      <div className="text-sm text-blue-600 font-medium">
                        {testimonio.region}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA para agregar testimonio */}
            <div className="text-center mt-12">
              <AuthStatus>
                {({ user, isAuthenticated }) => (
                  isAuthenticated ? (
                    <Link
                      to="/patrocinios#testimonios"
                      className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-all"
                    >
                      <MessageSquare className="w-5 h-5" />
                      Compartir mi experiencia
                    </Link>
                  ) : (
                    <p className="text-gray-500">
                      <a href="/participacion-ciudadana" className="text-blue-600 hover:underline">
                        Inicia sesión
                      </a> para compartir tu testimonio
                    </p>
                  )
                )}
              </AuthStatus>
            </div>
          </div>
        </section>

        {/* FOOTER CON MÚLTIPLES CTAs */}
        <section className="py-20 bg-gradient-to-r from-blue-900 via-purple-900 to-blue-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              ¡Tu patrocinio construye el
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                {' '}Chile que soñamos!
              </span>
            </h2>
            <p className="text-xl mb-12 text-blue-100 max-w-3xl mx-auto">
              Cada patrocinio nos acerca más a un país con tecnología para todos, justicia social real y unidad nacional.
            </p>
            
            {/* CTA Principal */}
            <div className="mb-12">
              <a 
                href="https://patrocinantes.servel.cl/auth/login"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-300 hover:to-orange-300 text-blue-900 px-10 py-5 rounded-xl font-bold text-2xl transition-all transform hover:scale-105 shadow-2xl"
              >
                <ArrowRight className="w-8 h-8" />
                PATROCINAR AHORA
              </a>
            </div>
            
            {/* CTAs Secundarios */}
            <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <a 
                href="#"
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl p-4 transition-all group"
              >
                <FileText className="w-8 h-8 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <div className="font-bold">Plan de Gobierno</div>
                <div className="text-sm opacity-75">Descargar PDF</div>
              </a>
              
              <a 
                href="#"
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl p-4 transition-all group"
              >
                <Share className="w-8 h-8 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <div className="font-bold">Compartir</div>
                <div className="text-sm opacity-75">En redes sociales</div>
              </a>
              
              <a 
                href="/participacion-ciudadana"
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl p-4 transition-all group"
              >
                <Users className="w-8 h-8 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <div className="font-bold">Voluntarios</div>
                <div className="text-sm opacity-75">Únete al equipo</div>
              </a>
              
              <a 
                href="#"
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl p-4 transition-all group"
              >
                <Calendar className="w-8 h-8 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <div className="font-bold">Eventos</div>
                <div className="text-sm opacity-75">Agenda pública</div>
              </a>
            </div>
            
            {/* Elementos de confianza */}
            <div className="mt-12 pt-8 border-t border-white/20">
              <div className="flex flex-wrap justify-center items-center gap-8 text-sm opacity-75">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Proceso oficial validado por SERVEL
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  Certificado SSL - Conexión segura
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  {formatChileanNumber(patrociniosData.actual)} patrocinios verificados
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Consultas Ciudadanas */}
        <ConsultasCiudadanas />
      </div>
    </SEOWrapper>
  );
};

export default PatrociniosNew;