<template>
  <div>
    <background></background>
    <div class="tag-box">
      <tag sort="情绪" :tagList="tag1"></tag>
      <tag sort="类型" :tagList="tag2"></tag>
    </div>
    <div class="recommend-list">
      <audio-bar
        v-for="item in audioList"
        :key="item.id"
        :itemData="item"
        @shareAudio="handleShareAudio"
      ></audio-bar>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getAudioList } from '@/services/modules/audio'
import { getAllTags } from '@/services/modules/tags'
import { getAuthorList } from '@/services/modules/author'

import background from '@/components/background.vue'
// import banner from '@/components/banner.vue'
import tag from '@/components/tag.vue'
import audioBar from '@/components/audio-bar.vue'

const audioList = ref([])
const shareData = ref(null)
const tag1 = ref([])
const tag2 = ref([])
const authorList = ref([])
const dubbingActorId = ref(null)

const route = useRoute()

const fetchAuthor = async () => {
  const res = await getAuthorList()
  authorList.value = res.data
}

const fetchAudios = async (dubbingActorId) => {
  const res = await getAudioList({ dubbingActorId })
  audioList.value = res.data
}

const fetchAudiosByTag = async () => {
  const response1 = await getAllTags(0)
  tag1.value = response1.data
  console.log('tag1', tag1.value)

  const response2 = await getAllTags(1)
  tag2.value = response2.data
  console.log('tag2', tag2.value)
}

const handleShareAudio = (e) => {
  console.log(e)
  shareData.value = e.detail
  console.log('done')
  // 分享菜单调用逻辑需根据 Vue 环境调整
  // wx.showShareMenu({
  //   withShareTicket: true,
  //   menus: ['shareAppMessage', 'shareTimeline']
  // })
  // onShareAppMessage()
}

onMounted(() => {
  dubbingActorId.value = route.query.dubbingActorId
  fetchAudios(dubbingActorId.value)
  fetchAudiosByTag()
  fetchAuthor()
})
</script>

<style scoped>
.recommend-list {
  padding: 25px 0;
  border-radius: 20px;
  background-color: #f7f6fb;
  width: 100%;
}
.tag-box {
  margin: 18.5px 0;
  margin-bottom: 11px;
}
/* page {
  background-color: #f7f6fb;
} */
</style>
