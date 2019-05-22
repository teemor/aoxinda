import { Technician } from '../../common/api/api'
const request = new Technician
import pay from '../../mixin/pay'
import shop_detail from '../../mixin/shop_detail'
Page({
  mixins: [pay,shop_detail],
  /**
   * 页面的初始数据
   */
  data: {

  },
  btnShip:function(){
    request.updateOrder({order_id:this.data.model.order_id,trade_status:7}).then(res=>{
      console.log(res,'res')
      if(res.status===0){
        wx.showToast({
          title: '确认收货成功',
          icon: 'none',
          image: '',
          duration: 1500,
          mask: false,
          success: (result) => {
            
          },
          fail: () => {},
          complete: () => {}
        });
          
      }
    })
  },
  btnBuy: function () {
    let data = this.data.model.goodsData.map(item => {
      return {
        goods_detail_id: item.goods_detail_id,
        goods_num: item.buy_num
      }
    })
    this.writeOrder(this.data.model.invoice_id,
      this.data.model.order_address,
      this.data.model.order_phone,
     '普通快递',
      this.data.model.order_money,
       this.data.model.pay_money,
      data)
  },
  addInvoice: function () {
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
  this.selectOrderDetail(options)
  },

  /**
   * 查看服务详情
   */
  toServerInfo() {
    wx.navigateTo({
      url: `../shop_store_service/index?server_order_id=${this.data.model.server_order_id}&id=${this.data.thisID}`
    })
  }
})