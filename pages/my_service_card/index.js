import { store } from '../../common/api/clean_api'
import {
  myServiceCard
} from '../../common/static/api_data'
const request = new store
const app = getApp();
Page({
  data: {
    myServiceCard,
    active: 0,
    id:'',
    url: 'https://maichefu.oss-cn-beijing.aliyuncs.com/ToShop/second.png'
  },
  tabchange: function ({ detail }) {
    console.log(detail)
    if (detail.titlea === 1) {
      this.setData({
        url:'https://maichefu.oss-cn-beijing.aliyuncs.com/ToShop/second.png'
      })
      this.selectCard(1)
    } else if (detail.titlea === 0) {
      this.selectCard(detail.titlea)
      this.setData({
        url: 'https://maichefu.oss-cn-beijing.aliyuncs.com/ToShop/completed.png'
      })
    }else if(detail.titlea===2){
      this.selectCard(detail.titlea)
      this.setData({
        url: 'https://maichefu.oss-cn-beijing.aliyuncs.com/ToShop/Expired.png'
      })
    } else if (detail.titlea === 3){
      this.selectCard(detail.titlea)
      this.setData({
        url: 'https://maichefu.oss-cn-beijing.aliyuncs.com/ToShop/refund.png'
      })
    }
  },
  onPullDownRefresh: function () {
    this.setData({
      active: this.data.active
    })
    this.selectCard(1,3)
    wx.stopPullDownRefresh()

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id === "17") {
      this.setData({
        active: 1
      })
    } else if (options.id === "6") {
      this.setData({
        active: 2
      })
    } else if (options.id === "5") {
      this.setData({
        active: 3
      })
    } else if (options.id === "7") {
      this.setData({
        active: 4
      })
    }
    this.selectCard(1)
  },
  goOrder: function (e) {
    this.setData({
      total: e.detail.pay_money
    })
    this.pay(e.detail.id)
  },
  selectCard: function (type) {
    request.cardList({userId:app.globalData.openId,effectiveType:type}).then(res => {
      this.setData({
        cardList: res.cardList,
        newCardList: res.newCardList
      })
    })
  },
  /**
   * 订单详情
   * dzl
   */
  /**
    * 详情
    * dzl
    */
  cardDetail: function (item) {
    console.log(item.currentTarget.dataset.item,'card')
    let id = item.currentTarget.dataset.item.cardId
    let actCardType = item.currentTarget.dataset.item.actCardType
    let model = {}
    model.id = id
    model.actCardType = actCardType

    wx.navigateTo({
      url: `../my_service_card_detail/index?id=${JSON.stringify(model)}`
    })
  },

  /**
    * 详情
    * yd
    */
  newCardDetail: function (item) {
    let model = {
      id: item.currentTarget.dataset.item.cardId
    }
    wx.navigateTo({
      url: `../my_service_card_detail/index?id=${JSON.stringify(model)}&cardNo=${item.currentTarget.dataset.item.cardNo}`
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