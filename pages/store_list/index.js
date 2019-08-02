import stores from '../../mixin/store'
import {
  store
} from '../../common/api/clean_api'
const request = new store
const app = getApp()
import {
  serviceData
} from '../../common/static/api_data'
Page({
  mixins: [stores],

  /**allService
   * 页面的初始数据
   * 
   */
  data: {
    array: ['服务', '商品', '门店'],
    serviceData,
    city: '',
    service: false,
    add: false
  },
  bindPickerChange: function(e) {
    this.setData({
      index: e.detail.value
    })
  },
  allCity: function() {
    wx.navigateTo({
      url: '../../packageA/pages/city_select/index'
    })
  },
  sortType: function() {
    this.setData({
      service: false,
      sort: !this.data.sort
    })
  },
  allService: function() {
    this.setData({
      service: !this.data.service,
      sort: false
    })
  },
  storeDetail: function(e) {
    console.log(e)
    wx.navigateTo({
      url: '../../packageA/pages/store_detail/index',
      success: (result) => {

      },
      fail: () => {},
      complete: () => {}
    });

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    request.findSerType().then(res=>{
      console.log(res,'resser')
      this.setData({
      serType:res.serType
      })
    })
    if (options.id) {
      this.findShopList(options.id)
      console.log(options, 'options')
    } else if (options.model) {
      let model = JSON.parse(decodeURIComponent(options.model))
      let flag = model.actName ? 0 : 1
      console.log(model.actName, 'model.actname')
      this.setData({
        flag: flag
      })
      request.findSearch({
        pageSize: 5,
        pageIndex: 1,
        log: app.globalData.longitude,
        lat: app.globalData.latitude,
        actName: model.actName ? model.actName : '',
        shouName: model.shopName,
        flag: model.actName ? 0 : 1
      }).then(res => {
        if (model.actName) {
          this.setData({
            CleanStore: res.data
          })
        } else {
          this.setData({
            CleanStore: res.data
          })
        }

      })
    } else {
      this.findShopList('')
    }
  },
  serviceDetail: function({
    detail
  }) {
    let model = encodeURIComponent(JSON.stringify(detail))
    wx.navigateTo({
      url: `../../packageA/pages/service_detail/index?model=${model}`
    })
  },
  storeDetail: function({
    detail
  }) {
    let model = encodeURIComponent(JSON.stringify(detail))
    wx.navigateTo({
      url: `../../packageA/pages/store_detail/index?model=${model}`
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    if (this.data.item) {
      this.setData({
        city: this.data.item
      })
    }
    console.log(this.data.item)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})