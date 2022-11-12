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