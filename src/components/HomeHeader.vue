<template>
  <div class="Home-Header">
    <div class="logo">
      <img src="@/assets/img/logo.png" alt="Back" class="logo-icon" />
    </div>
    <div class="title">产品名</div>
    <div class="share-button" @click="sharePage">
      <img src="@/assets/img/shareIcon2.png" alt="Share" class="share-icon" />
    </div>
  </div>
</template>

<script setup>
import { ref, watch, watchEffect } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
// import 'element-plus/theme-chalk/el-message.css'
import { globalTitle } from '@/store/globalTitle'

const router = useRouter()
const route = useRoute()

const title = ref(globalTitle.value)
// const showBackButton = ref(false)

// const updateNavigator = () => {
//   showBackButton.value = route.path !== '/'
// }

watch(route)

watchEffect(() => {
  title.value = globalTitle.value
})

// const goBack = () => {
//   router.back()
// }

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
</script>

<style scoped>
.Home-Header {
  display: flex;
  align-items: center;
  justify-content: start;
  /* background-color: #f9db17; */
  padding: 2vh 2vw;
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); */
  height: 24px;
  position: relative;
  margin-bottom: 8px;
  /* width: 100%; */
  /* width: 400px; */
}

.logo {
  background: none;
  border: none;
  cursor: pointer;
  margin-right: 18px;
}

.logo-icon {
  width: 36px;
  height: 36px;
  position: relative;
  z-index: 5;
  margin-left: 18px;
}

.title {
  /* flex: 1; */
  text-align: center;
  font-size: 21px;
  font-weight: 700;
  /* color: #333; */
  color: rgba(170, 128, 226);
  /* position: absolute;
  left: 0;
  right: 0;
  z-index: 1; */
}

.share-button {
  background: none;
  border: none;
  cursor: pointer;
  /* background-color: #fff; */
  position: absolute;
  right: 28px;
  /* bottom: 0; */
}

.share-icon {
  width: 32px;
  height: 32px;
  position: relative;
  z-index: 5;
}
</style>
