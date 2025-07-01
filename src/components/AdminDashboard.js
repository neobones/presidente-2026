import React, { useState, useEffect } from 'react';
import { BarChart3, Users, MessageSquare, TrendingUp, MapPin, Calendar, Filter, Eye, Flag, CheckCircle, X, ExternalLink, Target, Settings, ThumbsUp, ThumbsDown } from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('consultas');
  const [stats, setStats] = useState({
    total: 0,
    implementadas: 0,
    enRevision: 0,
    consultasEstaSemana: 0,
    porRegion: [],
    porTipo: []
  });
  
  // Estados para patrocinios
  const [patrociniosData, setPatrociniosData] = useState({
    actual: 0,
    meta: 35361
  });
  
  // Estados para testimonios
  const [testimonios, setTestimonios] = useState([]);
  const [testimoniosLoading, setTestimoniosLoading] = useState(false);
  const [consultas, setConsultas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);
  const [filtros, setFiltros] = useState({
    estado: '',
    categoria: '',
    region: ''
  });
  const [showImplementModal, setShowImplementModal] = useState(false);
  const [selectedConsulta, setSelectedConsulta] = useState(null);
  const [implementDescription, setImplementDescription] = useState('');

  useEffect(() => {
    if (activeTab === 'consultas') {
      loadStats();
      loadConsultas();
    } else if (activeTab === 'patrocinios') {
      loadPatrociniosData();
    } else if (activeTab === 'testimonios') {
      loadTestimonios();
    }
  }, [filtros, activeTab]);

  const loadStats = async () => {
    try {
      const response = await fetch('/api/consultas/stats');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      // Error silencioso en producción
    }
  };

  const loadPatrociniosData = async () => {
    try {
      const response = await fetch('/api/patrocinios/stats');
      const data = await response.json();
      setPatrociniosData(data);
    } catch (error) {
      console.error('Error cargando datos de patrocinios:', error);
    }
  };

  const updatePatrocinios = async (nuevoValor) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('/api/patrocinios/stats', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ actual: nuevoValor })
      });
      
      if (response.ok) {
        loadPatrociniosData();
      }
    } catch (error) {
      console.error('Error actualizando patrocinios:', error);
    }
  };

  const loadTestimonios = async () => {
    try {
      setTestimoniosLoading(true);
      const token = localStorage.getItem('authToken');
      const response = await fetch('/api/testimonios/admin', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setTestimonios(data);
      }
    } catch (error) {
      console.error('Error cargando testimonios:', error);
    } finally {
      setTestimoniosLoading(false);
    }
  };

  const updateTestimonioEstado = async (id, estado) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`/api/testimonios/${id}/estado`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ estado })
      });
      
      if (response.ok) {
        loadTestimonios();
      }
    } catch (error) {
      console.error('Error actualizando testimonio:', error);
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

      const token = localStorage.getItem('authToken');
      
      if (!token) {
        setAuthError('Sesión no encontrada. Por favor, ve a "Participación Ciudadana" e inicia sesión con Google antes de acceder al admin.');
        setConsultas([]);
        return;
      }

      const response = await fetch(`/api/consultas/admin?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 401) {
        localStorage.removeItem('authToken');
        setAuthError('Sesión expirada. Por favor, inicia sesión nuevamente.');
        setConsultas([]);
        return;
      }

      if (response.status === 403) {
        setAuthError('Acceso denegado. Solo administradores autorizados pueden acceder a esta sección.');
        setConsultas([]);
        return;
      }

      const data = await response.json();
      setConsultas(data.consultas || []);
    } catch (error) {
      // Error silencioso en producción
    } finally {
      setLoading(false);
    }
  };

  const updateEstado = async (id, nuevoEstado, descripcion = '') => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        return;
      }

      const response = await fetch(`/api/consultas/${id}/estado`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          estado: nuevoEstado,
          implementada: nuevoEstado === 'implementada',
          descripcionImplementacion: descripcion
        })
      });

      if (response.ok) {
        await loadConsultas();
        await loadStats();
        setShowImplementModal(false);
        setSelectedConsulta(null);
        setImplementDescription('');
      }
    } catch (error) {
      // Error silencioso
    }
  };

  const handleImplementar = (consulta) => {
    setSelectedConsulta(consulta);
    setShowImplementModal(true);
  };

  const confirmImplementacion = () => {
    if (selectedConsulta && implementDescription.trim()) {
      updateEstado(selectedConsulta._id, 'implementada', implementDescription.trim());
    }
  };

  if (authError) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <div className="text-red-600 text-lg font-medium mb-4">
              {authError}
            </div>
            <a
              href="/participacion-ciudadana"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Ir a Participación Ciudadana
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Administrativo</h1>
          <p className="text-gray-600">Panel de administración completo para la campaña</p>
          
          {/* Tabs */}
          <div className="flex space-x-4 mt-6 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('consultas')}
              className={`pb-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'consultas'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <MessageSquare className="w-4 h-4 inline mr-2" />
              Consultas Ciudadanas
            </button>
            <button
              onClick={() => setActiveTab('patrocinios')}
              className={`pb-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'patrocinios'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Target className="w-4 h-4 inline mr-2" />
              Gestión Patrocinios
            </button>
            <button
              onClick={() => setActiveTab('testimonios')}
              className={`pb-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'testimonios'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Users className="w-4 h-4 inline mr-2" />
              Moderación Testimonios
            </button>
          </div>
        </div>

        {/* Contenido por Tab */}
        {activeTab === 'consultas' && (
          <div>
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
            <div className="mt-6">
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
        )}

        {/* Tab Patrocinios */}
        {activeTab === 'patrocinios' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Target className="w-5 h-5 mr-2" />
                Gestión de Patrocinios
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Contador Actual */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-700">Contador Actual</h4>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {patrociniosData.actual.toLocaleString('es-CL')}
                    </div>
                    <div className="text-sm text-gray-600">
                      de {patrociniosData.meta.toLocaleString('es-CL')} necesarios
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 mt-3">
                      <div 
                        className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min((patrociniosData.actual / patrociniosData.meta) * 100, 100)}%` }}
                      />
                    </div>
                    <div className="text-sm text-gray-600 mt-2">
                      {((patrociniosData.actual / patrociniosData.meta) * 100).toFixed(1)}% completado
                    </div>
                  </div>
                </div>

                {/* Actualizar Contador */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-700">Actualizar Contador</h4>
                  <div className="space-y-3">
                    <input
                      type="number"
                      placeholder="Nuevo número de patrocinios"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          const valor = parseInt(e.target.value);
                          if (valor >= 0) {
                            updatePatrocinios(valor);
                            e.target.value = '';
                          }
                        }
                      }}
                    />
                    <button
                      onClick={(e) => {
                        const input = e.target.previousElementSibling;
                        const valor = parseInt(input.value);
                        if (valor >= 0) {
                          updatePatrocinios(valor);
                          input.value = '';
                        }
                      }}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      Actualizar Contador
                    </button>
                    <p className="text-xs text-gray-500">
                      Este número se mostrará en tiempo real en la página de patrocinios
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Testimonios */}
        {activeTab === 'testimonios' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Moderación de Testimonios
              </h3>
              
              {testimoniosLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="text-gray-500 mt-2">Cargando testimonios...</p>
                </div>
              ) : testimonios.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                  <p>No hay testimonios pendientes de moderación</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {testimonios.map((testimonio) => (
                    <div 
                      key={testimonio._id} 
                      className={`border rounded-lg p-4 ${
                        testimonio.estado === 'pendiente' 
                          ? 'border-yellow-200 bg-yellow-50' 
                          : testimonio.estado === 'aprobado'
                          ? 'border-green-200 bg-green-50'
                          : 'border-red-200 bg-red-50'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">
                            {testimonio.nombre_publico || 'Usuario Anónimo'}
                          </div>
                          <div className="text-sm text-gray-600">
                            {testimonio.ocupacion && `${testimonio.ocupacion} • `}
                            {testimonio.region}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {new Date(testimonio.fecha_creacion).toLocaleDateString('es-CL')}
                          </div>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          testimonio.estado === 'pendiente' 
                            ? 'bg-yellow-200 text-yellow-800' 
                            : testimonio.estado === 'aprobado'
                            ? 'bg-green-200 text-green-800'
                            : 'bg-red-200 text-red-800'
                        }`}>
                          {testimonio.estado.charAt(0).toUpperCase() + testimonio.estado.slice(1)}
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-4 italic">
                        "{testimonio.contenido}"
                      </p>
                      
                      {testimonio.estado === 'pendiente' && (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => updateTestimonioEstado(testimonio._id, 'aprobado')}
                            className="flex items-center space-x-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition-colors"
                          >
                            <ThumbsUp className="w-4 h-4" />
                            <span>Aprobar</span>
                          </button>
                          <button
                            onClick={() => updateTestimonioEstado(testimonio._id, 'rechazado')}
                            className="flex items-center space-x-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors"
                          >
                            <ThumbsDown className="w-4 h-4" />
                            <span>Rechazar</span>
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;