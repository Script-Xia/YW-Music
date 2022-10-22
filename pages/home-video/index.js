// pages/home-video/index.js
import {
  getTopMV
} from "../../serves/api_video"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    topMVs: [],
    mvLimit: 10,
    nextOffset: 0,  // 下一次发送网络请求用到的偏移量
    hasMore: true // 判断服务器中是否还有数据可供请求
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    this.getTopMVData(this.data.nextOffset)
  },

  // 封装网络请求
  async getTopMVData(offset, isPullDown = false) {
    // 判断是否可以请求
    if (!this.data.hasMore && offset !== 0) return

    // 显示加载动画
    wx.showNavigationBarLoading()
    
    // 请求数据
    const res = await getTopMV(offset, this.data.mvLimit)

    // 设置数据
    let newData = this.data.topMVs
    if (offset === 0 || isPullDown) {
      newData = res.data
    } else {
      newData = newData.concat(res.data)
    }
    this.setData({
      topMVs: newData,
      hasMore: res.hasMore,
      nextOffset: offset + this.data.mvLimit
    })

    // 隐藏动画
    wx.hideNavigationBarLoading()
    if (isPullDown) {
      wx.stopPullDownRefresh()
    }
  },

  // 封装事件处理的方法
  handleVideoItemClick(event) {
    // 通过dataset方法拿到被点击视频的id
    const { id } = event.currentTarget.dataset.item
    wx.navigateTo({
      url: `../detail-video/index?id=${id}`,
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  async onPullDownRefresh() {
    this.getTopMVData(this.data.nextOffset, true)
    this.setData({
      pullDownCounter: this.data.pullDownCounter + 1
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  async onReachBottom() {
    this.getTopMVData(this.data.nextOffset)
  },

})