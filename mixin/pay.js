const app = getApp();
import {
  Technician
} from '../common/api/api'
const request = new Technician
module.exports = {
  writeOrder: function (invoice_id, order_address, order_phone, order_express, order_money, pay_money, data) {
    request.writeOrder({
      invoice_id: invoice_id,
      order_address: order_address,
      order_phone: order_phone,
      order_express: order_express,
      order_money: order_money,
      pay_money: pay_money,
      data: data
    }).then(res => {
      let id = res.data
      wx.login({
        success(res) {
          if (res.code) {
            console.log(res.code, 'res.code')
            request.payOrder({ order_id: id, code: res.code, open_id: 'o2ZTm5SU5GDoA5ZT4fgsizV7--Zs', price: '1' }).then(res => {
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