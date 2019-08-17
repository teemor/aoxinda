import {
  store
} from '../../common/api/api'
import QR from '../../../utils/qrcode.js'
const request = new store
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    invoice: '',
    moreService: false,
    orderNum:''
  },

  //适配不同屏幕大小的canvas
  setCanvasSize: function () {
    var size = {};
    try {
      var res = wx.getSystemInfoSync();
      var scale = 750 / 686;
      var width = res.windowWidth / scale;
      var height = width; //canvas画布为正方形
      size.w = width;
      size.h = height;
    } catch (e) {
      console.log("获取设备信息失败" + e);
    }
    return size;
  },
  //绘制二维码图片
  createQrCode: function (content, canvasId, cavW, cavH) {
    //调用插件中的draw方法，绘制二维码图片
    QR.api.draw(() => {
      this.canvasToTempImage(canvasId);
    }, content, canvasId, cavW, cavH);
  },
  //获取临时缓存照片路径，存入data中
  canvasToTempImage: function (canvasId) {
    let that = this;
    wx.canvasToTempFilePath({
      canvasId: canvasId, // 这里canvasId即之前创建的canvas-id
      success: function (res) {
        let tempFilePath = res.tempFilePath;
        console.log(tempFilePath);
        that.setData({ // 如果采用mpvue,即 this.imagePath = tempFilePath
          imagePath: tempFilePath,
        });
      },
      fail: function (res) {
        console.log(res);
      }
    });
  },

  /**
   * 查看我的卡
   */
  btnCard: function () {
    let model = {}
    model.id = this.data.id
    model.actCardType = this.data.model.detail.cardType
    wx.navigateTo({
      url: `../../../pages/my_service_card_detail/index?id=${JSON.stringify(model)}&orderNum=${this.data.orderNum}`,
    })
  },
  moreService: function () {
    this.setData({
      moreService: !this.data.moreService
    })
  },
  myStore: function (item) {
    console.log(item, 'cardid')
    wx.navigateTo({
      url: `../apply_store_list/index?id=${item.currentTarget.dataset.item}`,
    })
    // request.findOrderShop({orderDetailId:item.currentTarget.dataset.item,log:app.globalData.longitude,lat:app.globalData.latitude}).then(res=>{
    //   console.log(res,'res')
    // })

  },
  selectIdDetail: function (id) {
    request.findOrderDetailsByOrderId({
      id: id,
      log: app.globalData.longitude,
      lat: app.globalData.latitude
    }).then(res => {
      // if (Object.keys(res.data.shop).length==0) {
      //   this.setData({shop:false})
      // }else{
      //   this.setData({
      //     shop:true
      //   })
      // }
      this.setData({
        model: res.data,
        cartType: res.data.detail[0].cardType,
        orderNum: res.data.orderNum
      })
      var size = this.setCanvasSize(); //动态设置画布大小
      let content = {
        type: '2',
        card_id: '',
        order_code: this.data.model.orderNum
      }
      this.createQrCode(JSON.stringify(content), "canvas", size.w, size.h);
    })
  },
  selectOrderDetail: function (id) {
    request.findOrderDetailsByOrderId({
      outTradeNo: id,
      log: app.globalData.longitude,
      lat: app.globalData.latitude
    }).then(res => {
      this.setData({
        model: res.data
      })
      var size = this.setCanvasSize(); //动态设置画布大小
      let content = {
        type: '2',
        card_id: '',
        order_code: this.data.model.orderNum
      }
      this.createQrCode(content.toString(), "canvas", size.w, size.h);
      if (this.data.model.detail.length > 2) {
        this.setData({
          moreText: true,
          leftNum: this.data.model.detail - 2
        })
      }
    })
  },
  /**
   * 取消订单
   */
  canOrder: function () {
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
  btnShip: function () {
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
    console.log(e)
    let detail = e.currentTarget.dataset.refund
    this.data.model.detail = detail
    let model = encodeURIComponent(JSON.stringify(this.data.model))
    console.log(model)
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
    } else if (options.ids) {
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
    request.cardDetConOrder({
      pageSize: 5,
      pageIndex: 1,
      orderId: this.data.id
    }).then(res => {
      this.setData({
        consumption: res.data
      })
      console.log(res)
    })
  },
  /**
   * 进入评价页面
   */
  goEvaluate: function (e) {
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
      url: urlPath + 'relation_lists=' + relation_lists + "&detailtype=" + e.currentTarget.dataset['detailtype']
    });
  }
})