import {getUserInfo, login, logout} from '@/api/user'
import {getToken, setToken} from '@/libs/util'
import axios from '@/libs/api.request'
import routers from '@/router/routers'

const HAS_ROUTERS_FLAG = 'hasRouters'

export default {
    state: {
        username: '',
        token: getToken(),
        access: ''
    },
    mutations: {
        setUsername(state, name) {
            state.username = name
        },
        setAccess(state, access) {
            state.access = access
        },
        setToken(state, token) {
            state.token = token
            setToken(token)
        }
    },
    actions: {
        // 登录
        handleLogin({commit}, {username, password}) {
            username = username.trim()
            return new Promise((resolve, reject) => {
                login({
                    username,
                    password
                }).then(res => {
                    const data = res.data
                    console.log(data)
                    const username = data.result.username
                    commit('setToken', username)
                    // 已登录且要跳转的页面是登录页
                    if (!localStorage.getItem(HAS_ROUTERS_FLAG)) {
                        // 获取用户资源
                        axios.request({
                            url: 'auth/resources_as_tree',
                            params: {
                                username
                            },
                            method: 'get'
                        }).then(res => {
                            localStorage.setItem(HAS_ROUTERS_FLAG, true)
                            console.log(res.data)
                            const items = res.data.result
                            items.forEach(item => routers.push(item))
                        })
                    }
                    resolve()
                }).catch(err => {
                    reject(err)
                })
            })
        },
        // 退出登录
        handleLogOut({state, commit}) {
            return new Promise((resolve, reject) => {
                logout(state.token).then(() => {
                    commit('setToken', '')
                    commit('setAccess', [])
                    resolve()
                }).catch(err => {
                    reject(err)
                })
                // 如果你的退出登录无需请求接口，则可以直接使用下面三行代码而无需使用logout调用接口
                // commit('setToken', '')
                // commit('setAccess', [])
                // resolve()
            })
        },
        // 获取用户相关信息
        getUserInfo({state, commit}) {
            return new Promise((resolve, reject) => {
                try {
                    getUserInfo(state.token).then(res => {
                        const data = res.data
                        commit('setUsername', data.name)
                        commit('setAccess', data.access)
                        resolve(data)
                    }).catch(err => {
                        reject(err)
                    })
                } catch (error) {
                    reject(error)
                }
            })
        }
    }
}
