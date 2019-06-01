const app = getApp();
import {
  Technician
} from '../common/api/api'
const request = new Technician
module.exports = {
  chooseAddress: function () {
    request.selectAddressList({}).then(res => {
      let arr = [];
      res.data.forEach(item => {
        if (item.is_check == 1) {
          arr.push(item)
        }
      })
      if (arr.length === 0) {
        this.setData({
          name: res.data[0].name,
          phone: res.data[0].phone,
          address: res.data[0].province + res.data[0].city + res.data[0].county + res.data[0].street
        })
      } else {
        this.setData({
          name: arr[0].name,
          phone: arr[0].phone,
          address: arr[0].province + arr[0].city + arr[0].county + arr[0].street
        })
      }
    })
  },
  writeOrder: function (invoice_id, order_person, order_address, order_phone, order_express, order_money, pay_money, data, order_freight_money, order_server_money, server_order_id) {
    request.writeOrder({
      invoice_id: invoice_id,
      order_person: order_person,
      order_address: order_address,
      order_phone: order_phone,
      order_express: order_express,
      order_money: order_money, //商品价格
      pay_money: pay_money, //付款价格
      data: data,
      order_freight_money: order_freight_money,
      server_order_id: server_order_id,
      order_server_money: order_server_money,
    }).then(res => {
      let id = res.data
      let that = this
      console.log(that)
      that.pay(id)
    })
  },
   pay:function(id){
     let that = this
    wx.login({
      success(res) {
        if (res.code) {//(that.data.total+0+0)*100
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
                  data.price = that.data.total
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
   }
  
}