import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Users, TrendingUp, Filter, Search, Heart, Flag, Home, User, LogIn, LogOut, MapPin, Calendar, Tag, ChevronDown } from 'lucide-react';
import SEOWrapper from '../components/SEOWrapper';
import AuthStatus from '../components/AuthStatus';
import ConsultasCiudadanas from '../components/ConsultasCiudadanas';
import AlertService from '../utils/AlertService';
import { seoConfigs } from '../data/seoConfigs';

const ParticipacionCiudadana = () => {
  const [consultas, setConsultas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtros, setFiltros] = useState({
    tema: 'todos',
    region: 'todas',
    page: 1
  });
  const [estadisticas, setEstadisticas] = useState({
    total: 0,
    implementadas: 0,
    enRevision: 0
  });
  const [usuario, setUsuario] = useState(null);
  const [showFiltros, setShowFiltros] = useState(false);
  const [showConsultaModal, setShowConsultaModal] = useState(false);

  // Verificar estado de autenticación al cargar
  useEffect(() => {
    checkAuthStatus();
    loadConsultas();
    loadEstadisticas();
  }, [filtros]);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setUsuario(null);
        return;
      }
      
      const response = await fetch('/api/auth/user', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const userData = await response.json();
        setUsuario(userData);
      } else if (response.status === 401) {
        localStorage.removeItem('authToken');
        setUsuario(null);
      }
    } catch (error) {
      // Usuario no autenticado
    }
  };

  const loadConsultas = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: filtros.page,
        limit: 12,
        ...(filtros.tema !== 'todos' && { tema: filtros.tema }),
        ...(filtros.region !== 'todas' && { region: filtros.region })
      });

      const response = await fetch(`/api/consultas/public?${params}`);
      const data = await response.json();
      
      if (filtros.page === 1) {
        setConsultas(data.consultas || []);
      } else {
        setConsultas(prev => [...prev, ...(data.consultas || [])]);
      }
    } catch (error) {
      // Error cargando consultas
    } finally {
      setLoading(false);
    }
  };

  const loadEstadisticas = async () => {
    try {
      const response = await fetch('/api/consultas/stats');
      const data = await response.json();
      setEstadisticas(data);
    } catch (error) {
      // Error cargando estadísticas
    }
  };

  const handleLogin = () => {
    window.location.href = '/api/auth/google';
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setUsuario(null);
    window.location.reload();
  };

  const handleLike = async (consultaId) => {
    if (!usuario) {
      await AlertService.info('Iniciar Sesión', 'Debes iniciar sesión para dar like a las consultas');
      return;
    }

    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        await AlertService.sessionExpired();
        return;
      }

      const response = await fetch(`/api/consultas/${consultaId}/like`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setConsultas(prev => prev.map(c => 
          c._id === consultaId 
            ? { ...c, likes: data.totalLikes }
            : c
        ));
        
        // Toast de éxito discreta
        AlertService.toast('success', '¡Like agregado!');
      } else if (response.status === 401) {
        localStorage.removeItem('authToken');
        setUsuario(null);
        await AlertService.sessionExpired();
      }
    } catch (error) {
      // Error procesando like
      await AlertService.networkError();
    }
  };

  const handleReport = async (consultaId) => {
    if (!usuario) {
      await AlertService.info('Iniciar Sesión', 'Debes iniciar sesión para reportar consultas');
      return;
    }

    try {
      // Usar el dialog personalizado de reporte
      const result = await AlertService.confirmReport();
      
      if (!result.isConfirmed || !result.value) {
        return;
      }

      const motivo = result.value.trim();
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        await AlertService.sessionExpired();
        return;
      }

      // Mostrar indicador de carga
      AlertService.loading('Enviando reporte...');

      const response = await fetch(`/api/consultas/${consultaId}/report`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ motivo })
      });
      
      AlertService.close(); // Cerrar el loading
      
      if (response.ok) {
        await AlertService.success(
          'Reporte Enviado', 
          'Gracias por ayudarnos a mantener una comunidad saludable.',
          { autoClose: true }
        );
      } else if (response.status === 401) {
        localStorage.removeItem('authToken');
        setUsuario(null);
        await AlertService.sessionExpired();
      } else {
        await AlertService.error('Error', 'Error enviando el reporte. Inténtalo nuevamente.');
      }
    } catch (error) {
      AlertService.close(); // Cerrar el loading si hay error
      // Error reportando consulta
      await AlertService.networkError();
    }
  };

  const formatTimeAgo = (fecha) => {
    const now = new Date();
    const date = new Date(fecha);
    const diffMs = now - date;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return 'Hace menos de 1 hora';
    if (diffHours < 24) return `Hace ${diffHours} hora${diffHours > 1 ? 's' : ''}`;
    if (diffDays < 7) return `Hace ${diffDays} día${diffDays > 1 ? 's' : ''}`;
    return date.toLocaleDateString('es-CL');
  };

  const temas = [
    { id: 'todos', name: 'Todos los temas' },
    { id: 'general', name: 'General' },
    { id: 'economia', name: 'Economía' },
    { id: 'ia', name: 'Inteligencia Artificial' },
    { id: 'seguridad', name: 'Seguridad' },
    { id: 'justicia', name: 'Justicia' },
    { id: 'unidad', name: 'Unidad Nacional' }
  ];

  const regiones = [
    { id: 'todas', name: 'Todas las regiones' },
    { id: 'Arica y Parinacota', name: 'Arica y Parinacota' },
    { id: 'Tarapacá', name: 'Tarapacá' },
    { id: 'Antofagasta', name: 'Antofagasta' },
    { id: 'Atacama', name: 'Atacama' },
    { id: 'Coquimbo', name: 'Coquimbo' },
    { id: 'Valparaíso', name: 'Valparaíso' },
    { id: 'Metropolitana', name: 'Región Metropolitana' },
    { id: 'O\'Higgins', name: 'O\'Higgins' },
    { id: 'Maule', name: 'Maule' },
    { id: 'Ñuble', name: 'Ñuble' },
    { id: 'Biobío', name: 'Biobío' },
    { id: 'La Araucanía', name: 'La Araucanía' },
    { id: 'Los Ríos', name: 'Los Ríos' },
    { id: 'Los Lagos', name: 'Los Lagos' },
    { id: 'Aysén', name: 'Aysén' },
    { id: 'Magallanes', name: 'Magallanes' }
  ];

  const seoConfig = seoConfigs.participacionCiudadana;

  return (
    <SEOWrapper config={seoConfig}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        
        {/* Header */}
        <header className="hidden lg:block bg-white/90 backdrop-blur-md shadow-lg sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <Link to="/" className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center">
                  <Home className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Participación Ciudadana</h1>
                  <p className="text-sm text-gray-600">Melinao 2026</p>
                </div>
              </Link>

              {/* Usuario */}
              <AuthStatus onAuthChange={setUsuario} />
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6">
              Tu Voz <span className="text-blue-600">Construye</span> Chile
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Participa activamente en la construcción de las propuestas que transformarán nuestro país
            </p>

            {/* Estadísticas */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="text-3xl font-black text-blue-600 mb-2">{estadisticas.total}</div>
                <div className="text-sm text-gray-600">Consultas Ciudadanas</div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="text-3xl font-black text-green-600 mb-2">{estadisticas.implementadas}</div>
                <div className="text-sm text-gray-600">Implementadas</div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="text-3xl font-black text-orange-600 mb-2">{estadisticas.enRevision}</div>
                <div className="text-sm text-gray-600">En Revisión</div>
              </div>
            </div>
          </div>
        </section>

        {/* Sección de Consultas Implementadas Destacadas */}
        {consultas.some(c => c.estado === 'implementada') && (
          <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-emerald-50 to-green-50">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  🎯 Consultas Implementadas
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Estas son las consultas ciudadanas que ya se han convertido en acciones concretas. 
                  Tu voz cuenta y genera cambios reales.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {consultas
                  .filter(c => c.estado === 'implementada')
                  .slice(0, 6)
                  .map((consulta) => (
                    <div key={consulta._id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border-2 border-emerald-200">
                      {/* Header destacado */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm">✓</span>
                          </div>
                          <span className="font-semibold text-emerald-700">Implementada</span>
                        </div>
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                          {consulta.tema}
                        </span>
                      </div>

                      {/* Contenido */}
                      <div className="mb-4">
                        <p className="text-gray-700 text-sm line-clamp-3 mb-3">
                          {consulta.mensaje}
                        </p>
                        
                        {/* Descripción de implementación */}
                        {consulta.descripcionImplementacion && (
                          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                            <p className="text-emerald-700 text-sm font-medium mb-1">
                              🎯 Implementación:
                            </p>
                            <p className="text-emerald-600 text-sm">
                              {consulta.descripcionImplementacion}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{consulta.region}</span>
                        {consulta.fechaImplementacion && (
                          <span>
                            {new Date(consulta.fechaImplementacion).toLocaleDateString('es-ES', {
                              month: 'short',
                              year: 'numeric'
                            })}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
              </div>

              {consultas.filter(c => c.estado === 'implementada').length > 6 && (
                <div className="text-center mt-8">
                  <button
                    onClick={() => setFiltros(prev => ({ ...prev, estado: 'implementada' }))}
                    className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    Ver todas las implementadas ({consultas.filter(c => c.estado === 'implementada').length})
                  </button>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Filtros */}
        <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white/50">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <button
                onClick={() => setShowFiltros(!showFiltros)}
                className="flex items-center space-x-2 bg-white rounded-lg px-4 py-2 shadow-md hover:shadow-lg transition-shadow"
              >
                <Filter className="w-4 h-4" />
                <span>Filtros</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showFiltros ? 'rotate-180' : ''}`} />
              </button>

              {showFiltros && (
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                  <select
                    value={filtros.tema}
                    onChange={(e) => setFiltros(prev => ({ ...prev, tema: e.target.value, page: 1 }))}
                    className="bg-white rounded-lg px-4 py-2 shadow-md border border-gray-200 focus:ring-2 focus:ring-blue-500"
                  >
                    {temas.map(tema => (
                      <option key={tema.id} value={tema.id}>{tema.name}</option>
                    ))}
                  </select>

                  <select
                    value={filtros.region}
                    onChange={(e) => setFiltros(prev => ({ ...prev, region: e.target.value, page: 1 }))}
                    className="bg-white rounded-lg px-4 py-2 shadow-md border border-gray-200 focus:ring-2 focus:ring-blue-500"
                  >
                    {regiones.map(region => (
                      <option key={region.id} value={region.id}>{region.name}</option>
                    ))}
                  </select>

                  <select
                    value={filtros.estado || ''}
                    onChange={(e) => setFiltros(prev => ({ ...prev, estado: e.target.value, page: 1 }))}
                    className="bg-white rounded-lg px-4 py-2 shadow-md border border-gray-200 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Todos los estados</option>
                    <option value="pendiente">📋 Pendientes</option>
                    <option value="revisando">🔍 En revisión</option>
                    <option value="implementada">✅ Implementadas</option>
                    <option value="respondida">💬 Respondidas</option>
                    <option value="rechazada">❌ Rechazadas</option>
                  </select>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Grid de Consultas */}
        <section className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {loading && consultas.length === 0 ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="text-gray-600 mt-4">Cargando consultas ciudadanas...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {consultas.map((consulta) => (
                  <div key={consulta._id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                    {/* Header de la consulta */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">
                            {consulta.usuario?.nombre || 'Ciudadano Anónimo'}
                          </div>
                          <div className="text-xs text-gray-500">
                            {formatTimeAgo(consulta.fechaPublicacion)}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-1">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          consulta.tema === 'economia' ? 'bg-green-100 text-green-800' :
                          consulta.tema === 'ia' ? 'bg-purple-100 text-purple-800' :
                          consulta.tema === 'seguridad' ? 'bg-red-100 text-red-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {consulta.tema}
                        </span>
                        
                        {/* Badge de estado de implementación */}
                        {consulta.estado === 'implementada' && (
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-200">
                            ✅ Implementada
                          </span>
                        )}
                        {consulta.estado === 'revisando' && (
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                            🔍 En Revisión
                          </span>
                        )}
                        {consulta.estado === 'respondida' && (
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
                            💬 Respondida
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Contenido */}
                    <div className="mb-4">
                      <p className="text-gray-700 line-clamp-4">
                        {consulta.mensaje}
                      </p>
                    </div>

                    {/* Información de implementación */}
                    {consulta.estado === 'implementada' && (
                      <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-emerald-600 font-semibold text-sm">🎯 Implementación Exitosa</span>
                        </div>
                        {consulta.descripcionImplementacion && (
                          <p className="text-sm text-emerald-700 mb-2">
                            {consulta.descripcionImplementacion}
                          </p>
                        )}
                        {consulta.fechaImplementacion && (
                          <p className="text-xs text-emerald-600">
                            Implementada el {new Date(consulta.fechaImplementacion).toLocaleDateString('es-ES', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric'
                            })}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Respuesta oficial si existe */}
                    {consulta.respuesta && (
                      <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-blue-600 font-semibold text-sm">💬 Respuesta Oficial</span>
                        </div>
                        <p className="text-sm text-blue-700 mb-2">
                          {consulta.respuesta.mensaje}
                        </p>
                        <p className="text-xs text-blue-600">
                          Por {consulta.respuesta.autor} - {new Date(consulta.respuesta.fecha).toLocaleDateString('es-ES')}
                        </p>
                      </div>
                    )}

                    {/* Metadata */}
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-3 h-3" />
                        <span>{consulta.region}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Tag className="w-3 h-3" />
                        <span>{consulta.tipoConsulta}</span>
                      </div>
                    </div>

                    {/* Acciones */}
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => handleLike(consulta._id)}
                        className="flex items-center space-x-1 text-pink-600 hover:text-pink-700 transition-colors"
                      >
                        <Heart className="w-4 h-4" />
                        <span>{consulta.likes || 0}</span>
                      </button>

                      {usuario && (
                        <button 
                          onClick={() => handleReport(consulta._id)}
                          className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 transition-colors"
                        >
                          <Flag className="w-4 h-4" />
                          <span className="text-xs">Reportar</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Cargar más */}
            {consultas.length > 0 && (
              <div className="text-center mt-8">
                <button
                  onClick={() => setFiltros(prev => ({ ...prev, page: prev.page + 1 }))}
                  disabled={loading}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Cargando...' : 'Cargar Más Consultas'}
                </button>
              </div>
            )}
          </div>
        </section>

        {/* CTA de Participación */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-green-600">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold text-white mb-4">
              ¿Tienes una idea para mejorar Chile?
            </h3>
            <p className="text-blue-100 mb-8">
              {usuario 
                ? 'Comparte tu propuesta y forma parte del cambio que necesita nuestro país'
                : 'Inicia sesión y comparte tu propuesta para formar parte del cambio que necesita nuestro país'
              }
            </p>
            {usuario ? (
              <button
                onClick={() => setShowConsultaModal(true)}
                className="inline-flex items-center space-x-2 bg-white text-blue-600 px-8 py-4 rounded-full font-bold hover:shadow-lg transition-all duration-300"
              >
                <MessageSquare className="w-5 h-5" />
                <span>Participar Ahora</span>
              </button>
            ) : (
              <button
                onClick={handleLogin}
                className="inline-flex items-center space-x-2 bg-white text-blue-600 px-8 py-4 rounded-full font-bold hover:shadow-lg transition-all duration-300"
              >
                <LogIn className="w-5 h-5" />
                <span>Iniciar Sesión para Participar</span>
              </button>
            )}
          </div>
        </section>
      </div>

      {/* Consultation Modal */}
      <ConsultasCiudadanas 
        tema="general"
        titulo="Nueva Consulta Ciudadana"
        descripcion="Comparte tu propuesta para formar parte del cambio que necesita nuestro país"
        showStats={false}
        isOpen={showConsultaModal}
        onClose={setShowConsultaModal}
        usuario={usuario}
      />
    </SEOWrapper>
  );
};

export default ParticipacionCiudadana;