// pages/detail-video/index.js
import {
  getMVURL,
  getMVDetail,
  getRelatedVideos
} from "../../serves/api_video"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mvURLInfo: null,
    mvDetails: null,
    relatedVideos: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 页面跳转的url中携带的数据会保存在options中
    const id = options.id
    this.getPageData(id)
    
  },

  // 获取MV的相关数据
  getPageData(id) {
    // 1. 请求获取MV的url地址
    getMVURL(id).then(res => {
      this.setData({ mvURLInfo: res.data })
    })
    // 2. 请求获取MV的详情数据
    getMVDetail(id).then(res => {
      this.setData({ mvDetails: res.data })
    })
    // 3. 请求获取MV的相关视频
    getRelatedVideos(id).then(res => {
      this.setData({ relatedVideos: res.data })
    })
  }
})