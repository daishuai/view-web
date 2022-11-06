import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from '@/router/router'
import VueRouter from 'vue-router'
import iView from 'iview'
import store from '@/store'
import config from '@/config'
import 'iview/dist/styles/iview.css'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(iView)
const app = new Vue({
    render: h => h(App),
    router,
    store,
    config
})

app.$mount('#app')
