import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';
import HomePage from './pages/HomePage';
import AutomatizacionIA from './pages/AutomatizacionIA';
import EconomiaDigital from './pages/EconomiaDigital';
import FronterasInteligentes from './pages/FronterasInteligentes';
import JusticiaSocial from './pages/JusticiaSocial';
import ChileUnido from './pages/ChileUnido';
import ParticipacionCiudadana from './pages/ParticipacionCiudadana';
import Patrocinios from './pages/Patrocinios';
import PatrociniosNew from './pages/PatrociniosNew';
import PrivilegiosPage from './pages/PrivilegiosPage';
import AdminPage from './pages/AdminPage';
import MobileLayout from './components/MobileLayout';

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
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/participacion-ciudadana" element={<ParticipacionCiudadana />} />
          <Route path="/patrocinios" element={<PatrociniosNew />} />
          <Route path="/patrocinios-old" element={<Patrocinios />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/reformas/automatizacion-estado-inteligencia-artificial" element={<AutomatizacionIA />} />
          <Route path="/reformas/reduccion-costo-vida-impuestos" element={<EconomiaDigital />} />
          <Route path="/reformas/fronteras-inteligentes-seguridad-nacional" element={<FronterasInteligentes />} />
          <Route path="/reformas/justicia-social-equidad-fin-privilegios" element={<JusticiaSocial />} />
          <Route path="/reformas/chile-unido-desarrollo-araucania" element={<ChileUnido />} />
          <Route path="/reformas/eliminacion-privilegios-politicos-transparencia" element={<PrivilegiosPage />} />
          
          {/* Rutas regionales */}
          <Route path="/regiones/santiago" element={<HomePage />} />
          <Route path="/regiones/araucania" element={<HomePage />} />
          <Route path="/regiones/antofagasta" element={<HomePage />} />
          <Route path="/regiones/valparaiso" element={<HomePage />} />
          <Route path="/regiones/concepcion" element={<HomePage />} />
        </Routes>
      </MobileLayout>
    </Router>
  );
};

export default App;