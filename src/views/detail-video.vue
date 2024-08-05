<template>
  <div class="page">
    <!-- <div>{{ videoId }}</div> -->
    <video :src="videoUrl" class="video" controls referrerpolicy="origin"></video>
    <div class="title">{{ videoName }}</div>
    <div class="video-list">
      <video-item
        v-for="item in videoList"
        :key="item.id"
        class="item"
        :itemData="item"
        @click="onVideoItemTap(item)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getVideoList } from '@/services/modules/video'
import VideoItem from '@/components/video-item.vue'

const route = useRoute()
const router = useRouter()

const videoId = ref('')
const videoUrl = ref('')
const videoName = ref('')
const videoList = ref([])

const fetchVideoDetails = async () => {
  const url = decodeURIComponent(route.query.videoUrl)
  // console.log( url)
  const res = await getVideoList()
  const videos = res.data

  const videoDetails = videos.find((video) => video.url === url)

  if (videoDetails) {
    videoId.value = videoDetails.id
    videoUrl.value = videoDetails.url
    videoName.value = videoDetails.name
    videoList.value = videos
  }
  //确保拿到
  // console.log(videoUrl.value)
}

const onVideoItemTap = (item) => {
  // console.log('Item clicked:', item)
  router.push({
    path: '/detail-video',
    query: { videoUrl: encodeURIComponent(item.url) }
  })
}

onMounted(() => {
  fetchVideoDetails()
})

watch(route, () => {
  fetchVideoDetails()
})
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 44px);
  background-color: #f7f6fb;
}
.video {
  width: 100%;
}
.title {
  padding: 15px 15px;
  font-size: larger;
}
.video-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 20px;
}
.item {
  width: 48%;
  /* height: 120px; */
  margin-bottom: 30px;
}
@media (min-width: 769px) {
  .page {
    width: 430px;
    margin: 0 auto;
  }
}
</style>
