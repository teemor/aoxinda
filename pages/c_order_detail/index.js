import { orderStatus } from '../../common/api/c_api.js'
const request = new orderStatus

const app = getApp();
let that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderDetail: {},
    columns: ['是', '否'],
    show: false,
    isInvoice: "",
    isOldparts: "",
    showStatus: 1,
    mineInfo: {}, //个人信息
    user: {}, // 用户登录信息
    allOrderMoney: 0,
    tabType: 0,
    orderId: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    that.getUserInfo();
    that.getOpenId();
    that.setData({
      allOrderMoney: options.allOrderMoney,
      tabType: options.tabType,
      orderId: options.orderId
    })
    that.getDetail();
  },

  /**
   * 获取订单详情
   */
  getDetail() {
    request.orderEntity(that.data.orderId).then(res => {
      if (res.code == '200') {
        this.setData({
          orderDetail: res.result
        })
      }
    })
  },

  getOpenId() {
    wx.getStorage({
      key: 'user',
      success: function (res) {
        that.setData({
          user: res.data
        })
      },
    })
  },

  getUserInfo() {
    wx.getStorage({
      key: 'mineInfo',
      success: function (res) {
        that.setData({
          mineInfo: res.data
        })
      },
    })
  },

  onClose() {
    this.setData({ show: false });
  },

  onInvoice(s) {
    if (s.currentTarget.dataset.status == "1") {
      that.showStatus = 1;
    } else {
      that.showStatus = 2;
    }
    this.setData({ show: true });
  },

  onChange(event) {
    const { picker, value, index } = event.detail;
    if (that.showStatus == 1) {
      this.setData({
        isInvoice: value
      })
    } else {
      this.setData({
        isOldparts: value
      })
    }
    this.setData({ show: false });
  },

  //跳转付款页面
  goPayment() {
    let params = {
      "appId": app.appid,
      "openId": that.data.user.openId,
      "price": that.data.allOrderMoney
    }
    // orderIndex.allOrderMoney
    request.payment(params).then(res => {
      let payObj = JSON.parse(res.description);
      wx.requestPayment({
        'timeStamp': payObj.timeStamp,
        'nonceStr': payObj.nonceStr,
        'package': payObj.package,
        'signType': payObj.signType,
        'paySign': payObj.paySign,
        'success': function (res) {
          let params = {
            "id": that.data.orderId,
            "wechatOrder": payObj.outTradeNo
          }
          request.agreenPay(params).then(res => {
            let params = {
              "userId": that.data.mineInfo.id,
              "status": that.data.tabType
            }
            that.getOrderList(params);
            that.saveMineOrder();
            if (res.code == '200') {
            } else if (res.code == '500') {
            }
          })
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
    })
  },

  // 用户拒绝付款
  refuse() {
    let orderId = that.data.orderId
    let params = {
      "id": orderId
    }
    request.refuseOrder(params).then(res => {
      if (res.code == '200') {
        wx.showModal({
          title: '麦车服提示您',
          content: '确认拒绝付款吗？',
          success(res) {
            if (res.confirm) {
              let params = {
                "userId": that.data.mineInfo.id,
                "status": that.data.tabType
              }
              that.getOrderList(params);
            } else if (res.cancel) {
            }
          }
        })
      } else if (res.code == '500') {
        wx.showToast({
          title: '取消失败',
          icon: 'loading',
          duration: 1500
        })
      }
    })
  },

  //打开商品详情页
  goods_detail(e) {
    wx.navigateTo({
      url: '/pages/c_goods_detail/index?product_code=' + e.currentTarget.dataset.code
    })
  },


  //将订单保存到另一个表中-明远供应链
  saveMineOrder() {
    let mcfSysOrder = that.data.orderDetail
    let time, arr;
    if (mcfSysOrder.orderTime == 0) {
      time = '08:00-12:00'
    } else if (mcfSysOrder.orderTime == 1) {
      time = '12:00-18:00'
    } else if (mcfSysOrder.orderTime == 2) {
      time = '18:00-22:00'
    }

    let json = {
      orderNum: mcfSysOrder.id,
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
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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