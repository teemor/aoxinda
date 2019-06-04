require('./utils/mixin.js')
import {Technician} from './common/api/api'
const api = require('./utils/api')
const request = new Technician
App({
  globalData:{
    openId:'',
    userInfo: null,
    id:''
  },
  appid: "wx97a3505497150b66",
  onLaunch: function () {
    //  加载天气数据
    this.loadWeatherData();
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    let that = this
    // 登录
    wx.login({
      success(res){
        if(res.code){
          request.getOpenid(res.code).then(res=>{
            that.globalData.openId = res.openid
          })
          // request.login(res.code).then(res=>{
          //   console.log(res)
            
          //   app.globalData.id = res.result
          // })
        }
      }
    })

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  loadWeatherData: function() {
    var citySelected = wx.getStorageSync('citySelected') || [];
    if (citySelected.length == 0) {
      citySelected.unshift("__location__");
      wx.setStorageSync('citySelected', citySelected);
    }

    var that = this
    for (var idx in citySelected) {
      var cityCode = citySelected[idx];
      api.loadWeatherData(cityCode, function (cityCode, data) {
        var weatherData = wx.getStorageSync('weatherData') || {};
        weatherData[cityCode] = data;
        wx.setStorageSync('weatherData', weatherData);
      });
    }
  }
})