// src/data/blogPosts.js
import React from 'react';

export const blogPosts = [
  {
    slug: 'revolucion-digital-ia-estado',
    title: 'La Revolución Digital: Cómo la IA transformará el Estado Chileno',
    description: 'Análisis profundo de la propuesta de automatización del estado con IA, detallando los ahorros, la eficiencia y el impacto en la vida de los ciudadanos.',
    summary: 'Nuestra propuesta de modernización del Estado no es ciencia ficción. Es un plan concreto para terminar con la burocracia, ahorrar miles de millones y ofrecer servicios dignos a todos los chilenos, 24/7. Aquí te explicamos cómo lo haremos.',
    author: 'Juan Pablo Melinao González',
    date: '2025-07-15',
    content: () => (
      <>
        <p className="mb-4">La modernización del Estado es una promesa que los chilenos han escuchado por décadas, con pocos resultados. La tecnología de hoy, específicamente la Inteligencia Artificial, nos permite dar un salto cuántico. No se trata de reemplazar personas, sino de potenciar sus capacidades y liberar recursos para donde más se necesitan: salud, educación y seguridad.</p>
        <h3 className="text-2xl font-bold mt-6 mb-3 text-blue-400">El Plan en Detalle</h3>
        <p className="mb-4">Nuestra propuesta se centra en tres pilares:</p>
        <ul className="list-disc list-inside mb-4 pl-4">
          <li><strong>Plataforma Única de Trámites:</strong> Un solo lugar para todas tus necesidades, desde sacar un certificado de nacimiento hasta iniciar una empresa. Con validación biométrica, seguro y accesible desde cualquier celular.</li>
          <li><strong>IA para la Eficiencia Fiscal:</strong> Sistemas inteligentes que auditen en tiempo real el gasto público, detecten fraudes y optimicen la asignación de recursos. El ahorro estimado es de $500 mil millones anuales.</li>
          <li><strong>Capacitación y Reconversión:</strong> Invertiremos en nuestros funcionarios públicos, capacitándolos en las nuevas herramientas digitales para que puedan realizar labores de mayor valor y mejorar la atención ciudadana.</li>
        </ul>
        <p>Este no es un proyecto a largo plazo, es una revolución que comenzará el primer día de nuestro gobierno.</p>
      </>
    ),
    tags: ['IA', 'Modernización', 'Estado Digital', 'Tecnología'],
  },
  {
    slug: 'justicia-social-deuda-historica-profesores',
    title: 'Justicia Social Real: Saldando la Deuda Histórica con nuestros Profesores',
    description: 'La deuda histórica con los profesores es una herida abierta en Chile. Explicamos nuestro plan para pagarla y dignificar la labor docente de una vez por todas.',
    summary: 'No podemos construir un futuro próspero sobre una base de injusticia. Nuestro compromiso con los profesores es total. Anunciamos un plan de pago directo y la dignificación de la carrera docente como pilar de nuestro programa.',
    author: 'Equipo de Campaña',
    date: '2025-07-10',
    content: () => (
      <>
        <p className="mb-4">Durante años, se ha hablado de la "deuda histórica" como un problema sin solución. Nosotros creemos que la solución es simple: voluntad política y justicia. Nuestro plan contempla el pago de $4.5 millones a cada uno de los 57,000 profesores afectados.</p>
        <h3 className="text-2xl font-bold mt-6 mb-3 text-blue-400">¿De Dónde Saldrán los Fondos?</h3>
        <p className="mb-4">La transparencia es clave. Los fondos provendrán de dos fuentes principales:</p>
        <ul className="list-disc list-inside mb-4 pl-4">
          <li><strong>Eliminación de Privilegios Políticos:</strong> Terminaremos con los sueldos vitalicios y gastos reservados innecesarios, generando un ahorro sustancial.</li>
          <li><strong>Impuesto a los Súper Ricos y Grandes Empresas:</strong> Una reforma tributaria justa que asegure que quienes más tienen, más contribuyan al desarrollo del país.</li>
        </ul>
        <p>Pagar esta deuda no es un gasto, es una inversión en la dignidad de quienes forman a las futuras generaciones de Chile.</p>
      </>
    ),
    tags: ['Justicia Social', 'Educación', 'Deuda Histórica', 'Profesores'],
  },
];
