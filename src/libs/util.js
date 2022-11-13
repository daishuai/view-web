import config from '@/config'
import Cookies from 'js-cookie'

const {cookieExpires, useI18n} = config

export const TOKEN_KEY = 'token'

export const showTitle = (item, vm) => {
    let {title, __titleIsFunction__} = item.meta
    if (!title) {
        return
    }
    if (useI18n) {
        if (title.includes('{{') && title.includes('}}' && useI18n)) {
            title = title.replace(/({{[\s\S]+?}})/, (m, str) => str.replace(/{{([\s\S]*)}}/, (m, _) => vm.$t(_.trim())))
        } else if (__titleIsFunction__) {
            title = item.meta.title
        } else {
            title = item.title
        }
    } else {
        title = (item.meta && item.meta.title) || item.name
    }
    return title
}

export const setToken = (token) => {
    Cookies.set(TOKEN_KEY, token, {expires: cookieExpires || 1})
}

export const getToken = () => {
    const token = Cookies.get(TOKEN_KEY)
    if (token) {
        return token
    } else {
        return false
    }
}

export const localRead = (key) => {
    return localStorage.getItem(key) || ''
}