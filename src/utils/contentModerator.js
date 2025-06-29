/**
 * Sistema de Moderación de Contenido
 * Detecta contenido ofensivo en español/chileno/latinoamericano
 */

class ContentModerator {
  
  // Lista de palabras ofensivas en español/chileno/latinoamericano
  static palabrasOfensivas = [
    // Palabras generales ofensivas en español
    'puto', 'puta', 'cabrón', 'cabrona', 'hijueputa', 'hijo de puta', 'hija de puta',
    'maricón', 'marica', 'pendejo', 'pendeja', 'culero', 'culera', 'verga',
    'coño', 'concha', 'conchesumadre', 'conchasumadre', 'csm', 'ctm',
    'joder', 'jodido', 'jodida', 'carajo', 'caraja', 'mierda', 'mierdas',
    'cagada', 'cagado', 'cagar', 'cagón', 'cagona', 'culo', 'ojete',
    'mamada', 'mamadas', 'chingar', 'chingada', 'chingado', 'pinche',
    'güey', 'wey', 'caraj', 'perr', 'zorra', 'zorr',
    
    // Chileno específico
    'weón', 'weon', 'weona', 'weá', 'wea', 'culiado', 'culiada', 'culiao', 'culia',
    'sacowea', 'sacohuea', 'sacoweas', 'conchetumare', 'conche tu mare', 'conchadetumadre', 'concha de tu madre',
    'aweonao', 'aweonado', 'aweonada', 'picao', 'picado', 'picada',
    'flaite', 'flaites', 'peazo', 'pelotudo', 'pelotuda', 'tarado', 'tarada',
    'huevón', 'huevona', 'reconchesumadre', 'reconchesumare',
    'culiáo', 'culiá', 'culeao', 'culea', 'naco', 'naca',
    'gil', 'giles', 'saco', 'sacos', 'penca', 'pencas',
    
    // Términos discriminatorios
    'maricón', 'marica', 'mariconada', 'tortillera', 'tortilleras',
    'negro', 'negra', 'neger', 'negr', 'indio', 'india', 'mapuche',
    'roto', 'rota', 'rotos', 'rotas', 'cuico', 'cuica', 'cuicos', 'cuicas',
    'pacos', 'paco', 'tira', 'tiras', 'yuta', 'yutas',
    
    // Amenazas y violencia
    'matar', 'asesinar', 'violar', 'violación', 'pegar', 'golpear',
    'romper', 'destruir', 'quemar', 'explotar', 'bomba', 'terrorista',
    'secuestrar', 'torturar', 'amenaza', 'amenazar', 'venganza',
    
    // Contenido sexual explícito
    'follar', 'coger', 'tirar', 'chupe', 'pico', 'pichula', 'tula',
    'tetas', 'pechos', 'vagina', 'pene', 'sexo oral', 'masturbación',
    'pornografía', 'porno', 'xxx', 'desnudo', 'desnuda',
    
    // Drogas
    'marihuana', 'cocaína', 'pasta base', 'copete', 'curado', 'curada',
    'borracho', 'borracha', 'drogadicto', 'drogadicta', 'farlopa',
    
    // Insultos políticos extremos
    'fascista', 'nazi', 'comunista de mierda', 'zurdo', 'facho', 'pinochetista',
    'allendista', 'terrorista', 'golpista', 'dictador', 'dictadura',
    
    // Términos que incitan al odio
    'odio', 'odiar', 'exterminar', 'eliminar', 'muerte a', 'mueran',
    'no sirven', 'basura', 'escoria', 'lacra', 'lacras'
  ];
  
  // Patrones regex para detectar variaciones y evasiones
  static patronesOfensivos = [
    // Variaciones con números y símbolos
    /p[u0@]t[a@4o0]/gi,
    /c[a@4]br[o0][n]/gi,
    /m[a@4]r[i1][c][o0][n]/gi,
    /we[o0]n[a@4]?/gi,
    /c[u@]l[i1][a@4][o0d][a@4]?/gi,
    /c[o0]nch[e3][t][u@][m][a@4]r[e3]/gi,
    /ctm|csm/gi,
    
    // Palabras separadas por espacios o símbolos
    /h\s*i\s*j\s*o\s*d\s*e\s*p\s*u\s*t\s*a/gi,
    /c\s*o\s*n\s*c\s*h\s*e\s*s\s*u\s*m\s*a\s*d\s*r\s*e/gi,
    /m\s*i\s*e\s*r\s*d\s*a/gi,
    
    // Insultos con asteriscos o guiones
    /p\*t\*|p-u-t-a|pu\*\*|p\*\*o/gi,
    /we\*n|we-on|w\*\*n/gi,
    /c\*\*o|c-u-l-o|cul\*\*/gi,
    
    // URLs o contenido inapropiado
    /xxx|porn|sex|fuck|shit/gi,
    
    // Amenazas directas
    /te\s+voy\s+a\s+(matar|pegar|romper)/gi,
    /muerte\s+a/gi,
    /mueran\s+(todos|las|los)/gi
  ];
  
