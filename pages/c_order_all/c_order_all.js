// pages/th_order/th_order_all/th_order_all.js
import { orderStatus}from '../../common/api/c_api.js'
const request = new orderStatus
const app = getApp();
let that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabType: 0,
    orderList:[],//所有订单
    mineInfo:{}, //个人信息
    oderStatusContent:'',//订单状态
    noData:0,  // 有无数据  0 有数据 1 无数据
    user:{}, // 用户登录信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    that = this;
    that.getUserInfo();
    that.getOpenId();
  },

  onShow(){
    let params = {
      "userId": that.data.mineInfo.id,
      "status": that.data.tabType,
      "page": 0
    }
    that.getOrderList(params);
  },
  /**
  * 页面相关事件处理函数--监听用户下拉动作
  */
  onPullDownRefresh: function () {
    that.getUserInfo();
    wx.stopPullDownRefresh()
  },

  //获取个人信息
  getUserInfo(){
    wx.getStorage({
      key: 'mineInfo',
      success: function(res) {
        that.setData({
          mineInfo: res.data
        })
        let params = {
          "userId": res.data.id,
          "status": that.data.tabType,
          "page": 1
        }
        that.getOrderList(params)
      },
    })
  },

  // 切换tab
  changeTab (e) {
    const type = e['currentTarget']['dataset']['id'];
    that.setData({
      tabType: Number(type)
    })
    let params = {
      "userId": that.data.mineInfo.id,//    dcb3ca6c364a41989d486854cb7f0ce4
      "status": Number(type),
      "page": 0
    }
    that.getOrderList(params);
  },
  
  //获取全部订单
  getOrderList: function (params){
    that.setData({
      orderList: []
    })
    request.allOrder(params).then(res=>{
      if(res.code=='200'){
        res.result = res.result ? res.result : [];
        that.setData({
          orderList:res.result
        })
      }else if(res.code == '500'){
        wx.showModal({
          title: '获取订单失败',
          icon:'loading',
          duration:1500
        })
      }
    })
  },

  //用户评分
  userScore(e){
    var scoreIndex = e.currentTarget.dataset.index;
    var id = e.currentTarget.dataset.id;
    wx.setStorage({
      key: 'userOrder',
      data: that.data.orderList[scoreIndex],
      success(res){
        if (that.data.orderList[scoreIndex].scoreSa == 0) {
          wx.navigateTo({
            url: '/pages/c_scoring/c_scoring',
          })
        } else {

        }
      }
    })
  },

  // 用户拒绝付款
  refuse(e){
    let orderId = e.currentTarget.dataset.id
    let params = {
      "id": orderId
    }
    request.refuseOrder(params).then(res=>{
      if(res.code == '200'){
       wx.showModal({
         title: '麦车服提示您',
         content: '确认拒绝付款吗？',
         success(res) {
           if (res.confirm) {
             let params = {
               "userId": that.data.mineInfo.id,
               "status": that.data.tabType,
               "page": 1
             }
             that.getOrderList(params);
           } else if (res.cancel) {
           }
         }
       })
      }else if(res.code == '500'){
        wx.showToast({
          title: '取消失败',
          icon:'loading',
          duration:1500
        })
      }
    })
  },

  //待确认订单付款
  agreen(e){
    let orderIndex = that.data.orderList[e.currentTarget.dataset.index];
    let params = {
      "appId": app.appid,
      "openId": that.data.user.openId,
      "price": orderIndex.allOrderMoney
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
          that.getUserInfo();
          let params = {
            "id": orderIndex.id,
            "wechatOrder": payObj.outTradeNo
          }
          request.agreenPay(params).then(res => {
            let params = {
              "userId": that.data.mineInfo.id,
              "status": that.data.tabType,
              "page": 1
            }
            that.getOrderList(params);
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

  getOpenId(){
    wx.getStorage({
      key: 'user',
      success: function(res) {
        that.setData({
          user:res.data
        })
      },
    })
  },

  //代付款
  payFun(e){
    let orderId = e.currentTarget.dataset.id;
    let orderIndex = that.data.tabType == 0 ? that.data.orderList.content[e.currentTarget.dataset.index] : that.data.orderList[e.currentTarget.dataset.index];
    let allOrderMoney = orderIndex.allOrderMoney;
    wx.navigateTo({
      url: '/pages/c_order_detail/index?allOrderMoney=' + allOrderMoney + '&tabType=' + that.data.tabType + '&orderId=' + orderId
    })
  },

  //分页
  onReachBottom: function (e) {
    wx.showNavigationBarLoading();
    wx.showLoading({
      title: '加载中',
    })
    let mynumber = that.data.orderList.number;
    if (mynumber < that.data.orderList.totalPages - 1) {
      let params = {
        "userId": that.data.mineInfo.id,
        "status": that.data.tabType,
        "page":mynumber + 1
      }
      request.allOrder(params).then(res => {
        wx.hideNavigationBarLoading();
        wx.hideLoading();
        for (var f = 0; f < res.result.content.length; ++f) {
          that.data.orderList.content.splice(that.data.orderList.content.length + f, 0, res.result.content[f])
        }
        that.data.orderList.number = res.result.number;
        that.setData({
          orderList: that.data.orderList
        })
      })
    } else {
      wx.hideNavigationBarLoading();
      wx.hideLoading();
    }
  },
})