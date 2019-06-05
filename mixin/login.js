
const app = getApp();
import {
  Technician
} from '../common/api/api'
const request = new Technician
import { c_login } from '../common/api/c_api'
const requestWB = new c_login
module.exports = {
  // 获取用户信息
  getStorageInfo: function () {
    let that = this
    wx.getStorage({
      key: 'user',
      success: function (res) {
        that.setData({
          user: res.data
        })
        if (that.data.user != {}) {
          that.setData({
            loginMask: 0
          })
        }
      },
      fail: function () {
        that.setData({
          loginMask: 0
        })
      }
    })
  },
  getUserInfoBtn:function(e){
    let that =this
    wx.showNavigationBarLoading();
    wx.showLoading({
      title: '授权中···',
    })
    if (e.detail.errMsg == 'getUserInfo:fail auth deny') { //用户点击拒绝
      wx.hideNavigationBarLoading();
      wx.hideLoading();
    } else {
      app.globalData.userInfo = e.detail.userInfo;
      that.setData({
        userInfo: e.detail.userInfo
      })
      that.initShop()
    }
  },
  initShop: function () {
    let that = this
    // 登录
    wx.login({
      success: res => {
        that.getOpenId(res.code)
      }
    })
  },
   getOpenId: function (code) {
     let that =this
    request.getOpenid(code).then(res => {
      that.sessionKey = res.session_key;
      wx.setStorage({
        key: 'sessionKey',
        data: that.sessionKey,
        success: function (res) { }
      })
      // 获取用户信息
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            console.log(res.authSetting['scope.userinfo'])
            wx.getUserInfo({
              withCredentials: true,
              success: res => {
                that.getUserInfo({
                  encryptedData: res.encryptedData,
                  iv: res.iv,
                  sessionKey: that.sessionKey
                })
              }
            })
          }
        }
      })
    })
  },
  getUserInfo: function (info) {
    let that =this
    requestWB.authDecode(info).then(res => {
      var userInfo = {
        "avatarUrl": res.avatarUrl,
        "city": res.city,
        "country": res.country,
        "gender": res.gender,
        "nickName": res.nickName,
        "openId": res.openId,
        "province": res.province,
        "unionId": res.unionid
      }
      that.setData({
        user: res
      })
      wx.setStorage({
        key: 'user',
        data: userInfo,
        success: function (res) {
          wx.hideNavigationBarLoading();
          wx.hideLoading();
          that.setData({
            phoneMask: 0,
            loginMask:1
          })
        }
      })
    })
  },
  getPhoneNumber: function (e) {
    let that = this
    if (e.detail.errMsg == 'getPhoneNumber:ok') {
      wx.getStorage({
        key: 'sessionKey',
        success: function (res) {
          const param = {
            encryptedData: e.detail.encryptedData,
            iv: e.detail.iv,
            sessionKey: res.data
          }
          requestWB.authDecode(param).then(res => {
            app.globalData.phoneNum = res.phoneNumber
            let phoneNum = res.phoneNumber;
            wx.setStorage({
              key: 'userPhone',
              data: res.phoneNumber,
              success: function (res) {
                wx.hideNavigationBarLoading();
                wx.hideLoading();
                let params = {
                  "additionalMessage": "",
                  "address": "",
                  "del": 1,
                  "docNumber": "",
                  "docType": 1,
                  "id": "",
                  "name": that.data.user.nickName,
                  "openid": that.data.user.openId,
                  "remarks": "",
                  "sex": "",
                  "tel": phoneNum,
                  "userSource": that.data.userSource,
                  "unionid": that.data.user.unionId,
                  "partnentID": that.data.partnentID
                };
                // 判断用户注册
                that.checkFun(params);
              }
            })
          })
        },
        fail:function(){
          console.log('fail')
        }
      })
    } else {
      that.setData({
        loginMask: 0
      })
      wx.hideNavigationBarLoading();
      wx.hideLoading();
    }
  },
  
  // 判断用户注册
  checkFun: function (params) {
    request.loginQuery(params).then(res => {
      console.log(res,'res')
      if (res.code === "200") {
        console.log(res,'res')
        wx.setStorage({
          key: 'mineInfo',
          data: res.result,
          success() {
            wx.reLaunch({
              url: '../index/index',
            })
          }
        })
      } else if (res.code === "500") {
        wx.showToast({
          title: '服务器错误···',
          icon: 'loading',
          duration: 1500
        })
      }else{
        wx.showToast({
          title:res.respMsg
        })
      }
    })
  },
  /**
   * 登录查询
   */
  loginQuery: function (user) {
    let that = this
    let params = {
      "additionalMessage": "",
      "address": "",
      "del": 1,
      "docNumber": "",
      "docType": 1,
      "id": "",
      "name": that.data.user.nickName,
      "openid": app.globalData.openId,
      "remarks": "",
      "sex": "",
      "tel": res.data,
      "userSource": that.data.userSource,
      "unionid": that.data.user.unionId,
      "partnentID": that.data.partnentID,
      "recommenderId": that.data.parentOpenId
    }
    request.loginQuery(params).then(res => {
      if (res.code === "200") {
        wx.setStorage({
          key: 'mineInfo',
          data: res.result,
          success() {
            wx.reLaunch({
              url: '../index/index',
            })
          }
        })
      } else if (res.code === "500") {
        wx.showToast({
          title: '服务器错误···',
          icon: 'loading',
          duration: 1500
        })
      }
    })
  }
}
