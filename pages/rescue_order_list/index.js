// pages/rescue/index.js
import Notify from '../../miniprogram_npm/vant-weapp/notify/notify';
import {
  RescueHttp
} from '../../common/api/rescue'
const http = new RescueHttp
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: 0,
    batteryShow: 0,
    rescue_all: [], //救援订单全部
    service: [], //待服务
    inService: [], //服务中
    completed: [], //已完成
    refunded: [], //已退款
    obligation_all: [], //电瓶订单全部
    payment: [], //待付款
    install: [], //待安装
    already_install: [], //已安装
    tabs_change: 0, //救援  电瓶切换
    pages: {
      rescue_all: {
        pagenum: 5,
        totalCount: ''
      }, //救援订单所有
      for_service: {
        pagenum: 5,
        totalCount: ''
      }, //救援待服务
      in_service: {
        pagenum: 5,
        totalCount: ''
      }, //救援服务中
      off_the_stocks: {
        pagenum: 5,
        totalCount: ''
      }, //救援已完成
      refunded: {
        pagenum: 5,
        totalCount: ''
      }, //救援已退款
      obligation_all: {
        pagenum: 5,
        totalCount: ''
      }, //电瓶全部
      obligation: {
        pagenum: 5,
        totalCount: ''
      }, //电瓶待付款
      to_be_installed: {
        pagenum: 5,
        totalCount: ''
      }, //电瓶待安装
      installed: {
        pagenum: 5,
        totalCount: ''
      }, //电瓶已安装
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    //订单列表全部
    http.selectOrderList({
      "pageSize": 5,
      "pageIndex": 1,
      "type": 0
    }).then((res) => {
      this.setData({
        rescue_all: res.orderData,
        'pages.rescue_all.totalCount': res.totalCount
      })
    })
    //待付款
    http.selectOrderList({
      "pageSize": 5,
      "pageIndex": 1,
      "type": 0,
      "order_status": "2"
    }).then((res) => {
      that.setData({
        service: res.orderData,
        'pages.for_service.totalCount': res.totalCount
      })
      console.log(res)
    })
    //待服务
    http.selectOrderList({
      "pageSize": 5,
      "pageIndex": 1,
      "type": 0,
      "order_status": "3"
    }).then((res) => {
      that.setData({
        inService: res.orderData,
        'pages.in_service.totalCount': res.totalCount
      })
    })
    //服务中
    http.selectOrderList({
      "pageSize": 5,
      "pageIndex": 1,
      "type": 0,
      "order_status": "5"
    }).then((res) => {
      that.setData({
        completed: res.orderData,
        'pages.off_the_stocks.totalCount': res.totalCount
      })
    })
    //已完成
    http.selectOrderList({
      "pageSize": 5,
      "pageIndex": 1,
      "type": 0,
      "order_status": "6"
    }).then((res) => {
      that.setData({
        refunded: res.orderData,
        'pages.refunded.totalCount': res.totalCount
      })
    })
    //电瓶订单全部
    http.selectOrderList({
      "pageSize": 5,
      "pageIndex": 1,
      "type": "1"
    }).then((res) => {
      that.setData({
        obligation_all: res.orderData,
        'pages.obligation_all.totalCount': res.totalCount
      })
    })
    //电瓶待付款
    http.selectOrderList({
      "pageSize": 5,
      "pageIndex": 1,
      "type": "1",
      'order_status': 2
    }).then((res) => {
      that.setData({
        payment: res.orderData,
        'pages.to_be_installed.totalCount': res.totalCount
      })
    })
    //电瓶待安装
    http.selectOrderList({
      "pageSize": 5,
      "pageIndex": 1,
      "type": "1",
      'order_status': 3
    }).then((res) => {
      that.setData({
        install: res.orderData,
        'pages.to_be_installed.totalCount': res.totalCount
      })
    })
    //电瓶已安装
    http.selectOrderList({
      "pageSize": 5,
      "pageIndex": 1,
      "type": "1",
      'order_status': 6
    }).then((res) => {
      that.setData({
        already_install: res.orderData,
        'pages.installed.totalCount': res.totalCount
      })
    })
  },
  tabsChange: function(e) {
    this.setData({
      tabs_change: e.detail.index
    })
  },
  // //跳转订单详情
  // orderDetails: function (e) {
  //   wx.navigateTo({
  //     url: '../order_details/index?order_id=' + e.currentTarget.dataset.name,
  //   })
  // },
  // //跳转电瓶详情
  // batteryDetails: function (e) {
  //   wx.navigateTo({
  //     url: '../battery_details/index?order_id=' + e.currentTarget.dataset.name,
  //   })
  // },
  //待服务 服务中 已完成 已退款显示/隐藏
  zero: function() {
    this.setData({
      show: 0
    })
  },
  first: function() {
    this.setData({
      show: 1
    })
  },
  second: function() {
    this.setData({
      show: 2
    })
  },
  third: function() {
    this.setData({
      show: 3
    })
  },
  forth: function() {
    this.setData({
      show: 4
    })
  },
  batteryZero: function() {
    this.setData({
      batteryShow: 0
    })
  },
  batteryFirst: function() {
    this.setData({
      batteryShow: 1
    })
  },
  batterySecond: function() {
    this.setData({
      batteryShow: 2
    })
  },
  batteryThird: function() {
    this.setData({
      batteryShow: 3
    })
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
    // this.onLoad()
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
    var that = this
    wx.setBackgroundTextStyle({
      textStyle: 'dark' // 下拉背景字体、loading 图的样式为dark
    })
    this.onLoad()
    setTimeout(function() {
      wx.stopPullDownRefresh()
    }, 400)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  //电瓶订单全部
  // http.selectOrderList({ "pageSize": 5, "pageIndex": 1, "type": "1" }).then((res) => {
  //   that.setData({
  //     obligation_all: res.orderData,
  //     'pages.obligation_all.totalCount': res.totalCount
  //   })
  // })
  onReachBottom: function() {
    var that = this
    if (this.data.tabs_change == 0 && this.data.show == 1 && this.data.service.length < this.data.pages.for_service.totalCount) {
      //待服务
      that.data.pages.for_service.pagenum += 5
      http.selectOrderList({
        "pageSize": that.data.pages.for_service.pagenum,
        "pageIndex": 1,
        "type": 0,
        "order_status": "4"
      }).then((res) => {
        that.setData({
          service: res.orderData
        })
      })
      console.log("救援待服务")
    } else if (this.data.tabs_change == 0 && this.data.show == 0 && this.data.rescue_all.length < this.data.pages.rescue_all.totalCount) {
      that.data.pages.rescue_all.pagenum += 5
      //救援全部
      http.selectOrderList({
        "pageSize": that.data.pages.rescue_all.pagenum,
        "pageIndex": 1,
        "type": 0
      }).then((res) => {
        that.setData({
          rescue_all: res.orderData
        })
      })
      console.log("救援服务中")
    } else if (this.data.tabs_change == 0 && this.data.show == 2 && this.data.inService.length < this.data.pages.in_service.totalCount) {
      that.data.pages.in_service.pagenum += 5
      //服务中
      http.selectOrderList({
        "pageSize": that.data.pages.in_service.pagenum,
        "pageIndex": 1,
        "type": 0,
        "order_status": "5"
      }).then((res) => {
        that.setData({
          inService: res.orderData
        })
      })
      console.log("救援服务中")
    } else if (this.data.tabs_change == 0 && this.data.show == 3 && this.data.completed.length < this.data.pages.off_the_stocks.totalCount) {
      that.data.pages.off_the_stocks.pagenum += 5
      //已完成
      http.selectOrderList({
        "pageSize": 5,
        "pageIndex": that.data.pages.off_the_stocks.pagenum,
        "type": 0,
        "order_status": "6"
      }).then((res) => {
        that.setData({
          completed: res.orderData
        })
      })
      console.log("救援已完成")
    } else if (this.data.tabs_change == 0 && this.data.show == 4 && this.data.refunded.length < this.data.pages.refunded.totalCount) {
      that.data.pages.refunded.pagenum += 5
      //已退款
      http.selectOrderList({
        "pageSize": that.data.pages.refunded.pagenum,
        "pageIndex": 1,
        "type": 0,
        "order_status": "13"
      }).then((res) => {
        that.setData({
          refunded: res.orderData
        })
      })
      console.log("救援服已退款")
    } else if (this.data.tabs_change == 1 && this.data.batteryShow == 0 && this.data.obligation_all.length < this.data.pages.obligation_all.totalCount) {
      that.data.pages.obligation_all.pagenum += 5
      //电瓶全部
      http.selectOrderList({
        "pageSize": that.data.pages.obligation_all.pagenum,
        "pageIndex": 1,
        "type": 1,
        'order_status': 2
      }).then((res) => {
        that.setData({
          obligation_all: res.orderData
        })
      })
    } else if (this.data.tabs_change == 1 && this.data.batteryShow == 1 && this.data.payment.length < this.data.pages.obligation.totalCount) {
      that.data.pages.obligation.pagenum += 5
      //电瓶待付款
      http.selectOrderList({
        "pageSize": that.data.pages.obligation.pagenum,
        "pageIndex": 1,
        "type": "1",
        'order_status': 2
      }).then((res) => {
        that.setData({
          payment: res.orderData
        })
      })
      console.log("电瓶待付款")
    } else if (this.data.tabs_change == 1 && this.data.batteryShow == 2 && this.data.install.length < this.data.pages.to_be_installed.totalCount) {
      that.data.pages.to_be_installed.pagenum += 5
      //电瓶待安装
      http.selectOrderList({
        "pageSize": that.data.pages.to_be_installed.pagenum,
        "pageIndex": 1,
        "type": "1",
        'order_status': 3
      }).then((res) => {
        that.setData({
          install: res.orderData
        })
      })
      console.log("电瓶待安装")
    } else if (this.data.tabs_change == 1 && this.data.batteryShow == 3 && this.data.already_install.length < this.data.pages.installed.totalCount) {
      that.data.pages.installed.pagenum += 5
      //电瓶已安装
      http.selectOrderList({
        "pageSize": that.data.pages.installed.pagenum,
        "pageIndex": 1,
        "type": "1",
        'order_status': 6
      }).then((res) => {
        that.setData({
          already_install: res.orderData
        })
      })
      console.log("电瓶已安装")
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})