// pages/choose_bank/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    card_list:[{
      src: "../../common/image/gold_card_bg.png",
      text:"建设银行",
      background:"../../common/image/gold_card_bg.png"
    }, {
        src: "../../common/image/gold_card_bg.png",
        text: "建设银行",
        background: "../../common/image/gold_card_bg.png"
      }, {
        src: "../../common/image/gold_card_bg.png",
        text: "建设银行",
        background: "../../common/image/gold_card_bg.png"
      }, {
        src: "../../common/image/gold_card_bg.png",
        text: "建设银行",
        background: "../../common/image/gold_card_bg.png"
      },{
        src: "../../common/image/gold_card_bg.png",
        text: "建设银行",
        background: "../../common/image/gold_card_bg.png"
      }],
    title_close:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  close : function (){
    this.setData({
      title_close : true
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