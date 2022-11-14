import {getMenuByRouter} from '@/libs/util'
import routers from '@/router/routers'
import axios from '@/libs/api.request'

const HAS_ROUTERS_FLAG = 'hasRouters'

export default {
    state: {},

    getters: {
        menuList: () => {
            // 已登录且要跳转的页面是登录页
            if (!localStorage.getItem(HAS_ROUTERS_FLAG)) {
                // 获取用户资源
                axios.request({
                    url: 'auth/resources_as_tree',
                    params: {
                        username: 'super_admin'
                    },
                    method: 'get'
                }).then(res => {
                    localStorage.setItem(HAS_ROUTERS_FLAG, true)
                    console.log(res.data)
                    const items = res.data.result
                    routers.push(items)
                })
            }
            getMenuByRouter(routers)
        }
    }
}