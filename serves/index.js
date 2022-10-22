const BASE_URL = "http://codercba.com:9002"

class YWRequest {
  request(url, method, params) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: BASE_URL + url,
        method,
        data: params,
        success(res) {
          resolve(res.data)
        },
        fail: reject
      })
    })
  }

  get(url, params) {
    return this.request(url, "GET", params)
  }

  post(url, data) {
    return this.request(url, "POST", data)
  }
}

const ywRequest = new YWRequest()

export default ywRequest