<template>
  <div class="app">
    <NavigatorBar v-if="!$route.meta.hideNavigatorBar" />
    <!-- <div v-else class="box">1</div> -->
    <router-view />
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import NavigatorBar from './components/NavigatorBar.vue'

const route = useRoute()
// const isDesktop = ref(window.innerWidth > window.innerHeight)

// const checkDevice = () => {
//   isDesktop.value = window.innerWidth > window.innerHeight
// }

// onMounted(() => {
//   window.addEventListener('resize', checkDevice)
//   checkDevice()
// })

// onBeforeUnmount(() => {
//   window.removeEventListener('resize', checkDevice)
// })

// const appClass = computed(() => ({
//   app: true,
//   'home-bg': true,
//   'desktop-bg': isDesktop.value,
//   'mobile-bg': !isDesktop.value
// }))
</script>

<style>
.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
}

.home-bg {
}

/* .desktop-bg {
  background: linear-gradient(#fadb18, #f28b0e);
}

.mobile-bg {
  background: #fff;
} */
</style>
