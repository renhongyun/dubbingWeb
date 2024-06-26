<template>
  <div id="app">
    <NavigatorBar />
    <router-view />
  </div>
</template>

<script setup>
import NavigatorBar from './components/NavigatorBar.vue'
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100vw;
  height: 100vh;
}
</style>
