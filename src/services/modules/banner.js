import hyRequest from '../request'

export function getBanners() {
  return hyRequest.get({
    url: '/carousel/list'
  })
}
