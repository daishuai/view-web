import axios from '@/libs/api.request'

export const login = ({username, password}) => {
    const data = {
        username,
        password
    }
    return axios.request({
        url: 'auth/login',
        data,
        method: 'post'
    })
}

export const getUserInfo = (token) => {
    return axios.request({
        url: 'getUserInfo',
        params: {
            token
        },
        method: 'get'
    })
}

export const logout = (token) => {
    console.log(token)
    return axios.request({
        url: 'logout',
        method: 'post'
    })
}
