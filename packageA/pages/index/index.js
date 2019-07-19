import stores from '../../../mixin/store'
import find_car from '../../../mixin/find_car'
import {
  store
} from '../../common/api/api'
const request = new store
const app = getApp()
Page({
  mixins: [stores, find_car],
  /**
   * 页面的初始数据
   */
  data: {
    location: '',
    CleanStore: []
  },
  // banner
  findHome: function() {
    request.findHome().then(res => {
      this.setData({
        dataList: res.data
      })
    })
  },
  personDetail: function() {
    wx.navigateTo({
      url: `../../pages/person_card_detail/index`
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
    wx.navigateTo({
      url: `../../pages/service_detail/index?model=${model}`
    })
  },
  storeDetail: function({
    detail
  }) {
    let model = encodeURIComponent(JSON.stringify(detail))

    wx.navigateTo({
      url: `../../pages/store_detail/index?model=${model}`
    })
  },
  monthList: function() {
    wx.navigateTo({
      url: `../../pages/store_detail/index?model=${model}`
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
  storeList: function(item) {
    console.log(item, 'model')
    let id
    if (item.currentTarget.dataset.item.name) {
      let name = item.currentTarget.dataset.item.name
      if (name = '不限次') {
        id = 3
      } else if (name = '月月') {
        id = 4
      } else if (name = '金麦卡') {
        wx.navigateTo({
          url: `../../pages/store_list/index?id=${id}`,
          success: (result) => {

          },
          fail: () => {},
          complete: () => {}
        });
      }
    } 
    wx.navigateTo({
      url: `../../pages/store_list/index?id=${id}`,
      success: (result) => {

      },
      fail: () => {},
      complete: () => {}
    });

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.onShow();
    this.findHome()
    let that = this
    wx.getLocation({
      type: 'gcj02',
      success: function(res) {
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
        })
        app.globalData.latitude = res.latitude
        app.globalData.longitude = res.longitude
        that.findShopList(that.data.longitude, that.data.latitude)
        that.address(that.data.longitude, that.data.latitude)
        // that.moveTolocation();
      },
      fail: function() {
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
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
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