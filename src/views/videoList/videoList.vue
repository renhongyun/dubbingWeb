<template>
  <div>
    <back-ground></back-ground>
    <div class="video-list">
      <template v-for="item in videoList" :key="item.id">
        <videoItem :item-data="item" class="item"> </videoItem>
      </template>
    </div>
  </div>
</template>
<script setup>
import { ref, watch } from 'vue'
import backGround from '@/components/back-ground/back-ground.vue'
import videoItem from '@/components/video-item/video-item.vue'
import { useVideoStore } from '@/stores/modules/video'
import { storeToRefs } from 'pinia'
import useScroll from '@/hooks/useScroll'

const videoStore = useVideoStore()
videoStore.fetchVideos()
const { videoList } = storeToRefs(videoStore)

const homeRef = ref(null)
const { isReachBottom } = useScroll(homeRef)

watch(isReachBottom, async (newValue) => {
  if (newValue) {
    await videoStore.fetchVideos()
    isReachBottom.value = false
  }
})
</script>
<style lang="less" scoped>
.video-list {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 0 18px;
  position: relative;
  margin-top: 100px;
}
.item {
  width: 48%;
}
</style>
