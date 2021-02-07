import {createApp} from 'vue'
import App from './App.vue'
import store from './store'
import './assets/style.scss'
import '@mdi/font/css/materialdesignicons.min.css'

const app = createApp(App);
app.use(store);
app.mount('#app');
