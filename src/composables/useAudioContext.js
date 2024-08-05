// import { ref, onMounted, onBeforeUnmount } from 'vue'

// export const useAudioContext = (url) => {
//   const audio = new Audio(url)
//   const isPlaying = ref(false)

//   const play = () => {
//     audio.play()
//     isPlaying.value = true
//   }

//   const pause = () => {
//     audio.pause()
//     isPlaying.value = false
//   }

//   const stop = () => {
//     audio.pause()
//     audio.currentTime = 0
//     isPlaying.value = false
//   }

//   onMounted(() => {
//     audio.addEventListener('play', () => (isPlaying.value = true))
//     audio.addEventListener('pause', () => (isPlaying.value = false))
//     audio.addEventListener('ended', () => (isPlaying.value = false))
//   })

//   onBeforeUnmount(() => {
//     stop()
//     audio.removeEventListener('play', () => (isPlaying.value = true))
//     audio.removeEventListener('pause', () => (isPlaying.value = false))
//     audio.removeEventListener('ended', () => (isPlaying.value = false))
//   })

//   return {
//     audio,
//     play,
//     pause,
//     stop,
//     isPlaying
//   }
// }

// src/composables/useAudioContext.js
import { ref } from 'vue'

export function useAudioContext(url) {
  const audio = new Audio(url)
  const currentTime = ref(0)

  const play = (startTime = 0) => {
    audio.currentTime = startTime
    audio.play()
  }

  const pause = () => {
    audio.pause()
  }

  const stop = () => {
    audio.pause()
    audio.currentTime = 0
  }

  audio.addEventListener('timeupdate', () => {
    currentTime.value = audio.currentTime
  })

  return {
    audio,
    play,
    pause,
    stop,
    currentTime
  }
}
