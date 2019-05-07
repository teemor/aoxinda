import {
  Technician
} from '../../common/api/api'
const request = new Technician
Page({
  /**
   * 页面的初始数据
   */
  data: {
    region: '请选择',
    content: {},
    defaultAddress: 1
  },
  nameChange: function(e) {
    this.setData({
      name: e.detail.value
    })
  },
  numberChange: function(e) {
    this.setData({
      number: e.detail.value
    })
  },
  /**
   * 详细地址
   */
  addressChange: function(e) {
    this.setData({
      address: e.detail.value
    })
  },
  bindRegionChange: function(e) {
    this.setData({
      region: e.detail.value,
      province: e.detail.value[0],
      city: e.detail.value[1],
      area: e.detail.value[2]
    })
  },
  /**
   * 是否为默认地址
   */
  switchChange: function(e) {
    if (e.detail.value === true) {
      this.setData({
        defaultAddress: 1
      })
    } else {
      this.setData({
        defaultAddress: 0
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.model) {
      let model = decodeURIComponent(options.model)
      this.setData({
        content: JSON.parse(model),
        region: [model.province, model.city, model.content]
      })
    }
  },
  /**
   * 保存地址
   */
  saveAddress: function() {
    console.log(this.data.number, 'number')
    let reg = /^((13[0-9])|(14[5-9])|(15([0-3]|[5-9]))|(16[6])|(17[1-8])|(18[0-9])|(19[8-9]))\d{8}$/g;

    if (this.data.name === undefined) {
      wx.showToast({
        title: '收货人不能为空'
      })
    } else if (this.data.number === undefined) {
      wx.showToast({
        title: '请输入手机号',
        icon: "none"
      })
      return
    } else if (!reg.test(this.data.number)) {
      wx.showToast({
        title: '手机号格式错误',
        icon: "none"
      })
      return
    } else if (this.data.province === undefined) {
      wx.showToast({
        title: '省份不能为空'
      })
    } else if (this.data.city === undefined) {
      wx.showToast({
        title: '城市不能为空'
      })
    } else if (this.data.area === undefined) {
      wx.showToast({
        title: '区域不能为空'
      })
    } else if (this.data.address === undefined) {
      wx.showToast({
        title: '详细不能为空'
      })
    } else {
      request.saveAddress({
        name: this.data.name,
        phone: this.data.number,
        province: this.data.province,
        city: this.data.city,
        county: this.data.area,
        street: this.data.address,
        is_check: this.data.defaultAddress
      }).then(
        res => {
          wx.showToast({
            title: '添加成功'
          })
          if (res.status === 0) {
            wx.navigateBack({
              url: '2'
            })
          }
        }
      )
    }
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