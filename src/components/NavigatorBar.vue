<template>
  <div
    class="navigator-bar"
    :class="{ 'mobile-view': isMobileView, 'desktop-view': !isMobileView }"
  >
    <div class="back-button" @click="goBack">
      <img src="@/assets/img/back.png" alt="Back" class="back-icon" />
    </div>
    <div class="title">{{ title }}</div>
    <div class="share-button" @click="sharePage">
      <img src="@/assets/img/shareIcon.png" alt="Share" class="share-icon" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, watchEffect } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { globalTitle } from '@/store/globalTitle'

const router = useRouter()
const route = useRoute()

const title = ref(globalTitle.value)
const isMobileView = ref(false)

watch(route)

watchEffect(() => {
  title.value = globalTitle.value
})

const goBack = () => {
  router.back()
}

const sharePage = () => {
  const currentUrl = window.location.href
  navigator.clipboard
    .writeText(currentUrl)
    .then(() => {
      ElMessage({
        message: '链接已复制到剪贴板！',
        type: 'success'
      })
    })
    .catch(() => {
      ElMessage({
        message: '复制失败，请手动复制链接。',
        type: 'error'
      })
    })
}

const checkMobileView = () => {
  const isMobile = window.innerWidth <= 768 || window.innerWidth < window.innerHeight
  isMobileView.value = isMobile
}

onMounted(() => {
  checkMobileView()
  window.addEventListener('resize', checkMobileView)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobileView)
})
</script>

<style scoped>
.navigator-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f9db17;
  padding: 10px 0px;
  height: 24px;
  position: relative;
  /* box-sizing: border-box; */
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
  left: 20px;
}

.title {
  flex: 1;
  text-align: center;
  font-size: 18px;
  font-weight: 700;
  color: #fff;
  position: absolute;
  left: 0;
  right: 0;
  z-index: 1;
}

.share-button {
  background: none;
  border: none;
  cursor: pointer;
}

.share-icon {
  width: 26px;
  height: 26px;
  position: relative;
  z-index: 5;
  right: 20px;
}

.navigator-bar.desktop-view {
  width: 430px;
  margin: 0 auto;
}
</style>
