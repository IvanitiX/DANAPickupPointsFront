<!-- LegalTerms.vue -->
<template>
  <div class="container mx-auto px-4 max-w-7xl my-4">
    <button @click="goBack" class="mb-4 text-blue-500 hover:underline">
      &larr; Volver
    </button>
    
    <h2 class="text-xl font-semibold text-red-600">Aviso Legal</h2>
    
    <section class="my-4">
      <h3 class="text-lg font-semibold text-red-600">Política de Privacidad de PuntosRecogidaDANA.es</h3>
      <p class="text-gray-600">
        Última actualización: <strong>06/11/2024</strong>
      </p>
      <p class="text-gray-600">
        En PuntosRecogidaDANA.es estamos comprometidos con la protección de tus datos personales y la transparencia sobre cómo se utilizan en nuestro portal. Esta Política de Privacidad describe cómo recolectamos, utilizamos, almacenamos y protegemos los datos personales en el contexto de nuestra plataforma de ayuda temporal a los afectados por la DANA.
      </p>
    </section>
    
    <section class="my-4">
      <h3 class="text-md font-semibold text-red-600">1. Responsable del Tratamiento de Datos</h3>
      <p class="text-gray-600">
        <strong>Nombres del responsable:</strong> Iván Valero<br />
        <strong>Contacto:</strong> mediante el formulario de contacto en nuestra web PuntosRecogidaDANA.es o <a href="mailto:puntosrecogidadana@protonmail.com" class="text-red-500">puntosrecogidadana@protonmail.com</a><br />
        <strong>Propósito del sitio:</strong> Ayuda temporal y sin fines de lucro para facilitar la localización de puntos de recogida para llevar a los afectados por la DANA en la región.
      </p>
    </section>

    <section class="my-4">
      <h3 class="text-md font-semibold text-red-600">2. Datos Personales que Recopilamos</h3>
      <p class="text-gray-600">
        Recopilamos los siguientes datos:
      </p>
      <ul class="list-disc pl-5 text-gray-600">
        <li><strong>Zona de ubicación (exacta):</strong> Se pedirá la calle, número, detalles de piso y puerta además del código postal.</li>
      </ul>
    </section>

    <section class="my-4">
      <h3 class="text-md font-semibold text-red-600">3. Finalidad y Base Legal del Tratamiento de Datos</h3>
      <p class="text-gray-600">
        La base legal para el tratamiento de los datos es el consentimiento del usuario al registrar una dirección en el portal. Los datos se utilizarán únicamente para centralizar los puntos de recogida  de ayuda temporal para los afectados por la DANA en la región. En caso de usarse para estadísticas futuras, los datos de estudio  se anonimizarán dejando únicamente  el código postal.
      </p>
    </section>

    <section class="my-4">
      <h3 class="text-md font-semibold text-red-600">4. Eliminación de Ofertas de Ayuda</h3>
      <p class="text-gray-600">
        Los usuarios pueden retirar un punto de recogida avisando a traves del mail <a href="mailto:puntosrecogidadana@protonmail.com" class="text-red-500">puntosrecogidadana@protonmail.com</a> o a través del botón "Reportar" en el detalle de  cada punto de recogida. Esta eliminación podrá demorarse unas 24/48h.

      </p>
    </section>

    <section class="my-4">
      <h3 class="text-md font-semibold text-red-600">5. Compartición de Datos</h3>
      <p class="text-gray-600">
        PuntosRecogidaDANA.es no podrá compartir de forma pública los datos con terceros para ningún fin comercial o de marketing. En caso de compartirse, previa discusión con el desarrollador, será para suplir de datos de puntos de recogida en condiciones similares a las de este Aviso Legal.
      </p>
    </section>

    <section class="my-4">
      <h3 class="text-md font-semibold text-red-600">6. Seguridad de los Datos</h3>
      <p class="text-gray-600">
        Empleamos medidas técnicas y organizativas para proteger en medida de lo posible los datos de accesos no autorizados.
      </p>
    </section>

    <section class="my-4">
      <h3 class="text-md font-semibold text-red-600">7. Derechos de los Usuarios</h3>
      <p class="text-gray-600">
        Los usuarios tienen derecho a solicitar una copia de las direcciones o eliminar esos datos en cualquier momento.
      </p>
    </section>

    <section class="my-4">
      <h3 class="text-md font-semibold text-red-600">8. Limitación de Responsabilidad</h3>
      <p class="text-gray-600">
        PuntosRecogidaDANA.es no se hace responsable del uso inapropiado de los datos personales que los usuarios hagan fuera del portal.
      </p>
    </section>

    <section class="my-4">
      <h3 class="text-md font-semibold text-red-600">9. Cambios en la Política de Privacidad</h3>
      <p class="text-gray-600">
        Nos reservamos el derecho de modificar esta Política de Privacidad en cualquier momento. Cualquier cambio será publicado en esta página con la fecha de la última actualización.
      </p>
    </section>

    <section class="my-4">
      <h3 class="text-md font-semibold text-red-600">Contacto</h3>
      <p class="text-gray-600">
        Si tienes alguna pregunta sobre esta Política de Privacidad, no dudes en contactarnos a través de nuestro correo electrónico: <a href="mailto:puntosrecogidadana@protonmail.com" class="text-red-500">puntosrecogidadana@protonmail.com</a>.
      </p>
    </section>
  </div>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router';

  const router = useRouter();

  const goBack = () => {
    router.go(-1); // Go back to the previous page
  };
</script>

<style scoped>
/* Add any specific styles for this component here */
</style>