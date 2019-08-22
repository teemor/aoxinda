const app = getApp();
import login from '../../mixin/login'
import {
  CardHttp
} from '../../common/api/card_api'
import {
  store
} from '../../common/api/clean_api'
import { Technician } from '../../common/api/api'
const request = new CardHttp
const bankCard = new store
const teRequest = new Technician
import tab_index from '../../mixin/tab_index'

Page({
  mixins: [login, tab_index],
  data: {
    card_id: null,
    min_pay:0,
    commentNotCount: 0
  },
  myEvaluate: function() {
    wx.navigateTo({
      url: '../my_evaluate/index',
    })
  },
  serviceCard: function() {
    wx.navigateTo({
      url: '../my_service_card/index',
    })
  },
  myClean: function() {
    wx.navigateTo({
      url: `../my_service_order/index`
    })
  },
  myCart: function() {
    wx.navigateTo({
      url: '../my_cart/index',
    })
  },
  myKeep: function() {
    wx.navigateTo({
      url: '../c_order_all/c_order_all',
    })
    // wx.navigateToMiniProgram({
    //   appId:'wx317e65151f04fa7c',
    //   envVersion:'trial'
    // })
    // wx.navigateTo({
    //   url: `../c_order_all/c_order_all`
    // })
  },
  //yd-跳转新手活动
  openNews(){
    wx.navigateTo({
      url: '/pages/new_manners/new_manners'
    })
  },
  /**
   * 岳家棋
   * 跳转金麦卡详情页今麦卡
   */
  openCard:function(){
    wx.navigateTo({
      url: '../stored_value_card/index'
    })
  },
  /**
   * 岳家棋
   * 跳转今麦卡
   */
  goldCard: function() {
    var that = this
    var app = getApp()
    var getOpenId = app.globalData.openId
    request.hasCard().then((res) => {
      that.setData({
        card_id: res.card_id ? res.card_id : null,
        min_pay: res.min_pay
      })
      wx.request({
        url: 'http://192.168.31.184:9015/appapi/v1.0/hasCard',
        data: {},
        header: {
          'content-type': 'application/json',
          'token': getOpenId
        },
        method: "POST",
        success: function(res) {
          console.log(res.data.card_id)
          if (res.data.card_id) {
            wx.navigateTo({
              url: `../stored_value_info/index?card_id=${that.data.card_id}&min_pay=${that.data.min_pay}`
              // url: `../stored_value_card/index`
            })
          } else {
            wx.navigateTo({
              url: `../stored_value_card/index`
            })
          }
        }
      })
    })

  },
  /**
   * 岳家棋
   * 跳转我的银行卡
   */
  myBankCard(){
    var that = this
    var app = getApp()
    var getOpenId = app.globalData.openId
    bankCard.bankCardSelect({ "emp_id": getOpenId}).then((res)=>{
      // if(res.data.length > 0){
        wx.navigateTo({
          // card_id=${ that.data.card_id } & min_pay=${ that.data.min_pay }
          url: `../my_bank_card/index?add_bank=1`
        })
      // }else{
      //   wx.navigateTo({
      //     url: `../my_bank_card/index?add_bank=0`
      //   })      
      // }
    })
    
  },
  myCar: function() {
    wx.navigateTo({
      url: `../my_car/index`
    })
  },
  /**
   * 卡包
   * dzl
   */
  myCard: function() {
    wx.navigateTo({
      url: '../my_card_coupon/index'
    })
  },
  /**
   * 退款售后
   */
  myRefund: function() {
    wx.navigateTo({
      url: `../my_order_refund_list/index`
    })
  },
  /**
   * 购物车
   * dzl
   */
  myCart: function() {
    wx.navigateTo({
      url: '../my_cart/index'
    })
  },
  /**
   * 优惠券
   * dzl
   */
  myCoupon: function() {
    wx.navigateTo({
      url: '../my_coupon/index'
    })
  },
  /**
   * 跳转我的订单
   * dzl
   */
  myOrder: function() {
    wx.navigateTo({
      url: '../my_order/index',
    })
  },
  /**
   * 跳转收货地址
   * @param {*} options 
   */
  myAddress: function() {
    wx.navigateTo({
      url: '../my_address/index?index=true',
    })
  },
  /**
   * 我的预约
   * @param {*} options 
   */
  myReservation: function() {
    wx.navigateTo({
      url: '../my_reservation/index'
    })
  },
  /**
   * 邀请有礼
   * @param {*} options 
   */
  myInvite: function() {
    wx.navigateTo({
      url: '../my_invite/index'
    })
  },
  /**
   * 我的车库
   * @param {*} options 
   */
  myGrage: function() {
    wx.navigateTo({
      url: '../my_garage/index'
    })
  },
  /**
   * 我去过的店
   * @param {*} options 
   */
  myShopped: function() {
    wx.navigateTo({
      url: '../my_shopped/index'
    })
  },
  /**
   * 评论中心统计未评价数量
   */
  notCommentCount: function (model){
    teRequest.notCommentCount(model).then(res => {
      this.setData({
        commentNotCount: res.data
      });
    })
  },
  onLoad: function(options) {
    let that = this
    wx.getStorage({
      key: 'user',
      success: function(res) {
        that.setData({
          avatar: res.data.avatarUrl,
          nickName: res.data.nickName,
          login: true
        })
        that.notCommentCount({"user_id": res.data.openId});
      },
      fail: function(res) {
        that.setData({
          fail: false
        })
      }
    })
  },
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
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