/**
 * Utilidades para manejo dinámico de dominios
 * Soporta múltiples dominios: chiledigno.cl y melinao2026.cl
 */

// Función para obtener el dominio base actual
export const getCurrentDomain = () => {
  if (typeof window === 'undefined') {
    // Server-side: usar variable de entorno o detectar desde headers
    return process.env.REACT_APP_BASE_URL || 'https://melinao2026.cl';
  }
  
  // Client-side: detectar desde window.location
  const hostname = window.location.hostname;
  const protocol = window.location.protocol;
  
  // En desarrollo local
  if (hostname === 'localhost') {
    return `${protocol}//localhost:3000`;
  }
  
  // En producción - usar el dominio actual
  return `${protocol}//${hostname}`;
};

// Función para obtener la URL de la API
export const getApiBaseUrl = () => {
  if (typeof window === 'undefined') {
    // Server-side
    return process.env.API_BASE_URL || 'http://localhost:8000';
  }
  
  const hostname = window.location.hostname;
  const protocol = window.location.protocol;
  
  // En desarrollo local
  if (hostname === 'localhost') {
    return 'http://localhost:8000';
  }
  
  // En producción - usar el mismo dominio
  return `${protocol}//${hostname}`;
};

// Función para construir URLs absolutas
export const buildUrl = (path = '') => {
  const domain = getCurrentDomain();
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${domain}${cleanPath}`;
};

// Función para construir URLs de API
export const buildApiUrl = (endpoint = '') => {
  const apiBase = getApiBaseUrl();
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${apiBase}${cleanEndpoint}`;
};

// Lista de dominios soportados
export const SUPPORTED_DOMAINS = [
  'chiledigno.cl',
  'melinao2026.cl',
  'www.chiledigno.cl',
  'www.melinao2026.cl'
];

// Función para validar si un dominio es soportado
export const isDomainSupported = (hostname) => {
  return SUPPORTED_DOMAINS.includes(hostname) || hostname === 'localhost';
};

// Función para obtener el dominio principal (sin www)
export const getMainDomain = () => {
  if (typeof window === 'undefined') {
    return 'melinao2026.cl'; // Dominio principal por defecto
  }
  
  const hostname = window.location.hostname;
  
  if (hostname === 'localhost') {
    return 'localhost';
  }
  
  // Remover www. si existe
  return hostname.replace(/^www\./, '');
};