import {getMenuByRouter} from '@/libs/util'


export default {
    state: {},

    getters: {
        menuList: () => getMenuByRouter(JSON.parse(localStorage.getItem("userRouters")))
    }
}