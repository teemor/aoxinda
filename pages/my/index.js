import {
  myService,
  myOrder
} from '../../common/static/api_data'
Page({
  data: {
    myService,
    myOrder
  },
  myOrder:function(){
    wx.navigateTo({
      url:'../my_order/index'
    })
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