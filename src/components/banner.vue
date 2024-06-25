<template>
  <van-swipe class="banner" :autoplay="3000" indicator-color="white">
    <van-swipe-item
      v-for="item in banners"
      :key="item.targetId"
      @click="onBannerTap(item.videoUrl)"
    >
      <img :src="item.url" class="banner-image" />
    </van-swipe-item>
  </van-swipe>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getBanners } from '@/services/modules/banner'
import 'vant/lib/index.css'

const banners = ref([])
const router = useRouter()

const fetchBanners = async () => {
  const res = await getBanners()
  banners.value = res
  console.log(banners.value)
}

const onBannerTap = (videoUrl) => {
  router.push({ path: '/detail-video', query: { videoUrl: encodeURIComponent(videoUrl) } })
}

onMounted(() => {
  fetchBanners()
})
</script>

<style scoped>
.banner {
  margin: 15px auto;
  margin-bottom: 0;
  width: 88%;
  border-radius: 10px;
  height: 150px;
  overflow: hidden;
  position: relative;
}

.banner-image {
  width: 100%;
}
</style>
