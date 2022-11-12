import config from '@/config'

const {useI18n} = config

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
            title = vm.$t(item.name)
        }
    } else {
        title = (item.meta && item.meta.title) || item.name
    }
    return title
}