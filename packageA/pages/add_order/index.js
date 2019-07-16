import {
  store
} from '../../common/api/api'
const request = new store
const app = getApp()
import find_car from '../../../mixin/find_car'

Page({
  mixins: [find_car],
  /**
   * 页面的初始数据
   */
  data: {
    add:true,
    isInvoice: "0"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.findCarList()
    if (options.model) {
      let model = JSON.parse(decodeURIComponent(options.model))
      this.setData({
        serviceModel:model,
        shopId:model[0].shopId,
        card:1
      })
      console.log(model, 'model13')
      let orderDetails = model.map(item => {
        return {
          activityId: item.activityId,
          buyPrice: item.actPrice,
          num: item.cartNum
        }
      });
      let totalPrice = 0
      orderDetails.forEach(item => {
        totalPrice += item.num * item.buyPrice
      });

      this.setData({
        totalPrice: totalPrice,
        orderDetails: orderDetails,
        serivceNum:orderDetails.length
      })
      request.findShopDet({
        shopId: model[0].shopId
      }).then(res => {
        this.setData({
          detailModel: res.data
        })
      })
      console.log(this.data.orderDetails, 'orderDetails')

    }else if(options.card){
      let model = JSON.parse(decodeURIComponent(options.card))
      this.setData({
        shopId:model[0].shopId,
      })
      let orderDetails = model.map(item => {
        return {
          activityId: item.actId,
          buyPrice: item.actPrice,
          num: 1
        }
      });
      let totalPrice = 0
      orderDetails.forEach(item => {
        totalPrice += item.num * item.buyPrice
      });
      this.setData({
        card:0,
        orderDetails:orderDetails,
        totalPrice:totalPrice
      })
      console.log(this.data.orderDetails,'orderDetails')
    }
  },
  numChange:function({detail}){
    let num = detail.num
    console.log(num,'数量')
    let totalPrice=0
    console.log(this.data.orderDetails,'orderDetails')
    this.data.orderDetails.forEach(item => {
      totalPrice += item.num * item.buyPrice
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  addInvoice: function() {
    wx.navigateTo({
      url: '../my_order_invoice/index'
    })
  },
  onChange: function(e) {
    this.setData({
      inCheck: e.detail
    })
  },
  onSubmit: function() {
    request.pay({
      carName:this.data.model.model,
      shopId:this.data.shopId,
      invoiceId:this.data.isInvoice===0?'':this.data.invoiceId,
      buyType: this.data.card,
      goodsTotalPrice: this.data.totalPrice,
      isInvoice: this.data.isInvoice,
      orderDetails: this.data.orderDetails,
      carNum: this.data.model.plateNum,
      carId: this.data.model.carId,
      userId: app.globalData.openId,
      userName: app.globalData.userInfo.nickName,
      userPhone: app.globalData.phoneNum
    }).then(res => {
      if (res.status === false) {
        wx.showToast({
          title: res.description
        })
      } else {
        let that = this
        let description = JSON.parse(res.result);
        wx.requestPayment({
          timeStamp: description.timeStamp,
          nonceStr: description.nonceStr,
          package: description.package,
          signType: description.signType,
          paySign: description.paySign,
          success: (result) => {
            let data = {}
            data.id = description.outTradeNo,
            data.data = 'success'
            data.price = that.data.totalPrice
            let model = encodeURIComponent(JSON.stringify(data))
            wx.redirectTo({
              url: `../success_order/index?data=${model}`
            })
          },
          fail: () => {
            let data = {}
            data.id = description.outTradeNo,
            data.data = 'fail'
            let model = encodeURIComponent(JSON.stringify(data))
            wx.redirectTo({
              url: `../success_order/index?data=${model}`
            })
          },
          complete: () => {}
        });

      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    if (this.data.item) {
      this.setData({
        invoiceId: this.data.item,
       isInvoice:1
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