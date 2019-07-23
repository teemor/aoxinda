const app = getApp();
import login from '../../mixin/login'
import formSubmit from '../../mixin/form_sumbit.js'
Page({
  mixins: [login, formSubmit],
  data: {
    loginMask: 1,
    phoneMask: 1
    // parentOpenId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.parentOpenId) {
      //是否存在推荐人openId
      // this.setData({
      //   parentOpenId: options.parentOpenId
      // })
      app.globalData.parentOpenId = options.parentOpenId
    }
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