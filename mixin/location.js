

const app = getApp()
let QQMapWX = require('../utils/qqmap-wx-jssdk')
let constant = require('../utils/constant')
let qqmapsdk;
module.exports = {
  getlocation: function () {
    let that = this
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
        })
        app.globalData.latitude = res.latitude
        app.globalData.longitude = res.longitude
        that.address(res.longitude, res.latitude)
        // that.moveTolocation();
      },
      fail: function () {
        wx.showToast({
          title: '获取地理位置失败',
          icon: 'none',
          image: '',
          duration: 1500,
          mask: false,
          success: (result) => {

          },
          fail: () => { },
          complete: () => { }
        });

      }
    })
  },
   address: function(longitude, latitude) {
    qqmapsdk = new QQMapWX({
      key: constant.tencentAk
    });
    let that = this
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: latitude,
        longitude: longitude
      },
      success: function(res) {
        console.log(res,'rex')
        that.setData({
          centerAddressBean: res.result,
          location: res.result.formatted_addresses.recommend,
          currentProvince: res.result.address_component.province,
          currentCity: res.result.address_component.city,
          currentDistrict: res.result.address_component.district,
          address: res.result.address
        })
        app.address = that.data.address
        app.location=that.data.location
        console.log(app.address)
      },
      fail: function(res) {
      }
    });
  }
}