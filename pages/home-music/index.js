// pages/home-music/index.js
import { rankingStore } from "../../store/index";
import { getBannersData, getSongMenu } from "../../serves/api_music.js";
import queryRect from "../../utils/query-rect"
import throttle from "../../utils/throttle"

// 对获取组件高度这一行为进行节流
const throttleQueryRect = throttle(queryRect, 300)

Page({
  data: {
    banners: [],
    recommendSongs: [],
    hotSongMenu: [],
    recommendSongMenu: [],
    // 巅峰榜数据,为了保证数据的顺序如预期，所以用对象的形式保存
    summitListData: {1: {}, 2: {}, 3: {}},   
    swiperHeight: 0,    // 轮播图高度，通过动态计算获得
    showSummitList: false
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
    // 得到轮播图数据
    getBannersData().then(res => {
      this.setData({
        banners: res.banners
      })
    })

    // 发送请求获取推荐歌曲的数据
    rankingStore.dispatch("getRankingDataAction")

    // 从store中得到推荐歌曲列表的数据并保存到data中
    rankingStore.onState("hotRanking", res => {
      if (!res.tracks) return 
      const recommendSongs = res.tracks.slice(0, 6)
      this.setData({ recommendSongs })
    })

    rankingStore.onState("newRanking", this.getNewRankingHandler(1))
    rankingStore.onState("originRanking", this.getNewRankingHandler(2))
    rankingStore.onState("upRanking", this.getNewRankingHandler(3))

    // 得到热门歌单列表的数据
    getSongMenu().then(res => {
      this.setData({
        hotSongMenu: res.playlists
      })
    })

    // 得到推荐歌单列表的数据
    getSongMenu("华语").then(res => {
      this.setData({
        recommendSongMenu: res.playlists
      })
    })
  },

  // 当图片加载完毕后回调此方法
  handleSwiperImageLoaded() {
    // 通过动态计算得到图片实际的高度(swiper-item组件的高度)
    throttleQueryRect(".swiper-image").then((res) => {
      const { height } = res[0]
      this.setData({
        swiperHeight: height
      })
    })
  },

  // 从store中得到巅峰榜的数据并保存到data中  
  getNewRankingHandler(idx) {
    return (res) => {
      if (!res.tracks) return
      const { name, coverImgUrl, tracks, playCount } = res
      const songList = tracks.slice(0, 3)
      const rankingObj = { name, coverImgUrl, songList, playCount }
      const originRanking = { ...this.data.summitListData, [idx]: rankingObj }
      this.setData({
        summitListData: originRanking
      })
      if (idx === 3) this.setData({
        showSummitList: true
      })
    }
  }
})  