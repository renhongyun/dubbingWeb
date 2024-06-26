<template>
  <div class="navigator-bar">
    <div v-if="showBackButton" class="back-button" @click="goBack">
      <img src="@/assets/img/back.png" alt="Back" class="back-icon" />
    </div>
    <div class="title">{{ title }}</div>
  </div>
</template>

<script setup>
import { ref, watch, watchEffect } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { globalTitle } from '@/store/globalTitle'

const router = useRouter()
const route = useRoute()

const title = ref(globalTitle.value)
const showBackButton = ref(false)

const updateNavigator = () => {
  showBackButton.value = route.path !== '/'
}

watch(route, updateNavigator)

watchEffect(() => {
  title.value = globalTitle.value
})

const goBack = () => {
  router.back()
}
</script>

<style scoped>
.navigator-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f9db17;
  padding: 10px 20px;
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); */
  height: 24px;
  position: relative;
}

.back-button {
  background: none;
  border: none;
  cursor: pointer;
}

.back-icon {
  width: 24px;
  height: 24px;
  position: relative;
  z-index: 5;
}

.title {
  flex: 1;
  text-align: center;
  font-size: 18px;
  font-weight: 700;
  /* color: #333; */
  color: #fff;
  position: absolute;
  left: 0;
  right: 0;
  z-index: 1;
}
</style>
