/**
 * 得到两个数组的并集，两个数组的元素为数值或字符串
 *
 * @param {Array} array1
 * @param {Array} array2
 * @returns {*[]}
 */
export const getUnion = (array1, array2) => {
    return Array.from(new Set([...array1, ...array2]))
}

export const forEach = (array, fn) => {
    if (!array.length || !fn) {
        return
    }
    let i = -1
    let length = array.length
    while (++i < length) {
        let item = array[i]
        fn(item, i, array)
    }
}

/**
 * 判断要查询的数组是否至少有一个元素包含在目标数组中
 *
 * @param targetArray   目标数组
 * @param array 需要检查的数组
 * @returns {*}
 */
export const hasOneOf = (targetArray, array) => {
    return targetArray.some(_ => array.indexOf(_) > -1)
}