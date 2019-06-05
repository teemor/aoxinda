import {
  orderStatus
} from '../../common/api/c_api.js'
const request = new orderStatus
const app = getApp();
let that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    invoice: ['无需开发票', '需要开发票'],
    oldparts: ['否', '是'],
    invoiceIndex: 0, //是否要发票
    oldpartsIndex: 0, //是否要旧件
    nameValue: '', //用户输入姓名
    phoneValue: '', //用户输入手机号
    totalPrice: 0, //商品和服务费价格
    thCost: 0, //技师服务费
    allPrice: 0, //商品总价
    allProfits: 0, //总利润
    userReserveTime: {}, //订单详情
    orderList: [], //订单列表
    checkObj: [], //商品请求参数
    carInfo: {}, //汽车信息
    address: '', //地址
    user: {}, // 用户信息
    orderInfo: {}, //订单详情对象
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    that.setData({
      totalPrice: options.totalPrice,
      thCost: options.thCost,
      allPrice: options.allPrice
    })
    that.getOderList() //订单缓存
    that.getCarInfo() // 获取车辆信息

    //  获取用户信息
    that.getUser();
  },

  // 设置用户权限--收货地址
  setSeting: function (e) {
    wx.openSetting({
      success(res) { }
    })
  },
  // 管理收货地址
  setAddress: function (e) {
    wx.chooseAddress({
      success(res) {
        let address = res.provinceName + res.cityName + res.detailInfo;
        that.setData({
          address: address,
          nameValue: res.userName,
          phoneValue: res.telNumber,
        })
      },
    })
  },

  //  获取用户信息
  getUser: function (e) {
    wx.getStorage({
      key: 'user',
      success: function (res) {
        that.setData({
          user: res.data
        })
      }
    })
  },

  // 选择发票
  invoiceFun(e) {
    this.setData({
      invoiceIndex: e.detail.value
    })
  },

  //选择旧件
  oldpartsFun(e) {
    that.setData({
      oldpartsIndex: e.detail.value
    })
  },

  // 选择施工服务
  serviceFun: function (e) {
    this.setData({
      serviceIndex: e.detail.value
    })
  },

  //获取用户输入姓名
  nameValue(e) {
    that.setData({
      nameValue: e.detail.value
    })
  },

  //获取用户输入手机号
  phoneValue(e) {
    let phoneValue = e.detail.value
    var reg = /^[1][3,4,5,7,8][0-9]{9}$/; //手机号格式正则表达式
    if (reg.test(phoneValue)) {
      that.setData({
        phoneValue: phoneValue,
      })
    } else {
      wx.showToast({
        title: '无效手机号',
        icon: 'loading',
        duration: 1000
      })
      that.setData({
        phoneValue: ''
      })
    }
  },

  //获取订单缓存
  getOderList() {
    wx.getStorage({
      key: 'userReserveTime',
      success: function (res) {
        let text = JSON.stringify(res.data.userClickMaintain); //  将数组转换成字符串
        that.setData({
          userReserveTime: res.data,
          text: text
        })
        for (var i = 0; i < res.data.userClickMaintain.length; i++) {
          for (var j = 0; j < res.data.userClickMaintain[i].goodsMsg.length; j++) {
            that.data.orderList.push(res.data.userClickMaintain[i].goodsMsg[j])
          }
          that.setData({
            orderList: that.data.orderList
          })
        }
        for (var q = 0; q < that.data.orderList.length; q++) {
          that.data.allProfits += that.data.orderList[q].profit
          that.setData({
            allProfits: that.data.allProfits
          })
          // let obj = {
          //   "goodsName": that.data.orderList[q].goodsName,
          //   "id": "",
          //   "price": that.data.orderList[q].price,
          //   "profits": that.data.orderList[q].profit,
          //   "goodsCode": that.data.orderList[q].goodsCode,
          //   "useTime": that.data.orderList[q].useTime
          // }

          let obj = {
            //订单
            "goodsName": that.data.orderList[q].goods_name,//商品名称
            "goodsCode": `${that.data.orderList[q].productCode}*${that.data.orderList[q].product_sku}`,//商品code--'code+sku'--给供应链
            "id": "",
            "price": that.data.orderList[q].price,//商品单价
            "profits": that.data.orderList[q].profit,//商品利润
            "useTime": that.data.orderList[q].useTime,//商品使用时间
            //新加的
            "goodsNum": that.data.orderList[q].goodsNum,//商品数量
            "productCode": that.data.orderList[q].productCode,//查询商品详情用
            "skuName": that.data.orderList[q].goods_sku,//商品sku
          }
          that.data.checkObj.push(obj)
          that.setData({
            checkObj: that.data.checkObj
          })
        }
      }
    })
  },

  //获取车辆缓存
  getCarInfo() {
    wx.getStorage({
      key: 'carInfo',
      success: function (res) {
        that.setData({
          carInfo: res.data
        })
      },
    })
  },

  //付款保存订单
  payment() {
    if (that.data.nameValue == '') {
      wx.showModal({
        title: '提示',
        content: '麦车服将请求您的通讯地址，请您允许！',
        showCancel: true,
        cancelText: '拒绝',
        confirmText: '去授权',
        success: function (res) {
          if (res.confirm) {
            that.setSeting()
          } else if (res.cancel) {
          }
        }
      })
    } else if (that.data.phoneValue == '') {
      wx.showToast({
        title: '电话不能为空',
        icon: 'loading',
        duration: 1500
      })
    } else if (that.data.address == '') {
      wx.showToast({
        title: '地址不能为空',
        icon: 'loading',
        duration: 1500
      })
    } else {
      wx.getStorage({
        key: 'mineInfo',
        success: function (res) {
          let mcfSysOrder = {
            "allOrderMoney": that.data.totalPrice, //商品加服务费
            "authorizer": 1,
            "carId": that.data.carInfo[0].id,
            "empSaId": '',
            "empThId": that.data.userReserveTime.userClickTh.id,
            "id": '',
            "invoice": that.data.invoiceIndex, //是否要发票1是，0否
            "mileage": that.data.carInfo[0].mileage,
            "oldparts": that.data.oldpartsIndex, //是否要旧件
            "orderMoney": that.data.allPrice, //商品总价
            "orderSource": 1,
            "orderStatus": 0,
            "orderTime": that.data.userReserveTime.userClickTime, //预定时间0上午，1下午，2晚上
            "profit": that.data.allProfits, //总利润
            "scoreSa": '',
            "scoreShop": '',
            "scoreTh": '',
            "shopId": that.data.userReserveTime.userClickSp.id,
            "text": that.data.text, //订单列表
            "starttime": that.data.userReserveTime.timeBtnIdCont, //用户选择日期
            "thCost": that.data.thCost, //技师服务费
            "thName": that.data.userReserveTime.userClickTh.name, //技师姓名
            "type": 1,
            "userName": that.data.nameValue,
            "userTel": that.data.phoneValue,
            "userId": res.data.id,
            "mcfCProduct": that.data.checkObj, //that.data.userReserveTime.userClickMaintain
            "orderDate": that.data.userReserveTime.timeBtnIdCont, //用户选择日期
            "wechatOrder": '微信流水单号', //微信流水单号
            "isPay": 1,
          }
          let minePrice = 0;
          that.data.checkObj.forEach(n => {
            minePrice += parseFloat(n.price)
          })
          let params = {
            "appId": app.appid,
            "openId": that.data.user.openId,
            "price": that.data.totalPrice
          }
          // that.data.totalPrice
          // minePrice + parseFloat(that.data.thCost)
          request.payment(params).then(res => {
            let payObj = JSON.parse(res.description);
            mcfSysOrder.wechatOrder = payObj.outTradeNo;
            request.isSaWork(mcfSysOrder).then(res => {
              mcfSysOrder.empSaId = res.result
              if (res.code == '200') {
                wx.requestPayment({
                  'timeStamp': payObj.timeStamp,
                  'nonceStr': payObj.nonceStr,
                  'package': payObj.package,
                  'signType': payObj.signType,
                  'paySign': payObj.paySign,
                  'success': function (res) {
                    that.saveOrder(mcfSysOrder) //保存订单
                  },
                  'fail': function (err) {
                    wx.hideNavigationBarLoading();
                    wx.showToast({
                      title: '支付取消',
                      icon: 'loading',
                      success: function () {
                        that.setData({
                          isTan: 0,
                          loadingType: 1
                        })
                      }
                    })
                  }
                })
              } else if (res.code == '500') {
                wx.showToast({
                  title: '该日无服务顾问',
                  icon: 'success',
                  duration: 1500
                })
              }
            })
          })
        },
      })
    }
  },

  //给技师和sa发送短信
  sendMesg(mcfSysOrder) {
    request.messageOrder(mcfSysOrder).then(res => {
    })
  },

  //保存订单
  saveOrder(mcfSysOrder) {
    request.saveOrder(mcfSysOrder).then(res => {
      if (res.code == '200') {
        wx.showToast({
          title: '预约成功',
          icon: 'success',
          duration: 1500,
          success(res) { }
        })

        that.saveMineOrder(mcfSysOrder, res.result.id) //保存订单到另一个表
        that.sendMesg(res.result) //调用给sa和技师发短信

      } else if (res.code == '500') {
        wx.showToast({
          title: '预约失败',
          icon: 'success',
          duration: 2000
        })
      }
    })
  },

  //将订单保存到另一个表中-明远供应链
  saveMineOrder(mcfSysOrder, orderNum) {
    let time, arr;
    if (mcfSysOrder.orderTime == 0) {
      time = '08:00-12:00'
    } else if (mcfSysOrder.orderTime == 1) {
      time = '12:00-18:00'
    } else if (mcfSysOrder.orderTime == 2) {
      time = '18:00-22:00'
    }

    let json = {
      orderNum: orderNum,
      shopId: mcfSysOrder.shopId,
      userPhoneNumber: mcfSysOrder.userTel,
      ownerName: mcfSysOrder.userName,
      orderAmount: mcfSysOrder.allOrderMoney,
      appointmentTime: mcfSysOrder.orderDate + ' ' + time,
      goods: mcfSysOrder.mcfCProduct.map(n => {
        return {
          goods_name: n.goodsName,//商品名称
          goods_price: n.price,
          goods_num: n.goodsNum,
          goods_code: n.goodsCode.split('*')[0],
          sku: n.goodsCode.split('*')[1]
        }
      })
    }
    request.saveMineOrder(json).then(res => {
      if (res.result) {
        wx.showToast({
          title: '订单保存成功',
          icon: 'success',
          duration: 1500,
          success(res) {
            setTimeout(() => {
              wx.reLaunch({
                url: '../index/index'
              })
            }, 1000)
          }
        })
      } else {
        wx.showToast({
          title: '订单保存失败',
          icon: 'success',
          duration: 2000
        })
      }
    })
  }
  
})