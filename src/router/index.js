// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import { globalTitle } from '@/store/globalTitle'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/home-page.vue'),
      meta: { title: '首页', hideNavigatorBar: true }
    },
    {
      path: '/audiolist',
      component: () => import('@/views/audio-list.vue')
    },
    {
      path: '/detail-video',
      component: () => import('@/views/detail-video.vue'),
      meta: { title: '视频播放' }
    },
    {
      path: '/detail-author',
      component: () => import('@/views/detail-author.vue')
    },
    {
      path: '/detail-tag',
      component: () => import('@/views/detail-tag.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
    globalTitle.value = to.meta.title
  } else {
    document.title = ' '
    globalTitle.value = ' '
  }
  next()
})

export default router
