import {
  typeBigWaxingList,
  typeminiWaxingList,
  typeBigServiceList,
  typeminiServiceList
} from '../../common/static/api_data'
import {
  Technician
} from '../../common/api/api'
const request = new Technician
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeBigWaxingList,
    typeminiWaxingList,
    typeBigServiceList,
    typeminiServiceList,
    miniClick: true,
    reslut: Object
  },

  /**
   * 洗车服务复选框
   * dzl
   */
  typeCleanChange: function(e) {
    console.log(e, 'e')
    this.setData({
      cleanreslut: e.detail
    })
  },
  /**
   * 打蜡服务复选框
   * dzl
   */
  typeWaxingChange: function(e) {
    this.setData({
      waxingreslut: e.detail
    })
  },
  /**
   * 选择中大型汽车
   * @param {*} options 
   */
  bigClick: function() {
    this.setData({
      miniClick: false
    })
  },
  /**
   * 选择轿车
   * @param {*} options 
   */
  miniClick: function() {
    this.setData({
      miniClick: true
    })
  },
  /**
   * 结算
   * @param {*} options 
   */
  buy: function() {
    let clean = this.data.cleanreslut
    let wax = this.data.waxingreslut
    console.log(clean,'clean')
    console.log(wax,'wax')

    let cleanPrice = 0
    let cleanNum = 0
    let waxPrice = 0
    let waxNum = 0
    if(clean!=='undefined'){
      clean.forEach(item => {
        cleanNum = parseInt(item.split('¥')[0]) + cleanNum
        cleanPrice = parseInt(item.split('¥')[1]) + cleanPrice
      });
    }
    if(wax!=='undefined'){
      wax.forEach(item => {
        waxNum = parseInt(item.split('¥')[0]) + waxNum
        waxPrice = parseInt(item.split('¥')[1]) + waxPrice
      })
    }
    let countPrice = cleanPrice + waxPrice
    // let countNum = cleanNum +waxNum
    wx.login({
      success(res) {
        if (res.code) {
          request.payCard(res.code, cleanNum, waxNum, countPrice).then(res => {
            console.log(res, 'res')
          })
        }
      }
    })
    wx.navigateTo({
      url: '../car_beauty_shop_res/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})