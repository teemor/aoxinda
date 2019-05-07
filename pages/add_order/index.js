const app = getApp()
import {
  Technician
} from '../../common/api/api'
const request = new Technician
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ispay: false,
    invoice: '不开具发票'
  },
  /**
   * 提交订单
   */
  btnBuy: function () {
    let data = this.data.goodsList.map(item => {
      return {
        goods_detail_id: item.goods_detail_id,
        goods_num: item.buy_num
      }
    })
    request.writeOrder({
      invoice_id: this.data.item,
      order_address: this.data.address,
      order_phone: this.data.phone,
      order_express: '普通快递',
      order_money: this.data.total + 0 + 12,
      pay_money: this.data.total + 0 + 12,
      data: data
    }).then(res => {
      let id = res.data
      wx.login({
        success(res) {
          if (res.code) {
            console.log(res.code,'res.code')
            request.payOrder({ code:res.code,open_id:'o2ZTm5SU5GDoA5ZT4fgsizV7--Zs',price:'1'}).then(res => {
              if(res.status===false){
                wx.showToast({
                  title:res.description
                })
              }else{
                let description = JSON.parse(res.result);
                wx.requestPayment({
                  timeStamp: description.timeStamp,
                  nonceStr: description.nonceStr,
                  package: description.package,
                  signType: description.signType,
                  paySign: description.paySign,
                  success: (result) => {
                    let data = {}
                    data.id = id
                    data.data = 'success'
                    let  model= encodeURIComponent(JSON.stringify(data))
                    wx.navigateTo({
                      url:`../success_order/index?data=${model}`
                    })
                  },
                  fail: () => {
                   let data = {}
                    data.id = id
                    data.data = 'fail'
                    let  model= encodeURIComponent(JSON.stringify(data))
                    wx.navigateTo({
                      url:`../success_order/index?data=${model}`
                    })
                  },
                  complete: () => {}
                });
                  
              }
            })
          }
        }
      })
    })
   

  },
  /**
   * 发票
   */
  addInvoice: function () {
    wx.navigateTo({
      url: '../my_order_invoice/index'
    })
  },
  /**
   * 地址
   * @param {*} options 
   */
  locationBtn: function () {
    wx.navigateTo({
      url: '../my_address/index',
      success: (result) => {

      },
      fail: () => { },
      complete: () => { }
    });

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let model = JSON.parse(decodeURIComponent(options.model))
    console.log(model, 'model')
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
  onShow: function () {
    if (this.data.item) {
      request.selectInvoice({ id: this.data.item }).then(res => {
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