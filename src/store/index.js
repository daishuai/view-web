import Vue from 'vue'
import Vuex from 'vuex'

// vuex深入理解 modules
// https://www.jianshu.com/p/a0c11ae01991
import user from './module/user'
import app from './module/app'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        //
        USER_RESOURCE_CACHE: 'userResourceCache'
    },
    mutations: {
        //
    },
    actions: {
        //
    },
    modules: {
        user,
        app
    }
})
