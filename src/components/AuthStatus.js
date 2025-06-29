import React, { useState, useEffect } from 'react';
import { User, LogIn, AlertCircle, CheckCircle, Settings } from 'lucide-react';
import { buildApiUrl } from '../utils/domainUtils';

const AuthStatus = ({ onAuthChange }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [oauthAvailable, setOauthAvailable] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/auth/user', {
        credentials: 'include'
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        if (onAuthChange) onAuthChange(userData);
      } else if (response.status === 401) {
        // Usuario no autenticado - normal
        setUser(null);
        if (onAuthChange) onAuthChange(null);
      }
    } catch (error) {
      console.log('Error verificando autenticación:', error);
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    try {
      const apiUrl = buildApiUrl('/api/auth/google');
      
      // Verificar si OAuth está disponible
      const response = await fetch('/api/auth/google', {
        method: 'GET',
        credentials: 'include'
      });

      if (response.status === 503) {
        const data = await response.json();
        setOauthAvailable(false);
        setError(data.message);
        return;
      }

      // Si OAuth está disponible, redirigir
      window.location.href = apiUrl;
    } catch (error) {
      setError('Error iniciando sesión');
      setOauthAvailable(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
      setUser(null);
      if (onAuthChange) onAuthChange(null);
      window.location.reload();
    } catch (error) {
      console.error('Error cerrando sesión:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center space-x-2 text-gray-600">
        <div className="animate-spin w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full"></div>
        <span className="text-sm">Verificando...</span>
      </div>
    );
  }

  if (error && !oauthAvailable) {
    return (
      <div className="flex items-center space-x-2 text-amber-600 bg-amber-50 px-3 py-2 rounded-lg">
        <Settings className="w-4 h-4" />
        <div className="text-sm">
          <div className="font-medium">OAuth en configuración</div>
          <div className="text-xs">Participación disponible sin login</div>
        </div>
      </div>
    );
  }

  if (user) {
    return (
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          {user.avatar ? (
            <img 
              src={user.avatar} 
              alt={user.nombre}
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
          )}
          <div>
            <div className="text-sm font-medium text-gray-900">{user.nombre}</div>
            <div className="text-xs text-gray-500">{user.consultasEnviadas} consultas</div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="text-xs text-red-600 hover:text-red-700 transition-colors"
        >
          Salir
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      {oauthAvailable ? (
        <button
          onClick={handleLogin}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <LogIn className="w-4 h-4" />
          <span className="text-sm">Iniciar Sesión</span>
        </button>
      ) : (
        <div className="flex items-center space-x-2 text-gray-500">
          <AlertCircle className="w-4 h-4" />
          <span className="text-sm">Login en configuración</span>
        </div>
      )}
    </div>
  );
};

export default AuthStatus;