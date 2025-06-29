import React from 'react';
import AdminDashboard from '../components/AdminDashboard';
import SEOWrapper from '../components/SEOWrapper';

const AdminPage = () => {
  const seoConfig = {
    title: "Dashboard Administrativo - Participación Ciudadana",
    description: "Panel de administración para gestionar consultas ciudadanas de la campaña Melinao 2026",
    robots: "noindex, nofollow"
  };

  return (
    <SEOWrapper config={seoConfig}>
      <AdminDashboard />
    </SEOWrapper>
  );
};

export default AdminPage;