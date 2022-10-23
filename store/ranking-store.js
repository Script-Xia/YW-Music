import { HYEventStore } from "hy-event-store";
import { getRanking } from "../serves/api_music";

const idList = [
  3778678,  // 热歌榜
  3779629,  // 新歌榜
  2884035,  // 原创榜
  19723756  // 飙升榜
]

const rankingMap = {
  3778678: "hotRanking",
  3779629: "newRanking",
  2884035: "originRanking",
  19723756: "upRanking",
}

// 得到音乐歌单的store实例
const rankingStore = new HYEventStore({
  state: {
    hotRanking: [],      // 热歌榜
    newRanking: [],      // 新歌榜
    originRanking: [],   // 原创榜
    upRanking: []        // 飙升榜
  },
  actions: {
    getRankingDataAction(ctx) {
      for (const id of idList) {
        getRanking(id).then(res => {
          const rankingName = rankingMap[id]
          ctx[rankingName] = res.playlist
        })
      }
    }
  }
})

export {
  rankingStore
}