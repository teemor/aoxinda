//login.js
const app = getApp()
var that
var sessionKey
import { c_login } from '../../common/api/c_api'
const request = new c_login
Page({
  data: {
    user: {}, // 用户信息
    userPhone: '', // 用户手机号
    loginMask: 1, // 获取用户手机号遮罩层
    partnentID: '', // 后加字段
    userSource:1, //用户注册进来,
    parentOpenId: ''
  },

  onLoad: function (options) {
    that = this;
    if (options.parentOpenId) {
      //是否存在推荐人openId
      that.setData({
        parentOpenId: options.parentOpenId
      })
    }
    // 二维码进入
    if (options.partnentID) {
      //  初始化获取用户信息
      that.getStorageInfo();
      that.setData({
        partnentID: options.partnentID
      })
    } else if (options.userSource){
      //  初始化获取用户信息
      that.getStorageInfo();
      that.setData({
        userSource: options.userSource
      })
    } else {
      //  初始化获取用户信息
      that.getStorageInfo();
    }
  },

  // 获取用户信息
  getStorageInfo: function (e) {
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
          that.getUserPhone();
        }
      }
    })
  },

  // 获取用户手机号
  getUserPhone: function (e) {
    wx.getStorage({
      key: 'userPhone',
      success: function (res) {
        that.setData({
          userPhone: res.data
        })
        if (that.data.userPhone == '') {
          that.setData({
            loginMask: 0
          })
        } else {
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
            "tel": res.data,
            "userSource":that.data.userSource,
            "unionid": that.data.user.unionId,
            "partnentID": that.data.partnentID,
            "recommenderId": that.data.parentOpenId
          };
          // 判断用户注册
          that.checkFun(params);
        }
      }
    })
  },

  //  登录授权
  getUserInfoBtn: function (e) {
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
    // 登录
    wx.login({
      success: res => {
        that.getOpenId(res.code)
      }
    })
  },

  getOpenId: function (code) {
    request.getOpenId(code).then(res => {
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
    request.authDecode(info).then(res => {
      var userInfo = {
        "avatarUrl": res.avatarUrl,
        "city": res.city,
        "country": res.country,
        "gender": res.gender,
        "nickName": res.nickName,
        "openId": res.openId,
        "province": res.province,
        "unionId": res.openId
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
            loginMask: 0
          })
        }
      })
    })
  },

  //  获取电话号码
  getPhoneNumber: function (e) {
    wx.showNavigationBarLoading();
    wx.showLoading({
      title: '获取中···',
    })
    if (e.detail.errMsg == 'getPhoneNumber:ok') {
      wx.getStorage({
        key: 'sessionKey',
        success: function (res) {
          const param = {
            encryptedData: e.detail.encryptedData,
            iv: e.detail.iv,
            sessionKey: res.data
          }
          request.authDecode(param).then(res => {
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
          title: res.description,
          icon: 'loading',
          duration: 1500
        })
      }
    })
  },
})