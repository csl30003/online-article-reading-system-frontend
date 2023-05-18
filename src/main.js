import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import VueAxios from 'vue-axios'
import {checkToken} from './util'
import './assets/global.css'

const app = createApp(App)
app.use(router)
app.use(VueAxios)
app.provide('checkToken', checkToken) // 将 checkToken 挂载在全局
app.mount('#app')