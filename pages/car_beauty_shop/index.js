import { Technician } from '../../common/api/api'
const request = new Technician
let iphonex = require('../../mixin/iphonex.js')
let QQMapWX = require('../../utils/qqmap-wx-jssdk')
let constant = require('../../utils/constant')
let qqmapsdk;
Page({
  mixins:[iphonex],

  /**
   * 页面的初始数据
   */
  data: {
    background: ['demo-text-1'],
    latitude: '',
    longitude: '',
    markers: [{
    }],
    http:'https://www.maichefu.cn'
  },
  makePhone:function(e){
    console.log(e)
    wx.makePhoneCall({
      phoneNumber: e.target.dataset.item
    })
  },
  /**
   * 购买
   * dzl
   */
  buy:function(){
    wx.navigateTo({
      url: '../car_beauty_shop_buy/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options){
      let obj = JSON.parse(options.id)
      this.setData({
        obj:obj
      })
    }
    // 初始化地图
    this.scopeSetting();
    
  console.log(options,'options')
  this.getCenterLocation();
  this.requestLocation();
  },
  scopeSetting: function () {
    var that = this;
    wx.getSetting({
      success(res) {
        //地理位置
        if (!res.authSetting['scope.userLocation']) {
          wx.authorize({
            scope: 'scope.userLocation',
            success(res) {
              that.initMap();
            },
            fail() {
              wx.showModal({
                title: '提示',
                content: '定位失败，你未开启定位权限，点击开启定位权限',
                success: function (res) {
                  if (res.confirm) {
                    wx.openSetting({
                      success: function (res) {
                        if (res.authSetting['scope.userLocation']) {
                          that.initMap();
                        } else {
                          consoleUtil.log('用户未同意地理位置权限')
                        }
                      }
                    })
                  }
                }
              })
            }
          })
        } else {
          that.initMap();
        }
      }
    })
  },
  /**
   * 初始化地图
   */
  initMap:function(){
    var that = this;
    qqmapsdk = new QQMapWX({
      key: constant.tencentAk
    });
    that.getCenterLocation();
  },
  /**
   * 得到中心点坐标
   */
  getCenterLocation:function(){
let that = this;
let mapCtx =wx.createMapContext('myMap');
mapCtx.getCenterLocation({
  success(res){
    console.log('getCenterLocation----------------------->');
    console.log(res);
    that.updateCenterLocation(res.latitude,res.longitude)
    that.regeocodingAddress();
    // that.queryMarkerInfo()
  }
})
  },
  /**
   * 更新中心坐标点
   */
  updateCenterLocation:function(latitude,longitude){
    let that = this;
    that.setData({
      centerLatitude:latitude,
      centerLongitude:longitude
    })
  },
    /**
   * 逆地址解析
   */
  regeocodingAddress: function () {
    var that = this;
    //不在发布页面，不进行逆地址解析，节省调用次数，腾讯未申请额度前一天只有10000次
    if (!that.data.showConfirm) {
      return;
    }
    //通过经纬度解析地址
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: that.data.centerLatitude,
        longitude: that.data.centerLongitude
      },
      success: function (res) {
        console.log(res);
        that.setData({
          centerAddressBean: res.result,
          selectAddress: res.result.formatted_addresses.recommend,
          currentProvince: res.result.address_component.province,
          currentCity: res.result.address_component.city,
          currentDistrict: res.result.address_component.district,
        })
      },
      fail: function (res) {
        console.log(res);
      }
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.mapCtx = wx.createMapContext('myMap')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('hehehe')
let that = this;
that.getCenterLocation();
that.requestLocation();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  },
/**
 * 请求地理位置
 * dzl
 */
requestLocation: function () {
  var that = this;
  wx.getLocation({
    type: 'gcj02',
    success: function (res) {
      that.setData({
        latitude: res.latitude,
        longitude: res.longitude,
      })
      that.moveTolocation();
    },
  })
},
  /**
   * 移动到中心点
   */
  moveTolocation: function () {
    var mapCtx = wx.createMapContext(mapId);
    mapCtx.moveToLocation();
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})