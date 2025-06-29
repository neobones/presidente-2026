import Swal from 'sweetalert2';

/**
 * Servicio genérico de alertas usando SweetAlert2
 * Proporciona métodos unificados para mostrar diferentes tipos de alertas
 */
class AlertService {
  
  /**
   * Configuración por defecto para todas las alertas
   */
  static defaultConfig = {
    customClass: {
      popup: 'rounded-2xl',
      title: 'text-gray-800 font-bold',
      content: 'text-gray-600',
      confirmButton: 'bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-xl transition-colors duration-200 mr-2',
      cancelButton: 'bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-xl transition-colors duration-200',
      denyButton: 'bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-xl transition-colors duration-200'
    },
    buttonsStyling: false,
    reverseButtons: true,
    allowOutsideClick: false,
    allowEscapeKey: true
  };

  /**
   * Alerta de éxito
   */
  static success(title, text = '', options = {}) {
    return Swal.fire({
      ...this.defaultConfig,
      icon: 'success',
      title,
      text,
      iconColor: '#10B981',
      confirmButtonText: 'Entendido',
      timer: options.autoClose ? 3000 : undefined,
      timerProgressBar: options.autoClose,
      ...options
    });
  }

  /**
   * Alerta de error
   */
  static error(title, text = '', options = {}) {
    return Swal.fire({
      ...this.defaultConfig,
      icon: 'error',
      title,
      text,
      iconColor: '#EF4444',
      confirmButtonText: 'Entendido',
      ...options
    });
  }

  /**
   * Alerta de advertencia
   */
  static warning(title, text = '', options = {}) {
    return Swal.fire({
      ...this.defaultConfig,
      icon: 'warning',
      title,
      text,
      iconColor: '#F59E0B',
      confirmButtonText: 'Entendido',
      ...options
    });
  }

  /**
   * Alerta informativa
   */
  static info(title, text = '', options = {}) {
    return Swal.fire({
      ...this.defaultConfig,
      icon: 'info',
      title,
      text,
      iconColor: '#3B82F6',
      confirmButtonText: 'Entendido',
      ...options
    });
  }

  /**
   * Diálogo de confirmación
   */
  static confirm(title, text = '', options = {}) {
    return Swal.fire({
      ...this.defaultConfig,
      icon: 'question',
      title,
      text,
      iconColor: '#8B5CF6',
      showCancelButton: true,
      confirmButtonText: options.confirmText || 'Confirmar',
      cancelButtonText: options.cancelText || 'Cancelar',
      ...options
    });
  }

  /**
   * Diálogo con tres opciones (Sí, No, Cancelar)
   */
  static threeWay(title, text = '', options = {}) {
    return Swal.fire({
      ...this.defaultConfig,
      icon: 'question',
      title,
      text,
      iconColor: '#8B5CF6',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: options.confirmText || 'Sí',
      denyButtonText: options.denyText || 'No',
      cancelButtonText: options.cancelText || 'Cancelar',
      ...options
    });
  }

  /**
   * Alerta de carga/procesamiento
   */
  static loading(title = 'Procesando...', text = '') {
    return Swal.fire({
      ...this.defaultConfig,
      title,
      text,
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
  }

  /**
   * Input de texto personalizado
   */
  static input(title, options = {}) {
    return Swal.fire({
      ...this.defaultConfig,
      title,
      input: 'text',
      inputPlaceholder: options.placeholder || 'Escribe aquí...',
      inputValidator: options.validator || null,
      showCancelButton: true,
      confirmButtonText: options.confirmText || 'Enviar',
      cancelButtonText: options.cancelText || 'Cancelar',
      inputAttributes: {
        maxlength: options.maxLength || 500,
        class: 'rounded-lg border border-gray-300 px-3 py-2 w-full'
      },
      ...options
    });
  }

  /**
   * Textarea personalizado
   */
  static textarea(title, options = {}) {
    return Swal.fire({
      ...this.defaultConfig,
      title,
      input: 'textarea',
      inputPlaceholder: options.placeholder || 'Escribe tu mensaje aquí...',
      inputValidator: options.validator || null,
      showCancelButton: true,
      confirmButtonText: options.confirmText || 'Enviar',
      cancelButtonText: options.cancelText || 'Cancelar',
      inputAttributes: {
        maxlength: options.maxLength || 1000,
        rows: options.rows || 4,
        class: 'rounded-lg border border-gray-300 px-3 py-2 w-full resize-none'
      },
      ...options
    });
  }

  /**
   * Toast notification (notificación discreta)
   */
  static toast(type, title, options = {}) {
    const Toast = Swal.mixin({
      toast: true,
      position: options.position || 'top-end',
      showConfirmButton: false,
      timer: options.timer || 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });

    return Toast.fire({
      icon: type,
      title,
      ...options
    });
  }

  /**
   * Cerrar cualquier alerta activa
   */
  static close() {
    Swal.close();
  }

  /**
   * Métodos específicos para la aplicación
   */

  /**
   * Confirmación para reportar contenido
   */
  static confirmReport() {
    return this.textarea(
      '¿Por qué deseas reportar este contenido?',
      {
        placeholder: 'Describe el motivo del reporte...\n\n• Contenido inapropiado\n• Spam\n• Información falsa\n• Otro motivo',
        confirmText: 'Enviar Reporte',
        cancelText: 'Cancelar',
        validator: (value) => {
          if (!value || value.trim().length < 10) {
            return 'Por favor, describe el motivo del reporte (mínimo 10 caracteres)';
          }
        },
        maxLength: 500
      }
    );
  }

  /**
   * Confirmación para enviar consulta
   */
  static confirmConsultation() {
    return this.confirm(
      '¿Enviar consulta ciudadana?',
      'Tu consulta será revisada por nuestro equipo y podrá ser utilizada para mejorar las propuestas de campaña.',
      {
        confirmText: 'Enviar Consulta',
        cancelText: 'Revisar'
      }
    );
  }

  /**
   * Notificación de sesión expirada
   */
  static sessionExpired() {
    return this.warning(
      'Sesión Expirada',
      'Tu sesión ha expirado. Por favor, inicia sesión nuevamente para continuar.',
      {
        confirmText: 'Iniciar Sesión'
      }
    );
  }

  /**
   * Éxito al enviar consulta
   */
  static consultationSuccess() {
    return this.success(
      '¡Consulta Enviada!',
      'Gracias por tu participación. Tu consulta será revisada por nuestro equipo de campaña.',
      {
        confirmText: 'Continuar',
        autoClose: true
      }
    );
  }

  /**
   * Error de red/servidor
   */
  static networkError() {
    return this.error(
      'Error de Conexión',
      'No se pudo conectar con el servidor. Por favor, verifica tu conexión a internet e inténtalo nuevamente.',
      {
        confirmText: 'Reintentar'
      }
    );
  }
}

export default AlertService;