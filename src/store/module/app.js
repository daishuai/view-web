import {getMenuByRouter, getUserResource} from '@/libs/util'
import routers from '@/router/routers'


export default {
    state: {
        menuList: routers
    },
    mutations: {
        setMenuList(state, menuList) {
            state.menuList = state.menuList.concat(menuList)
        }
    },
    getters: {
        menuList: (state) => {
            const cacheMenuList = getUserResource()
            if (cacheMenuList) {
                return getMenuByRouter(JSON.parse(cacheMenuList))
            }
            return getMenuByRouter(state.menuList)
        }
    }
}