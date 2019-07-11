import {
  store
} from '../../common/api/api'
const request = new store
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let isNot = 0
    if (options.model) {
      let model = JSON.parse(decodeURIComponent(options.model))
      if (model.serType[0].name == '不计次数卡') {
        isNot = 3
      } else if (model.serType[0].name == '单次卡') {
        isNot = 2
      } else if (model.serType[0].name == '月月卡') {
        isNot = 4
      }
      request.findPayType({
        actId: model.serType[0].actId,
        actCardType: isNot,
        log:app.globalData.longitude,
        lat:app.globalData.latitude,
        type:1
      }).then(res => {
        this.setData({
          model:res.data[0]
        })
        console.log(res)
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次
   * 渲染完成
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