import { CardHttp } from '../../common/api/card_api'
import { store } from '../../common/api/clean_api'

import QR from '../../utils/qrcode.js'
import Notify from '../../miniprogram_npm/vant-weapp/notify/notify';
const request = new CardHttp
const clean = new store
// pages/stored_value_recharge/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pay: {
      show: false,
      money: 0
    },
    account_id:"",
    min_pay:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      account_id : options.id,
      min_pay: options.min_pay
    })
    
  },
  //充值输入
  payValue(e) {
    this.setData({
      'pay.money': Number(e.detail.value),
    })
  },
  //充值
  onPayClose(e) {
    
    var that = this
      this.setData({
        'pay.show': false
      })
    if (this.data.pay.money >= this.data.min_pay) {
        request.payCard({ price: this.data.pay.money, type: 1, account_id: this.data.account_id }).then((res) => {
          // this.setData({
          //   'pay.show': false,
          //   'pay.money': 0.00,
          // })
          if (res.status === false) {
            wx.showToast({
              title: res.description
            })
          } else {
            let description = JSON.parse(res.result);
            wx.requestPayment({
              timeStamp: description.timeStamp,
              nonceStr: description.nonceStr,
              package: description.package,
              signType: description.signType,
              paySign: description.paySign,
              success: (res) => {
                console.log('付款成功')
                //充值成功消息推送
                var app = getApp()
                var getOpenId = app.globalData.openId
                var obj = {
                  "account_id": that.data.account_id,
                  "openid": getOpenId,
                  "formid": e.detail.formId,
                  "Amount": that.data.pay.money
                }
                console.log(obj)
                clean.payCardTopUp(obj).then((res) => {
                  console.log(res)
                })
                wx.navigateBack({
                  delta: 1
                })
              },
              fail: (res) => {
                console.log('付款失败')
              }
            });

          }
        })
      } else {
        wx.showToast({
          title: '不能少于上次充金额',
          icon: 'none',
          duration: 2000
        })
        this.setData({
          'pay.show': true
        })
      }
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