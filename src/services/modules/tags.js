import hyRequest from '../request'

export function getAllTags(type) {
  return hyRequest.get({
    url: `/tags/list/${type}`
  })
}
