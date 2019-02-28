Page({

  /**
   * 页面的初始数据
   */
  data: {
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    latitude: 39.67386,
    longitude: 118.181576,
    markers: [],
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
  console.log(options,'options')
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
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