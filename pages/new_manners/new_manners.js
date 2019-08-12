import {
  CardHttp
} from '../../common/api/card_api.js'
const request = new CardHttp
const app = getApp();
let that
//1老用户 - 2新用户直接进入 - 3新用户经过分享进入（3.1第一个购买 - 3.2非第一个购买）
Page({
  //页面的初始数据
  data: {
    shareOff: true, //是否邀请进入
    dialogShow: false, //是否老客户
    price: 99, //购买价格
    shareInfo: {}, //分享人信息
    store: [],
    service: []
  },
  //页面的初始化加载
  onLoad: function(options) {
    that = this

    //判断是否从分享来
    this.setData({
      shareOff: app.globalData.sharePeoId ? true : false
    })
    //判断当前用户 - 购买价格
    request.findShare({
      share_id: app.globalData.sharePeoId, //分享人的openid
    }).then(res => {
      this.setData({
        dialogShow: res.isOld == 1 ? true : false,
        price: res.price,
        shareInfo: typeof res.shareInfo == 'string' ? {
          name: '',
          AVATAR_URL: '',
          tel: '',
        } : res.shareInfo,
      })
    })

    //优惠服务
    request.selectFirstActivity().then(res => {
      if (res.data && res.data.length > 0) {
        that.setData({
          service: res.data.map(n => {
            if ([2, 5, 6, 7, 8, 9].indexOf(n.server_id) != -1) {
              n._class = '_half'
            }
            return n
          })
        })
      }
    })
    //适用门店
    request.selectShopList().then(res => {
      if (res.data && res.data.length > 0) {
        let arr, oldData = res.data.map(n => {
          return {
            name: n.NAME,
            address: n.ADDRESS,
            phone: n.TEL,
            coordinate: {
              latitude: n.LAT,
              longitude: n.LOG,
            },
          }
        });
        wx.getLocation({
          type: 'gcj02',
          success(res) {
            arr = oldData.map(n => {
              let km = that.getDistance(n.coordinate.latitude, n.coordinate.longitude, res.latitude, res.longitude)
              n.distance = km;
              n.time = Math.round(km / 50 * 60 * 100) / 100;
              return n
            })
            that.setData({
              store: arr
            })
          },
          fail(res) {
            arr = oldData.map(n => {
              n.distance = '--';
              n.time = '--';
              return n
            })
            that.setData({
              store: arr
            })
          }
        })
      }
    })
  },
  //用户点击右上角分享
  onShareAppMessage: function() {
    let str = '好友@您：1元洗车？！NO，还有更多...九大专享服务，等你来拿，手慢无哦！',
      str2 = '好友@您：99超值尊享大麦卡，九大优惠权益，新人专享';
    return {
      title: this.data.dialogShow ? str2 : str,
      imageUrl: 'https://maichefu.oss-cn-beijing.aliyuncs.com/ToShop/news_wx_.png',
      path: `/pages/new_manners/new_manners?sharePeoId=${app.globalData.openId}`,
      success: function(res) {
        wx.showToast({
          title: '分享成功',
          icon: 'success'
        })
      },
      fail: function(res) {
        wx.showToast({
          title: '转发失败',
          icon: 'none'
        })
      }
    }
  },

  //回到首页
  toIndex(e) {
    wx.reLaunch({
      url: '../index/index'
    })
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
  // 全部门店
  myStore: function() {
    wx.navigateTo({
      url: `/packageA/pages/apply_store_list/index`,
    })
  },
  //根据经纬度判断距离
  // lat1用户的纬度 - lng1用户的经度 - lat2商家的纬度 - lng2商家的经度
  getDistance: function(lat1, lng1, lat2, lng2) {
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
  //付款
  toPay() {
    request.payAct({
      share_id: app.globalData.sharePeoId,
      price: this.data.price,
    }).then(res => {
      if (res.status === false) {
        wx.showToast({
          title: res.description,
          icon: 'none'
        })
      } else {
        let payInfo = JSON.parse(res.result);
        wx.requestPayment({
          timeStamp: payInfo.timeStamp,
          nonceStr: payInfo.nonceStr,
          package: payInfo.package,
          signType: payInfo.signType,
          paySign: payInfo.paySign,
          success: (result) => {
            wx.showToast({
              title: '支付成功',
              duration: 1000,
              success() {
                setTimeout(() => {
                  wx.navigateTo({
                    url: '/pages/my_service_card/index'
                  })
                }, 1000)
              }
            })
          },
          fail: () => {
            wx.showToast({
              title: '支付失败，请重试',
              icon: 'none'
            })
          },
          complete: () => {}
        });

      }
    })
  }

})