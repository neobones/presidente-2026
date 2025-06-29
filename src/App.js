import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AutomatizacionIA from './pages/AutomatizacionIA';
import EconomiaDigital from './pages/EconomiaDigital';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/reformas/automatizacion-estado-inteligencia-artificial" element={<AutomatizacionIA />} />
        <Route path="/reformas/reduccion-costo-vida-impuestos" element={<EconomiaDigital />} />
        <Route path="/reformas/fronteras-seguras-migracion-controlada" element={<HomePage />} />
        <Route path="/reformas/justicia-social-profesores-privilegios" element={<HomePage />} />
        <Route path="/reformas/unidad-nacional-araucania-desarrollo" element={<HomePage />} />
        
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