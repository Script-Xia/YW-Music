import ywRequest from "./index"

/**
 * 得到MV列表的数据
 * @param {number} offset 偏移量
 * @param {number} limit 请求数据的数量
 */
export function getTopMV(offset, limit = 10) {
  return ywRequest.get("/top/mv", {
    offset,
    limit
  })
}

/**
 * 获取MV的url地址
 * @param {number} id MV的id
 */
export function getMVURL(id) {
  return ywRequest.get("/mv/url", {
    id
  })
}

/**
 * 获取MV的详情数据
 * @param {number} mvid MV的id
 */
export function getMVDetail(mvid) {
  return ywRequest.get("/mv/detail", {
    mvid
  })
}

/**
 * 获取MV的相关视频
 * @param {number} id MV的id
 */
export function getRelatedVideos(id) {
  return ywRequest.get("/related/allvideo", {
    id
  })
}