<script setup>
import { useBoardStore } from '@/stores/boardStore'
import { useRouter } from 'vue-router'
import { ref, computed } from 'vue'

const props = defineProps({
  id: { // Recibe el ID de la URL gracias a props: true en el router
    type: String,
    required: true
  }
})

const boardStore = useBoardStore()
const router = useRouter()

// 1. Obtener la tarjeta reactiva
const card = computed(() => boardStore.getCardById(props.id))

// 2. Variables locales para el formulario
const currentTitle = ref('')
const currentDescription = ref('')

// Si la tarjeta existe, inicializar los campos
if (card.value) {
  currentTitle.value = card.value.title
  currentDescription.value = card.value.description
}

// 3. Función para cerrar el modal y volver a la vista principal
function closeModal() {
  router.push({ name: 'home' })
}

// 4. Función para guardar los cambios
function saveChanges() {
  if (card.value) {
    boardStore.updateCard(
      props.id,
      currentTitle.value.trim(),
      currentDescription.value.trim()
    )
    closeModal()
  }
}
</script>

<template>
  <div class="modal-backdrop" @click.self="closeModal">
    <div v-if="card" class="modal-content">
      <button class="close-btn" @click="closeModal">X</button>
      
      <h2>Detalles de la Tarea</h2>
      
      <form @submit.prevent="saveChanges">
        <label for="title">Título:</label>
        <input id="title" v-model="currentTitle" type="text" required>

        <label for="description">Descripción:</label>
        <textarea id="description" v-model="currentDescription" rows="6"></textarea>

        <button type="submit" class="save-btn">Guardar Cambios</button>
      </form>
    </div>
    <div v-else class="modal-content">
      <p>Error: Tarjeta no encontrada.</p>
      <button @click="closeModal">Volver</button>
    </div>
  </div>
</template>

<style scoped>
/* Estilos para simular un modal flotante sobre el tablero */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6); /* Fondo semi-transparente */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal-content {
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  width: 90%;
  max-width: 600px;
  position: relative;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}
.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #4a4a4a;
}
.modal-content h2 {
    margin-top: 0;
    margin-bottom: 20px;
    border-bottom: 1px solid #000000;
    color: #000;
    padding-bottom: 10px;
}
form label {
    display: block;
    font-weight: bold;
    margin-top: 15px;
    margin-bottom: 5px;
    color: #111111;
}
form input[type="text"],
form textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}
.save-btn {
    background-color: #0079bf;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 20px;
    font-weight: bold;
}
.save-btn:hover {
    background-color: #026aa7;
}
</style>