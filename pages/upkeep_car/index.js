Page({
  data: {

  },
  /**
   * 选择技师施工
   * @param {*} options 
   */
  chooseTecher: function () {
    wx.navigateTo({
      url:"../upkeep_car_choose/index"
    })
  },
  /**
   * 直接购买
   * @param {*} options 
   */
  btnBuy:function(){
    wx.navigateTo({
      url:"../upkeep_car_order/index"
    })
  },
  onLoad: function (options) {
    
  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  }
})