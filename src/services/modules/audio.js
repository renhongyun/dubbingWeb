import hyRequest from '../request'

export function getAudioList(audioData) {
  return hyRequest.post({
    url: '/audio/list',
    data: audioData
  })
}
