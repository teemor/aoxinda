import {
  store
} from '../../common/api/api'
const request = new store

Page({
  data: {
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    add:false
  },
  addNum:function(){
    this.setData({
      add:true
    })
  },
  makePhone:function({currentTarget}){
    console.log(currentTarget.dataset.item)
    if(currentTarget.dataset.item){
      wx.makePhoneCall({
        phoneNumber:currentTarget.dataset.item
      })
    }
   
  },
  onLoad: function (options) {
    if(options.model){
      let model = JSON.parse(decodeURIComponent(options.model))
      console.log(model,'options')
      this.setData({
        model:model
      })
      request.findShopDet({shopId:model.id}).then(res=>{
        console.log(res)
      })
    }
    
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