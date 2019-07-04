import {
  store
} from '../../common/api/api'
const request = new store
const app = getApp();
Page({
  data: {
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    add: false,
    cartShow: false
  },
  onClickButton:function(){
    let model = encodeURIComponent(JSON.stringify(this.data.cartModel))
    wx.navigateTo({
      url: `../../pages/add_order/index?model=${model}`,
      success: (result) => {
      },
      fail: () => {},
      complete: () => {}
    });
      
  },
  numChange: function ({ detail }) {
    console.log(1)
    console.log(detail, 'detail')
    request.addCart({
      shopId: this.data.model.id, userId: app.globalData.openId, activityId: detail.item.actId, cartNum: detail.num, price: detail.item.actPrice
    }).then(res => {
    })
  },
  makePhone: function ({ currentTarget }) {
    console.log(currentTarget.dataset.item)
    if (currentTarget.dataset.item) {
      wx.makePhoneCall({
        phoneNumber: currentTarget.dataset.item
      })
    }

  },
  showCartList: function () {
    this.setData({
      cartShow: !this.data.cartShow
    })
    request.findcarList({ userId: app.globalData.openId, shopId: this.data.model.id, pageIndex: 1, pageSize: 10 }).then(res => {
      this.setData({
        cartModel:res.data.records
      })
    })
  },
  allService: function () {
    this.setData({
      cartShow: false
    })
  },
  onLoad: function (options) {
    if (options.model) {
      let model = JSON.parse(decodeURIComponent(options.model))
      this.setData({
        model: model
      })
      request.findShopDet({ shopId: model.id }).then(res => {
        this.setData({
          detailModel: res.data
        })
      })
    }
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