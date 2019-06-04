import { Technician } from '../../common/api/api'
const request = new Technician
import shop_detail from '../../mixin/shop_detail'
Page({
  mixins: [shop_detail],
  /**
   * 页面的初始数据
   */
  data: {
    current: 1,
    store:true,
    buy_num: 1,
    cart: false,
    show: false,
    buyNumber: 1,
    buyNumMin: 1,
    buyNumMax: 0,
    mineGoods: {//yaoda
      buy_num: 1,//商品数量
      product_code: '',//货品编号
      goods_detail_id: null,//商品详情id
      goods_id: null,//商品id
      goods_price: 0,//商品价格
      sku_id: '',//货品sku
      sku_name: '',//商品sku
      goods_name: '',//商品名称
      set_at: '',//商品服务时间
    }
  },
  onSwiperChange: function (e) {
    this.setData({
      current: e.detail.current + 1
    })
  },
  labelChoosed: function (e) {
    let that = this
    let child = that.data.dataset.goodstype[e.currentTarget.dataset.index].lists
    for (let i = 0; i < child.length; i++) {
      that.data.dataset.goodstype[e.currentTarget.dataset.index].lists[i].active = false
    }
    that.data.dataset.goodstype[e.currentTarget.dataset.index].lists[e.currentTarget.dataset.childindex].active = true;
    this.setData({
      item:e.currentTarget.dataset.item,
      dataset: that.data.dataset,
      goods_id: e.currentTarget.dataset.item.goods_id,
      goods_detail_id: e.currentTarget.dataset.item.goods_detail_id
    })
    //yaoda
    this.setData({
      'mineGoods.product_code': e.currentTarget.dataset.item.product_code,
      'mineGoods.sku_id': e.currentTarget.dataset.item.sku_id,
      'mineGoods.sku_name': e.currentTarget.dataset.item.sku_name,
      'mineGoods.goods_price': e.currentTarget.dataset.item.goods_price,
      'mineGoods.goods_detail_id': e.currentTarget.dataset.item.goods_detail_id,
      'mineGoods.goods_id': e.currentTarget.dataset.item.goods_id,
      'mineGoods.set_at': e.currentTarget.dataset.item.set_at
    })
  },
  labelChoose: function (e) {
    if (e.currentTarget.dataset.item.name === '无需安装') { 
      this.setData({
        store:false,
      })
    } else {
      this.setData({
        store:true
      })
    }
    let that = this
    let child = that.data.dataset.list[e.currentTarget.dataset.index].list
    for (let i = 0; i < child.length; i++) {
      that.data.dataset.list[e.currentTarget.dataset.index].list[i].active = false
    }
    that.data.dataset.list[e.currentTarget.dataset.index].list[e.currentTarget.dataset.childindex].active = true;
    this.setData({
      dataset: that.data.dataset
    })
  },
  /**
   * 购买
   */
  buyGoods: function () {
    if (this.data.store) {
      wx.showToast({
        title: '请选择门店',
        image: '../../common/image/store_icon.png',
        duration: 1500
      });
    } else {
    this.addCarta();
    let data ={}
    data.num = this.data.buy_num
    data.goods_name = this.data.goodsData.goods_name
    data.price =this.data.price
    data.item = this.data.item
    let  model= encodeURIComponent(JSON.stringify(data))

    wx.navigateTo({
      url: `../add_order/index?data=${model}`
    })
    }
  },
  /**
   * 加入购物车
   * @param {} options 
   */
  addCart: function () {
    this.setData({
      show: true
    })
  },
  /**
   * 
   */
  addCarta: function () {
    if (this.data.store) {
      wx.showToast({
        title: '请选择门店',
        image: '../../common/image/store_icon.png',
        duration: 1500
      });
    } else {
    request.toCart({ buy_num: this.data.buy_num, goods_id: this.data.goods_id, goods_detail_id: this.data.goods_detail_id }).then(res => {
      if (res.status === 0) {
        wx.showToast({
          title: '成功加入购物车',
          icon: 'success',
          duration: 1500,
          success:function(){
            this.goodsDetail(this.data.product_code)
          }
        });
        
      } else {
        wx.showToast({
          title: '加入购物车失败',
          icon: 'error',
          duration: 2000
        });
      }
    })
    this.setData({
      show: false
    })
    }
  },
  /**
   * 购买数量
   */
  onChange: function ({ detail }) {
    this.setData({
      buy_num: detail,
      'mineGoods.buy_num': detail
    })
  },
  /**
   * 关闭弹窗
   * @param {*} options 
   */
  clickMask: function () {
    this.setData({
      show: false
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      product_code: options.product_code
    })
    this.goodsDetail(this.data.product_code)
  },

  /**
   * yaoda
   * 跳转门店选择
   */
  storeChoose: function () {
    wx.setStorage({
      key: 'mineGoods',
      data: this.data.mineGoods,
    })
    wx.navigateTo({
      url: `../shop_store_choose/index`
    })
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