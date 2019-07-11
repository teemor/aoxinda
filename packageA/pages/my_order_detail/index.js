import {
  store
} from '../../common/api/api'
const request = new store
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    invoice: ''
  },
  selectIdDetail:function(id){
    request.findOrderDetailsByOrderId({ id: id,  log: app.globalData.longitude, lat: app.globalData.latitude}).then(res => {
      this.setData({
        model: res.data
      })
    })
  },
  selectOrderDetail: function (id) {
    request.findOrderDetailsByOrderId({ outTradeNo: id, log: app.globalData.longitude, lat: app.globalData.latitude }).then(res => {
      this.setData({
        model: res.data
      })
    })
  },
  /**
   * 取消订单
   */
  canOrder: function () {
    request.canOrder({ trade_status: 1, order_id: this.data.model.order_id }).then(res => {
      console.log(res, 'res')
      wx.showToast({
        title: '取消订单成功',
        icon: 'none'
      })
      this.setData({
        'model.trade_status_name': '用户取消'
      })
    })
  },
  btnShip: function () {
    request.updateOrder({ order_id: this.data.model.order_id, trade_status: 7 }).then(res => {
      console.log(res, 'res')
      if (res.status === 0) {
        wx.showToast({
          title: '确认收货成功',
          icon: 'none',
          image: '',
          duration: 1500,
          mask: false,
          success: (result) => {
            wx.navigateBack({
              url: '1'
            })
          },
          fail: () => { },
          complete: () => { }
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
    this.setData({
      total: this.data.model.order_money,
      storeTotal: this.data.model.order_server_money || 0
    })
    this.pay(this.data.model.order_id)
  },
  addInvoice: function () {
    wx.navigateTo({
      url: `../my_order_invoice/index?options=${this.data.options}`
    })
  },
  /**
   * 退款进度
   */
  refundList: function () {
    wx.navigateTo({
      url: `../my_order_refund/index`,
      success: (result) => {

      },
      fail: () => { },
      complete: () => { }
    });

  },
  goDetail: function (e) {
    wx.navigateTo({
      url: `../shop_goods_detail/index?product_code=${e.currentTarget.dataset.item}`
    })
  },
  /**
   * 申请退款
   */
  goRefund: function (e) {
    let model = encodeURIComponent(JSON.stringify(this.data.model))
    wx.navigateTo({
      url: `../add_refund/index?model=${model}`
    })
  },
  editInvoice: function () {
    wx.navigateTo({
      url: `../edit_invoice/index?id=${this.data.model.invoice_id}`
    })
  },
  /**
  * 查看服务单详情
  */
  toServerInfo: function (e) {
    wx.navigateTo({
      url: `../shop_store_service/index?id=${e.currentTarget.dataset.id}&server_order_id=${e.currentTarget.dataset.server}`
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.selectOrderDetail("f69f5dc187814358b7ba53ad72139999",39.62429,118.20127)
    if (options.id) {
      this.selectOrderDetail(options.id)
      this.setData({
        id: options.id
      })
    }else if(options.ids){
      this.selectIdDetail(options.ids)
      this.setData({
        id: options.ids
      })
    }
  },
  onShow: function () {
    /**
   * 补开发票
   * @param {*} data 
   */
    if (this.data.item) {
      request.selectInvoice({
        id: this.data.item
      }).then(res => {
        if (res.data[0].invoice_type === 1) {
          this.setData({
            invoice: '增值税专用发票'
          })
        } else if (res.data[0].invoice_type === 0) {
          if (res.data[0].invoice_title === 0) {
            this.setData({
              invoice: '纸质普通发票 个人'
            })
          } else {
            this.setData({
              invoice: '纸质普通发票 公司'
            })
          }

        }
      })
      this.selectOrderDetail(this.data.id)
    }
  }
})