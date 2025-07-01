import React from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';
import SEOWrapper from '../components/SEOWrapper';
import { Calendar, Edit2 } from 'lucide-react';

const NoticiasPage = () => {
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
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <Link to={`/noticias/${post.slug}`} key={post.slug} className="block bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-blue-500/50 transition-shadow duration-300">
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-400 mb-2">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{post.date}</span>
                    <span className="mx-2">|</span>
                    <Edit2 className="h-4 w-4 mr-2" />
                    <span>{post.author}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-blue-400 mb-2">{post.title}</h2>
                  <p className="text-gray-300">{post.summary}</p>
                  <div className="mt-4">
                    {post.tags.map(tag => (
                      <span key={tag} className="inline-block bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-300 mr-2 mb-2">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </SEOWrapper>
  );
};

export default NoticiasPage;
