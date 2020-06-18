import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vueHeadful from "vue-headful"

Vue.config.productionTip = false
Vue.component("vue-headful", vueHeadful);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