  /**
   * Analiza un texto en busca de contenido ofensivo
   * @param {string} texto - El texto a analizar
   * @returns {object} Resultado del análisis
   */
  static analizarContenido(texto) {
    if (!texto || typeof texto !== 'string') {
      return {
        esOfensivo: false,
        nivel: 'limpio',
        palabrasDetectadas: [],
        patronesDetectados: [],
        requiereRevision: false
      };
    }
    
    const textoNormalizado = texto.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remover acentos
      .replace(/[^\w\s]/g, ' ') // Reemplazar símbolos por espacios
      .replace(/\s+/g, ' ') // Normalizar espacios
      .trim();
    
    const palabrasDetectadas = [];
    const patronesDetectados = [];
    
    // Verificar palabras ofensivas exactas
    this.palabrasOfensivas.forEach(palabra => {
      const regex = new RegExp(`\\b${palabra.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
      if (regex.test(textoNormalizado)) {
        palabrasDetectadas.push(palabra);
      }
    });
    
    // Verificar patrones ofensivos
    this.patronesOfensivos.forEach((patron, index) => {
      if (patron.test(textoNormalizado)) {
        patronesDetectados.push(`patron_${index + 1}`);
      }
    });
    
    const totalDetecciones = palabrasDetectadas.length + patronesDetectados.length;
    
    // Determinar nivel de ofensa
    let nivel = 'limpio';
    let requiereRevision = false;
    
    if (totalDetecciones > 0) {
      if (totalDetecciones >= 3) {
        nivel = 'muy_ofensivo';
        requiereRevision = true;
      } else if (totalDetecciones >= 2) {
        nivel = 'ofensivo';
        requiereRevision = true;
      } else {
        nivel = 'sospechoso';
        requiereRevision = true;
      }
    }
    
    return {
      esOfensivo: totalDetecciones > 0,
      nivel,
      palabrasDetectadas,
      patronesDetectados,
      requiereRevision,
      puntuacion: totalDetecciones,
      textoAnalizado: textoNormalizado.substring(0, 100) + (textoNormalizado.length > 100 ? '...' : '')
    };
  }
  
  /**
   * Censurar texto reemplazando palabras ofensivas con asteriscos
   * @param {string} texto - El texto a censurar
   * @returns {string} Texto censurado
   */
  static censurarTexto(texto) {
    if (!texto || typeof texto !== 'string') {
      return texto;
    }
    
    let textoCensurado = texto;
    
    // Censurar palabras exactas
    this.palabrasOfensivas.forEach(palabra => {
      const regex = new RegExp(`\\b${palabra.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
      textoCensurado = textoCensurado.replace(regex, (match) => {
        return '*'.repeat(match.length);
      });
    });
    
    // Censurar patrones
    this.patronesOfensivos.forEach(patron => {
      textoCensurado = textoCensurado.replace(patron, (match) => {
        return '*'.repeat(match.length);
      });
    });
    
    return textoCensurado;
  }
  
  /**
   * Obtener sugerencias de palabras alternativas
   * @param {Array} palabrasDetectadas - Palabras ofensivas detectadas
   * @returns {Array} Sugerencias de reemplazo
   */
  static obtenerSugerencias(palabrasDetectadas) {
    const sugerencias = {
      // Reemplazos comunes
      'puto': ['persona', 'individuo'],
      'puta': ['persona', 'individua'],
      'weón': ['persona', 'amigo'],
      'weon': ['persona', 'amigo'],
      'mierda': ['problema', 'cosa mala'],
      'carajo': ['demonios', 'rayos'],
      'culiao': ['persona', 'individuo'],
      'conchesumadre': ['por favor', 'rayos']
    };
    
    return palabrasDetectadas.map(palabra => ({
      original: palabra,
      sugerencias: sugerencias[palabra.toLowerCase()] || ['[palabra apropiada]']
    }));
  }
}

module.exports = ContentModerator;