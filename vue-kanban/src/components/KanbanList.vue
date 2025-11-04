<script setup>
import KanbanCard from './KanbanCard.vue'
import { useBoardStore } from '@/stores/boardStore' 
import { ref } from 'vue' 

const boardStore = useBoardStore()

const props = defineProps({
  listId: { /* ... */ },
  listTitle: { /* ... */ },
  cards: { /* ... */ }
})

const isDraggingOver = ref(false)
// ESTADOS NUEVOS para el formulario
const isAddingCard = ref(false) // Controla si el formulario es visible
const newCardTitle = ref('') // Almacena el título de la nueva tarjeta

// ---------------- LÓGICA DE AÑADIR TARJETA ----------------
function handleAddCard() {
  if (newCardTitle.value.trim() === '') {
    // No añadir si el campo está vacío
    return
  }

  // 1. Llama a la acción de Pinia para agregar la tarjeta
  boardStore.addCard(props.listId, newCardTitle.value.trim())

  // 2. Limpia el formulario y lo oculta
  newCardTitle.value = ''
  isAddingCard.value = false
}

function closeForm() {
  isAddingCard.value = false
  newCardTitle.value = ''
}
// ---------------- DRAG AND DROP HANDLERS (Iguales) ----------------
// ... (handleDragOver, handleDragLeave, handleDrop) ...
function handleDragOver(event) {
  event.preventDefault()
  isDraggingOver.value = true 
}

function handleDragLeave() {
  isDraggingOver.value = false
}

function handleDrop(event) {
  event.preventDefault()
  isDraggingOver.value = false 

  const cardId = event.dataTransfer.getData('cardId')
  const sourceListId = event.dataTransfer.getData('sourceListId') 

  const destinationListId = props.listId
  const newIndex = props.cards.length 

  if (cardId) {
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
      
      <div v-if="isAddingCard" class="add-card-form">
        <textarea
          v-model="newCardTitle"
          placeholder="Introduce un título para esta tarjeta..."
          rows="3"
          autofocus
          @keyup.enter.prevent="handleAddCard"
        ></textarea>
        <div class="form-actions">
          <button @click="handleAddCard" class="btn-primary">Añadir tarjeta</button>
          <button @click="closeForm" class="btn-close">X</button>
        </div>
      </div>

      <button v-else @click="isAddingCard = true" class="add-card-btn">
        + Añadir una tarjeta
      </button>
      
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

/* ESTILOS PARA EL FORMULARIO */
.add-card-form {
  padding: 8px 0;
}
.add-card-form textarea {
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 8px;
  resize: none;
  box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
}
.form-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 5px;
}
.btn-primary {
  background-color: #5aac44;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 3px;
  cursor: pointer;
  font-weight: bold;
}
.btn-primary:hover {
  background-color: #61bd4f;
}
.btn-close {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #5e6c84;
}
</style>