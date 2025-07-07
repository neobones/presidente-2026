import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEOWrapper from '../components/SEOWrapper';
import { Calendar, Edit2, Loader, Filter, Tag, TrendingUp } from 'lucide-react';
import '../styles/noticias.css';

const NoticiasPage = () => {
  const [articulos, setArticulos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredArticulos, setFilteredArticulos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [allTags, setAllTags] = useState([]);

  useEffect(() => {
    loadArticulos();
  }, []);

  useEffect(() => {
    filterArticulos();
  }, [articulos, searchTerm, selectedTag]);

  const loadArticulos = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/articulos');
      if (response.ok) {
        const data = await response.json();
        const articulosData = data.articulos || [];
        setArticulos(articulosData);
        
        // Extraer tags únicos para el filtro
        const tags = [...new Set(articulosData.flatMap(art => art.tags || []))];
        setAllTags(tags);
      } else {
        setError('Error cargando noticias');
      }
    } catch (error) {
      console.error('Error loading articles:', error);
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  const filterArticulos = () => {
    let filtered = articulos;
    
    if (searchTerm) {
      filtered = filtered.filter(art => 
        art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        art.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (art.tags && art.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
      );
    }
    
    if (selectedTag) {
      filtered = filtered.filter(art => 
        art.tags && art.tags.includes(selectedTag)
      );
    }
    
    setFilteredArticulos(filtered);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedTag('');
  };

  const getReformaEmoji = (reformaId) => {
    const reformas = {
      'automatizacion-estado-inteligencia-artificial': '🤖',
      'reduccion-costo-vida-impuestos': '💰',
      'fronteras-inteligentes-seguridad-nacional': '🛡️',
      'justicia-social-equidad-fin-privilegios': '⚖️',
      'chile-unido-desarrollo-araucania': '🤝',
      'eliminacion-privilegios-politicos-transparencia': '🏛️'
    };
    return reformas[reformaId] || '📰';
  };

  const getReformaName = (reformaId) => {
    const reformas = {
      'automatizacion-estado-inteligencia-artificial': 'Automatización e IA',
      'reduccion-costo-vida-impuestos': 'Reducción Costo de Vida',
      'fronteras-inteligentes-seguridad-nacional': 'Seguridad Nacional',
      'justicia-social-equidad-fin-privilegios': 'Justicia Social',
      'chile-unido-desarrollo-araucania': 'Chile Unido',
      'eliminacion-privilegios-politicos-transparencia': 'Fin de Privilegios'
    };
    return reformas[reformaId] || 'General';
  };

  const seoConfig = {
    title: "Noticias de la Campaña - Melinao 2026",
    description: "Mantente al día con las últimas noticias, propuestas y análisis de la campaña presidencial de Juan Pablo Melinao González.",
    keywords: ['noticias campaña', 'blog Melinao', 'propuestas presidenciales', 'análisis político Chile'],
    canonicalUrl: () => `${window.location.origin}/noticias`,
  };

  return (
    <SEOWrapper seoConfig={seoConfig}>
      <div className="bg-gray-900 text-white min-h-screen">
        {/* Skip links para accesibilidad */}
        <a href="#main-content" className="skip-link">
          Saltar al contenido principal
        </a>
        <a href="#search-filters" className="skip-link">
          Saltar a filtros de búsqueda
        </a>
        <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-center py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="relative z-10">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white">Noticias y Propuestas</h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto px-4">
              Análisis y comunicados oficiales de nuestra campaña presidencial
            </p>
            <div className="flex items-center justify-center mt-6 space-x-4 text-sm text-blue-200">
              <div className="flex items-center">
                <TrendingUp className="w-4 h-4 mr-2" />
                <span>{articulos.length} artículos</span>
              </div>
              <div className="flex items-center">
                <Tag className="w-4 h-4 mr-2" />
                <span>{allTags.length} temas</span>
              </div>
            </div>
          </div>
        </header>
        <main id="main-content" className="container mx-auto px-4 py-12">
          {/* Filtros y búsqueda */}
          <section id="search-filters" className="mb-8 max-w-4xl mx-auto" aria-label="Filtros de búsqueda de noticias">
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="flex-1 w-full">
                  <label htmlFor="search" className="sr-only">Buscar noticias</label>
                  <div className="relative">
                    <input
                      id="search"
                      type="text"
                      placeholder="Buscar por título, contenido o etiqueta..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      aria-label="Buscar noticias por título, contenido o etiqueta"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <label htmlFor="tag-filter" className="sr-only">Filtrar por etiqueta</label>
                    <select
                      id="tag-filter"
                      value={selectedTag}
                      onChange={(e) => setSelectedTag(e.target.value)}
                      className="bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer min-w-[160px]"
                      aria-label="Filtrar noticias por etiqueta"
                    >
                      <option value="">Todas las etiquetas</option>
                      {allTags.map(tag => (
                        <option key={tag} value={tag}>{tag}</option>
                      ))}
                    </select>
                    <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                  
                  {(searchTerm || selectedTag) && (
                    <button
                      onClick={clearFilters}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg transition-colors text-sm font-medium"
                      aria-label="Limpiar filtros de búsqueda"
                    >
                      Limpiar
                    </button>
                  )}
                </div>
              </div>
              
              {(searchTerm || selectedTag) && (
                <div className="mt-4 text-sm text-gray-400">
                  {filteredArticulos.length === 0 ? (
                    <span>No se encontraron noticias que coincidan con los filtros aplicados.</span>
                  ) : (
                    <span>
                      Mostrando {filteredArticulos.length} de {articulos.length} noticias
                      {searchTerm && ` que contienen "${searchTerm}"`}
                      {selectedTag && ` con la etiqueta "${selectedTag}"`}
                    </span>
                  )}
                </div>
              )}
            </div>
          </section>
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader className="w-8 h-8 animate-spin text-blue-400" />
              <span className="ml-3 text-lg">Cargando noticias...</span>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <div className="text-red-400 text-lg mb-4">{error}</div>
              <button
                onClick={loadArticulos}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Intentar de nuevo
              </button>
            </div>
          ) : filteredArticulos.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-gray-400 text-lg">
                {articulos.length === 0 
                  ? 'No hay noticias disponibles en este momento.' 
                  : 'No se encontraron noticias que coincidan con los filtros aplicados.'}
              </div>
              {(searchTerm || selectedTag) && (
                <button
                  onClick={clearFilters}
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Ver todas las noticias
                </button>
              )}
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredArticulos.map((articulo) => (
                <article key={articulo.slug} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-blue-500/50 transition-all duration-300 hover:transform hover:scale-105">
                  <Link to={`/noticias/${articulo.slug}`} className="block group">
                    <div className="p-6">
                      {/* Reforma relacionada */}
                      {articulo.reformaRelacionada && (
                        <div className="mb-3">
                          <span className="inline-flex items-center bg-blue-600 text-blue-100 text-xs font-medium px-2.5 py-0.5 rounded-full">
                            <span className="mr-1">{getReformaEmoji(articulo.reformaRelacionada)}</span>
                            {getReformaName(articulo.reformaRelacionada)}
                          </span>
                        </div>
                      )}
                      
                      {/* Metadatos */}
                      <div className="flex items-center text-sm text-gray-400 mb-3">
                        <Calendar className="h-4 w-4 mr-2" aria-hidden="true" />
                        <time dateTime={articulo.date}>
                          {new Date(articulo.date).toLocaleDateString('es-CL', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </time>
                        <span className="mx-2" aria-hidden="true">|</span>
                        <Edit2 className="h-4 w-4 mr-2" aria-hidden="true" />
                        <span>{articulo.author}</span>
                      </div>
                      
                      {/* Título */}
                      <h2 className="text-2xl font-bold text-blue-400 mb-3 group-hover:text-blue-300 transition-colors line-clamp-2">
                        {articulo.title}
                      </h2>
                      
                      {/* Resumen */}
                      <p className="text-gray-300 mb-4 line-clamp-3 leading-relaxed">
                        {articulo.summary}
                      </p>
                      
                      {/* Tags */}
                      {articulo.tags && articulo.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {articulo.tags.slice(0, 3).map(tag => (
                            <span key={tag} className="inline-flex items-center bg-gray-700 text-gray-300 text-xs font-medium px-2.5 py-0.5 rounded-full hover:bg-gray-600 transition-colors">
                              <Tag className="w-3 h-3 mr-1" aria-hidden="true" />
                              {tag}
                            </span>
                          ))}
                          {articulo.tags.length > 3 && (
                            <span className="inline-flex items-center text-gray-400 text-xs font-medium px-2.5 py-0.5">
                              +{articulo.tags.length - 3} más
                            </span>
                          )}
                        </div>
                      )}
                      
                      {/* Indicador de lectura */}
                      <div className="mt-4 flex items-center text-blue-400 text-sm font-medium group-hover:text-blue-300 transition-colors">
                        <span>Leer más</span>
                        <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </main>
      </div>
    </SEOWrapper>
  );
};

export default NoticiasPage;
