<script setup>
import { RouterLink } from 'vue-router' // ⬅️ ¡Importante para la navegación!

const props = defineProps({
  // Objeto completo de la tarjeta
  card: {
    type: Object,
    required: true
  },
  // ID de la lista que contiene esta tarjeta
  sourceListId: { 
    type: String,
    required: true
  }
})

// Función que se ejecuta cuando el usuario empieza a arrastrar la tarjeta
function handleDragStart(event) {
  // CLAVE para el Drag and Drop: guardamos los IDs en el DataTransfer
  
  // 1. Guardar el ID de la tarjeta que se mueve
  event.dataTransfer.setData('cardId', props.card.id)
  
  // 2. Guardar el ID de la lista de donde salió (origen)
  event.dataTransfer.setData('sourceListId', props.sourceListId)
  
  // Opcional: Establecer un efecto visual para el arrastre
  event.dataTransfer.effectAllowed = 'move' 
  
  // El RouterLink intenta navegar al hacer clic. 
  // Cuando se arrastra, este 'dragstart' a veces interfiere con la navegación.
  // Una práctica avanzada sería añadir lógica para diferenciar arrastre de clic, 
  // pero para este proyecto, el dragstart ya domina al clic.
}
</script>

<template>
  <RouterLink 
    :to="{ name: 'cardDetail', params: { id: card.id } }"
    class="kanban-card-link"
    :draggable="true" 
    @dragstart="handleDragStart($event)"
  >
    <h4>{{ card.title }}</h4> 
  </RouterLink>
</template>

<style scoped>
/* Estilos para aplicar a RouterLink */
.kanban-card-link {
  display: block; /* Para que ocupe todo el ancho y no sea un elemento inline */
  text-decoration: none; /* Quitar subrayado de enlace */
  color: #172b4d; /* Color de texto estándar */
  background-color: white;
  padding: 10px;
  border-radius: 3px;
  margin-bottom: 6px;
  cursor: grab; /* Indica que es arrastrable y clickeable */
  box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
  transition: all 0.2s ease;
}

.kanban-card-link:hover {
    background-color: #f4f5f7;
}

/* Estilo que se aplica cuando la tarjeta está siendo arrastrada */
.kanban-card-link:active {
    cursor: grabbing;
}
</style>