import { Technician } from '../../common/api/api'
const request = new Technician
Page({
  data: {

  },

  onLoad: function (options) {
    if(options.id){
      this.setData({
        id:options.id
      })
      request.selectBackOrderDetail().then(res=>{
        this.setData({
          detailData:res
        })
      })
    }
  },
  cancelApply:function(){
    request.updateBackOrder({id:this.data.id,back_type:'20'}).then(res=>{
      if(res.status===0){
        wx.showToast({
          title: '撤销成功',
          icon: 'none',
          image: '',
          duration: 3500,
          mask: false,
          success: (result) => {
            wx.navigateBack({
              url: '1'
            });  
          },
          fail: () => {},
          complete: () => {}
        });
          
             
      }
      console.log(res)
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