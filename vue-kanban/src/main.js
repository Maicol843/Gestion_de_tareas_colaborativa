// src/main.js
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia' // Importar Pinia
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia()) // Usar Pinia
app.use(router) // Usar Router

app.mount('#app')