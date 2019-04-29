const app = getApp()
export class HttpServer {
  /**
 * @author dzl
 * @date 2018-09-13
 * @information promise封装请求
 * @param {请求的接口地址} url 
 * @param {拉起的回调函数} cb 
 * @update dzl
 * @date 2018-10-29
 */
  httpRequest = ({ url, method, data = {}, token={} }) => {
    wx.showLoading({ title: "拼命加载中...", mask: true })
    return new Promise((resolve, reject) => {
      wx.request({
        url,
        data,
        method,
        header: { 'content-type': 'application/json', 'Accept': 'application/json', "token": 'admin' },
        success(res) {
          wx.hideLoading();
          res.statusCode === 200 ? resolve(res.data) : reject(res.data)
        },
        fail(res) {
          wx.showToast({
            title: "请求错误",
            icon: "none"
          })
        }
      })
    })
  }}