<script setup>
const props = defineProps({
  // Objeto completo de la tarjeta (contiene id, title, description, etc.)
  card: {
    type: Object,
    required: true
  },
  // ID de la lista que contiene esta tarjeta (necesario para el drop en otra lista)
  sourceListId: { 
    type: String,
    required: true
  }
})

function handleDragStart(event) {
  // CLAVE: Cuando el arrastre comienza, guardamos los datos necesarios
  
  // 1. Guardar el ID de la tarjeta que se mueve
  event.dataTransfer.setData('cardId', props.card.id)
  
  // 2. Guardar el ID de la lista de donde salió (origen)
  event.dataTransfer.setData('sourceListId', props.sourceListId)
  
  // Opcional: Establecer un efecto visual para el arrastre
  event.dataTransfer.effectAllowed = 'move' 
  
  // Opcional: Añadir una clase para hacer el "ghost" de la tarjeta semitransparente
  // No lo hacemos aquí para mantenerlo simple, pero es una buena práctica de UX.
}
</script>

<template>
  <div 
    class="kanban-card"
    :draggable="true" 
    @dragstart="handleDragStart($event)"
  >
    <h4>{{ card.title }}</h4> 
  </div>
</template>

<style scoped>
.kanban-card {
  background-color: white;
  padding: 10px;
  border-radius: 3px;
  margin-bottom: 6px;
  cursor: grab; /* Indica que es arrastrable */
  box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
  transition: all 0.2s ease;
}

.kanban-card:hover {
    background-color: #f4f5f7;
}

/* Estilo que se aplica cuando la tarjeta está siendo arrastrada */
.kanban-card:active {
    cursor: grabbing;
}
</style>