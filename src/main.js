import {createApp} from 'vue'
import App from './App.vue'
import store from './store'
import './assets/style.scss'
import '@mdi/font/css/materialdesignicons.min.css'
import RippleDirective from './directives/ripple-directive'

const app = createApp(App);
app.use(store);
app.directive('ripple', RippleDirective);
app.mount('#app');
