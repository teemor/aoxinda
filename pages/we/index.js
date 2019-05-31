const app = getApp();
Page({
  data: {

  },

  myKeep:function(){
    wx.navigateToMiniProgram({
      appId:'wx317e65151f04fa7c',
      envVersion:'trial'
    })
  },
  myCar:function(){
    wx.navigateTo({
      url:`../my_car/index`
    })
  },
  /**
   * 卡包
   * dzl
   */
  myCard: function() {
    wx.navigateTo({
      url: '../my_card_coupon/index'
    })
  },
  /**
   * 退款售后
   */
  myRefund:function(){
    wx.navigateTo({
      url:`../my_order_refund_list/index`
    })
  },
  /**
   * 购物车
   * dzl
   */
  myCart: function() {
    wx.navigateTo({
      url: '../my_cart/index'
    })
  },
  /**
   * 优惠券
   * dzl
   */
  myCoupon: function() {
    wx.navigateTo({
      url: '../my_coupon/index'
    })
  },
  /**
   * 跳转我的订单
   * dzl
   */
  myOrder: function() {
    wx.navigateTo({
      url: '../my_order/index',
    })
  },
  /**
   * 跳转收货地址
   * @param {*} options 
   */
  myAddress: function() {
    wx.navigateTo({
      url: '../my_address/index',
    })
  },
  /**
   * 我的预约
   * @param {*} options 
   */
  myReservation: function() {
    wx.navigateTo({
      url: '../my_reservation/index'
    })
  },
  /**
   * 邀请有礼
   * @param {*} options 
   */
  myInvite: function() {
    wx.navigateTo({
      url: '../my_invite/index'
    })
  },
  /**
   * 我的车库
   * @param {*} options 
   */
  myGrage: function() {
    wx.navigateTo({
      url: '../my_garage/index'
    })
  },
  /**
   * 我去过的店
   * @param {*} options 
   */
  myShopped: function() {
    wx.navigateTo({
      url: '../my_shopped/index'
    })
  },
  onLoad: function(options) {
    if(app.globalData.userInfo.avatarUrl){
      this.setData({
        avatar:app.globalData.userInfo.avatarUrl,
        nickName :app.globalData.userInfo.nickName,
        login:true
      })
    }else{
      this.setData({
        login:false
      })
    }
    
  },
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})