import { Technician } from '../../common/api/api'
const request = new Technician
Page({
  data: {

  },

  onLoad: function (options) {
    let model = JSON.parse(decodeURIComponent(options.item))
    console.log(model)

    if (options.id) {
      this.setData({
        id: options.id
      })
      this.selectOrderDetail({ id: this.data.id })
    } else if (options.item){
      this.setData({
        detailData: model
      })
    }
  },
  selectOrderDetail: function (id) {
    request.selectBackOrderDetail(id).then(res => {
      this.setData({
        detailData: res
      })
    })
  },

  editApply: function () {
    console.log(JSON.stringify(this.data.detailData),'fd')
    let model = encodeURIComponent(JSON.stringify(this.data.detailData))

    wx.navigateTo({
      url: `../edit_refund/index?model=${model}`,
      success: (result) => {

      },
      fail: () => { },
      complete: () => { }
    });

  },
  cancelApply: function () {
    let that = this
    wx.showModal({
      content: '您确定要取消本次退款申请吗？',
      success(res) {
        if (res.confirm) {
          request.updateBackOrder({ id: that.data.id, back_type: '20' }).then(res => {
            if (res.status === 0) {
              wx.showToast({
                title: '撤销退款申请成功',
                icon: 'none',
                duration: 3500,
                mask: false,
                success: (result) => {
                  setTimeout(function () {
                    that.selectOrderDetail({ id: that.data.id })
                  }, 2000)
                },
                fail: () => { },
                complete: () => { }
              });
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
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