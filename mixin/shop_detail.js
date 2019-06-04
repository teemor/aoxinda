const app = getApp();
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
                { name: '服务', list: [{ active:true,name: "到店安装", id: '01' }, { name: '无需安装', id: '02' }] }]
        },
    },
    shopDetail:function(e){
        wx.navigateTo({
          url: `../shop_goods_detail/index?product_code=${e.currentTarget.dataset.item}`
        })
      },
    selectOrderDetail: function (options) {
        request.selectOrderDetail({ order_id: options.id }).then(res => {
            let date = new Date(res.create_at)
            let Y = date.getFullYear() + '-';
            let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            let D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate();
            let h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
            let m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':'
            let s = date.getSeconds()<10?'0'+date.getSeconds():date.getSeconds();
            this.setData({
                model: res,
                goodsList: res,
                date: Y + M + D +' '+ h + m + s
            })
            if (res.invoice_id === 1) {
                this.setData({
                    id: res.invoiceData.id
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
                item: res.tableDetail[0],
                tableDetail:res.tableDetail,
                orderImg:res.fileList[0],
                imgList:res.fileList,
                cartNum: res.total,
                goodsData: res.mainTable,
                detail: res.mainTable.content.replace(/\<img/gi, '<img style="max-width:100%;height:auto" '),
                dataset: that.data.dataset
            })
            this.setData({
              'mineGoods.goods_name': res.mainTable.goods_name
            })
            if (res.tableDetail.length > 0) {
                that.data.dataset.goodstype[0].lists[0].active = true
                this.setData({
                    item:res.tableDetail[0],
                    price: res.tableDetail[0].goods_price,
                    goods_id: res.tableDetail[0].goods_id,
                    goods_detail_id: res.tableDetail[0].goods_detail_id,
                    dataset:that.data.dataset
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