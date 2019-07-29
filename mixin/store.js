import {
  store
} from '../common/api/clean_api'
const request = new store
const app = getApp()
let QQMapWX = require('../utils/qqmap-wx-jssdk')
let constant = require('../utils/constant')
let qqmapsdk;
module.exports = {
  findShopList: function(actCardType) {
    console.log(actCardType,'actCardType')
    request.findShopList({
      log: app.globalData.longitude,
      lat: app.globalData.latitude,
      actCardType:actCardType,
      // type: 1,
      pageSize: 5,
      pageIndex: 1,
      // actDetId: ''
      serDictId:''
    }).then(res => {
      this.setData({
        CleanStore: res.data
      })
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
        console.log(that, 'rere');
        that.setData({
          centerAddressBean: res.result,
          location: res.result.formatted_addresses.recommend,
          currentProvince: res.result.address_component.province,
          currentCity: res.result.address_component.city,
          currentDistrict: res.result.address_component.district,
          address: res.result.address
        })
        app.address = that.data.currentCity
      },
      fail: function(res) {
        console.log('rwerr4234', res)
      }
    });
  }
}