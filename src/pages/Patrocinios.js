import React, { useState, useEffect } from 'react';
import { formatChileanNumber } from '../utils/numberFormat';
import { ArrowRight, CheckCircle, Users, Target, Heart, Clock, Star, Award, MapPin, Quote, Play, Calculator, X, Timer, CheckSquare, FileText, Building, TreePine, Handshake, School, Baby, Briefcase, Shield, Globe, TrendingUp, DollarSign, Eye, Camera, Send, MessageSquare, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOWrapper from '../components/SEOWrapper';
import ConsultasCiudadanas from '../components/ConsultasCiudadanas';
import AuthStatus from '../components/AuthStatus';
import { seoConfigs } from '../data/seoConfigs';

const Patrocinios = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [patrociniosData, setPatrociniosData] = useState({
    actual: 0,
    meta: 35361,
    porcentaje: 0
  });
  const [testimonios, setTestimonios] = useState([]);
  const [showTestimonioForm, setShowTestimonioForm] = useState(false);
  const [testimonioForm, setTestimonioForm] = useState({
    contenido: '',
    nombre_publico: '',
    ocupacion: '',
    region: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    // Cargar datos de patrocinios
    fetchPatrociniosData();
    fetchTestimonios();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const fetchPatrociniosData = async () => {
    try {
      const response = await fetch('/api/patrocinios/stats');
      const data = await response.json();
      setPatrociniosData({
        actual: data.actual || 0,
        meta: data.meta || 35361,
        porcentaje: Math.min((data.actual / (data.meta || 35361)) * 100, 100)
      });
    } catch (error) {
      console.error('Error cargando datos de patrocinios:', error);
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

  const handleTestimonioSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/testimonios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(testimonioForm)
      });

      if (response.ok) {
        setShowTestimonioForm(false);
        setTestimonioForm({
          contenido: '',
          nombre_publico: '',
          ocupacion: '',
          region: ''
        });
        alert('¡Testimonio enviado! Será revisado y publicado pronto.');
      } else {
        alert('Error enviando testimonio. Inténtalo nuevamente.');
      }
    } catch (error) {
      console.error('Error enviando testimonio:', error);
      alert('Error enviando testimonio. Inténtalo nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const pasosPatrocinio = [
    {
      numero: 1,
      titulo: "Descarga el Formulario",
      descripcion: "Descarga el formulario oficial de patrocinio desde SERVEL",
      icon: <FileText className="w-8 h-8" />,
      detalle: "Formulario disponible en formato PDF"
    },
    {
      numero: 2,
      titulo: "Completa tus Datos",
      descripcion: "Ingresa tu RUT, nombre completo, dirección y firma",
      icon: <CheckSquare className="w-8 h-8" />,
      detalle: "Datos deben coincidir con tu cédula de identidad"
    },
    {
      numero: 3,
      titulo: "Entrega Presencial",
      descripcion: "Lleva el formulario a nuestros puntos de recolección",
      icon: <Building className="w-8 h-8" />,
      detalle: "Ubicaciones en todas las regiones de Chile"
    },
    {
      numero: 4,
      titulo: "Validación SERVEL",
      descripcion: "SERVEL valida tu patrocinio y lo cuenta oficialmente",
      icon: <Shield className="w-8 h-8" />,
      detalle: "Proceso transparente y verificable"
    }
  ];

  const regiones = [
    'Arica y Parinacota', 'Tarapacá', 'Antofagasta', 'Atacama', 'Coquimbo', 
    'Valparaíso', 'Metropolitana', 'O\'Higgins', 'Maule', 'Ñuble', 
    'Biobío', 'Araucanía', 'Los Ríos', 'Los Lagos', 'Aysén', 'Magallanes'
  ];

  return (
    <SEOWrapper 
      title="Patrocina Mi Candidatura - Juan Pablo Melinao 2026"
      description="Sé parte del cambio. Patrocina la candidatura presidencial de Juan Pablo Melinao González para Chile 2026. Tecnología para Todos, Unidad para Chile."
      keywords="patrocinio, candidatura presidencial, Juan Pablo Melinao, Chile 2026, SERVEL, firmas"
      canonicalUrl="https://melinao2026.cl/patrocinios"
    >
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        
        {/* Hero Section con Contador */}
        <section className="relative py-20 lg:py-32 overflow-hidden">
          <div 
            className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800"
            style={{
              transform: `translateY(${scrollY * 0.5}px)`
            }}
          />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-white">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  Sé Parte del Cambio
                </span>
              </h1>
              <p className="text-xl lg:text-2xl mb-8 text-blue-100">
                Patrocina mi candidatura presidencial para Chile 2026
              </p>
              
              {/* Contador en Vivo */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-5xl lg:text-7xl font-bold text-yellow-300 mb-2">
                    {formatChileanNumber(patrociniosData.actual)}
                  </div>
                  <div className="text-lg text-blue-100 mb-4">
                    de {formatChileanNumber(patrociniosData.meta)} patrocinios necesarios
                  </div>
                  
                  {/* Barra de Progreso */}
                  <div className="w-full bg-white/20 rounded-full h-4 mb-4">
                    <div 
                      className="bg-gradient-to-r from-yellow-300 to-orange-300 h-4 rounded-full transition-all duration-1000"
                      style={{ width: `${patrociniosData.porcentaje}%` }}
                    />
                  </div>
                  
                  <div className="text-2xl font-bold text-yellow-300">
                    {patrociniosData.porcentaje.toFixed(1)}% completado
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="#como-patrocinar"
                  className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <FileText className="w-5 h-5" />
                  Quiero Patrocinar
                </a>
                <a 
                  href="#testimonios"
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-5 h-5" />
                  Ver Testimonios
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ¿Por qué Patrocinar? */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                ¿Por qué patrocinar mi candidatura?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Tu patrocinio es más que una firma: es tu voto de confianza para transformar Chile con tecnología, justicia social y unidad nacional.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Tecnología para Todos</h3>
                <p className="text-gray-600">
                  Trámites en 2 minutos, ahorro de $500 mil millones anuales, empleos digitales para todos.
                </p>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Justicia Social Real</h3>
                <p className="text-gray-600">
                  $4.5 millones para profesores, fin de privilegios políticos, sueldo mínimo $900k.
                </p>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Chile Unido</h3>
                <p className="text-gray-600">
                  Reconciliación mapuche, desarrollo de La Araucanía, fronteras seguras con dignidad.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Cómo Patrocinar */}
        <section id="como-patrocinar" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                ¿Cómo patrocinar mi candidatura?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                El proceso es simple y seguro. SERVEL valida cada patrocinio para garantizar transparencia total.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {pasosPatrocinio.map((paso, index) => (
                <div key={index} className="relative">
                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        {paso.icon}
                      </div>
                      <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center mx-auto -mt-2 mb-4 text-sm font-bold text-blue-900">
                        {paso.numero}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{paso.titulo}</h3>
                      <p className="text-gray-600 mb-3">{paso.descripcion}</p>
                      <p className="text-sm text-blue-600 font-medium">{paso.detalle}</p>
                    </div>
                  </div>
                  
                  {index < pasosPatrocinio.length - 1 && (
                    <div className="hidden lg:block absolute top-8 -right-4 z-10">
                      <ArrowRight className="w-8 h-8 text-blue-400" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <a 
                href="#"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 inline-flex items-center gap-2"
              >
                <FileText className="w-5 h-5" />
                Descargar Formulario SERVEL
              </a>
            </div>
          </div>
        </section>

        {/* Testimonios Section */}
        <section id="testimonios" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Testimonios de Patrocinadores
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Conoce por qué ciudadanos de todo Chile han decidido patrocinar nuestra candidatura.
              </p>
              
              <AuthStatus>
                {({ user, isAuthenticated }) => (
                  isAuthenticated ? (
                    <button 
                      onClick={() => setShowTestimonioForm(true)}
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-bold transition-all inline-flex items-center gap-2"
                    >
                      <MessageSquare className="w-5 h-5" />
                      Compartir mi Testimonio
                    </button>
                  ) : (
                    <p className="text-gray-500">
                      <a href="#" className="text-blue-600 hover:underline">Inicia sesión</a> para compartir tu testimonio
                    </p>
                  )
                )}
              </AuthStatus>
            </div>

            {/* Grid de Testimonios */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonios.map((testimonio, index) => (
                <div key={index} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 shadow-lg">
                  <div className="flex items-start gap-4 mb-4">
                    <Quote className="w-8 h-8 text-blue-600 flex-shrink-0" />
                    <p className="text-gray-700 italic">{testimonio.contenido}</p>
                  </div>
                  <div className="border-t pt-4">
                    <div className="font-bold text-gray-900">{testimonio.nombre_publico}</div>
                    <div className="text-sm text-gray-600">{testimonio.ocupacion}</div>
                    <div className="text-sm text-blue-600">{testimonio.region}</div>
                  </div>
                </div>
              ))}
            </div>

            {testimonios.length === 0 && (
              <div className="text-center py-12">
                <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">
                  Sé el primero en compartir tu testimonio de apoyo a nuestra candidatura.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Modal Formulario Testimonio */}
        {showTestimonioForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">Compartir Testimonio</h3>
                  <button 
                    onClick={() => setShowTestimonioForm(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleTestimonioSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tu testimonio *
                    </label>
                    <textarea 
                      value={testimonioForm.contenido}
                      onChange={(e) => setTestimonioForm({...testimonioForm, contenido: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows="4"
                      placeholder="¿Por qué decidiste patrocinar esta candidatura?"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre público
                      </label>
                      <input 
                        type="text"
                        value={testimonioForm.nombre_publico}
                        onChange={(e) => setTestimonioForm({...testimonioForm, nombre_publico: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Como quieres aparecer"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ocupación
                      </label>
                      <input 
                        type="text"
                        value={testimonioForm.ocupacion}
                        onChange={(e) => setTestimonioForm({...testimonioForm, ocupacion: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Tu profesión u ocupación"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Región
                    </label>
                    <select 
                      value={testimonioForm.region}
                      onChange={(e) => setTestimonioForm({...testimonioForm, region: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Selecciona tu región</option>
                      {regiones.map(region => (
                        <option key={region} value={region}>{region}</option>
                      ))}
                    </select>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-xl">
                    <p className="text-sm text-blue-800">
                      <strong>Nota:</strong> Tu testimonio será revisado antes de publicarse. Solo se publicarán testimonios constructivos y respetuosos.
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <button 
                      type="button"
                      onClick={() => setShowTestimonioForm(false)}
                      className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-xl font-bold transition-all"
                    >
                      Cancelar
                    </button>
                    <button 
                      type="submit"
                      disabled={isSubmitting || !testimonioForm.contenido.trim()}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-xl font-bold transition-all inline-flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Enviar Testimonio
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Call to Action Final */}
        <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Tu patrocinio construye el Chile que soñamos
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Cada firma nos acerca más a un país con tecnología para todos, justicia social real y unidad nacional.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#como-patrocinar"
                className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 inline-flex items-center justify-center gap-2"
              >
                <FileText className="w-5 h-5" />
                Descargar Formulario
              </a>
              <Link 
                to="/"
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold text-lg transition-all inline-flex items-center justify-center gap-2"
              >
                <ArrowRight className="w-5 h-5" />
                Conocer Propuestas
              </Link>
            </div>
          </div>
        </section>

        {/* Consultas Ciudadanas */}
        <ConsultasCiudadanas />
      </div>
    </SEOWrapper>
  );
};

export default Patrocinios;