import { CardHttp } from '../../common/api/card_api'
const request = new CardHttp
let that
/**
 * 岳家棋
 * 判断有无金麦卡  有->跳转金面卡  无->购买
 */
Page({
  /**
   * 页面的初始数据
   */
  data: {
    card_id: null,
    min_pay: 0,
    show:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    request.hasCard().then((res) => {
      that.setData({
        card_id: res.card_id ? res.card_id : null,
        min_pay: res.min_pay ? res.min_pay : 0
      })
    })
  },
  //我要储值
  toStorageValue() {
    if (this.data.card_id) {
      this.setData({
        show : true
      })
    } else {
      var app = getApp()
      var getOpenId = app.globalData.openId
      // request.payCard({ price: this.data.min_pay, type: 0, account_id: getOpenId }).then((res) => {
    request.payCard({ price: 0.01, type: 0, account_id: getOpenId}).then((res) => {
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
              wx.navigateTo({
                url: '../stored_value_info/index',
              })
            },
            fail: (res) => {
              console.log('付款失败')
            }
          });
        }
      })
    }
  },
  //取消
  cancel:function(){
    this.setData({
      show :false
    })
  },
  //跳转金麦卡
  examine:function(){
    this.setData({
      show: false
    })
    wx.navigateTo({
      url: `../../pages/stored_value_info/index?card_id=${this.data.card_id}`
    })
  }
})