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
    nextMargin: 0
  },
  onLoad: function () {
  },
  // 添加我的爱车
  addCar: function () {
    wx.navigateTo({
      url:'../../pages/add_car/index'
    })
  }
})
