import { Technician } from '../../common/api/api'
const request = new Technician
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardData: []
  },
  detail:function(e){
    wx.navigateTo({
      url: `../my_card_detail/index?id=${e.detail.id}`,
      success: (result) => {

      },
      fail: () => { },
      complete: () => { }
    });
      
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // request.findMyCarNumCard(app.globalData.id).then(res=>{
    //   console.log(res)
    // })
    let that = this
    //app.globalData.openId
    request.findMyCarNumCard({ buy_user_id: "ooUEg5S9qM1117FuuTF3rRS5ROls" }).then(res => {
      if (res.data && res.data.length) {
        that.setData({
          cardData: res.data
        })
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