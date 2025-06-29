const http = require('http');
const createHandler = require('github-webhook-handler');
const { exec } = require('child_process');

const handler = createHandler({ path: '/webhook', secret: 'oy+CeSGoXao5+kTc3sfqRtbDEJRIgDXrhjgW9D1XiCIpIiI0kVEru4dhSqX3VMHrzKYzbuKSoRHxULydet7yrQ' });

http.createServer((req, res) => {
  handler(req, res, (err) => {
    res.statusCode = 404;
    res.end('Webhook not found');
  });
}).listen(7777);

handler.on('error', (err) => {
  console.error('Webhook Error:', err.message);
});

handler.on('push', (event) => {
  console.log('🔄 Push recibido en:', event.payload.repository.name);
  console.log('🌿 Branch:', event.payload.ref);
  
  if (event.payload.ref === 'refs/heads/main') {
    console.log('🚀 Ejecutando deployment automático...');
    
    exec('/root/application/deploy.sh', (error, stdout, stderr) => {
      if (error) {
        console.error(`❌ Error en deployment: ${error}`);
        return;
      }
      console.log(`✅ Deployment exitoso:\n${stdout}`);
      if (stderr) console.error(`Warnings:\n${stderr}`);
    });
  } else {
    console.log('ℹ️ Push ignorado (no es branch main)');
  }
});

console.log('🎣 Webhook server ejecutándose en puerto 7777');
console.log('📡 Escuchando eventos de GitHub...');
