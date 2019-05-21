const app = getApp();
import {
  Technician
} from '../common/api/api'
const request = new Technician
module.exports = {
selectOrderDetail:function(options){
    request.selectOrderDetail({ order_id: options.id }).then(res => {
        let date = new Date(res.create_at)
        let Y = date.getFullYear() + '-';
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        let D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate();
        let h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
        let m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':'
        let s = date.getSeconds();
        this.setData({
          model:res,
          goodsList: res,
          date: Y + M + D + h + m + s
        })
        if (res.invoice_id === 1) {
          this.setData({
            id: res.invoiceData.id
          })
        }
      })
},
}