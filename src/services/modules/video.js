import hyRequest from '../request'

export function getVideoList() {
  return hyRequest.get({
    url: '/video/all'
  })
}
