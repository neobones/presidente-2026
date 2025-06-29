import React, { useState, useEffect } from 'react';
import AdminDashboard from '../components/AdminDashboard';
import AuthStatus from '../components/AuthStatus';
import SEOWrapper from '../components/SEOWrapper';

const AdminPage = () => {
  const [usuario, setUsuario] = useState(null);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    // Verificar token al cargar la página
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    
    if (token) {
      // Si hay token en URL, guardarlo
      localStorage.setItem('authToken', token);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
    
    setAuthReady(true);
  }, []);

  const seoConfig = {
    title: "Dashboard Administrativo - Participación Ciudadana",
    description: "Panel de administración para gestionar consultas ciudadanas de la campaña Melinao 2026",
    robots: "noindex, nofollow"
  };

  return (
    <SEOWrapper config={seoConfig}>
      {/* AuthStatus oculto para manejar autenticación en segundo plano */}
      <div style={{ display: 'none' }}>
        <AuthStatus onAuthChange={setUsuario} />
      </div>
      
      {authReady && <AdminDashboard usuario={usuario} />}
    </SEOWrapper>
  );
};

export default AdminPage;