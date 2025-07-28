import './assets/main.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import i18n from '@/i18'
import GlobalPlugin from '@/plugins/global'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(GlobalPlugin)

app.mount('#app')