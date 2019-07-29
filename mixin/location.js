

const app = getApp()

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
        that.findShopList('')
        that.address(that.data.longitude, that.data.latitude)
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
}