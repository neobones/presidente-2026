import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AutomatizacionIA from './pages/AutomatizacionIA';
import EconomiaDigital from './pages/EconomiaDigital';
import FronterasInteligentes from './pages/FronterasInteligentes';
import JusticiaSocial from './pages/JusticiaSocial';
import ChileUnido from './pages/ChileUnido';
import ParticipacionCiudadana from './pages/ParticipacionCiudadana';
import AdminPage from './pages/AdminPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/participacion-ciudadana" element={<ParticipacionCiudadana />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/reformas/automatizacion-estado-inteligencia-artificial" element={<AutomatizacionIA />} />
        <Route path="/reformas/reduccion-costo-vida-impuestos" element={<EconomiaDigital />} />
        <Route path="/reformas/fronteras-inteligentes-seguridad-nacional" element={<FronterasInteligentes />} />
        <Route path="/reformas/justicia-social-equidad-fin-privilegios" element={<JusticiaSocial />} />
        <Route path="/reformas/chile-unido-desarrollo-araucania" element={<ChileUnido />} />
        
        {/* Rutas regionales */}
        <Route path="/regiones/santiago" element={<HomePage />} />
        <Route path="/regiones/araucania" element={<HomePage />} />
        <Route path="/regiones/antofagasta" element={<HomePage />} />
        <Route path="/regiones/valparaiso" element={<HomePage />} />
        <Route path="/regiones/concepcion" element={<HomePage />} />
      </Routes>
    </Router>
  );
};

export default App;