<template>
  <div id="app">
    <DrawingBoard msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import DrawingBoard from "./components/DrawingBoard.vue";

export default {
  name: "app",
  components: {
    DrawingBoard
  }
};
</script>

<style>
body {
  background-color: #efefef;
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
