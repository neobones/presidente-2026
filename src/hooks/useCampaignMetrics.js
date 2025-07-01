import { useState, useEffect, useCallback } from 'react';

/**
 * Hook personalizado para obtener y manejar métricas de campaña desde la API centralizada
 * Reemplaza la dependencia directa en campaignData.js
 */
export const useCampaignMetrics = (options = {}) => {
  const {
    autoRefresh = true,
    refreshInterval = 30000, // 30 segundos
    endpoint = '/api/campaign/metrics'
  } = options;

  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Función para obtener métricas de la API
  const fetchMetrics = useCallback(async () => {
    try {
      setError(null);
      const response = await fetch(endpoint);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.success) {
        setMetrics(result.data);
        setLastUpdated(new Date());
        setLoading(false);
      } else {
        throw new Error(result.error || 'Error desconocido');
      }
    } catch (err) {
      console.error('Error fetching campaign metrics:', err);
      setError(err.message);
      setLoading(false);
      
      // Fallback data si la API falla
      if (!metrics) {
        setMetrics(getFallbackMetrics());
      }
    }
  }, [endpoint]);

  // Función para incrementar patrocinios
  const incrementarPatrocinios = useCallback(async (cantidad = 1) => {
    try {
      const response = await fetch('/api/campaign/patrocinios/incrementar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cantidad })
      });
      
      const result = await response.json();
      
      if (result.success) {
        // Actualizar métricas locales
        setMetrics(prev => ({
          ...prev,
          patrocinios: {
            ...prev.patrocinios,
            actual: result.data.actual,
            porcentaje: result.data.porcentaje
          }
        }));
        return result;
      } else {
        throw new Error(result.error);
      }
    } catch (err) {
      console.error('Error incrementing patrocinios:', err);
      throw err;
    }
  }, []);

  // Función para refrescar manualmente
  const refresh = useCallback(() => {
    setLoading(true);
    fetchMetrics();
  }, [fetchMetrics]);

  // Efecto principal para cargar datos
  useEffect(() => {
    fetchMetrics();
  }, [fetchMetrics]);

  // Efecto para auto-refresh
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      fetchMetrics();
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval, fetchMetrics]);

  // Datos calculados derivados
  const derivedData = metrics ? {
    // Compatibilidad con campaignData.js existente
    campaignMetrics: {
      diasParaElecciones: () => metrics.fechas.diasParaElecciones,
      apoyosRecolectados: metrics.patrocinios.actual,
      metaPatrocinios: metrics.patrocinios.meta,
      nuevosApoyosHoy: metrics.patrocinios.nuevosHoy,
      regionesLiderando: metrics.regionesLiderando,
      encuestas: metrics.encuestas
    },
    
    // Datos formateados para componentes
    patrociniosData: {
      actual: metrics.patrocinios.actual,
      meta: metrics.patrocinios.meta,
      porcentaje: metrics.patrocinios.porcentaje,
      nuevosHoy: metrics.patrocinios.nuevosHoy,
      diasRestantes: metrics.fechas.diasParaElecciones
    },
    
    // Countdown data
    countdownData: {
      electionDate: metrics.fechas.elecciones,
      diasParaElecciones: metrics.fechas.diasParaElecciones,
      fechaLimitePatrocinios: metrics.fechas.limitePatrocinios
    },
    
    // Live metrics para animaciones
    liveMetrics: {
      visitasHoy: metrics.interaccion.visitasHoy,
      compartidosHoy: metrics.interaccion.compartidosHoy,
      nuevosApoyosHoy: metrics.patrocinios.nuevosHoy,
      actualizadoEn: "tiempo real"
    }
  } : null;

  return {
    // Datos principales
    metrics,
    derivedData,
    
    // Estados
    loading,
    error,
    lastUpdated,
    
    // Acciones
    refresh,
    incrementarPatrocinios,
    
    // Funciones de utilidad
    isStale: lastUpdated ? (Date.now() - lastUpdated.getTime()) > refreshInterval * 2 : false,
    hasData: !!metrics && !error
  };
};

/**
 * Hook específico para métricas de patrocinios
 */
export const usePatrociniosMetrics = () => {
  return useCampaignMetrics({
    endpoint: '/api/campaign/patrocinios',
    refreshInterval: 15000 // Actualizar más frecuentemente
  });
};

/**
 * Datos de fallback si la API no está disponible
 */
function getFallbackMetrics() {
  return {
    patrocinios: {
      actual: 847397,
      meta: 1000000,
      nuevosHoy: 2847,
      porcentaje: 85,
      fechaLimiteInscripcion: "2026-01-15T00:00:00.000Z"
    },
    fechas: {
      elecciones: "2026-11-15T00:00:00.000Z",
      diasParaElecciones: 502,
      limitePatrocinios: "2026-01-15T00:00:00.000Z"
    },
    encuestas: {
      intencionVoto: 28.4,
      aprobacion: 67.2,
      confianza: 71.8,
      tendencia: "+4.2% último mes"
    },
    regionesLiderando: [
      { nombre: "Araucanía", porcentaje: 34.2, tendencia: "+2.1%" },
      { nombre: "Antofagasta", porcentaje: 31.8, tendencia: "+1.8%" },
      { nombre: "Valparaíso", porcentaje: 29.4, tendencia: "+3.2%" }
    ],
    interaccion: {
      visitasHoy: 15234,
      compartidosHoy: 892,
      suscriptosNewsletter: 23456,
      videoViews: 145678
    },
    redesSociales: {
      seguidoresTotal: 89234,
      crecimientoSemanal: 3.2,
      engagementRate: 8.7
    }
  };
}

export default useCampaignMetrics;