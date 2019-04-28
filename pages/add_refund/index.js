// pages/add_refund/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reasonShow:false,
    statusShow:false,
    status:[{name:'未收到货/未安装',text:'包含未收到或者未安装的商品'},{name:'已收到货',text:'已收到货，需要退换已收到的商品，已安装商品不予退换'}],
    reason:[{name:"商品无货",key:'1'},{name:"发货时间问题",key:'1'},{name:"不想要了",key:'1'},{name:"商品信息填写错误",key:'1'},{name:"商品降价",key:'1'},{name:"其他",key:'1'}]
  },
  /**
   * 跳转退款详情
   */
  refundDetail:function(){
    wx.navigateTo({
      url: '../my_order_refund_detail/index',
      success: (result) => {
        
      },
      fail: () => {},
      complete: () => {}
    });
      
  },
  /**
   * 选择商品状态
   */
  Shopstatus:function(){
    this.setData({
     statusShow:true
    })
  },
  /**
   * 选择退款原因
   */
  refundReason:function(){
    this.setData({
      reasonShow:true
    })
  },
  /**
   * 关闭选择状态
   * @param {} options 
   */
  clickMask:function(){
    this.setData({
      reasonShow:false,
      statusShow:false
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