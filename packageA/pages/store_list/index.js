import store from '../../../mixin/store'
const app = getApp()
import {
  serviceData
} from '../../common/static/api_data'
Page({
  mixins: [store],
  
  /**
   * 页面的初始数据
   * 
   */
  data: {
    serviceData,
    city:'',
    service:false
  },
  allCity:function(){
    wx.navigateTo({
      url:'../../pages/city_select/index'
    })
  },
  sortType:function(){
    this.setData({
      service:false,
      sort:!this.data.sort
    })
  },
  allService:function(){
    this.setData({
      service:!this.data.service,
      sort:false
    })
  },
  storeDetail:function(e){
    console.log(e)
    wx.navigateTo({
      url: '../../pages/store_detail/index',
      success: (result) => {
        
      },
      fail: () => {},
      complete: () => {}
    });
      
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.id){
      this.findShopList(options.id)
    }else{
      this.findShopList()
    }
  },
  serviceDetail:function({detail}){
    let  model= encodeURIComponent(JSON.stringify(detail))
    wx.navigateTo({
      url:`../../pages/service_detail/index?model=${model}`
    })
  },
  storeDetail:function({detail}){
    let  model= encodeURIComponent(JSON.stringify(detail))
    wx.navigateTo({
      url:`../../pages/store_detail/index?model=${model}`
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
    if(this.data.item){
      this.setData({
        city:this.data.item
      })
    }
console.log(this.data.item)
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