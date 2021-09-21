import {createApp} from 'vue';
import App from './App.vue';
import store from './store';
import './assets/style.scss';
import '@mdi/font/css/materialdesignicons.min.css'
import VWave from "v-wave";
import registerComponents from "./shared/components";

const app = createApp(App);
app.use(store);
app.use(VWave);
registerComponents(app);
app.mount('#app');
