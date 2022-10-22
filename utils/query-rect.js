/**
 * 得到某一个元素节点的宽高等属性
 * @param {string} selector 获取节点属性的选择器
 */
export default function (selector) {
  return new Promise(resolve => {
    const query = wx.createSelectorQuery()
    query.select(selector).boundingClientRect()
    query.exec(resolve)
  })
}