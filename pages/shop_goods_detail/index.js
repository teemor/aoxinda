import { Technician } from '../../common/api/api'
const request = new Technician
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataset: {
      name: '米其林轮胎', price: '666',
      list: [{
        name: '类型', list:
          [{ name: "普通轮胎", id: '1' }, { name: "改装轮胎", id: '2' }], remark: '该商品需延迟发货，预计发货时间为：2019-05-01'
      },
      { name: '服务', list: [{ name: "到店安装", id: '01' }, { name: '无需安装', id: '02' }] }]
    },
    cart: false,
    show: false,
    buyNumber: 1,
    buyNumMin: 1,
    buyNumMax: 0,
  },
  labelChoose: function (e) {
    console.log(e)
    let that = this
    let child = that.data.dataset.list[e.currentTarget.dataset.index].list
    console.log(child, 'child')
    for (let i = 0; i < child.length; i++) {
      that.data.dataset.list[e.currentTarget.dataset.index].list[i].active = false
    }
    that.data.dataset.list[e.currentTarget.dataset.index].list[e.currentTarget.dataset.childindex].active = true;
    console.log(e.currentTarget.dataset, 'e')
    this.setData({
      dataset: that.data.dataset
    })
  },
  /**
   * 购买
   */
  buyGoods: function () {
    wx.navigateTo({
      url: '../my_cart/index',
      success: (result) => {

      },
      fail: () => { },
      complete: () => { }
    });

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
  addCarta:function(){
    wx.showToast({
      title: '加入购物车成功',
      icon: 'success',
      duration: 2000
    });
    this.setData({
      show:false
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
  numJianTap: function () {
    if (this.data.buyNumber > this.data.buyNumMin) {
      var currentNum = this.data.buyNumber;
      currentNum--;
      this.setData({
        buyNumber: currentNum
      })
    }
  },
  numJiaTap: function () {
    console.log(this.data.buyNumber, 'buyNumber')
    console.log(this.data.buyNumMax, 'buyNumMax')

    if (this.data.buyNumber < this.data.buyNumMax) {
      var currentNum = this.data.buyNumber;
      currentNum++;
      this.setData({
        buyNumber: currentNum
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.product_code)
    request.goodsDetail({ product_code: options.product_code }).then(res => {
      this.setData({
        goodsData: res.mainTable,
        list:res.tableDetail
      })
      console.log(this.data.goodsData,'goodsData')
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