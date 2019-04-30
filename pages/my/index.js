import {
  myService
} from '../../common/static/api_data'
Page({
  data: {
    myService
  },
  /**
   * 跳转
   */
  openType:function(e){
    wx.navigateTo({
      url: e.currentTarget.dataset.item,
      success: (result) => {
        
      },
      fail: () => {},
      complete: () => {}
    });
      
  },
  onLoad: function (options) {

  },
  onReady: function () {

  },
  onShow: function () {

  },
})