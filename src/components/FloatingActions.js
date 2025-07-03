import React, { useState, useEffect } from 'react';
import { ArrowUp, MessageSquare, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const FloatingActions = ({ 
  stats, 
  showStats = true, 
  showScrollTop = true, 
  onParticipationClick = null,
  showParticipationModal = false 
}) => {
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Mostrar botón de scroll to top cuando se haya scrolleado más de 400px
      setShowScrollToTop(currentScrollY > 400);
      
      // Detectar si la navegación móvil está visible
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsNavVisible(false); // Navigation hidden cuando scroll down
      } else {
        setIsNavVisible(true); // Navigation visible cuando scroll up
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Determinar posición based en si la navegación está visible
  const getBottomPosition = () => {
    // En mobile (lg:hidden) ajustar posición según visibilidad de navegación
    if (isNavVisible) {
      return 'bottom-24 lg:bottom-6'; // 24 = 6rem (navegación) + espacio
    } else {
      return 'bottom-6';
    }
  };

  // Z-index que siempre esté sobre la navegación móvil (z-50)
  const zIndex = 'z-[60]';

  return (
    <>
      {/* Floating Stats Widget - Solo cuando stats están disponibles y navegación visible */}
      {showStats && stats && isNavVisible && (
        <div className={`fixed ${getBottomPosition()} right-6 ${zIndex} bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-gray-200 max-w-[200px] lg:block hidden`}>
          <div className="text-xs text-gray-600 font-semibold mb-2">Participación Ciudadana</div>
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-600">Total consultas</span>
              <span className="text-sm font-bold text-green-600">{stats.totalConsultas}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-600">Implementadas</span>
              <span className="text-sm font-bold text-blue-600">{stats.implementadas}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-600">En revisión</span>
              <span className="text-sm font-bold text-orange-600">{stats.enRevision}</span>
            </div>
          </div>
          <Link 
            to="/patrocinios"
            className="text-xs text-purple-600 hover:text-purple-700 flex items-center justify-center space-x-1 mt-3 bg-purple-50 rounded-lg py-2 transition-colors"
          >
            <Users className="w-3 h-3" />
            <span>Ver todas</span>
          </Link>
        </div>
      )}

      {/* Main Floating Action Button */}
      <div className={`fixed ${getBottomPosition()} right-6 ${zIndex} flex flex-col gap-3 items-end`}>
        
        {/* Scroll to Top Button - Solo cuando navegación está oculta O cuando hay mucho scroll */}
        {showScrollTop && ((showScrollToTop && !isNavVisible) || showScrollToTop) && (
          <button
            onClick={scrollToTop}
            className="bg-gradient-to-r from-gray-600 to-gray-700 text-white p-3 lg:p-4 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 group"
            aria-label="Volver al inicio"
          >
            <ArrowUp className="w-5 h-5 lg:w-6 lg:h-6 group-hover:translate-y-[-2px] transition-transform" />
          </button>
        )}

        {/* Participation Button - Siempre visible */}
        {showParticipationModal && onParticipationClick ? (
          <button
            onClick={onParticipationClick}
            className="group bg-gradient-to-r from-blue-600 to-green-600 text-white p-3 lg:p-4 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300"
            aria-label="Abrir consulta ciudadana"
          >
            <MessageSquare className="w-5 h-5 lg:w-6 lg:h-6 group-hover:rotate-12 transition-transform" />
            <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
              !
            </div>
          </button>
        ) : (
          <Link
            to="/patrocinios"
            className="group bg-gradient-to-r from-blue-600 to-green-600 text-white p-3 lg:p-4 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300"
            aria-label="Participación Ciudadana"
          >
            <MessageSquare className="w-5 h-5 lg:w-6 lg:h-6 group-hover:rotate-12 transition-transform" />
          </Link>
        )}
      </div>

      {/* Compact Stats Badge for Mobile - Solo cuando navegación está oculta */}
      {showStats && stats && !isNavVisible && (
        <div className={`lg:hidden fixed bottom-6 right-20 ${zIndex} bg-blue-600 text-white px-3 py-2 rounded-full shadow-lg text-xs font-medium`}>
          {stats.totalConsultas} consultas
        </div>
      )}
    </>
  );
};

export default FloatingActions;