Page({
  data: {
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    previousMargin: 0,
    nextMargin: 0,
  },
  /**
   * 洗车
   * dzl
   */
  cleanBtn: function(e) {
    this.setData({
      num:e.currentTarget.dataset.num
    })
  },
  /**
   * 内饰清洗
   * dzl
   */
  trimBtn: function(e) {
    this.setData({
      num:e.currentTarget.dataset.num
    })
  },
  /**
   * 镀晶
   * dzl
   */
  skinBtn: function(e) {
    this.setData({
      num:e.currentTarget.dataset.num
    })
  },
  /**
   * 销量
   * dzl
   */
  sortsaleBtn:function(e){
    this.setData({
      sort:e.currentTarget.dataset.sort
    })
  },
   /**
   * 距离
   * dzl
   */
  sortfarBtn:function(e){
    this.setData({
      sort:e.currentTarget.dataset.sort
    })
  },
  /**
   * 购买
   * dzl
   */
  carbeautyBtn:function(){
    wx.navigateTo({
      url: '../car_beauty_shop/index',
    })
  },
  onLoad: function(options) {

  },
  onReady: function() {

  },
  onShow: function() {

  },
  onHide: function() {

  },
  onUnload: function() {

  },
  onPullDownRefresh: function() {

  },
  onReachBottom: function() {

  },
  onShareAppMessage: function() {

  }
})