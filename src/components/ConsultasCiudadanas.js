import React, { useState } from 'react';
import { MessageSquare, Send, Lightbulb, ArrowRight, CheckCircle, X } from 'lucide-react';

const ConsultasCiudadanas = ({ 
  tema = "general", 
  titulo = "Consulta Ciudadana", 
  descripcion = "Tu opinión es importante para mejorar nuestras propuestas",
  showStats = true 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    region: '',
    edad: '',
    tipoConsulta: 'sugerencia',
    mensaje: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [stats, setStats] = useState({
    totalConsultas: 847,
    implementadas: 23,
    enRevision: 156
  });

  const regiones = [
    'Arica y Parinacota', 'Tarapacá', 'Antofagasta', 'Atacama', 'Coquimbo',
    'Valparaíso', 'Metropolitana', 'O\'Higgins', 'Maule', 'Ñuble', 'Biobío',
    'La Araucanía', 'Los Ríos', 'Los Lagos', 'Aysén', 'Magallanes'
  ];

  const tiposConsulta = [
    { id: 'sugerencia', name: 'Sugerencia de mejora', icon: <Lightbulb className="w-4 h-4" /> },
    { id: 'critica', name: 'Crítica constructiva', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'apoyo', name: 'Apoyo a la propuesta', icon: <CheckCircle className="w-4 h-4" /> },
    { id: 'duda', name: 'Consulta específica', icon: <ArrowRight className="w-4 h-4" /> }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const consultaData = {
        ...formData,
        tema,
        fechaEnvio: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href
      };

      const response = await fetch('/api/consultas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(consultaData)
      });

      if (response.ok) {
        setIsSubmitted(true);
        setStats(prev => ({
          ...prev,
          totalConsultas: prev.totalConsultas + 1
        }));
        
        // Reset form after success
        setTimeout(() => {
          setIsOpen(false);
          setIsSubmitted(false);
          setFormData({
            nombre: '',
            email: '',
            region: '',
            edad: '',
            tipoConsulta: 'sugerencia',
            mensaje: ''
          });
        }, 3000);
      } else {
        throw new Error('Error al enviar consulta');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al enviar la consulta. Por favor, inténtalo nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="relative">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="group fixed bottom-6 right-6 z-40 bg-gradient-to-r from-blue-600 to-green-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300"
      >
        <MessageSquare className="w-6 h-6 group-hover:animate-pulse" />
        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center animate-bounce">
          !
        </div>
      </button>

      {/* Stats Mini Display */}
      {showStats && !isOpen && (
        <div className="fixed bottom-20 right-6 z-40 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-gray-200">
          <div className="text-xs text-gray-600 font-semibold">Participación Ciudadana</div>
          <div className="text-sm font-bold text-green-600">{stats.totalConsultas} consultas</div>
          <div className="text-xs text-blue-600">{stats.implementadas} implementadas</div>
        </div>
      )}

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
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
                      onClick={() => setIsOpen(false)}
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
                  {/* Personal Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre (opcional)
                      </label>
                      <input
                        type="text"
                        value={formData.nombre}
                        onChange={(e) => handleInputChange('nombre', e.target.value)}
                        placeholder="Tu nombre"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email (opcional)
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="tu@email.com"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

                  {/* Tipo de Consulta */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Tipo de consulta
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {tiposConsulta.map(tipo => (
                        <button
                          key={tipo.id}
                          type="button"
                          onClick={() => handleInputChange('tipoConsulta', tipo.id)}
                          className={`p-3 rounded-xl border-2 transition-all duration-200 flex items-center space-x-2 ${
                            formData.tipoConsulta === tipo.id
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          {tipo.icon}
                          <span className="text-sm font-medium">{tipo.name}</span>
                        </button>
                      ))}
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
                      onClick={() => setIsOpen(false)}
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