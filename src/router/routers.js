import login from "@/view/login/login"
import Main from '@/components/main'

export default [
    {
        path: '/',
        name: 'login',
        component: login
    },
    {
        path: '/home',
        name: 'home',
        component: Main
    }
]