import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEOWrapper from '../components/SEOWrapper';
import { ArrowLeft, Calendar, Edit2, Loader, Share2, Copy, ExternalLink } from 'lucide-react';

const ArticuloPage = () => {
  const { slug } = useParams();
  const [articulo, setArticulo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    loadArticulo();
  }, [slug]);

  // Cerrar menú de compartir al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showShareMenu && !event.target.closest('.share-menu')) {
        setShowShareMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showShareMenu]);

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

  // Funciones para compartir en redes sociales
  const currentUrl = window.location.href;
  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedTitle = encodeURIComponent(articulo?.title || '');
  const encodedSummary = encodeURIComponent(articulo?.summary || '');
  
  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}&hashtags=Melinao2026,ChileDigno`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Error copying to clipboard:', err);
    }
  };

  const openShare = (platform) => {
    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    setShowShareMenu(false);
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
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center text-sm text-gray-400">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{new Date(articulo.date).toLocaleDateString('es-CL')}</span>
                  <span className="mx-2">|</span>
                  <Edit2 className="h-4 w-4 mr-2" />
                  <span>{articulo.author}</span>
                </div>
                
                {/* Botón de compartir */}
                <div className="relative share-menu">
                  <button
                    onClick={() => setShowShareMenu(!showShareMenu)}
                    className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Compartir</span>
                  </button>
                  
                  {/* Menú de compartir */}
                  {showShareMenu && (
                    <div className="absolute right-0 mt-2 w-56 bg-gray-800 rounded-lg shadow-xl border border-gray-700 z-10">
                      <div className="py-2">
                        <div className="px-4 py-2 text-xs text-gray-400 font-medium border-b border-gray-700">
                          COMPARTIR EN
                        </div>
                        
                        {/* Twitter/X */}
                        <button
                          onClick={() => openShare('twitter')}
                          className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 flex items-center space-x-3"
                        >
                          <div className="w-5 h-5 bg-blue-400 rounded flex items-center justify-center text-xs font-bold">X</div>
                          <span>Twitter/X</span>
                        </button>
                        
                        {/* Facebook */}
                        <button
                          onClick={() => openShare('facebook')}
                          className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 flex items-center space-x-3"
                        >
                          <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center text-xs font-bold">f</div>
                          <span>Facebook</span>
                        </button>
                        
                        {/* LinkedIn */}
                        <button
                          onClick={() => openShare('linkedin')}
                          className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 flex items-center space-x-3"
                        >
                          <div className="w-5 h-5 bg-blue-700 rounded flex items-center justify-center text-xs font-bold">in</div>
                          <span>LinkedIn</span>
                        </button>
                        
                        {/* WhatsApp */}
                        <button
                          onClick={() => openShare('whatsapp')}
                          className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 flex items-center space-x-3"
                        >
                          <div className="w-5 h-5 bg-green-500 rounded flex items-center justify-center text-xs font-bold">W</div>
                          <span>WhatsApp</span>
                        </button>
                        
                        {/* Telegram */}
                        <button
                          onClick={() => openShare('telegram')}
                          className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 flex items-center space-x-3"
                        >
                          <div className="w-5 h-5 bg-blue-500 rounded flex items-center justify-center text-xs font-bold">T</div>
                          <span>Telegram</span>
                        </button>
                        
                        <div className="border-t border-gray-700 mt-2"></div>
                        
                        {/* Copiar enlace */}
                        <button
                          onClick={copyToClipboard}
                          className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 flex items-center space-x-3"
                        >
                          <Copy className="w-4 h-4" />
                          <span>{copySuccess ? '¡Copiado!' : 'Copiar enlace'}</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="prose prose-invert lg:prose-xl max-w-none text-gray-300">
                <div className="mb-6 text-lg text-gray-200 font-medium italic border-l-4 border-blue-400 pl-6">
                  {articulo.summary}
                </div>
                <div 
                  className="prose prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: articulo.content }}
                />
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
