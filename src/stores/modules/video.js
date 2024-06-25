import { getTopMV } from '@/services'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useVideoStore = defineStore('video', () => {
  const videoList = ref([])
  const offset = ref(0)

  const fetchVideos = async () => {
    const res = await getTopMV(offset.value)
    const newVideoList = [...videoList.value, ...res.data]
    videoList.value = newVideoList
    offset.value = videoList.value.length
  }

  return { videoList, fetchVideos, offset }
})
