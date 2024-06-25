import hyRequest from '../request'

export function getCategories() {
  return hyRequest.get({
    url: '/firstCategory/getFirstCategory'
  })
}

export function getCategoriesAll() {
  return hyRequest.get({
    url: '/firstCategory/all'
  })
}
