<template>
  <div class="page">
    <background></background>
    <div class="tag-box">
      <tag sort="情绪" :tagList="tag1" @tagClick="onTagClick"></tag>
      <tag sort="类型" :tagList="tag2" @tagClick="onTagClick"></tag>
    </div>
    <div class="recommend-list">
      <audio-bar
        v-for="item in audioList"
        :key="item.id"
        :itemData="item"
        @shareAudio="handleShareAudio"
        :showAuthorInfo="false"
      ></audio-bar>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getAudioList } from '@/services/modules/audio'
import { getAllTags } from '@/services/modules/tags'
import { getAuthorList } from '@/services/modules/author'
import { globalTitle } from '@/store/globalTitle'

import background from '@/components/background.vue'
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
  updateGlobalTitle()
}

const fetchAudios = async (dubbingActorId) => {
  const res = await getAudioList({ dubbingActorId })
  audioList.value = res.data
}

const fetchAudiosByTag = async () => {
  const response1 = await getAllTags(0)
  tag1.value = response1.data

  const response2 = await getAllTags(1)
  tag2.value = response2.data
}

const handleShareAudio = (e) => {
  shareData.value = e.detail
}

const updateGlobalTitle = () => {
  const author = authorList.value.find((author) => author.id === parseInt(dubbingActorId.value))
  if (author) {
    globalTitle.value = author.name
    document.title = author.name
  } else {
    document.title = '默认标题'
  }
}

const onTagClick = async ({ id, sort, selected }) => {
  const filters = { ...route.query }

  if (sort === '情绪') {
    filters.emotionTagId = selected ? id : null
  } else if (sort === '类型') {
    filters.categoryTagId = selected ? id : null
  }

  const res = await getAudioList(filters)
  audioList.value = res.data
}

onMounted(() => {
  dubbingActorId.value = route.query.dubbingActorId
  fetchAudios(dubbingActorId.value)
  fetchAudiosByTag()
  fetchAuthor()
})

watch(route, () => {
  updateGlobalTitle()
})
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  min-height: 98vh; /* 确保页面至少占满整个视口高度 */
}
.recommend-list {
  flex: 1; /* 使用flex-grow: 1来自动拉伸填充剩余空间 */
  padding: 25px 0;
  border-radius: 20px;
  background-color: #f7f6fb;
  width: 100%;
  box-sizing: border-box;
}

.tag-box {
  margin: 18.5px 0;
  margin-bottom: 11px;
}
</style>
