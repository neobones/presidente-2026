// Utilidades de formateo para localización chilena
// Formato chileno: puntos para miles, comas para decimales

// Formato chileno para números enteros
export const formatChileanNumber = (number) => {
  return new Intl.NumberFormat('es-CL').format(number);
};

// Formato chileno para moneda (pesos chilenos)
export const formatChileanCurrency = (number) => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0
  }).format(number);
};

// Formato simplificado para pesos chilenos (ej: $900.000)
export const formatSimpleCurrency = (number) => {
  return '$' + new Intl.NumberFormat('es-CL').format(number);
};

// Formato para porcentajes chilenos
export const formatChileanPercentage = (number, decimals = 1) => {
  return new Intl.NumberFormat('es-CL', {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(number / 100);
};

// Formato para números con decimales específicos
export const formatChileanDecimal = (number, decimals = 1) => {
  return new Intl.NumberFormat('es-CL', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(number);
};