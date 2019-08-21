import {
  Technician
} from '../../common/api/api'
const request = new Technician
import {
  store
} from '../../common/api/clean_api.js'
const requesetA = new store
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {},
  tabchange: function(e) {
    console.log(e, '点击')
  },
  refundDetail: function(data) {
    console.log(data, 'data')
    /**
     * 跳转退款详情0
     */
    wx.navigateTo({
      url: `../my_refund_detail/index?ids=${data.currentTarget.dataset.item}`,
      success: (result) => {

      },
      fail: () => {},
      complete: () => {}
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // let model = JSON.parse(decodeURIComponent(options.model))
    request.selectMyBackOrderList().then(res => {
      this.setData({
        refundList: res
      })
      if (res.backOrderData.length = 0) {
        this.setData({
          back: 0
        })
      } else {
        this.setData({
          back: 1
        })
      }
      console.log(res, 'res')
    })
    requesetA.findRefundByUserId({
      userId: app.globalData.openId,
      "pageIndex": 1,
      "pageSize": 100
    }).then(res => {
      this.setData({
        refundClean: res.data.records
      })

      console.log(res, 'res')
    })
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