import { CardHttp } from '../../common/api/card_api'
const request = new CardHttp
let that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    card_id: null,
    min_pay: 0
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
      wx.navigateTo({
        url: `../../pages/stored_value_info/index?card_id=${this.data.card_id}`
      })
    } else {
      request.payCard({ price: this.data.min_pay, type: 0 }).then((res) => {
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
            },
            fail: (res) => {
              console.log('付款失败')
            }
          });

        }
      })
    }
  }
})