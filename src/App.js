import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';
import MobileLayout from './components/MobileLayout';

// Lazy loading de las páginas
const HomePage = lazy(() => import('./pages/HomePage'));
const AutomatizacionIA = lazy(() => import('./pages/AutomatizacionIA'));
const EconomiaDigital = lazy(() => import('./pages/EconomiaDigital'));
const FronterasInteligentes = lazy(() => import('./pages/FronterasInteligentes'));
const JusticiaSocial = lazy(() => import('./pages/JusticiaSocial'));
const ChileUnido = lazy(() => import('./pages/ChileUnido'));
const ParticipacionCiudadana = lazy(() => import('./pages/ParticipacionCiudadana'));
const Patrocinios = lazy(() => import('./pages/Patrocinios'));
const PatrociniosNew = lazy(() => import('./pages/PatrociniosNew'));
const PrivilegiosPage = lazy(() => import('./pages/PrivilegiosPage'));
const AdminPage = lazy(() => import('./pages/AdminPage'));
const RegionalPage = lazy(() => import('./pages/RegionalPage'));
const NoticiasPage = lazy(() => import('./pages/NoticiasPage'));
const ArticuloPage = lazy(() => import('./pages/ArticuloPage'));

// Componente de fallback para Suspense
const LoadingFallback = () => (
  <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
    <div className="text-xl">Cargando página...</div>
  </div>
);

// Este componente rastrea las vistas de página
const RouteTracker = () => {
  const location = useLocation();

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });
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
            <Route path="/" element={<HomePage />} />
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
            
            {/* Rutas regionales con componente dinámico */}
            <Route path="/regiones/:region" element={<RegionalPage />} />
          </Routes>
        </Suspense>
      </MobileLayout>
    </Router>
  );
};

export default App;