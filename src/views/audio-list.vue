<!-- <template>
  <div class="page">
    <banner />
    <div class="tag-box">
      <tag sort="性别" :tagList="sex" @tagClick="onTagClick" />
      <tag v-if="tag1.length > 0" sort="情绪" :tagList="tag1" @tagClick="onTagClick" />
      <tag v-if="tag2.length > 0" sort="类型" :tagList="tag2" @tagClick="onTagClick" />
      <tag v-if="tag3.length > 0" sort="语言" :tagList="tag3" @tagClick="onTagClick" />
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
import { ref, onMounted } from 'vue'
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
const shareData = ref(null)
const filters = ref({ categoryId: 1 })

const route = useRoute()
const router = useRouter()

const fetchAudios = async (id) => {
  const res = await getAudioList({ categoryId: id })
  audioList.value = res.data
}

const fetchTagsByCategoryId = async (id) => {
  if (id == 1) {
    const response1 = await getAllTags(0)
    tag1.value = response1.data
    const response2 = await getAllTags(1)
    tag2.value = response2.data
    // 修改标题
    document.title = '中文配音'
    globalTitle.value = '中文配音'
  } else {
    const response3 = await getAllTags(2)
    tag3.value = response3.data
    // 修改标题
    document.title = '外语配音'
    globalTitle.value = '外语配音'
  }
}

const onTagClick = async ({ id, sort, selected }) => {
  if (selected) {
    if (sort === '情绪') {
      filters.value.emotionTagId = id
    } else if (sort === '类型') {
      filters.value.categoryTagId = id
    } else if (sort === '语言') {
      filters.value.languageTagId = id
    } else if (sort === '性别') {
      filters.value.sex = id
    }
  } else {
    if (sort === '情绪') {
      delete filters.value.emotionTagId
    } else if (sort === '类型') {
      delete filters.value.categoryTagId
    } else if (sort === '语言') {
      delete filters.value.languageTagId
    } else if (sort === '性别') {
      delete filters.value.sex
    }
  }

  const res = await getAudioList(filters.value)
  audioList.value = res.data
}

const handleShareAudio = (event) => {
  shareData.value = event.detail
  navigator.share({
    title: `${shareData.value.dubbingActorId} - ${shareData.value.name}`,
    url: `/audiolist?audioUrl=${shareData.value.url}`
  })
}

onMounted(() => {
  const { type, tagId, id } = route.query
  if (type !== undefined && tagId !== undefined) {
    fetchAudiosByTag(type, tagId)
  } else {
    filters.value.categoryId = id
    fetchAudios(id)
    fetchTagsByCategoryId(id)
  }
})
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 44px); /* 确保页面至少占满整个视口高度 */
  /* padding: 15px 0; */
  background: linear-gradient(#f8d416, #f2870d);
  box-sizing: border-box;
}

.recommend-list {
  flex: 1; /* 使用flex-grow: 1来扩展至父容器剩余空间 */
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
</style> -->

<template>
  <div class="page">
    <banner />
    <div class="tag-box">
      <tag sort="性别" :tagList="sex" @tagClick="onTagClick" />
      <tag v-if="tag1.length > 0" sort="情绪" :tagList="tag1" @tagClick="onTagClick" />
      <tag v-if="tag2.length > 0" sort="类型" :tagList="tag2" @tagClick="onTagClick" />
      <tag v-if="tag3.length > 0" sort="语言" :tagList="tag3" @tagClick="onTagClick" />
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
import { ref, onMounted } from 'vue'
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
const shareData = ref(null)
const filters = ref({ categoryId: 1 })

const route = useRoute()
const router = useRouter()

const fetchAudios = async (id) => {
  const res = await getAudioList({ categoryId: id })
  audioList.value = res.data
}

const fetchTagsByCategoryId = async (id) => {
  if (id == 1) {
    const response1 = await getAllTags(0)
    tag1.value = response1.data
    const response2 = await getAllTags(1)
    tag2.value = response2.data
    // 修改标题
    document.title = '中文配音'
    globalTitle.value = '中文配音'
  } else {
    const response3 = await getAllTags(2)
    tag3.value = response3.data
    // 修改标题
    document.title = '外语配音'
    globalTitle.value = '外语配音'
  }
}

const onTagClick = async ({ id, sort, selected }) => {
  if (selected) {
    if (sort === '情绪') {
      filters.value.emotionTagId = id
    } else if (sort === '类型') {
      filters.value.categoryTagId = id
    } else if (sort === '语言') {
      filters.value.languageTagId = id
    } else if (sort === '性别') {
      filters.value.sex = id
    }
  } else {
    if (sort === '情绪') {
      delete filters.value.emotionTagId
    } else if (sort === '类型') {
      delete filters.value.categoryTagId
    } else if (sort === '语言') {
      delete filters.value.languageTagId
    } else if (sort === '性别') {
      delete filters.value.sex
    }
  }

  const res = await getAudioList(filters.value)
  audioList.value = res.data
}

const handleShareAudio = (event) => {
  shareData.value = event.detail
  navigator.share({
    title: `${shareData.value.dubbingActorId} - ${shareData.value.name}`,
    url: `/audiolist?audioUrl=${shareData.value.url}`
  })
}

onMounted(() => {
  const { type, tagId, id } = route.query
  if (type !== undefined && tagId !== undefined) {
    fetchAudiosByTag(type, tagId)
  } else {
    filters.value.categoryId = id
    fetchAudios(id)
    fetchTagsByCategoryId(id)
  }
})
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 44px); /* 确保页面至少占满整个视口高度 */
  /* padding: 15px 0; */
  background: linear-gradient(#f8d416, #f2870d);
  box-sizing: border-box;
}

.recommend-list {
  flex: 1; /* 使用flex-grow: 1来扩展至父容器剩余空间 */
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
