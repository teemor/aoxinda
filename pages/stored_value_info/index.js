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
    //消费记录参数
    expense: { "pageSize": 10, "pageIndex": 1},
    expense_total:0,
    //退款记录参数
    refund: { "pageSize": 10, "pageIndex": 1},
    refund_total: 0,
    //充值记录参数
    recharge: { "pageSize": 10, "pageIndex": 1 },
    recharge_total: 0,
    canvasHidden: false,
    tab:0,
    imagePath: '',
    active: 0,
    card_id: null,
    pay: {
      show: false,
      money: 0.01
    },
    cardInfo: {

    },
    // shareInfo: null,
    shareInfo: "",
    storeInfo: [],
    serverInfo: [],
    payInfo: [],
    refundInfo: [],
    rechargeInfo: [],
    min_pay:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    if (options.card_id) {
      //获取卡包详情
      request.selectPayCard({ card_id: options.card_id }).then(res => {
        if (res.data && res.data.length > 0) {
          console.log(res)
          that.setData({
            card_id: options.card_id,
            cardInfo: res.data[0],
            min_pay: options.min_pay,
            shareInfo: res.data[0].card_no
          })
          console.log(options)
          // wx.getLocation({
          //   type: 'gcj02',
          //   success(res) {
          //     that.setData({
          //       storeInfo: json.storeData.map(n => {
          //         let km = that.getDistance(n.LAT, n.LOG, res.latitude, res.longitude)
          //         n.DISTANCE = km;
          //         n.TIME = Math.round(km / 50 * 60 * 100) / 100;
          //         return n
          //       })
          //     })
          //   },
          //   fail(res) {
          //     that.setData({
          //       storeInfo: json.storeData
          //     })
          //   }
          // })
          // that.setData({
          //   cardInfo: json.data[0],
          //   shareInfo: json.data[0].card_no,
          //   rechargeInfo: json.rechargeData,
          //   payInfo: json.payData
          // })
          var size = this.setCanvasSize(); //动态设置画布大小
          this.createQrCode(that.data.shareInfo, "canvas", size.w, size.h);
          console.log(res.data[0].card_no)
        } else {
          wx.showToast({
            title: '服务器错误',
            icon: 'loading',
            duration: 1500
          })
        }
      })
      request.obtainConsumptionList({ "pageSize": 10, "pageIndex": 1, "card_id": options.card_id }).then( res =>{
        that.setData({
          payInfo : res.data,
          expense_total:res.total
        })
        console.log("消费记录",res)
      })
      
      request.obtainRefundList({ "pageSize": 10, "pageIndex": 1, "card_id": options.card_id }).then(res => {
        that.setData({
          refundInfo : res.data,
          refund_total : res.total
        })
        console.log("退款记录", res)
      })

      request.rechargeList({ "pageSize": 10, "pageIndex": 1, "card_id": options.card_id }).then(res => {
        that.setData({
          rechargeInfo: res.data,
          recharge_total: res.total
        })
        console.log("充值记录", res)
      })  
    }
  },
  onShow(){
    this.data.recharge.card_id = this.data.card_id
    this.data.recharge.pageSize = 10
    request.rechargeList(this.data.recharge).then(res => {
      that.setData({
        rechargeInfo: res.data
      })
      console.log("充值记录", res)
    })
  },
  //上拉加载更多
  onReachBottom() {
    if (this.data.tab == 0 && this.data.expense_total > this.data.expense.pageSize){
      wx.showLoading({
        title: '加载中',
      })
      this.data.expense.card_id = this.data.card_id
      this.data.expense.pageSize += 10
      request.obtainConsumptionList(this.data.expense).then(res => {
        console.log(this.data.expense)
        that.setData({
          payInfo: res.data
        })
        wx.hideLoading()
      })
    } else if (this.data.tab == 2 && this.data.refund_total > this.data.refund.pageSize){
      wx.showLoading({
        title: '加载中',
      })
      this.data.refund.card_id = this.data.card_id
      this.data.refund.pageSize += 10
      request.obtainRefundList(this.data.refund).then(res => {
        that.setData({
          refundInfo: res.data
        })
        console.log("退款记录", res)
      })
    } else if (this.data.tab == 1 && this.data.recharge_total > this.data.recharge.pageSize) {
      wx.showLoading({
        title: '加载中',
      })
      this.data.recharge.card_id = this.data.card_id
      this.data.recharge.pageSize += 10
      request.rechargeList(this.data.recharge).then(res => {
        that.setData({
          rechargeInfo: res.data
        })
        console.log("充值记录", res)
      })
    }
    
  },
  //下拉刷新
  onPullDownRefresh: function (){
    var that = this
    request.selectPayCard({ card_id: this.data.card_id }).then(res => {
      if (res.data && res.data.length > 0) {
        console.log(res)
        that.setData({
          cardInfo: res.data[0],
          shareInfo: res.data[0].card_no
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
    request.obtainConsumptionList({ "pageSize": 10, "pageIndex": 1, "card_id": this.data.card_id }).then(res => {
      that.setData({
        payInfo: res.data,
        expense_total: res.total
      })
      this.data.expense.pageSize = 10
      console.log("消费记录", res)

    })

    request.obtainRefundList({ "pageSize": 10, "pageIndex": 1, "card_id": this.data.card_id }).then(res => {
      that.setData({
        refundInfo: res.data,
        refund_total: res.total
      })
      this.data.refund.pageSize = 10
      console.log("退款记录", res)
    })

    request.rechargeList({ "pageSize": 10, "pageIndex": 1, "card_id": this.data.card_id }).then(res => {
      that.setData({
        rechargeInfo: res.data,
        recharge_total: res.total
      })
      this.data.recharge.pageSize = 10
      console.log("充值记录", res)
    })  
    
  },
  //消费详情
  particulars: function (event) {
    console.log(event)
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
    this.setData({
      tab: e.detail.index
    })
  },
  //充值按钮
  toPay(e) {
    // this.setData({
    //   'pay.show': true
    // })
  },
  //充值输入
  payValue(e) {
    this.setData({
      'pay.money': Number(e.detail.value),
    })
  },
  //充值
  onPayClose(e) {
    var that = this
    console.log(e)
    if (e.detail == 'confirm') {
      this.setData({
        'pay.show': false
      })
      console.log(this.data.pay.money)
      if (this.data.pay.money >= 0.01) {
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
                that.data.recharge.card_id = that.data.card_id
                request.rechargeList(this.data.recharge).then(res => {
                  that.setData({
                    rechargeInfo: res.data
                  })
                  console.log("充值记录", res)
                })
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