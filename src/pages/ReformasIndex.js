import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Cpu, DollarSign, Shield, Users, Heart, ArrowRight, CheckCircle, BarChart3, FileText, Clock } from 'lucide-react';
import SEOWrapper from '../components/SEOWrapper';
import AuthStatus from '../components/AuthStatus';
import { seoConfigs } from '../data/seoConfigs';

const ReformasIndex = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const reformas = [
    {
      id: 'automatizacion-estado-inteligencia-artificial',
      titulo: 'Automatización del Estado con IA',
      descripcion: 'Revolucionar los servicios públicos con inteligencia artificial para reducir trámites de semanas a minutos.',
      icon: <Cpu className="w-8 h-8" />,
      beneficios: ['2 minutos por trámite', '$500 mil millones de ahorro', '50% menos tiempo en gestiones'],
      color: 'from-blue-500 to-cyan-500',
      path: '/reformas/automatizacion-estado-inteligencia-artificial',
      tiempo: '2-5 años',
      impacto: 'Alto'
    },
    {
      id: 'reduccion-costo-vida-impuestos',
      titulo: 'Economía Digital y Reducción de Impuestos',
      descripcion: 'Reducir el costo de vida mediante la disminución del IVA y formalización de la economía digital.',
      icon: <DollarSign className="w-8 h-8" />,
      beneficios: ['IVA 5% canasta básica', 'Sueldo mínimo $900k', '10% reducción precios'],
      color: 'from-green-500 to-emerald-500',
      path: '/reformas/reduccion-costo-vida-impuestos',
      tiempo: '1-2 años',
      impacto: 'Alto'
    },
    {
      id: 'fronteras-inteligentes-seguridad-nacional',
      titulo: 'Fronteras Inteligentes y Seguridad',
      descripcion: 'Modernizar la seguridad fronteriza con tecnología avanzada para controlar la migración irregular.',
      icon: <Shield className="w-8 h-8" />,
      beneficios: ['50% menos migración irregular', '20% menos delitos', 'Fronteras 24/7'],
      color: 'from-red-500 to-pink-500',
      path: '/reformas/fronteras-inteligentes-seguridad-nacional',
      tiempo: '2-3 años',
      impacto: 'Alto'
    },
    {
      id: 'justicia-social-equidad-fin-privilegios',
      titulo: 'Justicia Social y Fin de Privilegios',
      descripcion: 'Terminar con la desigualdad mediante el pago de la deuda histórica docente y mejores sueldos.',
      icon: <Users className="w-8 h-8" />,
      beneficios: ['$4.5 millones a profesores', 'Sueldos dignos', 'Equidad social'],
      color: 'from-purple-500 to-violet-500',
      path: '/reformas/justicia-social-equidad-fin-privilegios',
      tiempo: '4-6 años',
      impacto: 'Alto'
    },
    {
      id: 'chile-unido-desarrollo-araucania',
      titulo: 'Chile Unido y Desarrollo de La Araucanía',
      descripcion: 'Unir Chile mediante el reconocimiento mapuche y el desarrollo integral de La Araucanía.',
      icon: <Heart className="w-8 h-8" />,
      beneficios: ['$300 mil millones inversión', 'Reconciliación nacional', 'Desarrollo regional'],
      color: 'from-orange-500 to-red-500',
      path: '/reformas/chile-unido-desarrollo-araucania',
      tiempo: '6-8 años',
      impacto: 'Alto'
    },
    {
      id: 'eliminacion-privilegios-politicos-transparencia',
      titulo: 'Eliminación de Privilegios Políticos',
      descripcion: 'Eliminar gradualmente los privilegios políticos y sueldos vitalicios para mayor transparencia.',
      icon: <CheckCircle className="w-8 h-8" />,
      beneficios: ['Fin sueldos vitalicios', 'Transparencia total', 'Recursos a la ciudadanía'],
      color: 'from-indigo-500 to-purple-500',
      path: '/reformas/eliminacion-privilegios-politicos-transparencia',
      tiempo: '4-5 años',
      impacto: 'Medio'
    }
  ];

  const seoConfig = {
    title: "Reformas de Gobierno - Juan Pablo Melinao 2026 | Plan Completo de Transformación",
    description: "Conoce las 6 reformas estructurales de Juan Pablo Melinao: IA para el Estado, reducción de impuestos, fronteras inteligentes, justicia social, desarrollo Araucanía y fin de privilegios políticos.",
    keywords: "reformas gobierno Chile, automatización IA estado, reducción IVA, fronteras inteligentes, justicia social, desarrollo Araucanía, eliminación privilegios políticos, Melinao 2026",
    ogTitle: "Plan de Reformas - Melinao Presidente 2026",
    ogDescription: "6 reformas para transformar Chile: tecnología, economía, seguridad, justicia social, unidad nacional y transparencia política.",
    canonical: "/reformas"
  };

  return (
    <SEOWrapper seoConfig={seoConfig}>
      <div className="min-h-screen bg-gray-50">
        
        {/* HERO SECTION */}
        <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-40 right-32 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute bottom-32 left-1/3 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-500/30 text-blue-200 px-6 py-3 rounded-full text-sm font-medium mb-8 backdrop-blur-sm">
                <FileText className="w-5 h-5" />
                PLAN DE REFORMAS
              </div>

              {/* Título Principal */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  6 Reformas
                </span>
                <br />
                <span className="text-white">
                  para Transformar Chile
                </span>
              </h1>

              {/* Subtítulo */}
              <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed">
                Un plan integral para modernizar el Estado, reducir desigualdades y construir 
                un Chile próspero y justo para todos.
              </p>

              {/* Estadísticas Rápidas */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="text-3xl font-bold text-blue-400 mb-2">6</div>
                  <div className="text-sm text-gray-300">Reformas Estructurales</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="text-3xl font-bold text-green-400 mb-2">$520k</div>
                  <div className="text-sm text-gray-300">Beneficio Familiar/Mes</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="text-3xl font-bold text-purple-400 mb-2">2 min</div>
                  <div className="text-sm text-gray-300">Máximo por Trámite</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="text-3xl font-bold text-orange-400 mb-2">8 años</div>
                  <div className="text-sm text-gray-300">Plan de Implementación</div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* GRID DE REFORMAS */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Reformas por Área de Impacto
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Cada reforma está diseñada para generar cambios tangibles y medibles 
                en la vida de los chilenos.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {reformas.map((reforma, index) => (
                <Link
                  key={reforma.id}
                  to={reforma.path}
                  className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-gray-200 transform hover:scale-105"
                >
                  {/* Icono y Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`bg-gradient-to-r ${reforma.color} p-4 rounded-2xl text-white shadow-lg`}>
                      {reforma.icon}
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                        {reforma.tiempo}
                      </div>
                      <div className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-sm font-medium">
                        Impacto {reforma.impacto}
                      </div>
                    </div>
                  </div>

                  {/* Título */}
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                    {reforma.titulo}
                  </h3>

                  {/* Descripción */}
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {reforma.descripcion}
                  </p>

                  {/* Beneficios */}
                  <div className="space-y-2 mb-6">
                    {reforma.beneficios.map((beneficio, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{beneficio}</span>
                      </div>
                    ))}
                  </div>

                  {/* Call to Action */}
                  <div className="flex items-center justify-between">
                    <span className="text-blue-600 font-semibold group-hover:text-blue-700">
                      Ver detalles
                    </span>
                    <ChevronRight className="w-5 h-5 text-blue-600 group-hover:text-blue-700 group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              ))}
            </div>

            {/* Resumen de Impacto */}
            <div className="mt-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white text-center">
              <h3 className="text-3xl font-bold mb-6">Impacto Conjunto de las Reformas</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <div className="text-4xl font-bold mb-2">$2.3 Billones</div>
                  <div className="text-blue-100">Financiamiento asegurado vía impuestos altos</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">57.000</div>
                  <div className="text-blue-100">Profesores beneficiados con deuda histórica</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">99.9%</div>
                  <div className="text-blue-100">Reducción en tiempo de trámites estatales</div>
                </div>
              </div>
              
              <div className="mt-8">
                <Link
                  to="/patrocinios"
                  className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-full font-bold hover:bg-blue-50 transition-colors"
                >
                  <Users className="w-6 h-6" />
                  Únete al Plan de Reformas
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>

          </div>
        </section>

        {/* Auth Status */}
        <AuthStatus />

      </div>
    </SEOWrapper>
  );
};

export default ReformasIndex;