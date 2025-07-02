import React, { useState } from 'react';
import { MessageSquare, Send, Lightbulb, ArrowRight, CheckCircle, X } from 'lucide-react';
import AlertService from '../utils/AlertService';
import FloatingActions from './FloatingActions';

const ConsultasCiudadanas = ({ 
  tema = "general", 
  titulo = "Consulta Ciudadana", 
  descripcion = "Tu opinión es importante para mejorar nuestras propuestas",
  showStats = true,
  isOpen: externalIsOpen = null,
  onClose = null,
  usuario = null
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = externalIsOpen !== null ? externalIsOpen : internalIsOpen;
  
  const handleClose = () => {
    if (externalIsOpen !== null && onClose) {
      onClose(false);
    } else {
      setInternalIsOpen(false);
    }
  };
  
  const handleOpen = () => {
    if (externalIsOpen === null) {
      setInternalIsOpen(true);
    }
  };
  
  // Estado para consulta anónima
  const [esAnonima, setEsAnonima] = useState(false);
  
  const [formData, setFormData] = useState({
    nombre: usuario?.nombre || '',
    email: usuario?.email || '',
    region: '',
    edad: '',
    tema: tema || 'general',
    tipoConsulta: 'sugerencia',
    mensaje: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [stats, setStats] = useState({
    totalConsultas: 0,
    implementadas: 0,
    enRevision: 0
  });

  // Actualizar datos del formulario cuando cambie el usuario
  React.useEffect(() => {
    if (usuario && !esAnonima) {
      setFormData(prev => ({
        ...prev,
        nombre: usuario.nombre || '',
        email: usuario.email || ''
      }));
    } else if (esAnonima) {
      setFormData(prev => ({
        ...prev,
        nombre: '',
        email: ''
      }));
    }
  }, [usuario, esAnonima]);

  // Cargar estadísticas reales al montar el componente
  React.useEffect(() => {
    const loadRealStats = async () => {
      try {
        const response = await fetch('/api/consultas/stats');
        if (response.ok) {
          const data = await response.json();
          setStats({
            totalConsultas: data.total || 0,
            implementadas: data.implementadas || 0,
            enRevision: data.enRevision || 0
          });
        }
      } catch (error) {
        // Error cargando estadísticas
        // Mantener valores por defecto en caso de error
      }
    };

    loadRealStats();
  }, []);

  const regiones = [
    'Arica y Parinacota', 'Tarapacá', 'Antofagasta', 'Atacama', 'Coquimbo',
    'Valparaíso', 'Metropolitana', 'O\'Higgins', 'Maule', 'Ñuble', 'Biobío',
    'La Araucanía', 'Los Ríos', 'Los Lagos', 'Aysén', 'Magallanes'
  ];

  const temasDisponibles = [
    { id: 'general', name: 'General', descripcion: 'Propuestas generales y otros temas', icon: '📋' },
    { id: 'economia', name: 'Economía', descripcion: 'Reformas económicas, impuestos, empleo', icon: '💰' },
    { id: 'ia', name: 'Inteligencia Artificial', descripcion: 'Automatización, innovación tecnológica', icon: '🤖' },
    { id: 'seguridad', name: 'Seguridad', descripcion: 'Seguridad ciudadana, fronteras, migración', icon: '🛡️' },
    { id: 'justicia', name: 'Justicia', descripcion: 'Sistema judicial, equidad social', icon: '⚖️' },
    { id: 'unidad', name: 'Unidad Nacional', descripcion: 'Reconciliación, diversidad, derechos', icon: '🤝' }
  ];

  const tiposConsulta = [
    // Relacionadas con reformas existentes
    { id: 'apoyo', name: 'Apoyo a reforma propuesta', icon: <CheckCircle className="w-4 h-4" />, categoria: 'reforma' },
    { id: 'sugerencia', name: 'Mejora a reforma propuesta', icon: <Lightbulb className="w-4 h-4" />, categoria: 'reforma' },
    { id: 'critica', name: 'Crítica constructiva a reforma', icon: <MessageSquare className="w-4 h-4" />, categoria: 'reforma' },
    { id: 'duda', name: 'Consulta sobre reforma', icon: <ArrowRight className="w-4 h-4" />, categoria: 'reforma' },
    
    // Nuevas propuestas ciudadanas - reutilizamos los tipos válidos del schema
    { id: 'sugerencia', name: 'Nueva propuesta ciudadana', icon: <Lightbulb className="w-4 h-4" />, categoria: 'propuesta' },
    { id: 'critica', name: 'Problema local/regional', icon: <MessageSquare className="w-4 h-4" />, categoria: 'propuesta' },
    { id: 'duda', name: 'Idea de innovación', icon: <ArrowRight className="w-4 h-4" />, categoria: 'propuesta' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        await AlertService.sessionExpired();
        setIsSubmitting(false);
        return;
      }

      const tipoSeleccionado = tiposConsulta.find(t => t.id === formData.tipoConsulta);
      
      const consultaData = {
        ...formData,
        tema: formData.tema, // Usar el tema seleccionado por el usuario
        esAnonima,
        categoria: formData.tema, // Usar el tema como categoría (ambos usan los mismos valores válidos)
        // Si es anónima, no enviar datos personales
        nombre: esAnonima ? '' : formData.nombre,
        email: esAnonima ? '' : formData.email,
        fechaEnvio: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href
      };

      const response = await fetch('/api/consultas', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(consultaData)
      });

      if (response.ok) {
        const data = await response.json();
        
        // Mostrar alerta según el estado de moderación
        await AlertService.consultationSuccess(data.requiresReview);
        
        setStats(prev => ({
          ...prev,
          totalConsultas: prev.totalConsultas + 1
        }));
        
        // Reset form and close modal
        handleClose();
        setFormData({
          nombre: usuario?.nombre || '',
          email: usuario?.email || '',
          region: '',
          edad: '',
          tema: tema || 'general',
          tipoConsulta: 'sugerencia',
          mensaje: ''
        });
        setEsAnonima(false);
      } else if (response.status === 401) {
        localStorage.removeItem('authToken');
        await AlertService.sessionExpired();
        window.location.reload();
      } else {
        throw new Error('Error al enviar consulta');
      }
    } catch (error) {
      // Error en envío
      await AlertService.networkError();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="relative">
      {/* Floating Actions Component */}
      <FloatingActions 
        stats={stats}
        showStats={showStats && !isOpen}
        showScrollTop={true}
      />

      {/* Trigger Button - Ahora integrado en FloatingActions */}
      <button
        onClick={handleOpen}
        className="fixed bottom-6 right-6 z-[60] lg:hidden bg-gradient-to-r from-blue-600 to-green-600 text-white p-3 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300"
        aria-label="Abrir consulta ciudadana"
      >
        <MessageSquare className="w-5 h-5" />
        <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
          !
        </div>
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[70]">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            
            {!isSubmitted ? (
              <>
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-6 rounded-t-3xl">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{titulo}</h3>
                      <p className="text-blue-100">{descripcion}</p>
                    </div>
                    <button 
                      onClick={handleClose}
                      className="p-2 hover:bg-white/20 rounded-full transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                  
                  {/* Stats */}
                  {showStats && (
                    <div className="grid grid-cols-3 gap-4 mt-6">
                      <div className="bg-white/20 rounded-lg p-3 text-center">
                        <div className="text-2xl font-black">{stats.totalConsultas}</div>
                        <div className="text-xs">Total Consultas</div>
                      </div>
                      <div className="bg-white/20 rounded-lg p-3 text-center">
                        <div className="text-2xl font-black">{stats.implementadas}</div>
                        <div className="text-xs">Implementadas</div>
                      </div>
                      <div className="bg-white/20 rounded-lg p-3 text-center">
                        <div className="text-2xl font-black">{stats.enRevision}</div>
                        <div className="text-xs">En Revisión</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                  {/* Checkbox para consulta anónima */}
                  {usuario && (
                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={esAnonima}
                          onChange={(e) => setEsAnonima(e.target.checked)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <div>
                          <span className="text-sm font-medium text-gray-900">
                            Enviar consulta de forma anónima
                          </span>
                          <p className="text-xs text-gray-600 mt-1">
                            Al marcar esta opción, tu nombre y email no serán incluidos en la consulta
                          </p>
                        </div>
                      </label>
                    </div>
                  )}

                  {/* Personal Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre {esAnonima ? '(oculto - consulta anónima)' : '(opcional)'}
                      </label>
                      <input
                        type="text"
                        value={formData.nombre}
                        onChange={(e) => handleInputChange('nombre', e.target.value)}
                        placeholder={esAnonima ? "Consulta anónima" : "Tu nombre"}
                        disabled={esAnonima}
                        className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          esAnonima ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email {esAnonima ? '(oculto - consulta anónima)' : '(opcional)'}
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder={esAnonima ? "Consulta anónima" : "tu@email.com"}
                        disabled={esAnonima}
                        className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          esAnonima ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''
                        }`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Región
                      </label>
                      <select
                        value={formData.region}
                        onChange={(e) => handleInputChange('region', e.target.value)}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Selecciona tu región</option>
                        {regiones.map(region => (
                          <option key={region} value={region}>{region}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Rango de edad
                      </label>
                      <select
                        value={formData.edad}
                        onChange={(e) => handleInputChange('edad', e.target.value)}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Selecciona</option>
                        <option value="18-25">18-25 años</option>
                        <option value="26-35">26-35 años</option>
                        <option value="36-45">36-45 años</option>
                        <option value="46-55">46-55 años</option>
                        <option value="56-65">56-65 años</option>
                        <option value="65+">65+ años</option>
                      </select>
                    </div>
                  </div>

                  {/* Selector de Tema */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Tema de la consulta *
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {temasDisponibles.map(temaItem => (
                        <button
                          key={temaItem.id}
                          type="button"
                          onClick={() => handleInputChange('tema', temaItem.id)}
                          className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                            formData.tema === temaItem.id
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-200 hover:border-gray-300 bg-white'
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <span className="text-xl">{temaItem.icon}</span>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-sm">{temaItem.name}</h4>
                              <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                                {temaItem.descripcion}
                              </p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Tipo de Consulta */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Tipo de consulta
                    </label>
                    
                    {/* Reformas existentes */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-green-700 mb-2 flex items-center">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Sobre reformas propuestas
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {tiposConsulta.filter(tipo => tipo.categoria === 'reforma').map(tipo => (
                          <button
                            key={tipo.id}
                            type="button"
                            onClick={() => handleInputChange('tipoConsulta', tipo.id)}
                            className={`p-3 rounded-xl border-2 transition-all duration-200 flex items-center space-x-2 text-left ${
                              formData.tipoConsulta === tipo.id
                                ? 'border-green-500 bg-green-50 text-green-700'
                                : 'border-gray-200 hover:border-green-300'
                            }`}
                          >
                            {tipo.icon}
                            <span className="text-sm font-medium">{tipo.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Nuevas propuestas */}
                    <div>
                      <h4 className="text-sm font-semibold text-blue-700 mb-2 flex items-center">
                        <Lightbulb className="w-4 h-4 mr-1" />
                        Nuevas propuestas ciudadanas
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {tiposConsulta.filter(tipo => tipo.categoria === 'propuesta').map(tipo => (
                          <button
                            key={tipo.id}
                            type="button"
                            onClick={() => handleInputChange('tipoConsulta', tipo.id)}
                            className={`p-3 rounded-xl border-2 transition-all duration-200 flex items-center space-x-2 text-left ${
                              formData.tipoConsulta === tipo.id
                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                : 'border-gray-200 hover:border-blue-300'
                            }`}
                          >
                            {tipo.icon}
                            <span className="text-sm font-medium">{tipo.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Mensaje */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tu mensaje *
                    </label>
                    <textarea
                      value={formData.mensaje}
                      onChange={(e) => handleInputChange('mensaje', e.target.value)}
                      required
                      rows={5}
                      placeholder="Comparte tu idea, sugerencia o consulta sobre esta propuesta..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    />
                    <div className="text-xs text-gray-500 mt-1">
                      Mínimo 10 caracteres ({formData.mensaje.length}/10)
                    </div>
                  </div>

                  {/* Privacy Notice */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="text-xs text-gray-600">
                      <strong>Privacidad:</strong> Tu información será utilizada únicamente para mejorar nuestras propuestas. 
                      Los datos personales son opcionales y no serán compartidos con terceros.
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={handleClose}
                      className="flex-1 bg-gray-500 text-white font-bold py-3 rounded-xl hover:bg-gray-600 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting || formData.mensaje.length < 10}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-green-600 text-white font-bold py-3 rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    >
                      {isSubmitting ? (
                        <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span>Enviar Consulta</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </>
            ) : (
              /* Success Message */
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">¡Consulta Enviada!</h3>
                <p className="text-gray-600 mb-6">
                  Gracias por tu participación. Tu consulta será revisada por nuestro equipo de campaña 
                  y considerada para mejorar nuestras propuestas.
                </p>
                <div className="bg-blue-50 rounded-xl p-4">
                  <div className="text-sm text-blue-800">
                    <strong>Próximos pasos:</strong><br />
                    • Revisión por equipo técnico (24-48 horas)<br />
                    • Análisis e integración de feedback<br />
                    • Respuesta si proporcionaste email
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsultasCiudadanas;