
import store from '../../../mixin/store'

const app = getApp()
Page({
  mixins: [store],

  /**
   * 页面的初始数据
   */
  data: {
    location:'',
    CleanStore:[]
  },
  /**
   * 选择地理位置
   */
  locationChoose:function(){ 
    let that =this
    wx.chooseLocation({
      success: (result) => {
        that.setData({
          location:result.name,
          latitude:result.latitude,
          longitude:result.longitude
        })
        app.globalData.latitude= result.latitude
        app.globalData.longitude = result.longitude
      },
      fail: () => {},
      complete: () => {}
    });
      
  },
  storeDetail:function({detail}){
    let  model= encodeURIComponent(JSON.stringify(detail))
    wx.navigateTo({
      url:`../../pages/store_detail/index?model=${model}`
    })
  },
  scopeSetting:function(){
    var that = this;
    wx.getSetting({
      success(res) {
        //地理位置
        if (!res.authSetting['scope.userLocation']) {
          wx.authorize({
            scope: 'scope.userLocation',
            success(res) {
              that.initMap();
            },
            fail() {
              wx.showModal({
                title: '提示',
                content: '定位失败，你未开启定位权限，点击开启定位权限',
                success: function (res) {
                  if (res.confirm) {
                    wx.openSetting({
                      success: function (res) {
                        if (res.authSetting['scope.userLocation']) {
                          that.initMap();
                        } else {
                          consoleUtil.log('用户未同意地理位置权限')
                        }
                      }
                    })
                  }
                }
              })
            }
          })
        } else {
          that.initMap();
        }
      }
    })
  },
  storeList:function(){
    wx.navigateTo({
      url: '../../pages/store_list/index',
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
    let that = this
     wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
        })
        console.log(res,'rererere')
        app.globalData.latitude= res.latitude
        app.globalData.longitude = res.longitude
        that.findShopList(that.data.longitude,that.data.latitude)
        that.address(that.data.longitude,that.data.latitude)
        // that.moveTolocation();
      },
      fail:function(){
       wx.showToast({
          title: '获取地理位置失败',
          icon: 'none',
          image: '',
          duration: 1500,
          mask: false,
          success: (result) => {
            
          },
          fail: () => {},
          complete: () => {}
        });
          
      }
    })
    wx.getSetting({
      success: (result) => {
        
      },
      fail: () => {},
      complete: () => {}
    });

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