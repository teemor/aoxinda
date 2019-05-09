const app = getApp()
import {
  Technician
} from '../../common/api/api'
const request = new Technician
import pay from '../../mixin/pay'
Page({
  mixins: [pay],
  /**
   * 页面的初始数据
   */
  data: {
    ispay: false,
    invoice: '不开具发票'
  },
  /**
   * 发票
   */
  addInvoice: function() {
    wx.navigateTo({
      url: '../my_order_invoice/index'
    })
  },

  /**
   * 提交订单
   */
  btnBuy: function() {
    let data = this.data.goodsList.map(item => {
      return {
        goods_detail_id: item.goods_detail_id,
        goods_num: item.buy_num
      }
    })
    this.writeOrder(this.data.item, this.data.address, this.data.phone, '普通快递', this.data.total + 0 + 12, this.data.total + 0 + 12,data)
  },
  /**
   * 地址
   * @param {*} options 
   */
  locationBtn: function() {
    wx.navigateTo({
      url: '../my_address/index',
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
    let model = JSON.parse(decodeURIComponent(options.model))
    this.setData({
      goodsList: model.arr,
      total: model.total_price,
      sum: model.sum
    })
    request.selectAddressList({
      is_check: 1
    }).then(res => {
      this.setData({
        name: res.data[0].name,
        phone: res.data[0].phone,
        address: res.data[0].province + res.data[0].city + res.data[0].county + res.data[0].street
      })
      console.log(res, 'res')
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
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
    }
    if (this.data.adddata) {
      console.log(this.data.adddata.detail, 'adddata')
      let address = this.data.adddata.detail
      this.setData({
        name: address.name,
        address: address.province + address.city + address.county + address.street
      })
    }
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