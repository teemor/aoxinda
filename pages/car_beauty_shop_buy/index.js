import {
  typeServiceList
} from '../../common/static/api_data'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeServiceList,
    miniClick: true,
    reslut:Object
  },

  /**
   * 洗车服务复选框
   * dzl
   */
  typeChange: function(e) {
    console.log(e, 'e')
    this.setData({
      reslut:e.detail
    })
  },
  /**
   * 选择中大型汽车
   * @param {*} options 
   */
  bigClick: function() {
    this.setData({
      miniClick: false
    })
  },
  /**
   * 选择轿车
   * @param {*} options 
   */
  miniClick: function() {
    this.setData({
      miniClick: true
    })
  },
  /**
   * 结算
   * @param {*} options 
   */
  buy:function(){
    wx.navigateTo({
      url: '../car_beauty_shop_res/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
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