import Vue from "vue";
import App from "./App.vue";

// require("../src/libs/DragControls");
// require("../src/libs/OrbitControls");
// require("../src/libs/TransformControls");
// require("three.meshline");

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
