import { useEffect } from 'react';

export const useSEO = ({ 
  title, 
  description, 
  keywords = [], 
  canonicalUrl,
  openGraph = {},
  structuredData = null,
  politicalKeywords = []
}) => {
  useEffect(() => {
    // Título
    document.title = `${title} | Melinao 2026 - Presidente de Chile`;
    
    // Meta description
    updateMeta('description', description);
    
    // Keywords optimizados para búsquedas políticas chilenas
    const coreKeywords = [
      'Juan Pablo Melinao González',
      'Melinao 2026',
      'candidato presidencial Chile',
      'presidente mapuche',
      'ingeniero presidente',
      'independiente Chile 2026'
    ];

    const policyKeywords = [
      'automatización IA estado',
      'trámites gobierno digital',
      'reducción IVA canasta básica',
      'sueldo mínimo 900 mil',
      'deuda histórica profesores',
      'desarrollo Araucanía',
      'fronteras seguras migración',
      'justicia social Chile',
      'unidad nacional mapuche'
    ];

    const regionalKeywords = [
      'Santiago candidato',
      'Araucanía desarrollo',
      'Temuco reconciliación',
      'Antofagasta tecnología',
      'Valparaíso seguridad',
      'Concepción educación',
      'Arica fronteras',
      'La Pintana justicia social'
    ];

    const competitorKeywords = [
      'Chile digno candidato',
      'alternativa independiente',
      'cambio político Chile',
      'tecnología vs política tradicional',
      'mapuche liderazgo',
      'ingeniero vs políticos'
    ];

    const allKeywords = [
      ...coreKeywords,
      ...policyKeywords,
      ...regionalKeywords,
      ...competitorKeywords,
      ...keywords,
      ...politicalKeywords
    ].join(', ');
    
    updateMeta('keywords', allKeywords);
    
    // Canonical URL
    updateLink('canonical', canonicalUrl);
    
    // Open Graph optimizado para campaña política
    updateMeta('property', 'og:type', 'website');
    updateMeta('property', 'og:title', title);
    updateMeta('property', 'og:description', description);
    updateMeta('property', 'og:url', canonicalUrl);
    updateMeta('property', 'og:site_name', 'Melinao 2026 - Chile Digno');
    updateMeta('property', 'og:image', openGraph.image || '/images/melinao-og-default.jpg');
    updateMeta('property', 'og:image:width', '1200');
    updateMeta('property', 'og:image:height', '630');
    updateMeta('property', 'og:image:alt', 'Juan Pablo Melinao González - Candidato Presidencial Chile 2026');
    updateMeta('property', 'og:locale', 'es_CL');
    updateMeta('property', 'og:locale:alternate', 'es_ES');
    updateMeta('property', 'og:country-name', 'Chile');
    
    // Open Graph específico para política
    updateMeta('property', 'og:rich_attachment', 'true');
    updateMeta('property', 'og:updated_time', new Date().toISOString());
    updateMeta('property', 'article:author', 'Juan Pablo Melinao González');
    updateMeta('property', 'article:publisher', 'https://chiledigno.cl');
    updateMeta('property', 'article:section', 'Política');
    updateMeta('property', 'article:tag', 'Elecciones 2026, Candidato Presidencial, Chile, Mapuche, Tecnología');
    
    // Twitter Cards optimizado para campaña política
    updateMeta('name', 'twitter:card', 'summary_large_image');
    updateMeta('name', 'twitter:site', '@melinao2026');
    updateMeta('name', 'twitter:creator', '@melinao2026');
    updateMeta('name', 'twitter:title', title);
    updateMeta('name', 'twitter:description', description);
    updateMeta('name', 'twitter:image', openGraph.image || '/images/melinao-twitter-default.jpg');
    updateMeta('name', 'twitter:image:alt', 'Juan Pablo Melinao González - Candidato Presidencial Chile 2026');
    updateMeta('name', 'twitter:domain', 'chiledigno.cl');
    updateMeta('name', 'twitter:url', canonicalUrl);
    
    // Meta para otras redes sociales
    updateMeta('name', 'facebook-domain-verification', 'melinao2026campaign');
    updateMeta('name', 'pinterest-rich-pin', 'true');
    updateMeta('name', 'linkedin:owner', 'Juan Pablo Melinao González');
    
    // Meta adicional para buscadores
    updateMeta('name', 'application-name', 'Melinao 2026');
    updateMeta('name', 'msapplication-tooltip', 'Juan Pablo Melinao González - Candidato Presidencial Chile 2026');
    updateMeta('name', 'apple-mobile-web-app-title', 'Melinao 2026');
    updateMeta('name', 'theme-color', '#3B82F6');
    
    // Meta específico para política chilena y geolocalización
    updateMeta('name', 'geo.region', 'CL');
    updateMeta('name', 'geo.country', 'Chile');
    updateMeta('name', 'geo.placename', 'Chile');
    updateMeta('name', 'ICBM', '-35.6751, -71.5430'); // Coordenadas centro de Chile
    updateMeta('name', 'political.candidate', 'Juan Pablo Melinao González');
    updateMeta('name', 'political.party', 'Independiente');
    updateMeta('name', 'political.election', 'Presidencial 2026');
    updateMeta('name', 'political.office', 'Presidente de la República');
    updateMeta('name', 'political.campaign', 'Melinao 2026');
    updateMeta('name', 'political.slogan', 'Tecnología para Todos, Unidad para Chile');
    
    // Meta para redes sociales y búsquedas locales
    updateMeta('name', 'target.audience', 'Ciudadanos chilenos, votantes 2026');
    updateMeta('name', 'coverage', 'Chile');
    updateMeta('name', 'distribution', 'Global');
    updateMeta('name', 'language', 'es-CL');
    updateMeta('name', 'region', 'Chile');
    
    // Meta específico para diferenciación del movimiento "Chile Digno"
    updateMeta('name', 'campaign.type', 'Independiente');
    updateMeta('name', 'candidate.profession', 'Ingeniero en Informática');
    updateMeta('name', 'candidate.ethnicity', 'Mapuche');
    updateMeta('name', 'campaign.focus', 'Tecnología, Justicia Social, Unidad Nacional');
    
    // Schema.org JSON-LD
    if (structuredData) {
      updateStructuredData(structuredData);
    }
    
  }, [title, description, keywords, canonicalUrl, openGraph, structuredData, politicalKeywords]);
};

// Funciones auxiliares para manipular DOM
const updateMeta = (attribute, name, content = null) => {
  const selector = content ? `meta[${attribute}="${name}"]` : `meta[name="${name}"]`;
  let meta = document.querySelector(selector);
  
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute(attribute, name);
    document.head.appendChild(meta);
  }
  
  meta.setAttribute('content', content || name);
};

const updateLink = (rel, href) => {
  let link = document.querySelector(`link[rel="${rel}"]`);
  
  if (!link) {
    link = document.createElement('link');
    link.rel = rel;
    document.head.appendChild(link);
  }
  
  link.href = href;
};

const updateStructuredData = (data) => {
  // Remover schema anterior
  const existingSchema = document.querySelector('script[type="application/ld+json"]');
  if (existingSchema) {
    existingSchema.remove();
  }
  
  // Agregar nuevo schema
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
};
