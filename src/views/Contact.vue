<template>
  <div class="container mx-auto px-4 max-w-2xl my-8">
    <button @click="goBack" class="mb-4 text-blue-500 hover:underline">
      &larr; Volver
    </button>

    <h2 class="text-2xl font-semibold mb-4 text-red-600">Contacto</h2>
    <p class="text-gray-600 mb-6">
      Si tienes alguna pregunta o comentario, por favor completa el siguiente formulario y nos pondremos en contacto contigo a la brevedad.
    </p>
    
    <form @submit.prevent="sendEmail" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div class="mb-4">
        <label for="name" class="block text-gray-700 font-medium">Nombre:</label>
        <input
          type="text"
          id="name"
          v-model="form.name"
          required
          class="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div class="mb-4">
        <label for="email" class="block text-gray-700 font-medium">Correo Electrónico:</label>
        <input
          type="email"
          id="email"
          v-model="form.email"
          required
          class="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div class="mb-4">
        <label for="message" class="block text-gray-700 font-medium">Mensaje:</label>
        <textarea
          id="message"
          v-model="form.message"
          required
          class="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="4"
        ></textarea>
      </div>
      <button
        type="submit"
        class="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
      >
        Enviar
      </button>
      <p v-if="submissionStatus" class="mt-4 text-center text-green-600">{{ submissionStatus }}</p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const form = ref({
  name: '',
  email: '',
  message: ''
});

const submissionStatus = ref('');
const router = useRouter();

const sendEmail = () => {
  const { name, email, message } = form.value;
  const mailtoLink = `mailto:ayudadana24@gmail.com?subject=Contacto desde el sitio web&body=Nombre: ${encodeURIComponent(name)}%0D%0ACorreo: ${encodeURIComponent(email)}%0D%0AMensaje: ${encodeURIComponent(message)}`;
  window.location.href = mailtoLink;

  // Reset the form
  form.value.name = '';
  form.value.email = '';
  form.value.message = '';
  
  // Update submission status
  submissionStatus.value = '¡Mensaje enviado con éxito!';
  
  // Clear the status after a short delay
  setTimeout(() => {
    submissionStatus.value = '';
  }, 3000);
};

const goBack = () => {
  router.go(-1); // Go back to the previous page
};
</script>

<style scoped>
/* Add any specific styles for this component here */
</style>