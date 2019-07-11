// pages/my_card_detail/index.js
// import QR from '../../utils/qrcode.js'
import {
  store
} from '../../common/api/api'
const request = new store
let that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canvasHidden: false,
    imagePath: '',
    cardInfo: {},
    shareInfo: null,
    store: [],
    serverInfo: [],
    payInfo: []
  },
  buyCard:function(){
    let model = encodeURIComponent(JSON.stringify(this.data.cardModel))
   wx.navigateTo({
     url: `../add_order/index?card=${model}`,
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
    that = this
    console.log(options,'options')
    if (options.actId) {
      //获取卡包详情
      request.findPayType({
        actId: options.actId,
        actCardType:"2"
      }).then(res => {
        if (res.data && res.data.length > 0) {
          this.setData({
            cardModel:res.data
          })
           } else {
          wx.showToast({
            title: '服务器错误',
            icon: 'loading',
            duration: 1500
          })
        }
      })
    }
  },

  //适配不同屏幕大小的canvas
  setCanvasSize: function () {
    var size = {};
    try {
      var res = wx.getSystemInfoSync();
      var scale = 750 / 686;
      var width = res.windowWidth / scale;
      var height = width; //canvas画布为正方形
      size.w = width;
      size.h = height;
    } catch (e) {
      console.log("获取设备信息失败" + e);
    }
    return size;
  },
  //绘制二维码图片
  createQrCode: function (content, canvasId, cavW, cavH) {
    //调用插件中的draw方法，绘制二维码图片
    QR.api.draw(() => {
      this.canvasToTempImage(canvasId);
    }, content, canvasId, cavW, cavH);
  },
  //获取临时缓存照片路径，存入data中
  canvasToTempImage: function (canvasId) {
    let that = this;
    wx.canvasToTempFilePath({
      canvasId: canvasId, // 这里canvasId即之前创建的canvas-id
      success: function (res) {
        let tempFilePath = res.tempFilePath;
        console.log(tempFilePath);
        that.setData({ // 如果采用mpvue,即 this.imagePath = tempFilePath
          imagePath: tempFilePath,
        });
      },
      fail: function (res) {
        console.log(res);
      }
    });
  },

  //给门店打电话
  onContact(e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone.toString()
    })
  },
  //查看门店地址
  onAddress(e) {
    let json = that.data.store[e.currentTarget.dataset.index]
    wx.openLocation({
      latitude: json.coordinate.latitude,
      longitude: json.coordinate.longitude,
      name: json.name,
      address: json.address,
      scale: 10
    })
  },
  //根据经纬度判断距离
  // lat1用户的纬度
  // lng1用户的经度
  // lat2商家的纬度
  // lng2商家的经度
  getDistance: function (lat1, lng1, lat2, lng2) {
    function Rad(d) {
      return d * Math.PI / 180.0;
    }

    var radLat1 = Rad(lat1);
    var radLat2 = Rad(lat2);
    var a = radLat1 - radLat2;
    var b = Rad(lng1) - Rad(lng2);
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 6378.137;
    s = Math.round(s * 10000) / 10000;
    s = s.toFixed(2) //保留两位小数(公里/km)
    return s
  }
})