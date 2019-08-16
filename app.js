require('./utils/mixin.js')
import {Technician} from './common/api/api'
const api = require('./utils/api')
import { tabbarConfig} from "./common/static/api_data.js"
const setRouterConfig = require("./utils/util.js")
const request = new Technician
App({
  shopid:'',
  tabbarConfig: tabbarConfig,
  isHideTabbar:false,
  ...setRouterConfig,
  globalData:{
    phoneNum:'',
    openId:'',
    userInfo: null,
    id:'',
    options:'',
    carType:'',
    longitude:'',
    latitude:''
  },
  storeList:{
    actId:'',
    actCardType:''
  },
  address:'',
  appid: "wx97a3505497150b66",
  onLaunch: function () {
    let that = this
    wx.getStorage({
      key: 'user',
      success: function (res) {
        that.globalData.userInfo=res.data
        wx.getStorage({
          key: 'userPhone',
          success: function (res) {
            that.globalData.phoneNum=res.data
          },
          fail:()=>{
            console.log('hehe1')
            wx.redirectTo({
              url: '../../pages/login/index',
              success: (result) => {
              },
              fail: () => {},
              complete: () => {}
            });
          }
        })
      },
      fail: function (res) {
        console.log('hehe')
       wx.redirectTo({
          url: '../../pages/login/index',
          success: (result) => {
          },
          fail: () => {},
          complete: () => {}
        });
      }
    })

    //  加载天气数据
    that.loadWeatherData();
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
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
   /**
   * 保存formId
   * author dzl
   */
  dealFormIds: function (formId) {
    let formIds = this.globalData.globalFormIds;//获取全局数据中的推送码globalFormIds数组
    if (!formIds) {
      formIds = [];
    }
    let data = {
      formId: formId,
      expire: parseInt(new Date().getTime() / 1000) + 604800 //计算７天后的过期时间时间戳
    }
    formIds.push(data); //将data添加到数组的末尾
    this.globalData.globalFormIds = formIds; //保存推送码并赋值给全局变量
  },
  /**
  * 将formIds传到后端,并清空
  * author dzl
  */
  saveFormIds: function () {
    let formIds = this.globalData.globalFormIds;
    if (formIds.length) { 
      //globalFormIds存在的情况下，将数组转换为JSON字符串
      formIds = JSON.stringify(formIds);
      this.globalData.globalFormIds = '';
    }
    //掉接口传formids
   console.log(formIds,'formIDs')
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