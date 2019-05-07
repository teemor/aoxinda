import { Technician } from '../../common/api/api'
const request = new Technician
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  addInvoice: function () {
    console.log('1')
    wx.navigateTo({
      url: '../my_order_invoice/index'
    })
  },
  /**
   * 退款进度
   */
  refundList: function () {
    wx.navigateTo({
      url: '../my_order_refund/index',
      success: (result) => {

      },
      fail: () => { },
      complete: () => { }
    });

  },
  /**
   * 申请退款
   */
  goRefund: function () {
    wx.navigateTo({
      url: '../add_refund/index'
    })
  },
  editInvoice: function () {
    console.log('2')
    wx.navigateTo({
      url: `../edit_invoice/index?id=${this.data.model.invoice_id}`
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    request.selectOrderDetail({ order_id: options.id }).then(res => {
      let date = new Date(res.create_at)
      let Y = date.getFullYear() + '-';
      let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      let D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate();
      let h = date.getHours() + ':';
      let m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMonth() + ':'
      let s = date.getSeconds();
      this.setData({
        model: res,
        date: Y + M + D + h + m + s
      })
      if (res.invoice_id === 1) {
        this.setData({
          id: res.invoiceData.id
        })
      }
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