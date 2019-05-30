// let openId = app.openId?app.openId:''
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

  httpRequest = ({ url, method, data = {}, token ={} }) => {
    const app = getApp()
    wx.showLoading({ title: "拼命加载中...", mask: true })
    return new Promise((resolve, reject) => {
      wx.request({
        url,
        data,
        method,
        header: { 'content-type': 'application/json', 'Accept': 'application/json', "token": app.globalData.openId },
        success(res) {
          wx.hideLoading();
          res.statusCode === 200 ? resolve(res.data) : reject(res.data)
          if (res.statusCode === 500) {
            wx.showToast({
              title: "服务器挂掉了",
              icon: "none"
            })
          } else if (res.statusCode === 404) {
            wx.showToast({
              title: res.data.message,
              icon: "none"
            })
          }
        },
        fail(res) {
          wx.showToast({
            title: "请求错误",
            icon: "none"
          })
        }
      })
    })
  }
}
export let  img = () => {
  return new Promise((resolve, reject) => {
    wx.chooseImage({
      count: 6,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (result) => {
       resolve(result)
      },
      fail: () => {
        wx.showToast({
          title:'请求错误',
          icon:'none'
        })
      },
      complete: () => {}
    });
      
  })
}