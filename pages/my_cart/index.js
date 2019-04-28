
Page({

  data: {

  },
  /**
   * 选择
   */
  onChange:function(e){
    console.log(e)
  },
  /**
   * 提交订单
   * @param {*} options 
   */
  goOrder:function(){
    wx.navigateTo({
      url: '../add_order/index',
      success: (result) => {
        
      },
      fail: () => {},
      complete: () => {}
    });
      
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