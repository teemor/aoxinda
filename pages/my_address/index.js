const app = getApp()
import { Technician } from '../../common/api/api'
const request = new Technician
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chooseOff: true,
    addressList:[]
  },
  chooseAddress:function(data){
    let currentPages =  getCurrentPages();
    let prevPage = currentPages[currentPages.length-2];
    prevPage.setData({
      adddata:data
    })
    wx.navigateBack({
      url: '1'
    });

  },
  /**
   * 添加收货地址
   * dzl
   */
  addAddress: function () {
    wx.navigateTo({
      url: '../my_add_address/index',
      success: (result) => {

      },
      fail: () => { },
      complete: () => { }
    });
  },
  /**
  *  调起用户收货地址
   */
   wxAddress:function(){
     wx.chooseAddress({
       success: (result) => {
        request.saveAddress({
        name: result.userName,
        phone: result.telNumber,
        province: result.provinceName,
        city: result.cityName,
        county: result.countyName,
        street: result.detailInfo,
        is_check: 0
      }).then(res=>{
        this.selectAddressList()
      })
       },
       fail: () => {},
       complete: () => {}
     });
       
   },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.index){
      this.setData({
        chooseOff: false
      })
    }
    // this.selectAddressList()
  },
  /**
   * 地址列表
   */
  selectAddressList: function () {
    request.selectAddressList().then(res=>{
      if(res.data.length>0){
        this.setData({
          addressList:res.data,
          addressImg:false
        })
      }else{
        this.setData({
          addressImg:true
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  onShow: function () {
    this.selectAddressList();
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