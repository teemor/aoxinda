import {attentionList} from '../../common/static/api_data'
import {
  Technician
} from '../../common/api/api'
const request = new Technician
const app = getApp()
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
    this.setData({
      reslut:e.detail
    })
  },
  typeChange: function(e) {
    this.setData({
      reslut:e.detail
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    request.findMyCarNumCard(app.globalData.id).then(res=>{
      let obj = {}
      obj.img=res[0].img
     obj.washNum=res[0].washNum
       obj.washedNum=res[0].washedNum
        obj.waxNum=res[0].waxNum
        obj.waxedNum=res[0].washedNum
       
      that.setData({
        qrCode:obj
      })
      console.log(res[0],'res')
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