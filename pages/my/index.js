import {
  myService,
  myOrder
} from '../../common/static/api_data'
Page({
  data: {
    myService,
    myOrder,
    login:true,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  myOrder: function() {
    wx.navigateTo({
      url: '../my_order/index'
    })
  },
  /**
   * 跳转
   */
  openType: function(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.item + '?id=' + e.currentTarget.dataset.id,
      success: (result) => {

      },
      fail: () => {},
      complete: () => {}
    });

  },
  bindGetUserInfo: function(e) {
    console.log(e.detail.userInfo)
    if (e.detail.userInfo) {
      this.setData({
        url: e.detail.userInfo.avatarUrl,
        name: e.detail.userInfo.nickName,
        login: false
      })
    } else {
      this.setData({
        login: true
      })
    }
  },
  onLoad: function(options) {
    let that = this
    // 查看是否授权
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function(res) {
              if (res.userInfo) {
                that.setData({
                  url: res.userInfo.avatarUrl,
                  name: res.userInfo.nickName,
                  login:false
                })
              } else {
                console.log(res.userInfo)
                this.setData({
                  login: true
                })
              }
            }
          })
        }
      }
    })
  },
  onReady: function() {

  },
  onShow: function() {

  },
})