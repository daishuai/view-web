import login from "@/view/login/login"
import Main from '@/components/main'

export default [
    {
        path: '/',
        name: 'login',
        component: login,
        meta: {
            title: 'Login - 登录',
            hideInMenu: true
        }
    },
    {
        path: '/',
        name: '_home',
        redirect: '/home',
        component: Main,
        meta: {
            hideInMenu: true,
            notCache: true
        },
        children: [
            {
                path: '/home',
                name: 'home',
                meta: {
                    hideInMenu: true,
                    title: '首页',
                    notCache: true,
                    icon: 'md-home'
                },
                component: () => import('@/view/single-page/home')
            }
        ]
    }
]