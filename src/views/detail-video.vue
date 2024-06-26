<template>
  <div>
    <div>{{ videoId }}</div>
    <video :src="videoUrl" class="video" controls referrerpolicy="origin"></video>
    <div class="title">{{ videoName }}</div>
    <div class="video-list" style="top: 5px">
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
page {
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
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 0 5px;
  position: relative;
}
.item {
  width: 42%;
}
</style>
