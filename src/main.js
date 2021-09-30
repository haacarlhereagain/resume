import {createApp} from 'vue';
import App from './App.vue';
import store from './store';
import './assets/style.scss';
import '@mdi/font/css/materialdesignicons.min.css'
import VWave from "v-wave";
import initUIComponents from "./ui/initUIComponents";

const app = createApp(App);
initUIComponents(app);
app.use(store);
app.use(VWave);
app.mount('#app');
