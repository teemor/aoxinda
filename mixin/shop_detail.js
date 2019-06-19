const app = getApp();
const moment = require('../utils/moment');
import {
    Technician
} from '../common/api/api'
const request = new Technician
module.exports = {
    data: {
        dataset: {
            name: '米其林轮胎', price: '666',
            goodstype: [{
                name: '类型', lists: []
            }],
            list: [
                { name: '服务', list: [{ active: true, name: "到店安装", id: '01' }, { name: '无需安装', id: '02' }] }]
        },
    },
    shopDetail: function (e) {
        wx.navigateTo({
            url: `../shop_goods_detail/index?product_code=${e.currentTarget.dataset.item}`
        })
    },
    formateDate: function (time) {
        let date = new Date(time)
        let Y = date.getFullYear() + '-';
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        let D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate();
        let h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
        let m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':'
        let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
        return Y + M + D + ' ' + h + m + s
    },
    timer: function () {
        let a = this.data.sys_at += 1000 
        console.log(a,'???')
        let c = moment.duration(this.data.create - a)
        this.setData({
            creates: c.hours() + ':' + c.minutes() + ':' + c.seconds()
        })
        setTimeout(this.timer, 1000)
    },
    selectOrderDetail: function (options) {
        let timestamp = Date.parse(new Date());
        console.log(timestamp,'当前时间')
        request.selectOrderDetail({ order_id: options.id?options.id:options.order_id }).then(res => {
            this.setData({
                send_at:this.formateDate(res.send_at),
                model: res,
                goodsList: res,
                sys_at: res.sys_at,
                date: this.formateDate(res.create_at),
                pay_at: this.formateDate(res.pay_at),
                send_at: this.formateDate(res.send_at),
                create: moment(res.create_at).subtract(0, 'h').valueOf() + 24 * 60 * 60 * 1000,
            })
            if (res.invoiceData) {
                this.setData({
                    invoice: res.invoiceData.invoice_title + res.invoiceData.invoice_type
                })
            }
            if (res.invoice_id === 1) {
                this.setData({
                    id: res.invoiceData.id
                })
            }
            if (this.data.model.trade_status_name == "待发货") {
                console.log('代发货')
                this.setData({
                  reason: this.data.reasonA
                })
              } else if (this.data.model.trade_status_name == "已发货" || this.data.model.trade_status_name == "待安装") {
                console.log('已发货--待安装')
                this.setData({
                  shopstatus: true
                })
              } else if (this.data.model.trade_status_name == "已收货") {
                console.log('已收货')
                this.setData({
                  reason: this.data.reasonB
                })
              }
        })
    },
    /**
     * 详情
     */
    goodsDetail: function (code) {
        wx.removeStorage({
            key: 'mineGoods'
        })
        request.goodsDetail({ product_code: code }).then(res => {
            let that = this
            that.data.dataset.goodstype[0].lists = res.tableDetail
            this.setData({
                invoiceData: res.invoiceData,
                item: res.tableDetail[0],
                tableDetail: res.tableDetail,
                orderImg: res.fileList[0],
                imgList: res.fileList.map(n=>{
                  if (RegExp(/.jpg|.JPG|.png|.PNG|.jpeg|.JPEG/).test(n)){
                    return {
                      img:n,
                      off:true
                    }
                  }else{
                    return {
                      img: n,
                      off: false
                    }
                  }
                }),
                cartNum: res.total,
                goodsData: res.mainTable,
                detail: res.mainTable.content ? res.mainTable.content.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ') : '',
                dataset: that.data.dataset
            })
            this.setData({
                'mineGoods.goods_name': res.mainTable.goods_name
            })
            if (res.tableDetail.length > 0) {
                that.data.dataset.goodstype[0].lists[0].active = true
                this.setData({
                    item: res.tableDetail[0],
                    price: res.tableDetail[0].goods_price,
                    goods_id: res.tableDetail[0].goods_id,
                    goods_detail_id: res.tableDetail[0].goods_detail_id,
                    dataset: that.data.dataset
                })
                this.setData({
                    'mineGoods.product_code': res.tableDetail[0].product_code,
                    'mineGoods.sku_id': res.tableDetail[0].sku_id,
                    'mineGoods.sku_name': res.tableDetail[0].sku_name,
                    'mineGoods.goods_price': res.tableDetail[0].goods_price,
                    'mineGoods.goods_detail_id': res.tableDetail[0].goods_detail_id,
                    'mineGoods.goods_id': res.tableDetail[0].goods_id,
                    'mineGoods.set_at': res.tableDetail[0].set_at
                })
            }
        })
    },
}