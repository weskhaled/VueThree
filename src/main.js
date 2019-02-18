import Vue from 'vue'
import App from './App.vue'


require('../src/libs/DragControls')


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
