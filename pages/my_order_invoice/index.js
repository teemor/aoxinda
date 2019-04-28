// pages/my_order_invioce/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checked: true,
    ptchecked: true,
    radio: 'pt',
    head: 'p',
  },
  read:function(){
    wx.navigateTo({
      url: '../read_book/index',
      success: (result) => {
        
      },
      fail: () => {},
      complete: () => {}
    });
      
  },
  /**
 * 是否是普通发票
 * @param {*} param0 
 */
  invoiceChange: function ({ detail }) {
    this.setData({
      radio: detail
    })
    if (detail === 'pt') {
      this.setData({
        ptchecked: true
      })
    }else{
      this.setData({
        ptchecked: false
      })
    }
  },
  /**
   * 是否是个人
   */
  headChange: function ({ detail }) {
    this.setData({
      head: detail
    })
    if (detail === 'p') {
      this.setData({
        person: true
      })
    } else {
      this.setData({
        person: false
      })
    }
  },
  /**
   * 是否开发票
   * @param {*} options 
   */
  onChange: function ({ detail }) {
    this.setData({
      checked: detail
    })
    console.log(detail, 'hh')
  },
  radioChange: function ({ detail }) {
    this.setData({
      radio: detail
    })
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