import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, ArrowLeft, RefreshCw } from 'lucide-react';
import { buildApiUrl, getMainDomain } from '../utils/domainUtils';

const LoginError = () => {
  useEffect(() => {
    document.title = 'Error de Autenticación - Juan Pablo Melinao González 2026';
  }, []);

  const handleRetryLogin = () => {
    const apiUrl = buildApiUrl('/api/auth/google');
    window.location.href = apiUrl;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-slate-800 to-emerald-900">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          
          {/* Header */}
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center text-white/80 hover:text-white transition-colors mb-6">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Volver al inicio
            </Link>
            
            <div className="bg-red-500/20 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <AlertCircle className="w-12 h-12 text-red-400" />
            </div>
            
            <h1 className="text-4xl font-bold text-white mb-4">
              Error de Autenticación
            </h1>
            
            <p className="text-xl text-white/80 mb-8">
              No se pudo completar el proceso de inicio de sesión
            </p>
          </div>

          {/* Razones posibles */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 text-left">
            <h2 className="text-2xl font-semibold text-white mb-6">
              ¿Qué pudo haber pasado?
            </h2>
            
            <div className="space-y-4 text-white/90">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                <p>Cancelaste el proceso de autorización en Google</p>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                <p>Denegaste los permisos necesarios para acceder</p>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                <p>Ocurrió un error temporal en la conexión</p>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                <p>Tu navegador bloqueó ventanas emergentes</p>
              </div>
            </div>
          </div>

          {/* Acciones */}
          <div className="space-y-4">
            <button
              onClick={handleRetryLogin}
              className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 text-white py-4 px-8 rounded-xl font-semibold hover:from-blue-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
            >
              <RefreshCw className="w-5 h-5" />
              <span>Intentar de Nuevo</span>
            </button>
            
            <Link
              to="/participacion-ciudadana"
              className="block w-full bg-white/10 backdrop-blur-sm text-white py-4 px-8 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20"
            >
              Continuar sin iniciar sesión
            </Link>
          </div>

          {/* Información adicional */}
          <div className="mt-12 p-6 bg-blue-500/10 rounded-xl border border-blue-500/20">
            <h3 className="text-lg font-semibold text-white mb-3">
              ¿Por qué necesitamos autenticación?
            </h3>
            <p className="text-white/80 text-sm leading-relaxed">
              Utilizamos Google OAuth para verificar que las consultas ciudadanas provienen de personas reales, 
              evitando spam y bots automatizados. Esto nos permite mantener un diálogo genuino y constructivo 
              con la ciudadanía.
            </p>
          </div>

          {/* Métodos alternativos */}
          <div className="mt-8 text-white/60 text-sm">
            <p className="mb-2">¿Tienes problemas técnicos?</p>
            <p>
              Puedes enviarnos tu consulta por correo a:{' '}
              <a 
                href={`mailto:contacto@${getMainDomain()}`}
                className="text-blue-400 hover:text-blue-300 underline"
              >
                contacto@{getMainDomain()}
              </a>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LoginError;