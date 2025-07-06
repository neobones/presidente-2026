import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEOWrapper from '../components/SEOWrapper';
import { ArrowLeft, Calendar, Edit2, Loader } from 'lucide-react';

const ArticuloPage = () => {
  const { slug } = useParams();
  const [articulo, setArticulo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadArticulo();
  }, [slug]);

  const loadArticulo = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/articulos/${slug}`);
      if (response.ok) {
        const data = await response.json();
        setArticulo(data);
      } else if (response.status === 404) {
        setError('Artículo no encontrado');
      } else {
        setError('Error cargando el artículo');
      }
    } catch (error) {
      console.error('Error loading article:', error);
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">
        <div className="text-center">
          <Loader className="w-8 h-8 animate-spin text-blue-400 mx-auto mb-4" />
          <div className="text-lg">Cargando artículo...</div>
        </div>
      </div>
    );
  }

  if (error || !articulo) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">{error || 'Artículo no encontrado'}</h1>
          <Link to="/noticias" className="text-blue-400 hover:text-blue-300 transition-colors">
            <ArrowLeft className="w-4 h-4 inline mr-2" />
            Volver a Noticias
          </Link>
        </div>
      </div>
    );
  }

  const seoConfig = {
    title: `${articulo.title} | Melinao 2026`,
    description: articulo.summary,
    keywords: articulo.tags,
    canonicalUrl: () => `${window.location.origin}/noticias/${articulo.slug}`,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": articulo.title,
      "description": articulo.summary,
      "datePublished": articulo.date,
      "author": {
        "@type": "Person",
        "name": articulo.author
      },
      "publisher": {
        "@type": "Organization",
        "name": "Campaña Melinao 2026",
        "logo": {
          "@type": "ImageObject",
          "url": `${window.location.origin}/logo.png`
        }
      }
    }
  };

  return (
    <SEOWrapper seoConfig={seoConfig}>
      <div className="bg-gray-900 text-white min-h-screen">
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <Link to="/noticias" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-8">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Volver a todas las noticias
            </Link>
            
            <article className="bg-gray-800 rounded-lg shadow-lg p-8 md:p-12">
              <h1 className="text-4xl md:text-5xl font-bold text-blue-400 mb-4">{articulo.title}</h1>
              <div className="flex items-center text-sm text-gray-400 mb-6">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{new Date(articulo.date).toLocaleDateString('es-CL')}</span>
                <span className="mx-2">|</span>
                <Edit2 className="h-4 w-4 mr-2" />
                <span>{articulo.author}</span>
              </div>
              
              <div className="prose prose-invert lg:prose-xl max-w-none text-gray-300">
                <div className="mb-6 text-lg text-gray-200 font-medium">
                  {articulo.summary}
                </div>
                <div className="whitespace-pre-wrap">
                  {articulo.content}
                </div>
              </div>

              {articulo.tags && articulo.tags.length > 0 && (
                <div className="mt-8 border-t border-gray-700 pt-6">
                  <h3 className="text-lg font-semibold mb-3">Etiquetas:</h3>
                  {articulo.tags.map(tag => (
                    <span key={tag} className="inline-block bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-300 mr-2 mb-2">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </article>
          </div>
        </main>
      </div>
    </SEOWrapper>
  );
};

export default ArticuloPage;
