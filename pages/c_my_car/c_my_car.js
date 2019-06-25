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
   * 跳转车保养
   */
  toFWcar: function (e) {
    if (e.currentTarget.dataset.status == '0') {
      wx.redirectTo({
        url: `../c_upkeep_car/c_upkeep_car`
      })
    } else {
      wx.getStorage({
        key: 'userPhone',
        success: function (res) {
          request.updateDef({
            userTel: res.data,
            carId: e.currentTarget.dataset.carid
          }).then(res => {
            if (res.code == '200') {
              wx.redirectTo({
                url: `../c_upkeep_car/c_upkeep_car`
              })
            } else {
              wx.showToast({
                title: '设置失败',
                icon: 'warning',
                duration: 1500
              })
            }
          })

        },
      })
    }

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
  }
})