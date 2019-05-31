import { Technician } from '../../common/api/api'
const request = new Technician
import find_car from '../../mixin/find_car'

Page({
  mixins: [find_car],

  /**
   * 页面的初始数据
   */
  data: {
    list: ['', '']
  },
  /**
   * 添加爱车
   */
  addCar:function(){
    wx.navigateTo({
      url:`../add_car_mes/index`
    })
  },
  /**
   * 编辑爱车
   * @param {*} options 
   */
  editCar: function () {
    wx.navigateTo({
      url: '../my_car_edit/index',
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
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  onShow: function () {
    this.findCarList()
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