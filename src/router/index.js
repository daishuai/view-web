import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from '@/router/routers'
import {getToken} from '@/libs/util'
import config from '@/config'

Vue.use(VueRouter)
const router = new VueRouter({
    routes
})

const LOGIN_PAGE_NAME = 'login'

/**
 * Vue路由拦截
 */
router.beforeEach((to, from, next) => {
    // 如果没有登录
    const token = getToken()
    if (!token && to.name !== LOGIN_PAGE_NAME) {
        // 未登录且要跳转的页面不是登录页
        next({
            // 调转到登录页
            name: LOGIN_PAGE_NAME
        })
    } else if (!token && to.name === LOGIN_PAGE_NAME) {
        // 未登录且要跳转的页面是登录页
        next()
    } else if (token && to.name === LOGIN_PAGE_NAME) {
        // 已登录且要跳转的页面是登录页
        next({
            // 调转到首页
            name: config.homeName
        })
    } else {
        next()
    }
})
export default router