import {
  store
} from '../../common/api/api'
const request = new store
const app = getApp()
import find_car from '../../../mixin/find_car'
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';
Page({
  mixins: [find_car],
  /**
   * 页面的初始数据
   */
  data: {
    a: false,
    b: false,
    c: false,
    d: false,
    e: false,
    f: false,
    g: false,
    h: false,
    i: false,
    j: false,
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
    codeBtn: '获取验证码',
    totalPrice: 0,
    totalCard: 0,
    min_num: false
  },

  /**
   * 支付方式
   */
  car: function() {
    wx.navigateTo({
      url: '../mycar/index'
    })
  },
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
  //设置支付密码
  setPwd: function() {
    console.log(1)
  },
  get_focus: function() {
    this.setData({
      a: false
    })
  },
  blur: function() {
    this.setData({
      a: true
    })
  },
  blura: function() {
    this.setData({
      b: true
    })
  },
  blurb: function() {
    this.setData({
      c: true
    })
  },
  blurc: function() {
    this.setData({
      d: true
    })
  },
  blurd: function() {
    this.setData({
      e: true
    })
  },
  blure: function() {
    this.setData({
      a: false,
      b: false,
      c: false,
      d: false,
      e: false
    })
  },
  payChoose: function(e) {
    this.setData({
      payType: e.currentTarget.dataset.item.type
    })
    if (this.data.payType == 1 && this.data.cardGold == true) {
      if (this.data.pwdGold == true) {
        this.setData({
          // trueGold: true,
          wxPay: false
        })
      } else {
        this.setData({
          // falseGold: true,
          wxPay: false
        })
      }
    } else {
      // wx.navigateTo({
      //   url: '../../../pages/stored_value_card/index',
      // })
      this.setData({
        wxPay: false
      })
    }
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
      if (res.state == 1) {
        wx.showToast({
          title: res.msg,
          duration: 1500
        })
        this.setData({
          trueGold: false
        })
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
          console.log(res)
          if (res.status == true) {
            let data = {}
            data.id = res.orderNum
            data.data = 'success'
            data.price = res.payMoney
            data.type = 1
            let model = encodeURIComponent(JSON.stringify(data))
            wx.redirectTo({
              url: `../success_order/index?data=${model}`,
            })
          } else {

          }
        })
      } else {
        wx.showToast({
          title: '密码输入有误',
          duration: 1500
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
      console.log(res)
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
            falseGold: false,
            trueGold: true
          })
        })
      } else {
        wx.showToast({
          title: res.state,
          duration: 3000
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

    console.log(options)
    let phone = app.globalData.phoneNum
    console.log(phone, '电话')
    var mphone = phone.substring(0, 3) + '****' + phone.substring(7);
    this.setData({
      phoneNum: phone,
      phone: mphone
    })
    console.log(this.data.phone, 'heh')
    this.findCarList()
    // console.log(this.carList)
    // 
    let that = this
    setTimeout(function() {
      console.log(that.data.carModel)
    }, 500)
    if (options.model) {
      let model = JSON.parse(decodeURIComponent(options.model))
      console.log(model, 'shopid')
      let znum = 0;
      for (let i = 0; i < model.length; i++) {
        znum += model[i].cartNum
      }
      if (znum == 1) {
        this.setData({
          min_num: true
        })
      } else {
        this.setData({
          min_num: false
        })
      }

      this.setData({
        shop_name: model[0].shop_name
      })
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
        totalPrice: totalPrice.toFixed(2),
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
        totalCard: model[0].actCardPrice,
        totalPrice: model[0].actCardPrice,
        shopName: model[0].shopName,
        actCardType: model[0].actCardType
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
        totalPrice: totalPrice.toFixed(2)
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
  // numChange: function({
  //   detail
  // }) {
  //   // let num = e.currentTarget.dataset.item ? e.detail : e.detail.num
  //   // console.log(num)
  //   // console.log(this.data.orderDetails)
  //   let i = 'orderDetails['+0+'].num'
  //   this.setData({
  //     [i]: detail.num
  //   })
  //   console.log(detail)
  //   // this.setData({
  //   //   totalPrice: detail.item.actPrice * detail.num
  //   // })
  //   request.addCart({
  //     shopId: this.data.shopId,
  //     userId: app.globalData.openId,
  //     activityId: detail.item !== undefined ? detail.item.activityId || detail.item.actId: detail.activityId,
  //     cartNum: detail.num,
  //     price: detail.item !== undefined ? detail.item.actPrice : detail.actPrice
  //   }).then(res => {
  //     request.findcartList({
  //       userId: app.globalData.openId,
  //       shopId: this.data.shopId,
  //       pageIndex: 1,
  //       pageSize: 10
  //     }).then(res => {
  //       this.setData({
  //         serviceModel: res.data.records
  //       })
  //       console.log(this.data.serviceModel)
  //       let totalPrice = 0
  //       let totalCard = 0
  //       this.data.serviceModel.forEach(item => {
  //         totalPrice += item.cartNum * item.actCardPrice,
  //         totalCard += item.cartNum * item.actCardPrice
  //       })
  //       this.setData({
  //         totalPrice: totalPrice,
  //         totalCard: totalCard
  //       })
  //     })
  //   })

  //   // console.log(detail, 'detail哈哈')
  //   // let num = detail.num
  //   // console.log(num, '数量')
  //   // let totalPrice = 0
  //   // console.log(this.data.orderDetails, 'orderDetails')
  //   // this.data.orderDetails.forEach(item => {
  //   //   totalPrice += item.num * item.buywxPrice,
  //   //     totalPriceCard += item.num * item.buycardPrice
  //   // });
  // },
  numChange: function(e, info) {
    let that = this
    let znum = 0;
    let num;

    num = e.currentTarget.dataset.num ? parseInt(e.currentTarget.dataset.num) : e.detail

    let myData = e.currentTarget.dataset.item ? e.currentTarget.dataset.item : e.currentTarget.dataset.info
    if (myData.activityId) {
      myData.actId = myData.activityId
    }
    request.addCart({
      shopId: this.data.shopId,
      userId: app.globalData.openId,
      activityId: myData.actId,
      cartNum: num,
      price: myData.actPrice
    }).then(res => {
      let ind;
      that.data.serviceModel.forEach((n, i) => {
        if (n.activityId == myData.actId) {
          ind = i
        }
      })
      that.data.serviceModel[ind].cartNum = num
      that.data.serviceModel.splice(ind, 1, that.data.serviceModel[ind])
      
      for (let i = 0; i < this.data.serviceModel.length; i++) {
        znum += this.data.serviceModel[i].cartNum
      }
      console.log(znum)
      if (znum == 1) {
        this.setData({
          min_num: true
        })
      } else {
        this.setData({
          min_num: false
        })
      }
      console.log(this.data.serviceModel, e.currentTarget.dataset.index)
      this.data.orderDetails[e.currentTarget.dataset.index].num = this.data.serviceModel[e.currentTarget.dataset.index].cartNum
      //计算总价
        let price = 0;
        for (let i = 0; i < this.data.serviceModel.length; i++) {
          price += this.data.serviceModel[i].cartNum * this.data.serviceModel[i].actPrice
        }
      //计算金麦卡支付总价
        let cardprice = 0;
        console.log(this.data.serviceModel)
        for (let i = 0; i < this.data.serviceModel.length; i++) {
          cardprice += this.data.serviceModel[i].cartNum * this.data.serviceModel[i].actCardPrice
        }
        that.setData({
          serviceModel: that.data.serviceModel,
          totalCard: cardprice.toFixed(2),
          totalPrice: price.toFixed(2)
        })
    })
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
  //点击提交订单
  paysubmit: function(e) {
    let that = this
    console.log(this.data.orderDetails)
    console.log(e.detail)
    console.log(app.globalData.openId)
    if (this.data.payType == 1 && this.data.pwdGold == true) {
      this.setData({
        trueGold: true
      })
    } else if (this.data.payType == 1 && this.data.pwdGold == false) {
      this.setData({
        falseGold: true
      })
    } else {
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
          Toast.fail('余额不足！');
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
              console.log(request.noticeSuccessfulPayment)
              let data = {}
              data.id = description.outTradeNo,
                data.data = 'success'
              data.type = 0
              data.price = that.data.totalPrice
              let model = encodeURIComponent(JSON.stringify(data))
              console.log(data, model)
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
    }

    // request.noticeSuccessfulPayment({
    //   payMoney: that.data.totalPrice,
    //   orderNum: '测试数据1433223',
    //   openid: app.globalData.openId,
    //   formid: e.detail.formId
    // }).then(res => {
    //   console.log(res, '支付成功通知')
    // })
    // if (this.data.flag != false || this.data.payType == 0) {

    // } else {
    //   wx.showToast({
    //     title: '密码输入错误',
    //     duration: 3000
    //   })
    // }

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