import React from 'react';
import { useParams } from 'react-router-dom';
import SEOWrapper from '../components/SEOWrapper';
import { seoConfigs } from '../data/seoConfigs';
import { HomeIcon, MapPinIcon, UsersIcon, TrendingUpIcon } from 'lucide-react';

const RegionalPage = () => {
  const { region } = useParams();

  // Buscar la configuración SEO para la región actual
  const regionalSeoConfig = seoConfigs.regional[region] || {};
  const { title, description, structuredData } = regionalSeoConfig;

  const population = structuredData?.population || 'N/A';
  const economicImpact = structuredData?.economicImpact || 'N/A';

  return (
    <SEOWrapper seoConfig={regionalSeoConfig}>
      <div className="bg-gray-900 text-white min-h-screen">
        <header className="bg-blue-600 text-white text-center py-12 shadow-lg">
          <h1 className="text-4xl md:text-5xl font-bold">{title}</h1>
          <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto">{description}</p>
        </header>

        <main className="container mx-auto px-4 py-12">
          <div className="bg-gray-800 rounded-lg shadow-xl p-8">
            <h2 className="text-3xl font-bold text-blue-400 mb-6">Foco Estratégico en {region.charAt(0).toUpperCase() + region.slice(1)}</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gray-700 p-6 rounded-lg flex items-start">
                <MapPinIcon className="h-8 w-8 text-blue-400 mr-4 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold">Región Clave</h3>
                  <p className="text-gray-300 mt-2">
                    {structuredData?.description || `Análisis detallado de las necesidades y oportunidades en ${region}.`}
                  </p>
                </div>
              </div>

              <div className="bg-gray-700 p-6 rounded-lg flex items-start">
                <UsersIcon className="h-8 w-8 text-blue-400 mr-4 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold">Población</h3>
                  <p className="text-gray-300 mt-2">
                    Impacto directo en los <span className="font-bold text-white">{population.toLocaleString('es-CL')}</span> habitantes de la región.
                  </p>
                </div>
              </div>

              <div className="bg-gray-700 p-6 rounded-lg flex items-start">
                <TrendingUpIcon className="h-8 w-8 text-blue-400 mr-4 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold">Impacto Económico</h3>
                  <p className="text-gray-300 mt-2">
                    Inversión y desarrollo con un impacto estimado de <span className="font-bold text-white">{economicImpact}</span>.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <a href="/" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 inline-flex items-center">
                <HomeIcon className="mr-2 h-5 w-5" />
                Volver a la Página Principal
              </a>
            </div>
          </div>
        </main>
      </div>
    </SEOWrapper>
  );
};

export default RegionalPage;
