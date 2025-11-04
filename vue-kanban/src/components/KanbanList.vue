<script setup>
import KanbanCard from './KanbanCard.vue'
import { useBoardStore } from '@/stores/boardStore' 
import { ref } from 'vue' 

const boardStore = useBoardStore()

const props = defineProps({
  // NUEVA: ID de la lista, crucial para el manejo de estado en Pinia
  listId: {
    type: String,
    required: true
  },
  listTitle: {
    type: String,
    required: true
  },
  cards: {
    type: Array,
    default: () => []
  }
})

// Estado local para mostrar un borde cuando se arrastra sobre la lista (indicador visual)
const isDraggingOver = ref(false)


// ---------------- DRAG AND DROP HANDLERS ----------------

// 1. Permite soltar elementos sobre esta lista
function handleDragOver(event) {
  event.preventDefault()
  isDraggingOver.value = true // Activa el indicador visual
}

// 2. Limpia el indicador visual
function handleDragLeave() {
  isDraggingOver.value = false
}

// 3. Lógica de soltar la tarjeta
function handleDrop(event) {
  event.preventDefault()
  isDraggingOver.value = false // Desactiva el indicador visual

  // Recuperar los datos guardados en KanbanCard.vue
  const cardId = event.dataTransfer.getData('cardId')
  const sourceListId = event.dataTransfer.getData('sourceListId') 

  const destinationListId = props.listId // El ID de la lista actual (destino)

  // Lógica de índice: para simplificar la primera implementación, se coloca al final
  const newIndex = props.cards.length 

  if (cardId) {
    // Llamar a la acción de Pinia para mover el dato real
    boardStore.moveCard(cardId, sourceListId, destinationListId, newIndex)
  }
}
</script>

<template>
  <div 
    class="list-container"
    
    @dragover="handleDragOver"
    @dragleave="handleDragLeave"
    @drop="handleDrop"
  
    :class="{ 'drag-over': isDraggingOver }"
  >
    <header>
      <h3>{{ listTitle }} ({{ cards.length }})</h3>
    </header>
    <div class="cards-wrapper">
      <KanbanCard 
        v-for="card in cards" 
        :key="card.id" 
        :card="card"
        :sourceListId="listId" 
      />
      <button class="add-card-btn">+ Añadir una tarjeta</button>
    </div>
  </div>
</template>

<style scoped>
.list-container {
  background-color: #ebecf0;
  width: 300px;
  margin: 10px;
  border-radius: 3px;
  padding: 8px;
  flex-shrink: 0;
  transition: all 0.2s; /* Para la transición del borde 'drag-over' */
}
/* Estilo para indicar que esta lista está lista para recibir el drop */
.drag-over {
    border: 2px dashed #a0aec0; 
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

header h3 {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
}
.cards-wrapper {
  /* Estilos para el área donde caen las tarjetas */
  min-height: 10px; 
}
.add-card-btn {
  width: 100%;
  padding: 8px 10px;
  border: none;
  background-color: transparent;
  text-align: left;
  cursor: pointer;
  color: #5e6c84;
}
.add-card-btn:hover {
  background-color: #dcdfe4;
}
</style>