import stores from '../../mixin/store'
import find_car from '../../mixin/find_car'
import {
  store
} from '../../common/api/clean_api'
import location from '../../mixin/location.js'
import {
  serviceType
} from '../../common/static/api_data'
const request = new store
const app = getApp()
Page({
  mixins: [stores, find_car, location],
  /**
   * 页面的初始数据
   */
  data: {
    serviceType,
    location: '',
    CleanStore: []
  },
  // banner
  findHome: function() {
    request.findHome().then(res => {
      if (res.data.listT.length>4){
        this.setData({
          height:'height:320rpx'
        })
      }else{
        height:'height:164rpx'
      }
      this.setData({
        dataList: res.data
      })
    })
  },
  /**
   * 洗车美容
   */
  storeCardBtn: function(item) {
    console.log(item,'item')
    wx.navigateTo({
      url: `../../pages/copy_store_list/index?actId=${item.currentTarget.dataset.item.actId}`,
    })
  },
  personDetail: function() {
    wx.navigateTo({
      url: `../../packageA/pages/person_card_detail/index`
    })
  },
  /**
   * 选择地理位置
   */
  locationChoose: function() {
    let that = this
    wx.chooseLocation({
      success: (result) => {
        that.setData({
          location: result.name,
          latitude: result.latitude,
          longitude: result.longitude
        })
        app.globalData.latitude = result.latitude
        app.globalData.longitude = result.longitude
      },
      fail: () => {},
      complete: () => {}
    });
  },
  serviceDetail: function({
    detail
  }) {
    let model = encodeURIComponent(JSON.stringify(detail))
    console.log(model,'model')
    wx.navigateTo({
      url: `../../packageA/pages/service_detail/index?model=${model}`
    })
  },
  storeDetail: function({
    detail
  }) {

    let model = encodeURIComponent(JSON.stringify(detail))
    console.log(detail,'model2')
    app.globalData.shopid = detail.shopId
    wx.navigateTo({
      url: `../../packageA/pages/store_detail/index?model=${model}`
    })
  },
  monthList: function() {
    wx.navigateTo({
      url: `../../packageA/pages/store_detail/index?model=${model}`
    })
  },
  scopeSetting: function() {
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
                success: function(res) {
                  if (res.confirm) {
                    wx.openSetting({
                      success: function(res) {
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
  storeListAll: function() {
    wx.navigateTo({
      url: '../../pages/copy_store_list/index',
    })
  },
  storeList: function(item) {
    console.log(item, 'model')
    let id
    if (item.currentTarget.dataset.item.name) {
      let name = item.currentTarget.dataset.item.name
      if (name === '不限次') {
        console.log('不限次')
        wx.navigateTo({
          url: `../../pages/copy_store_list/index?actCardType=3`,
          success: (result) => {

          },
          fail: () => { },
          complete: () => { }
        });
      } else if (name === '月月') {
        console.log('月月')
        //actId=''
        wx.navigateTo({
          url: `../../pages/copy_store_list/index?actCardType=4`,
          success: (result) => {

          },
          fail: () => { },
          complete: () => { }
        });
      } else if (name === '金麦卡') {
        console.log(name)
        wx.navigateTo({
          url: `../../pages/stored_value_card/index`,
          success: (result) => {

          },
          fail: () => {},
          complete: () => {}
        });
      }
    }
  

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getlocation()
    this.onShow();
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
    this.getlocation()
    this.findHome()
    this.findCarList()
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