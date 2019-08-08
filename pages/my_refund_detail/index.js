import {
  store
} from '../../common/api/clean_api'
const request = new store
const app = getApp();
Page({
  /**
   * 洗车美容退款详情
   * 页面的初始数据
   */
  data: {
    invoice: '',
    moreService: false
  },

  myStore: function(item) {
    console.log(item, 'cardid')
    wx.navigateTo({
      url: `../apply_store_list/index?id=${item.currentTarget.dataset.item}`,
    })
    // request.findOrderShop({orderDetailId:item.currentTarget.dataset.item,log:app.globalData.longitude,lat:app.globalData.latitude}).then(res=>{
    //   console.log(res,'res')
    // })

  },

  /**
   * 取消订单
   */
  canOrder: function() {
    request.canOrder({
      trade_status: 1,
      order_id: this.data.model.order_id
    }).then(res => {
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
  btnShip: function() {
    request.updateOrder({
      order_id: this.data.model.order_id,
      trade_status: 7
    }).then(res => {
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
          fail: () => {},
          complete: () => {}
        });

      }
    })
  },
  btnBuy: function() {
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
  addInvoice: function() {
    wx.navigateTo({
      url: `../my_order_invoice/index?options=${this.data.options}`
    })
  },
  /**
   * 退款进度
   */
  refundList: function() {
    wx.navigateTo({
      url: `../my_order_refund/index`,
      success: (result) => {

      },
      fail: () => {},
      complete: () => {}
    });

  },
  goDetail: function(e) {
    wx.navigateTo({
      url: `../shop_goods_detail/index?product_code=${e.currentTarget.dataset.item}`
    })
  },
  /**
   * 申请退款
   */
  goRefund: function(e) {
    console.log(e)
    let detail = e.currentTarget.dataset.refund
    this.data.model.detail = detail
    let model = encodeURIComponent(JSON.stringify(this.data.model))

    wx.navigateTo({
      url: `../add_refund/index?model=${model}`
    })
  },
  editInvoice: function() {
    wx.navigateTo({
      url: `../edit_invoice/index?id=${this.data.model.invoice_id}`
    })
  },
  /**
   * 查看服务单详情
   */
  toServerInfo: function(e) {
    wx.navigateTo({
      url: `../shop_store_service/index?id=${e.currentTarget.dataset.id}&server_order_id=${e.currentTarget.dataset.server}`
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options,'退款单号')
    request.findRefundByWechatRefundNo({ wechatRefundNo:options.ids}).then(res => {
      this.setData({
        detailData:res.data
      })
    })
 
  },
  onShow: function() {

  },
  /**
   * 进入评价页面
   */
  goEvaluate: function(e) {
    let relation_lists = [];
    let sers = e.currentTarget.dataset['sers'];
    for (let i in sers) {
      relation_lists.push(sers[i].conId);
    }
    let urlPath = "../../../pages/my_evaluate_record/index?ordercode=" + e.currentTarget.dataset['ordercode'] + "&shopid=" + e.currentTarget.dataset['shopid'] + "&";
    if (e.currentTarget.dataset['status'] == 1) {
      urlPath = "../../../pages/my_evaluate_show/index?";
    }
    wx.navigateTo({
      url: urlPath + 'relation_lists=' + relation_lists
    });
  }
})