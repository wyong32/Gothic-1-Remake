import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PageWithToc from '@/components/PageWithToc.vue'
import '@fontsource/eb-garamond/latin-500.css'
import '@fontsource/eb-garamond/latin-600.css'
import '@fontsource/eb-garamond/latin-700.css'
import '@fontsource/eb-garamond/latin-500-italic.css'
import '@fontsource/source-sans-3/latin-400.css'
import '@fontsource/source-sans-3/latin-500.css'
import '@fontsource/source-sans-3/latin-600.css'
import '@fontsource/source-sans-3/latin-400-italic.css'
import './assets/styles/main.css'

const app = createApp(App)

app.component('PageWithToc', PageWithToc)
app.use(router)

app.mount('#app')
