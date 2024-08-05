<template>
  <van-swipe class="banner" :autoplay="3000" indicator-color="white">
    <van-swipe-item
      v-for="item in banners"
      :key="item.targetId"
      @click="onBannerTap(item.videoUrl)"
    >
      <div class="banner-image-container">
        <img :src="item.url" class="banner-image" />
      </div>
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
  width: 100%;
  max-width: 340px;
  position: relative;
  overflow: hidden;
  border-radius: 10px;
}

.banner-image-container {
  position: relative;
  width: 100%;
  padding-top: 37.5%;
}

.banner-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
