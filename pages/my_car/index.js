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
  addCar: function () {
    wx.navigateTo({
      url: `../add_car_mes/index`
    })
  },
  /**
   * 编辑爱车
   * @param {*} options 
   */
  editCar: function (e) {
    console.log(e.currentTarget.dataset.model,'编辑我的爱车')
    wx.navigateTo({
      url: `../my_car_edit/index?id=${e.currentTarget.dataset.model.carId}&info=${JSON.stringify(e.currentTarget.dataset.model)}`,
      success: (result) => {

      },
      fail: () => { },
      complete: () => { }
    });

  },
  /**
   * 设置默认爱车
   * @param {*} options 
   */
  toDefaultCar: function (e) {
    let that = this
    wx.getStorage({
      key: 'userPhone',
      success: function (res) {
        request.updateDef({ userTel: res.data, carId: e.currentTarget.dataset.id }).then(res => {
          if (res.code == '200') {
            wx.showToast({
              title: '设置成功',
              icon: 'success'
            })
            that.findCarList()
          } else {
            wx.showToast({
              title: '设置失败',
              icon: 'error'
            })
          }
        })
      },
      fail: function (res) {
        wx.showToast({
          title: '未获取到手机号',
          icon: 'error'
        })
      }
    })
  },
  /**
   * 删除爱车
   * @param {*} options 
   */
  toDeleteCar: function (e) {
    let that = this
    wx.showModal({
      title: '提示',
      content: '是否确认删除',
      success(res) {
        if (res.confirm) {
          request.deleteCar({ carId: e.currentTarget.dataset.id }).then(res => {
            if (res.code == '200') {
              wx.showToast({
                title: '删除成功',
                icon: 'success'
              })
              console.log(that,'that123')
              that.findCarList()
            } else {
              wx.showToast({
                title: '删除失败',
                icon: 'error'
              })
            }
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

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