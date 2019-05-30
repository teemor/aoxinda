const app = getApp();
import {
  Technician
} from '../common/api/api'
const request = new Technician
module.exports = {
  writeOrder: function (invoice_id, order_address, order_phone, order_express, order_money, pay_money, data, order_freight_money, order_server_money, server_order_id, serverData) {
    request.writeOrder({
      invoice_id: invoice_id,
      order_address: order_address,
      order_phone: order_phone,
      order_express: order_express,
      order_money: order_money,
      pay_money: pay_money,
      data: data,
      order_freight_money: order_freight_money,
      server_order_id: server_order_id,
      order_server_money: order_server_money,
      serverData: serverData
    }).then(res => {
      let id = res.data
      let that = this
      console.log(that)
      
      wx.login({
        success(res) {
          if (res.code) {//(that.data.total+0+0)*100
            console.log(app, 'res.code')
            request.payOrder({ order_id: id, code: res.code, open_id:app.globalData.openId, price:  that.data.total}).then(res => {
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
                  success: (result) => {
                    let data = {}
                    data.id = id
                    data.data = 'success'
                    data.price = that.data.price
                    let model = encodeURIComponent(JSON.stringify(data))
                    wx.navigateTo({
                      url: `../success_order/index?data=${model}`
                    })
                  },
                  fail: () => {
                    let data = {}
                    data.id = id
                    data.data = 'fail'
                    let model = encodeURIComponent(JSON.stringify(data))
                    wx.navigateTo({
                      url: `../success_order/index?data=${model}`
                    })
                  },
                  complete: () => { }
                });

              }
            })
          }
        }
      })
    })
  }
}