import {attentionList} from '../../common/static/api_data'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    attentionList,
    reslut:Object,
    icon:{
      normal:"/common/image/normal.png",
      action:"/common/image/normal.png"
    }
  },
  /**
   * 注意事项多选
   * dzl
   * @param {} e 
   */
  attentionChange:function(e){
    console.log(e.detail)
    this.setData({
      reslut:e.detail
    })
  },
  typeChange: function(e) {
    console.log(e, 'e')
    this.setData({
      reslut:e.detail
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