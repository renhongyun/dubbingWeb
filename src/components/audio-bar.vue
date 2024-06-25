<template>
  <div class="box">
    <div :class="itemData.isRecommend ? 'recommandBox' : 'notShow'">
      <img src="@/assets/img/recommand.png" class="recommand" />
    </div>
    <div class="info">
      <div class="title">
        <template v-if="itemData.dubbingActorName"> {{ itemData.dubbingActorName }} - </template>
        {{ itemData.name }}
      </div>
      <div class="more" @click="viewOtherSamples">点击查看此老师其他样音</div>
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
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { getAuthorList } from '@/services/modules/author'
import { useAudioContext } from '@/composables/useAudioContext'

const props = defineProps({
  itemData: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['shareAudio'])
const isPlaying = ref(false)
const { audio, play, pause, stop } = useAudioContext(props.itemData.url)
const currentTime = ref(0)
const duration = ref(0)
const authorList = ref([])

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

const onShare = () => {
  if (props.itemData.dubbingActorId !== undefined) {
    emit('shareAudio', {
      id: props.itemData.id,
      name: props.itemData.name,
      dubbingActorId: props.itemData.dubbingActorId,
      url: props.itemData.url
    })
  } else {
    console.error('dubbingActorId is undefined')
  }
}

const viewOtherSamples = () => {
  const { dubbingActorId } = props.itemData
  if (dubbingActorId) {
    useRouter().push(`/detail-author/${dubbingActorId}`)
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
  width: 63%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
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