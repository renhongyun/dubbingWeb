import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/home-page.vue')
    },
    {
      path: '/audiolist',
      component: () => import('@/views/audio-list.vue')
    },
    {
      path: '/videoplay',
      component: () => import('@/views/detail-video.vue')
    },
    {
      path: '/author',
      component: () => import('@/views/detail-author.vue')
    },
    {
      path: '/audiolistBytag',
      component: () => import('@/views/detail-tag.vue')
    }
  ]
})

export default router
