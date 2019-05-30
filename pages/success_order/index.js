Page({
  data: {
  },

  onLoad: function (options) {
    let model = JSON.parse(decodeURIComponent(options.data))
    console.log(model,'model')
    this.setData({
      id:model.id
    })
    if (model.data === 'success') {
      this.setData({
        result: false
      })
    } else {
      console.log('2')
      this.setData({
        result: true
      })
    }
  },
  /**
   * 查看订单
   */
  orderList:function(){
    wx.navigateTo({
      url: `../my_order_detail/index?id=${this.data.id}`,
      success: (result) => {
      },
      fail: () => {},
      complete: () => {}
    });
  },
  /**
   * 重新付款
   */
  goPay:function(){
    wx.navigateBack({
      url: '1'
    });
  },
  /**
   * 继续逛逛
   */
  goCart:function(){
    wx.switchTab({
      url: '../index/index',
      success: (result) => {
        
      },
      fail: () => {},
      complete: () => {}
    });
  },
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

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