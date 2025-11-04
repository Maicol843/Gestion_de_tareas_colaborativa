<script setup>
import KanbanList from '@/components/KanbanList.vue'

// TAREAS MOCK: Por ahora usamos datos estáticos
const todoCards = [
  { id: 1, title: 'Diseñar interfaz del tablero' },
  { id: 2, title: 'Configurar Pinia Store' },
]
const inProgressCards = [
  { id: 3, title: 'Implementar funcionalidad de arrastrar y soltar' },
]
const doneCards = [
  { id: 4, title: 'Crear proyecto inicial de Vue/Vite' },
]
</script>

<template>
  <div class="kanban-board">
    <h1>Mi Tablero Kanban con Vue.js</h1>
    
    <List listTitle="To Do" :cards="todoCards" />
    <List listTitle="In Progress" :cards="inProgressCards" />
    <List listTitle="Done" :cards="doneCards" />

  </div>
</template>

<style>
.kanban-board {
  padding: 20px;
  background-color: #0079bf; /* Fondo azul de Trello */
  min-height: 100vh;
  display: flex; /* Para poner las listas en línea */
  gap: 10px;
  align-items: flex-start; /* Para que las listas no se estiren */
  overflow-x: auto; /* Para scroll horizontal si hay muchas listas */
}
.kanban-board h1 {
  color: white;
  margin-right: 20px;
  font-size: 24px;
}
</style>