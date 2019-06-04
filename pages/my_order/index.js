import { myOrderMenu } from '../../common/static/api_data'
import { Technician } from '../../common/api/api'
import pay from '../../mixin/pay'
const request = new Technician
Page({
  mixins:[pay],
  data: {
    myOrderMenu,
    active:0
  },
  tabchange: function ({detail}) {
    if(detail.titlea===0){
      this.selectOrder({})
    }else{
      this.selectOrder({trade_status:detail.titlea})
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id==="17") {
      this.setData({
        active: 1
      })
    }else if(options.id==="6"){
      this.setData({
        active:2
      })
    }else if(options.id==="5"){
      this.setData({
        active:3
      })
    }else if(options.id==="7"){
      this.setData({
        active:4
      })
    }
this.onShow();
  },
  goOrder:function(e){
    this.setData({
      total:e.detail.pay_money
    })
    this.pay(e.detail.id)
  },
  selectOrder: function (model) {
    console.log(model)
    request.selectMyOrder(model).then(res => {
      this.setData({
        goodsList: res.orderData
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
      url: `../my_order_detail/index?id=${detail.id}`
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
    this.selectOrder({})
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