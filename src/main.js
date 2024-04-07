import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import Button from 'primevue/button';
import 'primevue/resources/themes/saga-blue/theme.css' 
import 'primevue/resources/primevue.min.css'         
import 'primeicons/primeicons.css' 
import './assets/styles/main.scss'


createApp(App)
  .use(PrimeVue)
  .use(ToastService)
  .component('PrimeButton', Button)
  .use(router)
  .mount('#app')
