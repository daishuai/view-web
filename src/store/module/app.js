import {getMenuByRouter} from '@/libs/util'
import routers from '@/router/routers'


export default {
    state: {},

    getters: {
        menuList: () => getMenuByRouter(routers)
    }
}