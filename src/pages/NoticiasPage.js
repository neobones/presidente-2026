import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEOWrapper from '../components/SEOWrapper';
import { Calendar, Edit2, Loader } from 'lucide-react';

const NoticiasPage = () => {
  const [articulos, setArticulos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadArticulos();
  }, []);

  const loadArticulos = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/articulos');
      if (response.ok) {
        const data = await response.json();
        setArticulos(data.articulos || []);
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

  const seoConfig = {
    title: "Noticias de la Campaña - Melinao 2026",
    description: "Mantente al día con las últimas noticias, propuestas y análisis de la campaña presidencial de Juan Pablo Melinao González.",
    keywords: ['noticias campaña', 'blog Melinao', 'propuestas presidenciales', 'análisis político Chile'],
    canonicalUrl: () => `${window.location.origin}/noticias`,
  };

  return (
    <SEOWrapper seoConfig={seoConfig}>
      <div className="bg-gray-900 text-white min-h-screen">
        <header className="bg-blue-800 text-center py-16">
          <h1 className="text-5xl font-bold">Noticias y Propuestas</h1>
          <p className="text-xl mt-4">Análisis y comunicados oficiales de nuestra campaña.</p>
        </header>
        <main className="container mx-auto px-4 py-12">
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
          ) : articulos.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-gray-400 text-lg">No hay noticias disponibles en este momento.</div>
            </div>
          ) : (
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
              {articulos.map((articulo) => (
                <Link to={`/noticias/${articulo.slug}`} key={articulo.slug} className="block bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-blue-500/50 transition-shadow duration-300">
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-400 mb-2">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{new Date(articulo.date).toLocaleDateString('es-CL')}</span>
                      <span className="mx-2">|</span>
                      <Edit2 className="h-4 w-4 mr-2" />
                      <span>{articulo.author}</span>
                    </div>
                    <h2 className="text-2xl font-bold text-blue-400 mb-2">{articulo.title}</h2>
                    <p className="text-gray-300">{articulo.summary}</p>
                    {articulo.tags && articulo.tags.length > 0 && (
                      <div className="mt-4">
                        {articulo.tags.map(tag => (
                          <span key={tag} className="inline-block bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-300 mr-2 mb-2">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </main>
      </div>
    </SEOWrapper>
  );
};

export default NoticiasPage;
