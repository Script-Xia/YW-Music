import ywRequest from "./index";

export function getBannersData() {
  return ywRequest.get("/banner", {
    type: 2
  })
}