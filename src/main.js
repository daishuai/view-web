import Vue from 'vue'
import App from './App.vue'
// 引入路由
import VueRouter from 'vue-router'
import router from '@/router'
import iView from 'iview'
import store from '@/store'
import config from '@/config'
import 'iview/dist/styles/iview.css'

Vue.config.productionTip = false
/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config
Vue.use(VueRouter)
Vue.use(iView)
const app = new Vue({
    render: h => h(App),
    router,
    store
})

app.$mount('#app')
