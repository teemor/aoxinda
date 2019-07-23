// pages/my_bank_card/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    add_bank : 1,
    cardList:[{
      path:'../../common/image/my_card_red.png',
      logo:"../../common/image/beijing_bank.png",
      name:"北京银行",
      type:"储蓄卡",
      card_number:"1231231213213212313"
    }, {
      path: '../../common/image/my_card_red.png',
      logo: "../../common/image/beijing_bank.png",
      name: "北京银行",
      type: "储蓄卡",
      card_number: "2135769824486158715"
      }, {
      path: '../../common/image/my_card_red.png',
      logo: "../../common/image/beijing_bank.png",
      name: "北京银行",
      type: "储蓄卡",
      card_number: "9748468797897898"
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    for(let l = 0;l < this.data.cardList.length;l++){
      let i = "cardList["+ l +"].card_number"
      this.setData({
        [i]: that.data.cardList[l].card_number.replace(/\s/g, '').replace(/(\d{4})\d+(\d{4})$/, "**** **** **** $2")
      })
    } 
  },
  addBankCard(){
    wx.navigateTo({
      url: `../choose_bank/index`
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