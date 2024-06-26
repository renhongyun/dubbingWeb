<template>
  <div class="box">
    <div :class="itemData.isRecommend ? 'recommandBox' : 'notShow'">
      <img src="@/assets/img/recommand.png" class="recommand" />
    </div>
    <div class="info">
      <div class="title">
        <template v-if="showAuthorInfo && itemData.dubbingActorName">
          {{ itemData.dubbingActorName }} -
        </template>
        {{ itemData.name }}
      </div>
      <div v-if="showAuthorInfo" class="more" @click="viewOtherSamples">点击查看此老师其他样音</div>
    </div>
    <div class="buttons">
      <img
        :src="`src/assets/img/${isPlaying ? 'pause' : 'play'}.png`"
        class="play"
        @click="togglePlay"
      />
      <img src="@/assets/img/share.png" class="share" @click="onShare" />
      <img src="@/assets/img/download.png" class="download" @click="downloadAudio" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRouter } from 'vue-router'
import { getAuthorList } from '@/services/modules/author'
import { useAudioContext } from '@/composables/useAudioContext'

const props = defineProps({
  itemData: {
    type: Object,
    required: true
  },
  showAuthorInfo: {
    type: Boolean,
    default: true
  }
})

const isPlaying = ref(false)
const { audio, play, pause, stop } = useAudioContext(props.itemData.url)
const currentTime = ref(0)
const duration = ref(0)
const authorList = ref([])

const router = useRouter()

const fetchAuthor = async () => {
  const res = await getAuthorList()
  authorList.value = res.data
  updateDubbingActorName()
}

const updateDubbingActorName = () => {
  const author = authorList.value.find((author) => author.id === props.itemData.dubbingActorId)
  if (author) {
    props.itemData.dubbingActorName = author.name
  }
}

const togglePlay = () => {
  if (isPlaying.value) {
    pause()
  } else {
    play()
  }
  isPlaying.value = !isPlaying.value
}

const onShare = async () => {
  try {
    await navigator.clipboard.writeText(props.itemData.url)
    alert('分享链接生成成功！')
  } catch (err) {
    console.error('无法复制到剪贴板:', err)
  }
}

const viewOtherSamples = () => {
  const { dubbingActorId } = props.itemData
  if (dubbingActorId) {
    router.push({ path: '/detail-author', query: { dubbingActorId } })
  } else {
    console.error('dubbingActorId is undefined')
  }
}

const downloadAudio = async () => {
  try {
    const response = await fetch(props.itemData.url)
    const blob = await response.blob()
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = props.itemData.name
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  } catch (error) {
    console.error('下载音频文件出错:', error)
  }
}

onMounted(() => {
  audio.addEventListener('play', () => {
    console.log('开始播放')
    isPlaying.value = true
  })
  audio.addEventListener('pause', () => {
    console.log('暂停播放')
    isPlaying.value = false
  })
  audio.addEventListener('ended', () => {
    console.log('播放结束')
    isPlaying.value = false
    currentTime.value = 0
  })
  audio.addEventListener('timeupdate', () => {
    currentTime.value = audio.currentTime
    duration.value = audio.duration
  })
  fetchAuthor()
})

onBeforeUnmount(() => {
  stop()
})

watch(
  () => props.itemData,
  (newItemData) => {
    updateDubbingActorName()
  },
  { immediate: true }
)
</script>

<style scoped>
.box {
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  width: 86%;
  margin: 0 auto;
  padding: 10px 15px;
  border-radius: 9px;
  align-items: center;
  position: relative;
  margin-bottom: 10px;
}
.box .info {
  margin-left: 8px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: left;
}
.box .info .title {
  font-weight: 700;
  font-size: 15px;
}
.box .info .more {
  font-size: 12px;
  color: #c7c6cb;
  margin-top: 5px;
}
.box .buttons .play {
  width: 40px;
  height: 40px;
  position: relative;
  right: 16px;
  cursor: pointer;
}
.box .buttons .share {
  width: 35px;
  height: 35px;
  position: relative;
  top: 3px;
  right: 9px;
  cursor: pointer;
}
.box .buttons .download {
  width: 40px;
  height: 40px;
  cursor: pointer;
}
.recommandBox {
  position: absolute;
  width: 30px;
  height: 30px;
  top: 0;
  left: 0;
}
.recommand {
  width: 30px;
  height: 30px;
}
.notShow {
  display: none;
}
</style>

<style scoped>
.box {
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  width: 86%;
  margin: 0 auto;
  padding: 10px 15px;
  border-radius: 9px;
  align-items: center;
  position: relative;
  margin-bottom: 10px;
}
.box .info {
  margin-left: 8px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: left;
}
.box .info .title {
  font-weight: 700;
  font-size: 15px;
}
.box .info .more {
  font-size: 12px;
  color: #c7c6cb;
  margin-top: 5px;
}
.box .buttons .play {
  width: 40px;
  height: 40px;
  position: relative;
  right: 16px;
}
.box .buttons .share {
  width: 35px;
  height: 35px;
  position: relative;
  top: 3px;
  right: 9px;
}
.box .buttons .download {
  width: 40px;
  height: 40px;
}
.recommandBox {
  position: absolute;
  width: 30px;
  height: 30px;
  top: 0;
  left: 0;
}
.recommand {
  width: 30px;
  height: 30px;
}
.notShow {
  display: none;
}
</style>
