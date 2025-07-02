import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, FileText, Users, Info, MessageCircle, Phone, Newspaper } from 'lucide-react';

const MobileNavigation = () => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Auto-hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false); // Hide when scrolling down
      } else {
        setIsVisible(true); // Show when scrolling up
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navigationItems = [
    {
      id: 'home',
      icon: Home,
      label: 'Inicio',
      path: '/',
      isActive: location.pathname === '/'
    },
    {
      id: 'noticias',
      icon: Newspaper,
      label: 'Noticias',
      path: '/noticias',
      isActive: location.pathname.startsWith('/noticias')
    },
    {
      id: 'reformas',
      icon: FileText,
      label: 'Reformas',
      path: '/reformas',
      isActive: location.pathname.includes('/reformas'),
      submenuItems: [
        {
          label: 'IA Estado',
          path: '/reformas/automatizacion-estado-inteligencia-artificial'
        },
        {
          label: 'Economía',
          path: '/reformas/reduccion-costo-vida-impuestos'
        },
        {
          label: 'Fronteras',
          path: '/reformas/fronteras-inteligentes-seguridad-nacional'
        },
        {
          label: 'Justicia',
          path: '/reformas/justicia-social-equidad-fin-privilegios'
        },
        {
          label: 'Araucanía',
          path: '/reformas/chile-unido-desarrollo-araucania'
        },
        {
          label: 'Privilegios',
          path: '/reformas/eliminacion-privilegios-politicos-transparencia'
        }
      ]
    },
    {
      id: 'participacion',
      icon: Users,
      label: 'Participa',
      path: '/participacion-ciudadana',
      isActive: location.pathname === '/participacion-ciudadana'
    },
    {
      id: 'juan-pablo',
      icon: Info,
      label: 'Juan Pablo',
      path: '/#historia',
      isActive: false,
      scrollTo: 'historia'
    }
  ];

  const handleNavClick = (item) => {
    if (item.scrollTo) {
      // If we're not on home page, navigate there first
      if (location.pathname !== '/') {
        window.location.href = `/#${item.scrollTo}`;
      } else {
        // If on home page, scroll to section
        const element = document.getElementById(item.scrollTo);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <>
      {/* Bottom Navigation Bar - Mobile & Tablet Only */}
      <nav 
        className={`lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-lg transition-transform duration-300 ${
          isVisible ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="flex justify-around items-center py-2 px-1">
          {navigationItems.map((item) => {
            const IconComponent = item.icon;
            
            if (item.scrollTo) {
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 min-h-[60px] flex-1 ${
                    item.isActive
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <IconComponent className={`w-6 h-6 mb-1 ${item.isActive ? 'text-blue-600' : ''}`} />
                  <span className="text-xs font-medium leading-tight">{item.label}</span>
                </button>
              );
            }

            return (
              <Link
                key={item.id}
                to={item.path}
                className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 min-h-[60px] flex-1 ${
                  item.isActive
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <IconComponent className={`w-6 h-6 mb-1 ${item.isActive ? 'text-blue-600' : ''}`} />
                <span className="text-xs font-medium leading-tight">{item.label}</span>
                {item.isActive && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-blue-600 rounded-b-full"></div>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Spacer for bottom navigation - Mobile & Tablet Only */}
      <div className="lg:hidden h-20"></div>


      {/* Reformas Quick Menu - Mobile & Tablet Only */}
      {location.pathname.includes('/reformas') && (
        <div className="lg:hidden fixed bottom-24 left-4 right-4 z-40">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-gray-200">
            <h4 className="text-sm font-bold text-gray-900 mb-3 text-center">Reformas</h4>
            <div className="grid grid-cols-2 gap-2">
              {navigationItems.find(item => item.id === 'reformas')?.submenuItems.map((reform, index) => (
                <Link
                  key={index}
                  to={reform.path}
                  className={`p-2 rounded-lg text-center transition-all duration-200 ${
                    location.pathname === reform.path
                      ? 'bg-blue-100 text-blue-700 font-semibold'
                      : 'bg-gray-50 text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                  }`}
                >
                  <span className="text-xs font-medium">{reform.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileNavigation;