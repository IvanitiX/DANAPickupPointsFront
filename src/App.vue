<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router';
import 'leaflet/dist/leaflet.css';
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <nav class="bg-red-600 shadow-md">
      <div class="container mx-auto px-4 max-w-7xl">
        <div class="flex justify-between h-16 items-center">
          <RouterLink to="/" class="text-xl font-bold text-white">Puntos de Recogida - DANA Valencia '24</RouterLink>
          <RouterLink 
            to="/pickup/create"
            class="bg-white text-red-600 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            Crear Nuevo
          </RouterLink>
        </div>
      </div>
    </nav>

    <div class="container mx-auto px-4 max-w-7xl">
      <RouterView />
    </div>

    <footer class="bg-gray-800 text-white py-4">
      <div class="container mx-auto text-center">
        Hecho con &hearts; y algo de IA por <a href="http://x.com/IvanInVR">@IvanInVR</a> | 
        <RouterLink to="/legal" class="text-white underline">Aviso Legal</RouterLink> |
        <RouterLink to="/contact" class="text-white underline">Contacto</RouterLink> |
        Icono por <a href="http://iconos8.es">Icons8</a> 
      </div>
    </footer>
  </div>
</template>