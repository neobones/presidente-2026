import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import MobileLayout from './components/MobileLayout';

// Lazy loading de las páginas
const HomePage = lazy(() => import('./pages/HomePage'));
const HomePageNew = lazy(() => import('./pages/HomePageNew'));
const AutomatizacionIA = lazy(() => import('./pages/AutomatizacionIA'));
const EconomiaDigital = lazy(() => import('./pages/EconomiaDigital'));
const FronterasInteligentes = lazy(() => import('./pages/FronterasInteligentes'));
const JusticiaSocial = lazy(() => import('./pages/JusticiaSocial'));
const ChileUnido = lazy(() => import('./pages/ChileUnido'));
const ParticipacionCiudadana = lazy(() => import('./pages/ParticipacionCiudadana'));
const Patrocinios = lazy(() => import('./pages/Patrocinios'));
const PatrociniosNew = lazy(() => import('./pages/PatrociniosNew'));
const PrivilegiosPage = lazy(() => import('./pages/PrivilegiosPage'));
const ReformasIndex = lazy(() => import('./pages/ReformasIndex'));
const AdminPage = lazy(() => import('./pages/AdminPage'));
const RegionalPage = lazy(() => import('./pages/RegionalPage'));
const NoticiasPage = lazy(() => import('./pages/NoticiasPage'));
const ArticuloPage = lazy(() => import('./pages/ArticuloPage'));

// Componente de fallback para Suspense optimizado para mobile
const LoadingFallback = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 flex items-center justify-center px-4">
    <div className="text-center">
      {/* Logo/Spinner */}
      <div className="relative mb-6">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-transparent mx-auto"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
        </div>
      </div>
      
      {/* Texto de carga */}
      <div className="text-white text-xl font-semibold mb-2">Cargando...</div>
      <div className="text-blue-200 text-sm">Melinao 2026</div>
      
      {/* Indicador de progreso */}
      <div className="mt-4 w-48 bg-blue-900/50 rounded-full h-1 mx-auto overflow-hidden">
        <div className="h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse"></div>
      </div>
    </div>
  </div>
);

// Este componente rastrea las vistas de página usando gtag directamente
const RouteTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Usar gtag directamente que ya está cargado en el HTML
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('config', 'G-PL1WGH1V40', {
        page_path: location.pathname + location.search,
        page_title: document.title,
        page_location: window.location.href
      });
    }
  }, [location]);

  return null;
};

const App = () => {
  return (
    <Router>
      <RouteTracker />
      <MobileLayout>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<HomePageNew />} />
            <Route path="/home-original" element={<HomePage />} />
            <Route path="/participacion-ciudadana" element={<ParticipacionCiudadana />} />
            <Route path="/patrocinios" element={<PatrociniosNew />} />
            <Route path="/patrocinios-old" element={<Patrocinios />} />
            <Route path="/admin" element={<AdminPage />} />
            
            {/* Sección de Noticias/Blog */}
            <Route path="/noticias" element={<NoticiasPage />} />
            <Route path="/noticias/:slug" element={<ArticuloPage />} />

            {/* Rutas de Reformas */}
            <Route path="/reformas/automatizacion-estado-inteligencia-artificial" element={<AutomatizacionIA />} />
            <Route path="/reformas/reduccion-costo-vida-impuestos" element={<EconomiaDigital />} />
            <Route path="/reformas/fronteras-inteligentes-seguridad-nacional" element={<FronterasInteligentes />} />
            <Route path="/reformas/justicia-social-equidad-fin-privilegios" element={<JusticiaSocial />} />
            <Route path="/reformas/chile-unido-desarrollo-araucania" element={<ChileUnido />} />
            <Route path="/reformas/eliminacion-privilegios-politicos-transparencia" element={<PrivilegiosPage />} />
            <Route path="/reformas" element={<ReformasIndex />} />
            
            {/* Rutas regionales con componente dinámico */}
            <Route path="/regiones/:region" element={<RegionalPage />} />
          </Routes>
        </Suspense>
      </MobileLayout>
    </Router>
  );
};

export default App;