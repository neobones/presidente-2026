# Guía de Configuración n8n para API de Noticias

## Configuración Inicial

### 1. Variables de Entorno
Asegúrate de tener configurada la variable de entorno `N8N_API_KEY` en tu archivo `.env`:

```bash
# API Key para n8n (cambiar por una clave segura)
N8N_API_KEY=tu-api-key-super-secreta-aqui
```

### 2. Endpoints Disponibles

#### Crear Artículos/Noticias
- **URL**: `https://melinao2026.cl/api/n8n/articles`
- **Método**: `POST`
- **Headers**: 
  - `Content-Type: application/json`
  - `X-API-Key: tu-api-key-super-secreta-aqui`

#### Crear Consultas Ciudadanas
- **URL**: `https://melinao2026.cl/api/n8n/webhook`
- **Método**: `POST`
- **Headers**: 
  - `Content-Type: application/json`
  - `X-API-Key: tu-api-key-super-secreta-aqui`

## Configuración n8n - Workflow para Noticias

### Paso 1: Crear Workflow Base
1. Abre n8n y crea un nuevo workflow
2. Nombra el workflow: "Publicar Noticias Melinao 2026"

### Paso 2: Nodo Trigger
**Tipo**: Manual Trigger o Webhook
- Si usas Manual Trigger, podrás ejecutar manualmente
- Si usas Webhook, n8n te dará una URL para recibir datos externos

### Paso 3: Nodo de Procesamiento de Datos
**Tipo**: Function o Set
- Procesa y valida los datos de entrada
- Genera slug automáticamente si es necesario

```javascript
// Ejemplo de función para generar slug
function generateSlug(title) {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Procesar datos
const title = $input.first().json.title;
const slug = generateSlug(title);
const summary = $input.first().json.summary;
const content = $input.first().json.content;

return {
  title,
  slug,
  summary,
  content,
  author: 'Equipo de Campaña',
  tags: $input.first().json.tags || [],
  status: 'published',
  date: new Date().toISOString()
};
```

### Paso 4: Nodo HTTP Request
**Configuración**:
- **URL**: `https://melinao2026.cl/api/n8n/articles`
- **Método**: `POST`
- **Headers**:
  ```json
  {
    "Content-Type": "application/json",
    "X-API-Key": "tu-api-key-super-secreta-aqui"
  }
  ```
- **Body**: `{{ $json }}`

### Paso 5: Nodo de Manejo de Respuesta
**Tipo**: Set o Function
- Procesa la respuesta del servidor
- Maneja errores si es necesario

```javascript
// Ejemplo de manejo de respuesta
const response = $input.first().json;

if (response.success) {
  return {
    status: 'success',
    message: 'Artículo publicado exitosamente',
    article_id: response.data.id,
    url: `https://melinao2026.cl/noticias/${response.data.slug}`
  };
} else {
  return {
    status: 'error',
    message: response.error || 'Error desconocido'
  };
}
```

## Estructura de Datos para Artículos

### Campos Requeridos
```json
{
  "title": "Título del artículo",
  "slug": "titulo-del-articulo",
  "summary": "Resumen corto del artículo",
  "content": "Contenido completo del artículo en HTML"
}
```

### Campos Opcionales
```json
{
  "author": "Nombre del autor",
  "tags": ["tag1", "tag2", "tag3"],
  "status": "published",
  "date": "2024-01-15T10:30:00Z"
}
```

## Ejemplos de Uso

### Ejemplo 1: Artículo Simple
```json
{
  "title": "Nueva Propuesta de Reforma Tecnológica",
  "slug": "nueva-propuesta-reforma-tecnologica",
  "summary": "Juan Pablo Melinao presenta su plan para modernizar el Estado con inteligencia artificial.",
  "content": "<p>En una conferencia de prensa realizada hoy en Santiago, Juan Pablo Melinao González presentó su propuesta integral para la modernización del Estado chileno mediante el uso de inteligencia artificial...</p>",
  "author": "Equipo de Campaña",
  "tags": ["tecnología", "reforma", "inteligencia artificial", "estado"],
  "status": "published"
}
```

### Ejemplo 2: Artículo con Fecha Específica
```json
{
  "title": "Melinao se Reúne con Líderes Mapuche en Temuco",
  "slug": "melinao-reunion-lideres-mapuche-temuco",
  "summary": "El candidato presidencial dialoga sobre desarrollo y unidad nacional en La Araucanía.",
  "content": "<p>En una histórica reunión realizada en Temuco, Juan Pablo Melinao González, candidato presidencial independiente, se encontró con importantes líderes mapuche para discutir propuestas de desarrollo...</p>",
  "author": "Corresponsal Araucanía",
  "tags": ["mapuche", "araucanía", "unidad", "desarrollo"],
  "status": "published",
  "date": "2024-01-20T14:00:00Z"
}
```

## Validaciones y Errores

### Errores Comunes
1. **401 Unauthorized**: API Key incorrecta o faltante
2. **400 Bad Request**: Campos requeridos faltantes
3. **409 Conflict**: Slug ya existe (debe ser único)
4. **500 Internal Server Error**: Error interno del servidor

### Validaciones Automáticas
- **title**: Mínimo 1 carácter, máximo 200
- **slug**: Único, solo letras, números y guiones
- **summary**: Mínimo 10 caracteres, máximo 500
- **content**: Mínimo 50 caracteres
- **tags**: Array de strings, máximo 10 tags
- **status**: Solo "published" o "draft"

## Configuración Avanzada

### Integración con CMS Externo
Si usas un CMS como WordPress, Strapi, etc., puedes configurar webhooks que envíen datos a n8n cuando publiques contenido.

### Programación Automática
Usa el nodo **Cron** en n8n para publicar artículos automáticamente:
```
0 9 * * 1-5  # Lunes a viernes a las 9:00 AM
```

### Notificaciones
Agrega nodos para enviar notificaciones cuando se publique un artículo:
- **Slack**: Notifica al equipo
- **Email**: Envía resumen al equipo
- **Discord**: Notifica en canal de campaña

## Troubleshooting

### Problema: API Key no funciona
**Solución**: Verifica que la variable `N8N_API_KEY` esté correctamente configurada en el archivo `.env` del servidor.

### Problema: Slug duplicado
**Solución**: Genera un slug único agregando timestamp o número incremental.

### Problema: Contenido no se muestra
**Solución**: Verifica que el campo `status` esté en "published" y que el contenido sea HTML válido.

## Seguridad

### Mejores Prácticas
1. **API Key segura**: Usa una clave larga y aleatoria
2. **HTTPS**: Siempre usa conexiones seguras
3. **Rate Limiting**: El servidor limita 5 requests por 15 minutos
4. **Validación**: Todos los campos son validados en el servidor
5. **Logs**: Mantén logs para auditoria (sin exponer datos sensibles)

## Monitoreo

### Métricas a Monitorear
- Artículos publicados por día
- Errores en la API
- Tiempo de respuesta
- Uso de bandwidth

### Logs Importantes
- Creación exitosa de artículos
- Errores de validación
- Intentos de acceso no autorizados

---

**Contacto**: Para soporte técnico, contacta al equipo de desarrollo en `tech@melinao2026.cl`