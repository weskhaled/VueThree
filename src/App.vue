<template>
  <div id="app">
    <!-- <DrawingBoard msg="Welcome to Your Vue.js App"/> -->
    <DrawingBoard_1 msg="Welcome to Your Vue.js App"/>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
// import DrawingBoard from "./components/DrawingBoard.vue";
import DrawingBoard_1 from "./components/DrawingBoard_1.vue";

export default {
  name: "app",
  components: {
    // DrawingBoard
    DrawingBoard_1
    // HelloWorld
  }
};
</script>

<style>
body {
  background-color: #636363;
  margin: 0px;
  overflow: hidden;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0px;
}
</style>
