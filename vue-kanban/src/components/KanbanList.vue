<script setup>
// Definimos las propiedades que recibe la lista
defineProps({
  listTitle: {
    type: String,
    required: true
  },
  cards: {
    type: Array,
    default: () => []
  }
})
</script>

<template>
  <div class="list-container">
    <header>
      <h3>{{ listTitle }} ({{ cards.length }})</h3>
    </header>
    <div class="cards-wrapper">
      <div v-for="card in cards" :key="card.id" class="card-placeholder">
        {{ card.title }}
      </div>
      <button class="add-card-btn">+ Añadir una tarjeta</button>
    </div>
  </div>
</template>

<style scoped>
.list-container {
  background-color: #ebecf0; /* Fondo gris claro de Trello */
  width: 300px;
  margin: 10px;
  border-radius: 3px;
  padding: 8px;
  flex-shrink: 0; /* Importante para que no se achique */
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
.card-placeholder {
  background-color: white;
  padding: 10px;
  border-radius: 3px;
  margin-bottom: 6px;
  cursor: pointer;
  box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
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