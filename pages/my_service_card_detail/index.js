0// pages/my_card_detail/index.js
import { store } from '../../common/api/clean_api'
import QR from '../../utils/qrcode.js'
const app = getApp();
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
  // 全部门店
  myStore:function(){
    wx.navigateTo({
      url: `../../packageA/pages/apply_store_list/index?cardid=${this.data.cardId}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this

    if (options.id) {
      let model = JSON.parse(options.id)
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
          let date = new Date(res.data[0].end_use_at),
            month = (date.getMonth() + 1).toString().length > 1 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1),
            _date = date.getDate().toString().length > 1 ? date.getDate() : '0' + date.getDate()
          res.data[0].end_use_at = `${date.getFullYear()}.${month}.${_date}`
          that.setData({
            shop: res.shopList,
           cardDet:res.data[0]
          })
          var size = this.setCanvasSize(); //动态设置画布大小
          this.createQrCode(that.data.shareInfo.toString(), "canvas", size.w, size.h);
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
      url: urlPath + 'relation_lists=' + relation_lists
    });
  }
})