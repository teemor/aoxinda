import { Technician } from '../../common/api/api'
const request = new Technician
Page({

  /**
   * 页面的初始数据
   */
  data: {
    buy_num: 1,
    dataset: {
      name: '米其林轮胎', price: '666',
      goodstype: [{
        name: '类型', lists: [{ active: true }]
      }],
      list: [
        { name: '服务', list: [{ name: "到店安装", id: '01' }, { active: true, name: '无需安装', id: '02' }] }]
    },
    cart: false,
    show: false,
    buyNumber: 1,
    buyNumMin: 1,
    buyNumMax: 0,
  },
  labelChoosed: function (e) {
    console.log(e, 'e')
    let that = this
    let child = that.data.dataset.goodstype[e.currentTarget.dataset.index].lists
    for (let i = 0; i < child.length; i++) {
      that.data.dataset.goodstype[e.currentTarget.dataset.index].lists[i].active = false
    }
    that.data.dataset.goodstype[e.currentTarget.dataset.index].lists[e.currentTarget.dataset.childindex].active = true;
    this.setData({
      dataset: that.data.dataset,
      goods_id: e.currentTarget.dataset.item.goods_id,
      goods_detail_id: e.currentTarget.dataset.item.goods_detail_id
    })
  },
  labelChoose: function (e) {
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
    this.addCarta();
    wx.switchTab({
      url:'../my_cart/index'
    })
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
    request.toCart({ buy_num: this.data.buy_num, goods_id: this.data.goods_id, goods_detail_id: this.data.goods_detail_id }).then(res => {
      if (res.status === 0) {
        wx.showToast({
          title: '加入购物车成功',
          icon: 'success',
          duration: 2000
        });
        this.goodsDetail(this.data.product_code)
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
  },
  /**
   * 购买数量
   */
  onChange: function ({ detail }) {
    this.setData({
      buy_num: detail
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
   * 详情
   */
  goodsDetail: function (code) {
    request.goodsDetail({ product_code: code }).then(res => {
      let that = this
      that.data.dataset.goodstype[0].lists = res.tableDetail
      this.setData({
        cartNum: res.total,
        goodsData: res.mainTable,
        detail:res.mainTable.content.replace(/\<img/gi, '<img style="max-width:100%;height:auto" '),
        dataset: that.data.dataset
      })
      if(res.tableDetail.length>0){
        that.data.dataset.goodstype[0].lists[0].active = true
        this.setData({
          price: res.tableDetail[0].goods_price,
          goods_id: res.tableDetail[0].goods_id,
          goods_detail_id: res.tableDetail[0].goods_detail_id
        })
      } 
    
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