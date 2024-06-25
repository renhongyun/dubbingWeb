import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { Swipe, SwipeItem } from 'vant'
import 'vant/lib/index.css'

import App from './App.vue'
import router from './router'

import 'normalize.css'
import './assets/css/index.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(Swipe)
app.use(SwipeItem)

app.mount('#app')
