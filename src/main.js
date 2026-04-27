import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { vMaska } from 'maska/vue'
import './plugins/firebase'

const app = createApp(App)

dayjs.extend(customParseFormat)
dayjs.extend(utc)

app.directive('maska', vMaska)

app.use(router)
app.use(vuetify)

app.mount('#app')
