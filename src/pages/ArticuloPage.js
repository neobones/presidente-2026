import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';
import SEOWrapper from '../components/SEOWrapper';
import { ArrowLeft, Calendar, Edit2 } from 'lucide-react';

const ArticuloPage = () => {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="text-center py-20 bg-gray-900 text-white">
        <h1 className="text-4xl font-bold">Artículo no encontrado</h1>
        <Link to="/noticias" className="text-blue-400 mt-4 inline-block">Volver a Noticias</Link>
      </div>
    );
  }

  const seoConfig = {
    title: `${post.title} | Melinao 2026`,
    description: post.description,
    keywords: post.tags,
    canonicalUrl: () => `${window.location.origin}/noticias/${post.slug}`,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.description,
      "datePublished": post.date,
      "author": {
        "@type": "Person",
        "name": post.author
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
              <h1 className="text-4xl md:text-5xl font-bold text-blue-400 mb-4">{post.title}</h1>
              <div className="flex items-center text-sm text-gray-400 mb-6">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{post.date}</span>
                <span className="mx-2">|</span>
                <Edit2 className="h-4 w-4 mr-2" />
                <span>{post.author}</span>
              </div>
              
              <div className="prose prose-invert lg:prose-xl max-w-none text-gray-300">
                {post.content()}
              </div>

              <div className="mt-8 border-t border-gray-700 pt-6">
                <h3 className="text-lg font-semibold mb-3">Etiquetas:</h3>
                {post.tags.map(tag => (
                  <span key={tag} className="inline-block bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-300 mr-2 mb-2">
                    #{tag}
                  </span>
                ))}
              </div>
            </article>
          </div>
        </main>
      </div>
    </SEOWrapper>
  );
};

export default ArticuloPage;
