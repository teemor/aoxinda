import { store } from '../../common/api/clean_api'
import {
  myServiceOrderMenu
} from '../../common/static/api_data'
const request = new store
const app = getApp();
Page({
  data: {
    myServiceOrderMenu,
    active: 0
  },
  tabchange: function ({ detail }) {
    if (detail.titlea === 0) {
      this.selectOrder({})
    } else {
      this.selectOrder({ trade_status: detail.titlea })
    }
  },
  onPullDownRefresh: function () {
    this.setData({
      active: this.data.active
    })
    this.selectOrder(1,3)
    wx.stopPullDownRefresh()

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id === "17") {
      this.setData({
        active: 1
      })
    } else if (options.id === "6") {
      this.setData({
        active: 2
      })
    } else if (options.id === "5") {
      this.setData({
        active: 3
      })
    } else if (options.id === "7") {
      this.setData({
        active: 4
      })
    }
    this.selectOrder(1,100)
  },
  goOrder: function (e) {
    this.setData({
      total: e.detail.pay_money
    })
    this.pay(e.detail.id)
  },
  selectOrder: function (index,size,status) {
    request.findOrderPage({pageIndex:index,pageSize:size,orderStatus:status,userId:app.globalData.openId}).then(res => {
      this.setData({
        goodsList: res.data.records
      })
    })
  },
  /**
   * 订单详情
   * dzl
   */
  /**
    * 详情
    * dzl
    */
  orderDetail: function ({ detail }) {
    wx.navigateTo({
      url: `../../packageA/pages/my_order_detail/index?ids=${detail.id}`
    })
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