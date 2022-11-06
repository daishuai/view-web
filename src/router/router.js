import VueRouter from 'vue-router'
import login from "@/view/login/login"


const routes = [
    {
        path: '/',
        name: 'Login',
        component: login
    }
]

const router = new VueRouter({
    routes
})

export default router