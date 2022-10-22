// pages/home-music/index.js
import { getBannersData } from "../../serves/api_music.js";
import queryRect from "../../utils/query-rect"
import throttle from "../../utils/throttle"

// 对获取组件高度这一行为进行节流
const throttleQueryRect = throttle(queryRect, 300)

Page({
  data: {
    banners: [],
    swiperHeight: 0
  },

  onLoad(options) {
    this.getPageData()
  },

  // 事件处理
  handleSearchClick() {
    wx.navigateTo({
      url: '../detail-search/index',
    })
  },

  getPageData() {
    getBannersData().then(res => {
      this.setData({
        banners: res.banners
      })
    })
  },

  // 当图片加载完毕后回调此方法
  handleSwiperImageLoaded() {
    // 得到图片实际的高度(swiper-item组件的高度)
    throttleQueryRect(".swiper-image").then((res) => {
      const { height } = res[0]
      this.setData({
        swiperHeight: height
      })
    })
  },

 onUnload() {}
})