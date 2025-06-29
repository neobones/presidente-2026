import React, { useState, useEffect } from 'react';
import { BarChart3, Users, MessageSquare, TrendingUp, MapPin, Calendar, Filter, Eye, Flag, CheckCircle, X, ExternalLink } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    implementadas: 0,
    enRevision: 0,
    consultasEstaSemana: 0,
    porRegion: [],
    porTipo: []
  });
  const [consultas, setConsultas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtros, setFiltros] = useState({
    estado: '',
    categoria: '',
    region: ''
  });

  useEffect(() => {
    loadStats();
    loadConsultas();
  }, [filtros]);

  const loadStats = async () => {
    try {
      const response = await fetch('/api/consultas/stats');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error cargando estadísticas:', error);
    }
  };

  const loadConsultas = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: 1,
        limit: 20,
        ...filtros
      });

      const response = await fetch(`/api/consultas/admin?${params}`);
      const data = await response.json();
      setConsultas(data.consultas || []);
    } catch (error) {
      console.error('Error cargando consultas:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateEstado = async (id, nuevoEstado) => {
    try {
      const response = await fetch(`/api/consultas/${id}/estado`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado: nuevoEstado })
      });

      if (response.ok) {
        setConsultas(prev => prev.map(c => 
          c._id === id ? { ...c, estado: nuevoEstado } : c
        ));
        await loadStats(); // Recargar estadísticas
      }
    } catch (error) {
      console.error('Error actualizando estado:', error);
    }
  };

  const formatDate = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-CL', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'pendiente': return 'bg-yellow-100 text-yellow-800';
      case 'revisando': return 'bg-blue-100 text-blue-800';
      case 'implementada': return 'bg-green-100 text-green-800';
      case 'rechazada': return 'bg-red-100 text-red-800';
      case 'respondida': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoriaColor = (categoria) => {
    switch (categoria) {
      case 'economia': return 'bg-green-100 text-green-800';
      case 'ia': return 'bg-purple-100 text-purple-800';
      case 'seguridad': return 'bg-red-100 text-red-800';
      case 'justicia': return 'bg-blue-100 text-blue-800';
      case 'unidad': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard de Participación Ciudadana</h1>
          <p className="text-gray-600">Panel administrativo para gestionar consultas ciudadanas</p>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <MessageSquare className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Consultas</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Implementadas</p>
                <p className="text-2xl font-bold text-gray-900">{stats.implementadas}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Eye className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">En Revisión</p>
                <p className="text-2xl font-bold text-gray-900">{stats.enRevision}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Esta Semana</p>
                <p className="text-2xl font-bold text-gray-900">{stats.consultasEstaSemana}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Gráficos de Regiones y Tipos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Top Regiones */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              Top Regiones
            </h3>
            <div className="space-y-3">
              {stats.porRegion.slice(0, 5).map((region, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{region._id}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${(region.count / stats.total) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{region.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tipos de Consulta */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              Tipos de Consulta
            </h3>
            <div className="space-y-3">
              {stats.porTipo.map((tipo, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 capitalize">{tipo._id}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${(tipo.count / stats.total) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{tipo.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Filter className="w-5 h-5 mr-2" />
            Filtros
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              value={filtros.estado}
              onChange={(e) => setFiltros(prev => ({ ...prev, estado: e.target.value }))}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todos los estados</option>
              <option value="pendiente">Pendiente</option>
              <option value="revisando">Revisando</option>
              <option value="implementada">Implementada</option>
              <option value="rechazada">Rechazada</option>
              <option value="respondida">Respondida</option>
            </select>

            <select
              value={filtros.categoria}
              onChange={(e) => setFiltros(prev => ({ ...prev, categoria: e.target.value }))}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todas las categorías</option>
              <option value="general">General</option>
              <option value="economia">Economía</option>
              <option value="ia">Inteligencia Artificial</option>
              <option value="seguridad">Seguridad</option>
              <option value="justicia">Justicia</option>
              <option value="unidad">Unidad</option>
            </select>

            <button
              onClick={() => setFiltros({ estado: '', categoria: '', region: '' })}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Limpiar Filtros
            </button>
          </div>
        </div>

        {/* Lista de Consultas */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Consultas Recientes ({stats.total})
            </h3>
          </div>

          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-600 mt-4">Cargando consultas...</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {consultas.map((consulta) => (
                <div key={consulta._id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="font-medium text-gray-900">
                          {consulta.nombre || 'Usuario Anónimo'}
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getEstadoColor(consulta.estado)}`}>
                          {consulta.estado}
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoriaColor(consulta.categoria)}`}>
                          {consulta.categoria}
                        </span>
                      </div>

                      <p className="text-gray-700 mb-3">{consulta.mensaje}</p>

                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {consulta.region}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatDate(consulta.fechaEnvio)}
                        </span>
                        <span>❤️ {consulta.likes || 0}</span>
                        {consulta.reportes && consulta.reportes.length > 0 && (
                          <span className="flex items-center text-red-600">
                            <Flag className="w-4 h-4 mr-1" />
                            {consulta.reportes.length} reportes
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="ml-4 flex space-x-2">
                      {consulta.estado === 'pendiente' && (
                        <button
                          onClick={() => updateEstado(consulta._id, 'revisando')}
                          className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                        >
                          Revisar
                        </button>
                      )}
                      {consulta.estado === 'revisando' && (
                        <>
                          <button
                            onClick={() => updateEstado(consulta._id, 'implementada')}
                            className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                          >
                            Implementar
                          </button>
                          <button
                            onClick={() => updateEstado(consulta._id, 'rechazada')}
                            className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                          >
                            Rechazar
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Link a página pública */}
        <div className="mt-8 text-center">
          <a
            href="/participacion-ciudadana"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Ver página pública de participación</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;