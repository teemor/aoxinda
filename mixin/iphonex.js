module.exports = {
    data: {
      isIpx: false
    },
    // iPhoneX做样式兼容
    onShow: function () {
      let that = this
      wx.getSystemInfo({
        success: function (res) {
          if (res.model.indexOf("iPhone X") > -1) {
            that.setData({
              isIpx: true
            })
          }
        }
      })
      console.log(that.data.isIpx,'isIpx')
    }
  }