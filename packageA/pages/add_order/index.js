import {
  store
} from '../../common/api/api'
const request = new store
const app = getApp()
import find_car from '../../../mixin/find_car'

Page({
  mixins: [find_car],
  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.findCarList()

    if (options.model) {
      let model = JSON.parse(decodeURIComponent(options.model))
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  addInvoice: function () {
    wx.navigateTo({
      url: '../my_order_invoice/index'
    })
  },
  onChange: function (e) {
    this.setData({
      inCheck: e.detail
    })
  },
  onSubmit: function () {

    console.log(this.data.model.carId, 'car')
    request.pay({ carId: this.data.model.carId, userId: app.globalData.openId, userName: app.globalData.userInfo.nickName, userPhone: app.globalData.phoneNum }).then(res => {
      console.log(res)
    })
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