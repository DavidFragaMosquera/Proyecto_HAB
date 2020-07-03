import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vueHeadful from "vue-headful"
import Carousel3d from 'vue-carousel-3d';
Vue.use(require("vue-moment"));

Vue.config.productionTip = false
Vue.component("vue-headful", vueHeadful);
Vue.use(Carousel3d);


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
