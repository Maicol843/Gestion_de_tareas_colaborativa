// src/stores/boardStore.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

// --- MOCK DATA (Datos Iniciales Estáticos) ---
const mockLists = [
  {
    id: 'list-1',
    title: 'To Do',
    cards: [
      { id: 'card-1', title: 'Diseñar componentes básicos', description: 'Crear KanbanList y KanbanCard.' },
      { id: 'card-2', title: 'Configurar Pinia Store', description: 'Definir el estado y las acciones para mover tarjetas.' },
    ]
  },
  {
    id: 'list-2',
    title: 'In Progress',
    cards: [
      { id: 'card-3', title: 'Implementar funcionalidad de Drag and Drop', description: 'Usar una librería o la API nativa de HTML.' },
    ]
  },
  {
    id: 'list-3',
    title: 'Done',
    cards: [
      { id: 'card-4', title: 'Crear proyecto Vue/Vite inicial', description: 'Instalar dependencias y limpiar archivos.' },
    ]
  }
]
// ---------------------------------------------


export const useBoardStore = defineStore('board', () => {
  // Estado Reactivo (el equivalente a 'state' en Pinia Options API)
  const lists = ref(mockLists)

  // Acciones (el equivalente a 'actions')

  function moveCard(cardId, sourceListId, destinationListId, newIndex) {
    // 1. Encontrar la tarjeta
    const sourceList = lists.value.find(list => list.id === sourceListId)
    const cardIndex = sourceList.cards.findIndex(card => card.id === cardId)
    const [cardToMove] = sourceList.cards.splice(cardIndex, 1) // 2. Sacar la tarjeta de la lista de origen

    // 3. Poner la tarjeta en la lista de destino en la posición deseada
    const destinationList = lists.value.find(list => list.id === destinationListId)
    destinationList.cards.splice(newIndex, 0, cardToMove) 
  }

  return { lists, moveCard }
})