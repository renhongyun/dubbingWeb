import hyRequest from '../request'

export function getAuthorList() {
  return hyRequest.get({
    url: `/dubbingActor/getAll`
  })
}

export function searchAuthor(id) {
  return hyRequest.get({
    url: `/dubbingActor/get/${id}`
  })
}
