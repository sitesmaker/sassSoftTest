import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {createPinia} from 'pinia'
import PrimeVue from 'primevue/config'
import 'primeicons/primeicons.css'

const pinia = createPinia()

createApp(App)
    .use(pinia)
    .use(PrimeVue)
    .mount('#app')
