const app = getApp()
import {Technician} from '../../common/api/api'
const request = new Technician
import shop_detail from '../../mixin/shop_detail'
import shop_list from '../../mixin/shop_list'
import login from '../../mixin/login'
import find_car from '../../mixin/find_car'
const api = require('../../utils/api')
// import {
//   hotData
// } from '../../common/static/api_data'
Page({
  mixins: [shop_detail,shop_list,login,find_car],
  data: {
    userInfo: {},
    citySelected: {},
    weatherData: {},
    topCity: {},
    show:true,
    vertical: false,
    autoplay: false,
    circular: false,
    interval: 2000,
    duration: 500, 
    previousMargin: 0,
    nextMargin: 0,
    loginMask:1,
    phoneMask:1
  },
  shopBtn:function(){
    wx.switchTab({
      url: `../shopping_mall/index`
    })
  },
  onReady: function() {
    this.mapCtx = wx.createMapContext('myMap')
  },
  onLoad: function() {
    console.log(app.globalData.userInfo,'userinfo')
    if(app.globalData.userInfo!==null){
        this.setData({
          loginMask:1,
          phoneMask:1
        })
    }else{
      this.getStorageInfo()
    }
    this.findCarList();
    // 天气
    var defaultCityCode = "__location__";
    var citySelected = wx.getStorageSync('citySelected');
    var weatherData = wx.getStorageSync('weatherData');
    if (citySelected.length == 0 || weatherData.length == 0) {
      var that = this
      api.loadWeatherData(defaultCityCode, function (cityCode, data) {
        var weatherData = {}
        weatherData[cityCode] = data;
        that.setHomeData([cityCode], weatherData);
      });
    } else {
      this.setHomeData(citySelected, weatherData);
    }
    console.log(app,'app')
    // 人气推荐
    request.recommendIndex().then(res=>{
      this.setData({
        hotData:res.data
      })
    })
    // 商城精选
    request.chooseIndex().then(res=>{
      this.setData({
        chooseData:res.data
      })
    })
 
    
    // setTimeout()
    // this.mapCtx.moveToLocation()
  },
  /**
   * 获取手机号
   * dzl
   */
  // getPhoneNumber:function(e){
  //   if (e.detail.errMsg === 'getPhoneNumber:ok') {
  //     let that = this
  //     wx.login({
  //       success(res) {
  //         if (res.code) {
  //           let teste = encodeURIComponent(e.detail.encryptedData)
  //           request.encryptedData(teste, res.code, encodeURIComponent(e.detail.iv)).then(res => {
  //             that.setData({
  //               phoneNumber: res.description
  //             })
  //           })
  //         }
  //       }
  //     })
  //   } else {
  //     this.setData({
  //       inputShow: true,
  //       focus:true
  //     })
  //     console.log(this.data.inputShow)
  //   }
  //   console.log(e.detail)
  // },
  // 点击查看
  detailBtn: function() {

  },
  // 倒计时
  showTime: function() {

  },
  // 添加我的爱车
  addCar: function() {
    console.log(app.globalData)
    if(app.globalData.userInfo!==null&&app.globalData.phoneNum!==""){
      wx.navigateTo({
        url:'../../pages/add_car_mes/index'
      })
    }else{
      this.getStorageInfo()
    }
    
  },
  editCar:function(){
    wx.navigateTo({
      url:'../../pages/my_car/index'
    })
  },
  // 汽车美容
  carbeautyBtn: function() {
    wx.navigateTo({
      url: '../../pages/car_beauty/index',
    })
  },
  // 车保养
  upkeepBtn: function() {
    wx.navigateTo({
      url: '../../pages/c_upkeep_car/c_upkeep_car'
    })
  },
  // 邀请
  myInvite: function() {
    wx.navigateTo({
      url: '../../pages/my_invite/index'
    })
  },
  onSearch: function(e) {
    console.log('rwer',e)
    wx.navigateTo({
      url: '../search_shop_list/index'
    })
  },
  // 天气
  
  setHomeData: function (citySelected, weatherData) {
    var topCity = {
      left: "",
      center: "",
      right: "",
    }
    try { topCity.center = weatherData[citySelected[0]].realtime.city_name; } catch (e) { }
    try { topCity.right = weatherData[citySelected[1]].realtime.city_name; } catch (e) { }

    this.setData({
      weatherData: weatherData,
      topCity: topCity,
      citySelected: citySelected,
    })
  },
})