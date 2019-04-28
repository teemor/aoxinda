
Page({
  data: {

  },
  onLoad: function (options) {
    console.log(options,'heh')
    this.setData({
      detailData:JSON.parse(options.detailData)
    })
    console.log(this.data.detailData.config[0].carSize,'detailData')
    let carSize = this.data.detailData.config[0].carSize.split('*')
    console.log('carSize',carSize)
    this.setData({
      long:carSize[0].split('mm')[0],
      high:carSize[1].split('mm')[0],
      width:carSize[2].split('mm')[0]
    })
    console.log(this.data.width,'宽')
  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
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