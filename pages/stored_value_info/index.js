import { CardHttp } from '../../common/api/card_api'
import QR from '../../utils/qrcode.js'
import Notify from '../../miniprogram_npm/vant-weapp/notify/notify';
const request = new CardHttp
let that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canvasHidden: false,
    imagePath: '',
    active: 0,
    pay: {
      show: false,
      money: 0.00
    },
    cardInfo: {},
    shareInfo: null,
    storeInfo: [],
    serverInfo: [],
    payInfo: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    if (options.card_id) {
      //获取卡包详情
      request.selectPayCard({ id: options.card_id }).then(res => {
        if (res.data && res.data.length > 0) {
          wx.getLocation({
            type: 'gcj02',
            success(res) {
              that.setData({
                storeInfo: json.storeData.map(n => {
                  let km = that.getDistance(n.LAT, n.LOG, res.latitude, res.longitude)
                  n.DISTANCE = km;
                  n.TIME = Math.round(km / 50 * 60 * 100) / 100;
                  return n
                })
              })
            },
            fail(res) {
              that.setData({
                storeInfo: json.storeData
              })
            }
          })
          that.setData({
            cardInfo: json.data[0],
            shareInfo: json.data[0].card_no,
            rechargeInfo: json.rechargeData,
            payInfo: json.payData
          })
          var size = this.setCanvasSize(); //动态设置画布大小
          this.createQrCode(that.data.shareInfo, "canvas", size.w, size.h);
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
    let json = that.data.storeInfo[e.currentTarget.dataset.index]
    wx.openLocation({
      latitude: json.LAT,
      longitude: json.LOG,
      name: json.NAME,
      address: json.ADDRESS,
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
  },
  //消费记录与充值记录切换
  onTabChange(e) {
    console.log(e)
  },
  //充值按钮
  toPay(e) {
    this.setData({
      'pay.show': true
    })
  },
  //充值输入
  payValue(e) {
    this.setData({
      'pay.money': Number(e.detail.value),
    })
  },
  //充值
  onPayClose(e) {
    console.log(e)
    if (e.detail == 'confirm') {
      this.setData({
        'pay.show': false
      })
      console.log(this.data.pay.money)
      if (this.data.pay.money >= 500) {
        request.payCard({ price: this.data.pay.money, type: 1, account_id: this.data.cardInfo.account_id }).then((res) => {
          this.setData({
            'pay.show': false,
            'pay.money': 0.00,
          })
          if (res.status === false) {
            wx.showToast({
              title: res.description
            })
          } else {
            let description = JSON.parse(res.result);
            wx.requestPayment({
              timeStamp: description.timeStamp,
              nonceStr: description.nonceStr,
              package: description.package,
              signType: description.signType,
              paySign: description.paySign,
              success: (res) => {
                console.log('付款成功')
              },
              fail: (res) => {
                console.log('付款失败')
              }
            });

          }
        })
      } else {
        Notify('充值金额需要大于上次金额');
        this.setData({
          'pay.show': true
        })
      }
    } else {
      this.setData({
        'pay.show': false,
        'pay.money': 0.00,
      })
    }
  }
})