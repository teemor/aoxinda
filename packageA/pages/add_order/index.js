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
    add: true,
    isInvoice: "0",
    payType: 0,
    payData: [{
      name: '微信支付',
      type: 0
    }, {
      name: '金麦卡',
      type: 1
    }],
    codeBtn: '获取验证码'
  },

  /**
   * 支付方式
   */
  wxPayShow: function() {
    this.setData({
      wxPay: !this.data.wxPay
    })
  },
  wxPwdShow: function() {
    this.setData({
      falseGold: false
    })
  },
  setPwd: function() {

  },
  payChoose: function(e) {
    this.setData({
      payType: e.currentTarget.dataset.item.type
    })
    // if (this.data.payType == 1 && this.data.cardGold == true) {
    //   if (this.data.pwdGold == true) {
    //     this.setData({
    //       trueGold: true,
    //       wxPay: false
    //     })
    //   } else {
    //     this.setData({
    //       falseGold: true,
    //       wxPay: false
    //     })
    //   }
    // } else {
    //   wx.navigateTo({
    //     url: '../../../pages/stored_value_card/index',
    //   })
    // }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  pwdSubmit: function(e) {
    let arr = ''
    for (let i = 1; i < 7; i++) {
      arr += e.detail.value[i]
    }
    request.passCheck({
      param1: app.globalData.openId,
      param2: arr
    }).then(res => {
      wx.showToast({
        title: res.msg,
        duration: 1500
      })
      if (res.state == 0) {
        this.setData({
          flag: false
        })
      } else {
        this.setData({
          trueGold: false,
          flag: true
        })
      }
      console.log(res, '校验密码')
    })
  },
  wxGlodShow: function() {
    this.setData({
      trueGold: false
    })
  },
  formSubmit: function(e) {
    request.checkSms({
      phone: this.data.phoneNum,
      code: e.detail.value[7]
    }).then(res => {
      if (res.state == '验证成功') {
        let arr = ''
        for (let i = 1; i < 7; i++) {
          arr += e.detail.value[i]
        }
        request.updatePass({
          phone: this.data.phoneNum,
          code: e.detail.value[7],
          param1: arr,
          id: app.globalData.openId
        }).then(res => {
          wx.showToast({
            title: res.state,
            duration: 3000
          })
          this.setData({
            falseGold: false
          })
        })
      }
    })


  },
  btnCode: function() {
    let that = this
    let codeCount = 90
    that.setData({
      codeBtn: `已发送${codeCount}秒`,
    })
    let initCode = setInterval(() => {
      if (codeCount === 0) {
        that.setData({
          codeBtn: `重新获取`
        })
        clearInterval(initCode)
        return
      } else {
        that.setData({
          codeBtn: `已发送${--codeCount}秒`
        })
      }
    }, 1000)
    request.sendSms({
      phone: that.data.phoneNum
    }).then(res => {
      console.log(res, 'res')
    })
  },
  onLoad: function(options) {

    let phone = app.globalData.phoneNum
    console.log(phone, '电话')
    var mphone = phone.substring(0, 3) + '****' + phone.substring(7);
    this.setData({
      phoneNum: phone,
      phone: mphone
    })
    console.log(this.data.phone, 'heh')
    this.findCarList()
    if (options.model) {
      let model = JSON.parse(decodeURIComponent(options.model))
      console.log(model, 'shopid')
      request.findcartList({
        userId: app.globalData.openId,
        shopId: model[0].shopId,
        pageIndex: 1,
        pageSize: 10
      }).then(res => {
        this.setData({
          serviceModel: res.data.records
        })
      })
      this.setData({
        serviceModel: model,
        shopId: model[0].shopId,
        card: 1
      })
      console.log(model, 'model13')
      let orderDetails = model.map(item => {
        return {
          activityId: item.activityId,
          servicePrice: item.actPrice,
          cardPrice: item.actCardPrice,
          num: item.cartNum
        }
      });
      let totalPrice = 0
      let totalCard = 0
      orderDetails.forEach(item => {
        totalPrice += item.num * item.servicePrice,
          totalCard += item.num * item.cardPrice
      });

      this.setData({
        totalPrice: totalPrice,
        totalCard: totalCard,
        orderDetails: orderDetails,
        serivceNum: orderDetails.length
      })
      request.findShopDet({
        shopId: model[0].shopId
      }).then(res => {
        this.setData({
          detailModel: res.data
        })
      })
      console.log(this.data.orderDetails, 'orderDetails')

    } else if (options.card) {
      let model = JSON.parse(decodeURIComponent(options.card))
      console.log(model, 'ka支付')
      this.setData({
        cardModel: model[0],
        shopId: model[0].shopId,
      })
      let orderDetails = model.map(item => {
        return {
          activityId: item.actId,
          servicePrice: item.actPrice,
          num: 1
        }
      });
      let totalPrice = 0
      orderDetails.forEach(item => {
        totalPrice += item.num * item.servicePrice
      });
      this.setData({
        card: 0,
        orderDetails: orderDetails,
        totalPrice: totalPrice,
      })
      console.log(this.data.orderDetails, 'orderDetails')
    }
    request.findCard({
      user_id: app.globalData.openId
    }).then(res => {
      this.setData({
        cardGold: res.state == 1 ? true : false,
        goldprice: res.money
      })
      if (res.state == 1) {
        request.findPass({
          user_id: app.globalData.openId
        }).then(res => {
          this.setData({
            pwdGold: res.state == 1 ? true : false
          })
        })
      }
      console.log(res, 'res')

    })
  },
  numChange: function({
    detail
  }) {
    request.addCart({
      shopId: this.data.shopId,
      userId: app.globalData.openId,
      activityId: detail.item !== undefined ? detail.item.activityId : detail.activityId,
      cartNum: detail.num,
      price: detail.item !== undefined ? detail.item.actPrice : detail.actPrice
    }).then(res => {
      request.findcartList({
        userId: app.globalData.openId,
        shopId: this.data.shopId,
        pageIndex: 1,
        pageSize: 10
      }).then(res => {
        this.setData({
          serviceModel: res.data.records
        })
        let totalPrice = 0
        let totalCard = 0
        this.data.serviceModel.forEach(item => {
          totalPrice += item.cartNum * item.actPrice,
            totalCard += item.cartNum * item.actCardPrice
        })
        this.setData({
          totalPrice: totalPrice,
          totalCard: totalCard
        })
      })
    })

    // console.log(detail, 'detail哈哈')
    // let num = detail.num
    // console.log(num, '数量')
    // let totalPrice = 0
    // console.log(this.data.orderDetails, 'orderDetails')
    // this.data.orderDetails.forEach(item => {
    //   totalPrice += item.num * item.buywxPrice,
    //     totalPriceCard += item.num * item.buycardPrice
    // });
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
  paysubmit: function(e) {
    console.log(e.detail)
    console.log(app.globalData.openId)
    request.noticeSuccessfulPayment({
      payMoney: '234',
      orderNum: '4234',
      openid: app.globalData.openId,
      formid: e.detail.formId
    }).then(res => {
      console.log(res, '支付成功通知')
    })
    if (this.data.flag != false) {
      request.pay({
        payType: this.data.payType, //0微信1金麦卡
        carName: this.data.carModel.model,
        shopId: this.data.shopId,
        invoiceId: this.data.isInvoice === 0 ? '' : this.data.invoiceId,
        buyType: this.data.card,
        goodsTotalPrice: this.data.payType == 0 ? this.data.totalPrice : this.data.totalCard,
        isInvoice: this.data.isInvoice,
        orderDetails: this.data.orderDetails,
        carNum: this.data.carModel.plateNum,
        carId: this.data.carModel.carId,
        userId: app.globalData.openId,
        userName: app.globalData.userInfo.nickName,
        userPhone: app.globalData.phoneNum
      }).then(res => {
        if (res.status === false) {
          wx.showToast({
            title: '金麦卡余额不足！'
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
              request.noticeSuccessfulPayment({
                payMoney: that.data.totalPrice,
                orderNum: res.orderNum,
                openid: app.globalData.openId,
                formid: e.detail.formId
              }).then(res => {
                console.log(res, '支付成功通知')
              })
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
    } else {
      wx.showToast({
        title: '密码输入错误',
        duration: 3000
      })
    }

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    if (this.data.item) {
      this.setData({
        invoiceId: this.data.item,
        isInvoice: 1
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