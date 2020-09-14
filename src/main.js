import Vue from 'vue'
import App from './App.vue'
import moment from 'moment'
Vue.prototype.$moment = moment;
import { RippleButton } from "./plugins/ripple/ripple";
import './plugins/ripple/ripple.scss'
Vue.prototype.$ripple = RippleButton

import '@mdi'

new Vue({
  render: h => h(App),
}).$mount('#app')
