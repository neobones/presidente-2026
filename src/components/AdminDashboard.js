import React, { useState, useEffect } from 'react';
import { BarChart3, Users, MessageSquare, TrendingUp, MapPin, Calendar, Filter, Eye, Flag, CheckCircle, X, ExternalLink, Target, Settings, ThumbsUp, ThumbsDown, FileText, Plus, Edit3, Trash2, Globe, Clock } from 'lucide-react';

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
  
  // Estados para noticias
  const [articulos, setArticulos] = useState([]);
  const [articulosLoading, setArticulosLoading] = useState(false);
  const [articulosStats, setArticulosStats] = useState({
    total: 0,
    published: 0,
    draft: 0
  });
  const [showArticleModal, setShowArticleModal] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [articleForm, setArticleForm] = useState({
    title: '',
    slug: '',
    summary: '',
    content: '',
    author: 'Equipo de Campaña',
    tags: [],
    status: 'draft',
    date: new Date().toISOString().split('T')[0]
  });
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
    } else if (activeTab === 'noticias') {
      loadArticulos();
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

  // Funciones para gestión de artículos
  const loadArticulos = async () => {
    try {
      setArticulosLoading(true);
      const token = localStorage.getItem('authToken');
      const response = await fetch('/api/articulos/admin', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setArticulos(data.articulos || []);
        setArticulosStats(data.estadisticas || { total: 0, published: 0, draft: 0 });
      }
    } catch (error) {
      console.error('Error cargando artículos:', error);
    } finally {
      setArticulosLoading(false);
    }
  };

  const resetArticleForm = () => {
    setArticleForm({
      title: '',
      slug: '',
      summary: '',
      content: '',
      author: 'Equipo de Campaña',
      tags: [],
      status: 'draft',
      date: new Date().toISOString().split('T')[0]
    });
    setEditingArticle(null);
  };

  const handleNewArticle = () => {
    resetArticleForm();
    setShowArticleModal(true);
  };

  const handleEditArticle = (articulo) => {
    setArticleForm({
      title: articulo.title,
      slug: articulo.slug,
      summary: articulo.summary,
      content: articulo.content,
      author: articulo.author,
      tags: articulo.tags,
      status: articulo.status,
      date: articulo.date ? new Date(articulo.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
    });
    setEditingArticle(articulo);
    setShowArticleModal(true);
  };

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[áäâà]/g, 'a')
      .replace(/[éëêè]/g, 'e')
      .replace(/[íïîì]/g, 'i')
      .replace(/[óöôò]/g, 'o')
      .replace(/[úüûù]/g, 'u')
      .replace(/[ñ]/g, 'n')
      .replace(/[ç]/g, 'c')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleArticleFormChange = (field, value) => {
    setArticleForm(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Auto-generar slug cuando cambia el título
    if (field === 'title' && value && !editingArticle) {
      setArticleForm(prev => ({
        ...prev,
        slug: generateSlug(value)
      }));
    }
  };

  const handleTagsChange = (tagsString) => {
    const tags = tagsString.split(',').map(tag => tag.trim()).filter(tag => tag);
    setArticleForm(prev => ({
      ...prev,
      tags
    }));
  };

  const saveArticle = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const url = editingArticle ? `/api/articulos/${editingArticle._id}` : '/api/articulos';
      const method = editingArticle ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(articleForm)
      });
      
      if (response.ok) {
        setShowArticleModal(false);
        resetArticleForm();
        loadArticulos();
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error('Error guardando artículo:', error);
      alert('Error guardando artículo');
    }
  };

  const deleteArticle = async (id) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este artículo?')) return;
    
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`/api/articulos/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        loadArticulos();
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error('Error eliminando artículo:', error);
      alert('Error eliminando artículo');
    }
  };

  const updateArticleStatus = async (id, newStatus) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`/api/articulos/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      
      if (response.ok) {
        loadArticulos();
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error('Error actualizando estado:', error);
      alert('Error actualizando estado');
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
            <button
              onClick={() => setActiveTab('noticias')}
              className={`pb-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'noticias'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <FileText className="w-4 h-4 inline mr-2" />
              Gestión de Noticias
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

        {/* Tab Noticias */}
        {activeTab === 'noticias' && (
          <div className="space-y-6">
            {/* Estadísticas de artículos */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Total Artículos</p>
                    <p className="text-2xl font-bold text-gray-900">{articulosStats.total}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Globe className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Publicados</p>
                    <p className="text-2xl font-bold text-gray-900">{articulosStats.published}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Clock className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Borradores</p>
                    <p className="text-2xl font-bold text-gray-900">{articulosStats.draft}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Gestión de artículos */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Gestión de Noticias y Artículos
                </h3>
                <button
                  onClick={handleNewArticle}
                  className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Nuevo Artículo</span>
                </button>
              </div>
              
              {articulosLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="text-gray-500 mt-2">Cargando artículos...</p>
                </div>
              ) : articulos.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <FileText className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                  <p>No hay artículos creados aún</p>
                  <p className="text-sm mt-1">Crea tu primer artículo o recibe uno desde n8n</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {articulos.map((articulo) => (
                    <div key={articulo._id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 text-lg">{articulo.title}</h4>
                          <p className="text-gray-600 text-sm mt-1">{articulo.summary}</p>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                            <span className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {new Date(articulo.date).toLocaleDateString('es-CL')}
                            </span>
                            <span>Por {articulo.author}</span>
                            {articulo.tags.length > 0 && (
                              <div className="flex space-x-1">
                                {articulo.tags.map(tag => (
                                  <span key={tag} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                                    #{tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                            articulo.status === 'published' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {articulo.status === 'published' ? 'Publicado' : 'Borrador'}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-500">
                          Slug: <code className="bg-gray-100 px-2 py-1 rounded text-xs">{articulo.slug}</code>
                        </div>
                        
                        <div className="flex space-x-2">
                          {articulo.status === 'published' && (
                            <a
                              href={`/noticias/${articulo.slug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm"
                            >
                              <ExternalLink className="w-4 h-4" />
                              <span>Ver</span>
                            </a>
                          )}
                          <button
                            onClick={() => handleEditArticle(articulo)}
                            className="flex items-center space-x-1 text-gray-600 hover:text-gray-700 text-sm"
                          >
                            <Edit3 className="w-4 h-4" />
                            <span>Editar</span>
                          </button>
                          <button
                            onClick={() => updateArticleStatus(
                              articulo._id, 
                              articulo.status === 'published' ? 'draft' : 'published'
                            )}
                            className={`flex items-center space-x-1 text-sm ${
                              articulo.status === 'published' 
                                ? 'text-yellow-600 hover:text-yellow-700' 
                                : 'text-green-600 hover:text-green-700'
                            }`}
                          >
                            {articulo.status === 'published' ? (
                              <>
                                <Clock className="w-4 h-4" />
                                <span>Despublicar</span>
                              </>
                            ) : (
                              <>
                                <Globe className="w-4 h-4" />
                                <span>Publicar</span>
                              </>
                            )}
                          </button>
                          <button
                            onClick={() => deleteArticle(articulo._id)}
                            className="flex items-center space-x-1 text-red-600 hover:text-red-700 text-sm"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span>Eliminar</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="mt-6 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500 flex items-center">
                  <ExternalLink className="w-4 h-4 mr-1" />
                  <span>Ver todas las noticias públicas en </span>
                  <a href="/noticias" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 ml-1">
                    /noticias
                  </a>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Modal para crear/editar artículo */}
        {showArticleModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {editingArticle ? 'Editar Artículo' : 'Nuevo Artículo'}
                  </h3>
                  <button
                    onClick={() => setShowArticleModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Título */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Título *
                    </label>
                    <input
                      type="text"
                      value={articleForm.title}
                      onChange={(e) => handleArticleFormChange('title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Título del artículo"
                    />
                  </div>

                  {/* Slug */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Slug (URL) *
                    </label>
                    <input
                      type="text"
                      value={articleForm.slug}
                      onChange={(e) => handleArticleFormChange('slug', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="slug-del-articulo"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      URL: /noticias/{articleForm.slug || 'slug-del-articulo'}
                    </p>
                  </div>

                  {/* Resumen */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Resumen *
                    </label>
                    <textarea
                      value={articleForm.summary}
                      onChange={(e) => handleArticleFormChange('summary', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Resumen o descripción corta del artículo"
                    />
                  </div>

                  {/* Contenido */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Contenido *
                    </label>
                    <textarea
                      value={articleForm.content}
                      onChange={(e) => handleArticleFormChange('content', e.target.value)}
                      rows={12}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Contenido completo del artículo (se puede usar Markdown)"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Autor */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Autor
                      </label>
                      <input
                        type="text"
                        value={articleForm.author}
                        onChange={(e) => handleArticleFormChange('author', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Nombre del autor"
                      />
                    </div>

                    {/* Fecha */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Fecha de publicación
                      </label>
                      <input
                        type="date"
                        value={articleForm.date}
                        onChange={(e) => handleArticleFormChange('date', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Tags */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tags
                      </label>
                      <input
                        type="text"
                        value={articleForm.tags.join(', ')}
                        onChange={(e) => handleTagsChange(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="tecnología, política, campaña (separados por comas)"
                      />
                    </div>

                    {/* Estado */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Estado
                      </label>
                      <select
                        value={articleForm.status}
                        onChange={(e) => handleArticleFormChange('status', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="draft">Borrador</option>
                        <option value="published">Publicado</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => setShowArticleModal(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-700 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={saveArticle}
                    disabled={!articleForm.title || !articleForm.slug || !articleForm.summary || !articleForm.content}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    {editingArticle ? 'Actualizar' : 'Crear'} Artículo
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;