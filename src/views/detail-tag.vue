<template>
  <div class="page">
    <banner />
    <div class="tag-box">
      <tag sort="性别" :tagList="sex" @tagClick="onTagClick" />
      <tag v-if="shouldLoadTag2" sort="类型" :tagList="tag2" @tagClick="onTagClick" />
    </div>
    <div class="recommend-list">
      <audioBar
        v-for="item in audioList"
        :key="item.id"
        :itemData="item"
        @shareAudio="handleShareAudio"
      />
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import banner from '@/components/banner.vue'
import tag from '@/components/tag.vue'
import audioBar from '@/components/audio-bar.vue'
import { getAudioList } from '@/services/modules/audio'
import { getAllTags } from '@/services/modules/tags'
import { globalTitle } from '@/store/globalTitle'

const sex = ref([
  { id: 1, name: '男声', selected: false },
  { id: 0, name: '女声', selected: false }
])
const tag1 = ref([])
const tag2 = ref([])
const tag3 = ref([])
const audioList = ref([])
const filters = ref({})
const route = useRoute()
const router = useRouter()

const shouldLoadTag2 = computed(() => {
  const { categoryId, type } = route.query
  return !(categoryId == 2 && type == 2)
})

const fetchAudios = async () => {
  const res = await getAudioList(filters.value)
  audioList.value = res.data
}

const fetchTags = async () => {
  const response1 = await getAllTags(0)
  const response2 = await getAllTags(1)
  const response3 = await getAllTags(2)
  tag1.value = response1.data
  tag2.value = response2.data
  tag3.value = response3.data
  setPageTitle()
}

const setPageTitle = () => {
  const { type, tagId } = route.query
  if (type == 0) {
    const tag = tag1.value.find((item) => item.id == tagId)
    if (tag) {
      globalTitle.value = tag.name
    }
  } else if (type == 2) {
    const tag = tag3.value.find((item) => item.id == tagId)
    if (tag) {
      globalTitle.value = tag.name
    }
  }
}
const onTagClick = async ({ id, sort, selected }) => {
  if (selected) {
    if (sort === '类型') {
      filters.value.categoryTagId = id
    } else if (sort === '性别') {
      filters.value.sex = id
    }
  } else {
    if (sort === '类型') {
      delete filters.value.categoryTagId
    } else if (sort === '性别') {
      delete filters.value.sex
    }
  }

  const res = await getAudioList(filters.value)
  audioList.value = res.data
}

const handleShareAudio = (event) => {
  const shareData = event.detail
  navigator.share({
    title: `${shareData.dubbingActorId} - ${shareData.name}`,
    url: `/detail-tag?audioUrl=${shareData.url}`
  })
}

onMounted(() => {
  const { type, tagId, categoryId } = route.query
  filters.value = { categoryId }

  if (type == 0) {
    filters.value.emotionTagId = tagId
  } else if (type == 2) {
    filters.value.languageTagId = tagId
  }

  fetchAudios()
  fetchTags()
})
</script>
<style scoped>
.page {
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 44px);
  /* padding: 15px 0; */
  background: linear-gradient(#f8d416, #f2870d);
}

.recommend-list {
  flex: 1;
  padding: 25px 0;
  padding-bottom: 40px;
  border-radius: 20px 20px 0 0;
  background-color: #f7f6fb;
  width: 100%;
}

.tag-box {
  margin: 18.5px 0;
  margin-bottom: 11px;
}
@media (min-width: 769px) {
  .page {
    width: 430px;
    margin: 0 auto;
  }
}
</style>
