const app = getApp()
import {
  Technician
} from '../../common/api/api'
const request = new Technician
import pay from '../../mixin/pay'
Page({
  mixins: [pay],
  /**
   * 页面的初始数据
   */
  data: {
    storeTotal: 0,
    ispay: false,
    // invoice: '不开具发票'
  },
  /**
   * 发票
   */
  addInvoice: function () {
    wx.navigateTo({
      url: '../my_order_invoice/index'
    })
  },
  onChange:function(e){
    this.setData({
      inCheck:e.detail
    })
  },
  /**
   * 提交订单
   */
  btnBuy: function () {
    if (this.data.address === undefined) {
      wx.showToast({
        title: '请填写收货地址',
        icon: 'none'
      });
    } else if (this.data.goods == false) {
      let data = this.data.goodsList.map(item => {
        return {
          goods_detail_id: item.goods_detail_id,
          goods_num: item.buy_num
        }
      })
      if (!this.data.goodsList[0].server_order_id) {
        this.writeOrder(this.data.item,this.data.name, this.data.address, this.data.phone, '普通快递', this.data.total,  this.data.total, data)
      } else {
        this.writeOrder(this.data.item,this.data.name, this.data.address, this.data.phone, '普通快递', this.data.total,  this.data.total , data, 12, this.data.total, this.data.goodsList[0].server_order_id,
        )
      }
    }else{
      this.writeOrder(this.data.item,this.data.name,this.data.address, this.data.phone, '普通快递',this.data.total, this.data.total,[{goods_detail_id: this.data.goods_detail_id,goods_num:this.data.goodsItem.buy_num}])
    }
  },
  /**
   * 地址
   * @param {*} options 
   */
  locationBtn: function () {
    wx.navigateTo({
      url: '../my_address/index',
      success: (result) => {

      },
      fail: () => { },
      complete: () => { }
    });

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.data) {
      let model = JSON.parse(decodeURIComponent(options.data))
      let goodsList = {}
      goodsList.goods_name = model.goods_name
      goodsList.goods_price = model.price
      goodsList.buy_num = model.num
      goodsList.sku_name = model.item.sku_name
      this.setData({
        sum: model.num,
        total: parseFloat(model.num * model.price.toFixed(2)),
        goodsItem: goodsList,
        goods: true,
        price: model.price,
        goods_detail_id: model.item.goods_detail_id
      })
      // request.goodsDetail({product_code:model.item.product_code}).then(res=>{
      //   console.log(res,'res')
      // })
    } else {
      // 购物车
      let model = JSON.parse(decodeURIComponent(options.model))
      console.log(model, 'storetotal')
      this.setData({
        goods: false,
        goodsList: model.arr,
        total: parseFloat(parseFloat(model.total_price).toFixed(2)),
        storeTotal: model.storeTotal || 0,
        sum: model.sum
      })
    }
    this.chooseAddress();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (this.data.item) {
      request.selectInvoice({
        id: this.data.item
      }).then(res => {
        if (res.data[0].invoice_type === 1) {
          this.setData({
            invoice: '增值税专用发票'
          })
        } else if (res.data[0].invoice_type === 0) {
          if (res.data[0].invoice_title === 0) {
            this.setData({
              invoice: '纸质普通发票 个人'
            })
          } else {
            this.setData({
              invoice: '纸质普通发票 公司'
            })
          }

        }
      })
    }
    if (this.data.adddata) {
      console.log(this.data.adddata.detail, 'adddata')
      let address = this.data.adddata.detail
      this.setData({
        name: address.name,
        phone: address.phone,
        address: address.province + address.city + address.county + address.street
      })
    }
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