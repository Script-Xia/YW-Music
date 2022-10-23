import ywRequest from "./index";

export function getBannersData() {
  return ywRequest.get("/banner", {
    type: 2
  })
}

export function getRanking(id) {
  return ywRequest.get("/playlist/detail", {
    id
  })
}

export function getSongMenu(cat = "全部", limit = 6, offset = 0) {
  return ywRequest.get("/top/playlist", {
    cat,
    limit,
    offset
  })
}