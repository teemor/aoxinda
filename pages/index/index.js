const app = getApp()
import {Technician} from '../../common/api/api'
const request = new Technician
import shop_detail from '../../mixin/shop_detail'
// import {
//   hotData
// } from '../../common/static/api_data'
Page({
  mixins: [shop_detail],
  data: {
    show:true,
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    vertical: false,
    autoplay: false,
    circular: false,
    interval: 2000,
    duration: 500, 
    previousMargin: 0,
    nextMargin: 0,
    latitude: 39.67386,
    longitude: 118.181576,
    markers: [{
      iconPath: 'http://maichefu.oss-cn-beijing.aliyuncs.com/ToShop/map03.png',
      id: 1,
      latitude: 39.677887,
      longitude: 118.183193,
      name: '时代购物中心',
      width: 50,
      height: 40
    }, {
      iconPath: 'http://maichefu.oss-cn-beijing.aliyuncs.com/ToShop/map01.png',
      id: 1,
      latitude: 39.677026,
      longitude: 118.185672,
      name: '国际会展中心',
      width: 15,
      height: 16
    }, {
      iconPath: 'http://maichefu.oss-cn-beijing.aliyuncs.com/ToShop/map01.png',
      id: 1,
      latitude: 39.683745,
      longitude: 118.196955,
      name: '大陆阳光',
      width: 15,
      height: 16
    }, {
      iconPath: 'http://maichefu.oss-cn-beijing.aliyuncs.com/ToShop/map02.png',
      id: 1,
      latitude: 39.673916,
      longitude: 118.181576,
      name: '远洋城',
      width: 15,
      height: 16
    }],
  },
  shopDetail:function(e){
    console.log(e,'首页详情')
  },
  addCar:function(){
    wx.navigateTo({
      url:'../../add_car_mes/index'
    })
  },
  onReady: function() {
    this.mapCtx = wx.createMapContext('myMap')
  },
  onLoad: function() {
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
    // wx.login({
    //   success(res){
    //     if(res.code){
    //       request.login(res.code).then(res=>{
    //         console.log(res)
    //         app.globalData.id = res.result
    //       })
    //     }
    //   }
    // })
    
    // setTimeout()
    // this.mapCtx.moveToLocation()
  },
  /**
   * 获取手机号
   * dzl
   */
  getPhoneNumber:function(e){
    if (e.detail.errMsg === 'getPhoneNumber:ok') {
      let that = this
      wx.login({
        success(res) {
          if (res.code) {
            let teste = encodeURIComponent(e.detail.encryptedData)
            request.encryptedData(teste, res.code, encodeURIComponent(e.detail.iv)).then(res => {
              that.setData({
                phoneNumber: res.description
              })
            })
          }
        }
      })
    } else {
      this.setData({
        inputShow: true,
        focus:true
      })
      console.log(this.data.inputShow)
    }
    console.log(e.detail)
  },
  // 点击查看
  detailBtn: function() {

  },
  // 倒计时
  showTime: function() {

  },
  // 添加我的爱车
  addCar: function() {
    wx.navigateTo({
      url: '../../pages/add_car_mes/index'
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
      url: '../../pages/upkeep_car/index'
    })
  }
})