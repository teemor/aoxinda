0// pages/my_card_detail/index.js
import { store } from '../../common/api/clean_api'
import { CardHttp } from '../../common/api/card_api'
import QR from '../../utils/qrcode.js'
const app = getApp();
const request = new store
const requestNews = new CardHttp
let that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canvasHidden: false,
    imagePath: '',
    cardInfo: {},
    card_id: null,//新手活动卡id
    card_num: null,//新手活动卡号
    store: [],
    serverInfo: [],
    payInfo: []
  },
  // 全部门店
  myStore:function(){
    wx.navigateTo({
      url: `../../packageA/pages/apply_store_list/index?cardid=${this.data.cardId || this.data.card_id}`,
    })
  },
  //跳转救援
  toRescue() { },
  //用户点击右上角分享
  onShareAppMessage: function () {
    if (this.data.card_id){
      return {
        title: '好友@您：1元洗车？！NO，还有更多...九大专享服务，等你来拿，手慢无哦！',
        imageUrl: 'https://maichefu.oss-cn-beijing.aliyuncs.com/ToShop/news_wx_.png',
        path: `/pages/login/index?sharePeoId=${app.globalData.openId}`,
        success: function (res) {
          wx.showToast({
            title: '分享成功',
            icon: 'success'
          })
        },
        fail: function (res) {
          wx.showToast({
            title: '转发失败',
            icon: 'none'
          })
        }
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    if (options.cardNo) {
      let model = JSON.parse(options.id)
      //获取卡包详情
      requestNews.selectMyCardDetail({
        id: model.id
      }).then(res => {
        that.setData({
          card_id: model.id,
          card_num: options.cardNo,
          cardDet:{
            actName: res.data[0].card_name,
            useAt: res.data[0].end_use_at,
            cardTime: res.data[0].use_times,
            cardNum: options.cardNo,
            card_content: res.data[0].card_content,
            card_price: res.data[0].card_price
          },
          carInfo: res.data[0],
          serverInfo: res.serverData.map(n=>{
            if (n.server_name.indexOf('城区搭电救援') != -1 && n.server_times>0){
              n.btn = true
            }
            return n
          }),
          consumption: res.payData.map(n=>{
            return {
              shopName : n.store_name,
              shopId: n.store_id,
              carNo: n.car_no,
              carMile: n.car_mile,
              conTime: n.pay_at,
              con: n.thSalist.map(m=>{
                return {
                  actName: m.server_name,
                  conNum: m.pay_num,
                  saName: m.sa_name,
                  thName: m.th_name,
                  conId: m.rec_id
                }
              })
            }
          })
        })
        var size = this.setCanvasSize(); //动态设置画布大小
        let content = {
          card_id: model.id
        }
        this.createQrCode(JSON.stringify(content), "canvas", size.w, size.h);
      })
      //获取门店
      requestNews.selectShopList().then(res => {
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
                shop: arr.map(n=>{
                  n.tel = n.phone
                  return {
                    shop : n
                  }
                })
              })
            },
            fail(res) {
              arr = oldData.map(n => {
                n.distance = '--';
                n.time = '--';
                return n
              })
              that.setData({
                shop: arr.map(n => {
                  n.tel = n.phone
                  return {
                    shop: n
                  }
                })
              })
            }
          })
        }
      })
    } else if (options.id) {
      let model = JSON.parse(options.id)
      console.log(model,'ka')
      this.setData({
        cardId:model.id
      })
      // request.cardDetCon({ pageSize: 5, pageIndex: 1, cardId: model.id }).then(res => {
      //   this.setData({
      //     consumption: res.data
      //   })
      //   console.log(res)
      // })
      //获取卡包详情
      request.cardDet({
        actCardType: model.actCardType,
        card_id:model.id,
        lat:app.globalData.latitude,
        log:app.globalData.longitude
      }).then(res => {
        console.log(res,'res')
        if (res.data && res.data.length > 0) {
          that.setData({
            shop: res.shopList,
           cardDet:res.data[0]
          })
          var size = this.setCanvasSize(); //动态设置画布大小
          let content = {
            type: model.actCardType,
            card_id: model.id,
            order_code: this.data.cardDet.cardNum
          }
          this.createQrCode(JSON.stringify(content), "canvas", size.w, size.h);
        } else {
          wx.showToast({
            title: '服务器错误',
            icon: 'loading',
            duration: 1500
          })
        }
      })
    }else{

    }
  },

  onShow: function(){
    if (this.data.cardId){
      request.cardDetCon({ pageSize: 5, pageIndex: 1, cardId: this.data.cardId }).then(res => {
        this.setData({
          consumption: res.data
        })
        console.log(res)
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
    let json = that.data.shop[e.currentTarget.dataset.index].shop
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
  },
  /**
   * 进入评价页面
   */
  goEvaluate: function (e) {
    let relation_lists = [];
    let sers = e.currentTarget.dataset['sers'];
    for (let i in sers) {
      relation_lists.push(sers[i].conId);
    }
    let urlPath = "../my_evaluate_record/index?ordercode=" + e.currentTarget.dataset['ordercode'] + "&shopid=" + e.currentTarget.dataset['shopid'] + "&";
    if (e.currentTarget.dataset['status'] == 1) {
      urlPath = "../my_evaluate_show/index?";
    }
    wx.navigateTo({
      url: urlPath + 'relation_lists=' + relation_lists + "&detailtype=" + e.currentTarget.dataset['detailtype']
    });
  }
})