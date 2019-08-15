import stores from '../../mixin/store'
import {
  store
} from '../../common/api/clean_api'
import find_car from '../../mixin/find_car'
import tab_index from '../../mixin/tab_index'

const request = new store
const app = getApp()
import {
  serviceData
} from '../../common/static/api_data'
Page({
  mixins: [stores, tab_index, find_car],

  /**allService
   * 页面的初始数据
   * 
   */
  data: {
    serTypea: [

      {
        id: 0,
        // 导航名称
        serName: '所有城市',
        // 禁用选项
        // 该导航下所有的可选项
        ser: [
          {
            // 名称
            serName: '温州',
            // id，作为匹配选中状态的标识
            id: 1,
            // 禁用选项
            disabled: true
          },
          {
            serName: '杭州',
            id: 2
          }
        ]
      },
      { serName: '掐灭你', id: 3 },
    ],
    array: ['服务', '商品', '门店'],
    serviceData,
    city: '',
    service: false,
    add: false,
    serviceType: ''
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  onClickNav: function (detail = {}) {
    console.log(detail, 'detail,rwe')
    this.setData({
      mainActiveIndex: detail.index || 0,
    });
  },
  onClickItem: function ({
    detail = {}
  }) {
    this.setData({
      activeId: detail.id,
      service: false,
      serviceType: detail.serName
    })
    console.log(detail, 'detail')
    console.log(detail.serName + ' ' + this.data.serviceType, 'hehehe')
    this.findShopList(app.storeList.actCardType, detail.id, '', this.data.actCarCode, app.storeList.actId)

  },
  allCity: function () {
    wx.navigateTo({
      url: '../../packageA/pages/city_select/index'
    })
  },
  sortType: function () {
    this.setData({
      service: false,
      sort: !this.data.sort
    })
  },
  allService: function () {
    this.setData({
      service: !this.data.service,
      sort: false
    })
  },
  // storeDetail: function(e) {
  //   console.log(e)
  //   wx.navigateTo({
  //     url: '../../packageA/pages/store_detail/index',
  //     success: (result) => {

  //     },
  //     fail: () => {},
  //     complete: () => {}
  //   });

  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    request.findSerType().then(res => {
      this.setData({
        serType: res.serType
      })
    })
    console.log(options)
    console.log(app.storeList, 'hehe')

    this.findByShopList()
  },
  findByShopList: function () {
    request.findByShopList({lat:app.globalData.latitude,log:app.globalData.longitude,pageIndex:1,pageSize:10}).then(res => {
      console.log(res,'mendianlieb')
    })
  },
  serviceDetail: function ({
    detail
  }) {
    let model = encodeURIComponent(JSON.stringify(detail))
    wx.navigateTo({
      url: `../../packageA/pages/service_detail/index?model=${model}`
    })
  },
  storeDetail: function ({
    detail
  }) {
    console.log(detail, 'detailmmmmmm')
    let model = encodeURIComponent(JSON.stringify(detail))
    wx.navigateTo({
      url: `../../packageA/pages/store_detail/index?model=${model}`
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
  onShow: function (options) {
    this.findCarList()
    if (this.data.item) {
      this.setData({
        city: this.data.item
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