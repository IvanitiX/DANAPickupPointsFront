<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue';
import type { PickupPoint } from '../types/pickup';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const props = withDefaults(defineProps<{
  pickupPoints: PickupPoint[];
  center?: [number, number];
  zoom?: number;
}>(), {
  pickupPoints: () => [],
});

const mapContainer = ref<HTMLElement | null>(null);
let map: L.Map | null = null;

onMounted(() => {
  if (mapContainer.value) {
    // Center of Madrid: 40.4168, -3.7038
    // Zoom level 6 shows all of Spain
    const defaultCenter: [number, number] = [40.4168, -3.7038];
    const defaultZoom = 6;

    map = L.map(mapContainer.value).setView(
      props.center || defaultCenter,
      props.zoom || defaultZoom
    );

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    addMarkers();
  }
});

watch(() => props.pickupPoints, addMarkers, { deep: true });

function formatTimetables(timetables: PickupPoint['timetables']) {
  return timetables.map(timetable => {
    const startDate = new Date(timetable.start_date).toLocaleDateString('es-ES');
    const endDate = new Date(timetable.end_date).toLocaleDateString('es-ES');
    const times = timetable.times.map(time => 
      `${time.start_hour.slice(0, 5)} - ${time.end_hour.slice(0, 5)}`
    ).join('<br>');
    
    return `
      <div class="mb-2">
        <strong>${startDate} - ${endDate}</strong><br>
        ${times}
      </div>
    `;
  }).join('');
}

function addMarkers() {
  if (!map || !props.pickupPoints) return;
  
  // Clear existing markers
  map.eachLayer((layer) => {
    if (layer instanceof L.Marker) {
      map?.removeLayer(layer);
    }
  });

  const bounds = L.latLngBounds(); // Create a bounds object

  props.pickupPoints.forEach(point => {
    if (point.latitude && point.longitude) {
      const marker = L.marker([point.latitude, point.longitude])
        .bindPopup(`
          <div class="min-w-[200px]">
            <h3 class="font-bold text-lg mb-1">${point.name}</h3>
            <p class="mb-2">
              ${point.street} ${point.number}<br>
              ${point.town_data?.name}<br>
              GPS: (${point.latitude},${point.longitude})
            </p>
            <div class="text-sm">
              <strong>Horarios:</strong><br>
              ${formatTimetables(point.timetables)}
            </div>
            <a href="/pickup/${point.id}" class="text-red-600">
              Más info
            </a>
          </div>
        `, {
          maxWidth: 300
        })
        .addTo(map!);

      // Extend bounds to include this marker's position
      bounds.extend([point.latitude, point.longitude]);
    }
  });

  // If there are multiple points, fit the map to the bounds
  if (props.pickupPoints.length > 1) {
    map.fitBounds(bounds);
  } else if (props.pickupPoints.length === 1 && props.pickupPoints[0].latitude && props.pickupPoints[0].longitude) {
    // If it's a single point, center and zoom to it
    map.setView(
      [props.pickupPoints[0].latitude, props.pickupPoints[0].longitude],
      15
    );
  }
}

onUnmounted(() => {
  if (map) {
    map.remove();
  }
});
</script>

<template>
  <div ref="mapContainer" class="h-full w-full rounded-lg shadow-lg"></div>
</template>