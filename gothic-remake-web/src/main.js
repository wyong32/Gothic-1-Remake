import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PageWithToc from '@/components/PageWithToc.vue'
import './assets/styles/main.css'

const app = createApp(App)

app.component('PageWithToc', PageWithToc)
app.use(router)

app.mount('#app')
