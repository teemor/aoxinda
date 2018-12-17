const app = getApp()
Page({
  data: {
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
      iconPath: '../../common/image/map03.png',
      id: 1,
      latitude: 39.677887,
      longitude: 118.183193,
      name: '时代购物中心',
      width: 50,
      height: 40
    }, {
      iconPath: '../../common/image/map01.png',
      id: 1,
      latitude: 39.677026,
      longitude: 118.185672,
      name: '国际会展中心',
      width: 15,
      height: 16
    }, {
      iconPath: '../../common/image/map01.png',
      id: 1,
      latitude: 39.683745,
      longitude: 118.196955,
      name: '大陆阳光',
      width: 15,
      height: 16
    }, {
      iconPath: '../../common/image/map02.png',
      id: 1,
      latitude: 39.673916,
      longitude: 118.181576,
      name: '远洋城',
      width: 15,
      height: 16
    }],
  },
  onReady: function() {
    this.mapCtx = wx.createMapContext('myMap')
  },
  onLoad: function() {
    setTimeout()
    // this.mapCtx.moveToLocation()
  },
  // 倒计时
  showTime: function() {
    
  },
  // 添加我的爱车
  addCar: function() {
    wx.navigateTo({
      url: '../../pages/add_car/index'
    })
  }
})