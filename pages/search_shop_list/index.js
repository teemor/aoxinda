// pages/search_shop_list/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    history:[{name:"机油",id:"1"},{name:"轮胎",id:"2"},{name:"行车记录仪",id:"3"}],
    hot:[{name:"汽车坐垫",id:"1"},{name:"行车记录仪",id:"2"},{name:"灭火器",id:"3"},
    {name:"汽车坐垫",id:"4"},{name:"行车记录仪",id:"5"},{name:"灭火器",id:"6"}]
  },
  /**
   * 搜索列表页的跳转
   */
  onSearch:function(){
    wx.navigateTo({
      url: '../shop_goods_list/index',
      success: (result) => {
        
      },
      fail: () => {},
      complete: () => {}
    });
      
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