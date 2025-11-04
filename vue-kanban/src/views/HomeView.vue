<script setup>
// 1. Importar el componente de la lista (asegúrate de usar el nombre "KanbanList")
import KanbanList from '@/components/KanbanList.vue'
// 2. Importar el Store de Pinia
import { useBoardStore } from '@/stores/boardStore'

// Inicializar y usar el store
// Esto nos da acceso a 'boardStore.lists' y 'boardStore.moveCard'
const boardStore = useBoardStore()

// 3. ¡Hemos eliminado todas las variables de 'TAREAS MOCK' estáticas!

</script>

<template>
  <div class="kanban-board">
    <h1>Mi Tablero Kanban con Vue.js (Estado Pinia)</h1>
    
    <div class="list-container-wrapper">
      <KanbanList 
        v-for="list in boardStore.lists"
        :key="list.id"
        :listId="list.id" 
        :listTitle="list.title" 
        :cards="list.cards" 
      />
    </div>
    
  </div>
</template>

<style>
/* Estilos */
.kanban-board {
  padding: 20px;
  background-color: #0079bf;
  min-height: 100vh;
  /* CAMBIO: Usaremos flex-direction: column para que el título esté arriba */
  /* Aunque Trello lo hace horizontal, para separar el título del área de listas es mejor hacer dos contenedores. */
  display: flex;
  flex-direction: column; /* Nuevo: organiza los hijos verticalmente */
}

.kanban-board h1 {
  color: white;
  margin-bottom: 20px; /* Le damos espacio inferior */
  font-size: 24px;
  /* Eliminamos margin-right: 20px; que ya no es necesario con el layout vertical */
}

/* Nuevo contenedor para las listas, así volvemos al flex horizontal */
.list-container-wrapper {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  overflow-x: auto; /* Para scroll horizontal si hay muchas listas */
}
</style>