import {getUserInfo, login, logout} from '@/api/user'
import {getToken, setToken} from '@/libs/util'

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
                    commit('setToken', data.result.username)
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
