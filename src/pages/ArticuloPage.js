import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEOWrapper from '../components/SEOWrapper';
import { ArrowLeft, Calendar, Edit2, Loader, Share2, Copy, ExternalLink, Tag, User, Clock, Eye } from 'lucide-react';
import '../styles/noticias.css';

const ArticuloPage = () => {
  const { slug } = useParams();
  const [articulo, setArticulo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [readingTime, setReadingTime] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const shareMenuRef = useRef(null);

  useEffect(() => {
    loadArticulo();
  }, [slug]);

  // Cerrar menú de compartir al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showShareMenu && shareMenuRef.current && !shareMenuRef.current.contains(event.target)) {
        setShowShareMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showShareMenu]);

  // Calcular tiempo de lectura y progreso de scroll
  useEffect(() => {
    if (articulo) {
      // Calcular tiempo de lectura (promedio 200 palabras por minuto)
      const words = articulo.content.replace(/<[^>]*>/g, '').split(' ').length;
      const minutes = Math.ceil(words / 200);
      setReadingTime(minutes);
    }
  }, [articulo]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setScrollProgress(scrollPercent);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    window.open(shareUrls[platform], '_blank', 'width=600,height=400,scrollbars=yes,resizable=yes');
    setShowShareMenu(false);
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
        {/* Skip links para accesibilidad */}
        <a href="#article-content" className="skip-link">
          Saltar al contenido del artículo
        </a>
        <a href="#article-navigation" className="skip-link">
          Saltar a navegación
        </a>
        
        {/* Barra de progreso de lectura */}
        <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-50">
          <div 
            className="h-1 bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-300"
            style={{ width: `${scrollProgress}%` }}
            role="progressbar"
            aria-valuenow={Math.round(scrollProgress)}
            aria-valuemin="0"
            aria-valuemax="100"
            aria-label={`Progreso de lectura: ${Math.round(scrollProgress)}%`}
          />
        </div>
        
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <nav id="article-navigation" aria-label="Navegación de regreso">
              <Link to="/noticias" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-lg p-2 -ml-2">
                <ArrowLeft className="h-5 w-5 mr-2" aria-hidden="true" />
                Volver a todas las noticias
              </Link>
            </nav>
            
            <article className="bg-gray-800 rounded-lg shadow-lg p-8 md:p-12">
              {/* Reforma relacionada */}
              {articulo.reformaRelacionada && (
                <div className="mb-6">
                  <span className="inline-flex items-center bg-blue-600 text-blue-100 text-sm font-medium px-3 py-1 rounded-full">
                    <span className="mr-2">{getReformaEmoji(articulo.reformaRelacionada)}</span>
                    {getReformaName(articulo.reformaRelacionada)}
                  </span>
                </div>
              )}
              
              <header>
                <h1 className="text-4xl md:text-5xl font-bold text-blue-400 mb-4 leading-tight">
                  {articulo.title}
                </h1>
                
                {/* Metadatos del artículo */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
                  <div className="flex flex-wrap items-center text-sm text-gray-400 gap-4">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" aria-hidden="true" />
                      <time dateTime={articulo.date}>
                        {new Date(articulo.date).toLocaleDateString('es-CL', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </time>
                    </div>
                    
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2" aria-hidden="true" />
                      <span>{articulo.author}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" aria-hidden="true" />
                      <span>{readingTime} min de lectura</span>
                    </div>
                  </div>
                  
                  {/* Botón de compartir */}
                  <div className="relative" ref={shareMenuRef}>
                    <button
                      onClick={() => setShowShareMenu(!showShareMenu)}
                      className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                      aria-expanded={showShareMenu}
                      aria-haspopup="true"
                      aria-label="Compartir artículo en redes sociales"
                    >
                      <Share2 className="w-4 h-4" aria-hidden="true" />
                      <span>Compartir</span>
                    </button>
                  
                    {/* Menú de compartir */}
                    {showShareMenu && (
                      <div className="absolute right-0 mt-2 w-56 bg-gray-800 rounded-lg shadow-xl border border-gray-700 z-10" role="menu" aria-labelledby="share-menu-button">
                        <div className="py-2">
                          <div className="px-4 py-2 text-xs text-gray-400 font-medium border-b border-gray-700">
                            COMPARTIR EN
                          </div>
                          
                          {/* Twitter/X */}
                          <button
                            onClick={() => openShare('twitter')}
                            className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 focus:bg-gray-700 flex items-center space-x-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset transition-colors"
                            role="menuitem"
                            aria-label="Compartir en Twitter"
                          >
                            <div className="w-5 h-5 bg-blue-400 rounded flex items-center justify-center text-xs font-bold" aria-hidden="true">X</div>
                            <span>Twitter/X</span>
                          </button>
                          
                          {/* Facebook */}
                          <button
                            onClick={() => openShare('facebook')}
                            className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 focus:bg-gray-700 flex items-center space-x-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset transition-colors"
                            role="menuitem"
                            aria-label="Compartir en Facebook"
                          >
                            <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center text-xs font-bold" aria-hidden="true">f</div>
                            <span>Facebook</span>
                          </button>
                          
                          {/* LinkedIn */}
                          <button
                            onClick={() => openShare('linkedin')}
                            className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 focus:bg-gray-700 flex items-center space-x-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset transition-colors"
                            role="menuitem"
                            aria-label="Compartir en LinkedIn"
                          >
                            <div className="w-5 h-5 bg-blue-700 rounded flex items-center justify-center text-xs font-bold" aria-hidden="true">in</div>
                            <span>LinkedIn</span>
                          </button>
                          
                          {/* WhatsApp */}
                          <button
                            onClick={() => openShare('whatsapp')}
                            className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 focus:bg-gray-700 flex items-center space-x-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset transition-colors"
                            role="menuitem"
                            aria-label="Compartir en WhatsApp"
                          >
                            <div className="w-5 h-5 bg-green-500 rounded flex items-center justify-center text-xs font-bold" aria-hidden="true">W</div>
                            <span>WhatsApp</span>
                          </button>
                          
                          {/* Telegram */}
                          <button
                            onClick={() => openShare('telegram')}
                            className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 focus:bg-gray-700 flex items-center space-x-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset transition-colors"
                            role="menuitem"
                            aria-label="Compartir en Telegram"
                          >
                            <div className="w-5 h-5 bg-blue-500 rounded flex items-center justify-center text-xs font-bold" aria-hidden="true">T</div>
                            <span>Telegram</span>
                          </button>
                          
                          <div className="border-t border-gray-700 mt-2"></div>
                          
                          {/* Copiar enlace */}
                          <button
                            onClick={copyToClipboard}
                            className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 focus:bg-gray-700 flex items-center space-x-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset transition-colors"
                            role="menuitem"
                            aria-label="Copiar enlace del artículo"
                          >
                            <Copy className="w-4 h-4" aria-hidden="true" />
                            <span>{copySuccess ? '¡Copiado!' : 'Copiar enlace'}</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </header>
              
              {/* Contenido del artículo */}
              <section id="article-content" className="prose prose-invert lg:prose-xl max-w-none text-gray-300 mt-8" aria-label="Contenido del artículo">
                {/* Resumen destacado */}
                <div className="mb-8 p-6 bg-gray-700 rounded-lg border-l-4 border-blue-400">
                  <p className="text-lg text-gray-200 font-medium italic leading-relaxed mb-0">
                    {articulo.summary}
                  </p>
                </div>
                
                {/* Contenido principal */}
                <div 
                  className="article-content prose prose-invert max-w-none prose-headings:text-blue-400 prose-links:text-blue-400 hover:prose-links:text-blue-300 prose-strong:text-white prose-code:text-blue-300 prose-blockquote:border-blue-400 prose-blockquote:text-gray-300 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: articulo.content }}
                />
              </section>

              {/* Tags */}
              {articulo.tags && articulo.tags.length > 0 && (
                <footer className="mt-8 border-t border-gray-700 pt-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Tag className="w-5 h-5 mr-2" aria-hidden="true" />
                    Etiquetas:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {articulo.tags.map(tag => (
                      <span key={tag} className="inline-flex items-center bg-gray-700 text-gray-300 text-sm font-medium px-3 py-1 rounded-full hover:bg-gray-600 transition-colors">
                        <Tag className="w-3 h-3 mr-1" aria-hidden="true" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </footer>
              )}
            </article>
          </div>
        </main>
      </div>
    </SEOWrapper>
  );
};

export default ArticuloPage;
