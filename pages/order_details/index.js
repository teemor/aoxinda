// pages/order_details/index.js
import Notify from '../../miniprogram_npm/vant-weapp/notify/notify';
import {
  RescueHttp
} from '../../common/api/rescue'
const rescueHttp = new RescueHttp
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderData: {},
    battery_list: [], //电瓶列表
    radio_value: '',
    bb: '', //单选按钮选中打印name 什么都不选为空
    id: '', //商品id
    more: false,
    log: '', //经纬度
    lat: '',
    phone: '', //用户手机号
    checked: false,
    ok: false,
    hint: "",
    item: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onChange: function () {
    var new_checked = !this.data.checked
    this.setData({
      checked: new_checked
    })
    console.log(this.data.checked)
  },
  onLoad: function (options) {
    this.setData({
      id: options.order_id
    })
    var that = this
    //详情
    wx.getLocation({ //获取当前经纬度
      type: 'wgs84',
      success: function (res) {

        rescueHttp.selectOrderDetail({
          type: 0,
          order_id: options.order_id,
          // "log": res.longitude,
          // "lat": res.latitude
        }).then((res) => {
          that.setData({
            lat: res.orderData.lat,
            log: res.orderData.lng,
            phone: res.orderData.user_phone
          })
          if (res.orderData.goodsData != undefined) {
            if (res.orderData.goodsData.length > 2) {
              var list = res.orderData.goodsData.slice(0, 2)
              for (var i = 0; i < list.length; i++) {
                list[i].checked = false
              }
              console.log(list)
              that.setData({
                orderData: res.orderData,
                battery_list: list,
                more: true
              })
            } else {
              if (res.orderData.order_status == '服务中') {
                that.setData({
                  orderData: res.orderData
                })
                console.log(that.data.orderData.goodsData)
              } else {
                var list = res.orderData.goodsData
                for (var i = 0; i < list.length; i++) {
                  list[i].checked = false
                }

                that.setData({
                  orderData: res.orderData,
                  battery_list: list,
                  more: false
                })
              }
            }
          } else {
            that.setData({
              orderData: res.orderData
            })
          }
        })
      }
    })
  },
  //单选按钮更多
  loadMore: function () {
    var that = this
    if (this.data.more == true) {
      rescueHttp.selectOrderDetail({
        type: 0,
        order_id: this.data.id,
        "log": "118.18058",
        "lat": "39.63048"
      }).then((res) => {
        var list = res.orderData.goodsData
        for (var i = 0; i < list.length; i++) {
          list[i].checked = false
        }
        that.setData({
          battery_list: list,
          more: false
        })
      })
    } else {

    }
  },
  //单选按钮change事件
  bindtap1: function (e) {
    var that = this
    this.setData({
      bb: ''
    })
    var items = this.data.battery_list;
    for (var i = 0; i < items.length; i++) {
      if (items[i].product_code == this.data.radio_value) {
        for (var j = 0; j < items.length; j++) {
          // console.log("items[j].checked = ", items[j].checked);
          if (items[j].checked && j != i) {
            items[j].checked = false;
          }
        }
        items[i].checked = !(items[i].checked);
        // console.log("-----:", items);
      }
    }
    this.setData({
      battery_list: items
    });
    for (var k = 0; k < items.length; k++) {
      if (items[k].checked == true) {
        that.setData({
          bb: items[k].product_code
        })
      }
    }
    console.log(this.data.bb)
  },
  //救援位置
  skipMap: function (e) {
    var that = this
    wx.getLocation({ //获取当前经纬度
      type: 'wgs84',
      success: function (res) {
        wx.openLocation({ //​使用微信内置地图查看位置。
          latitude: that.data.lat, //要去的纬度-地址
          longitude: that.data.log, //要去的经度-地址
          name: that.data.orderData.final_address
        })
      }
    })
  },
  //拖车救援位置终点
  skipMapLast: function (e) {
    console.log(e.currentTarget.dataset)
    var that = this
    wx.getLocation({ //获取当前经纬度
      type: 'wgs84',
      success: function (res) {
        wx.openLocation({ //​使用微信内置地图查看位置。
          latitude: e.currentTarget.dataset.lat, //要去的纬度-地址
          longitude: e.currentTarget.dataset.lng, //要去的经度-地址
          name: that.data.orderData.final_address
        })
      }
    })
  },
  //单选选中值改变name赋值给radio_value
  radioChange: function (e) {
    console.log(e)
    this.data.radio_value = e.detail.value;
    // console.log(this.data.radio_value);
  },
  //点击立即出发
  startOnce: function () {
    var that = this
    for (var i = 0; i < this.data.battery_list.length; i++) {
      if (this.data.battery_list[i].product_code == this.data.bb) {
        that.setData({
          item: that.data.battery_list[i]
        })
        break
      }
    }
    console.log(that.data.item)
    if (that.data.item != '') {
      var obj = {
        "order_id": that.data.id,
        "shop_id": "a37d5e7387534410a5f72f92051ccea1",
        "goods_lists": [{
          goods_name: that.data.item.goods_name,
          goods_price: that.data.item.goods_price,
          goods_num: 1,
          goods_measure: 1,
          path: that.data.item.goods_pic,
          goods_code: that.data.item.product_code,
          sku: that.data.item.sku_id,
          order_goods_id: that.data.item.order_code
        }]
      }
      rescueHttp.addPower(obj).then((res) => {
        console.log(res)
        this.setData({
          hint: res.message,
          ok: true,
          item: ''
        })
        setTimeout(function () {
          that.setData({
            ok: false
          })
        }, 2000)
        wx.getLocation({ //获取当前经纬度
          type: 'wgs84',
          success: function (res) {
            rescueHttp.selectOrderDetail({
              type: 0,
              order_id: that.data.id,
              "log": res.longitude,
              "lat": res.latitude
            }).then((res) => {
              that.setData({
                lat: res.orderData.lat,
                log: res.orderData.lng,
                phone: res.orderData.user_phone
              })
              if (res.orderData.goodsData != undefined) {
                if (res.orderData.goodsData.length > 2) {
                  var list = res.orderData.goodsData.slice(0, 2)
                  for (var i = 0; i < list.length; i++) {
                    list[i].checked = false
                  }
                  console.log(list)
                  that.setData({
                    orderData: res.orderData,
                    battery_list: list,
                    more: true
                  })
                } else {
                  var list = res.orderData.goodsData
                  for (var i = 0; i < list.length; i++) {
                    list[i].checked = false
                  }

                  that.setData({
                    orderData: res.orderData,
                    battery_list: list,
                    more: false
                  })
                  console.log(that.data.orderData)
                }
              } else {
                that.setData({
                  orderData: res.orderData
                })
              }

            })
          }
        })
      })
    } else {
      var obj = {
        "order_id": that.data.id,
        "shop_id": "a37d5e7387534410a5f72f92051ccea1",
        "goods_lists": []
      }
      rescueHttp.addPower(obj).then((res) => {
        // that.onLoad()
        console.log(res)
        wx.getLocation({ //获取当前经纬度
          type: 'wgs84',
          success: function (res) {
            rescueHttp.selectOrderDetail({
              type: 0,
              order_id: that.data.id,
              "log": res.longitude,
              "lat": res.latitude
            }).then((res) => {
              that.setData({
                lat: res.orderData.lat,
                log: res.orderData.lng,
                phone: res.orderData.user_phone
              })
              if (res.orderData.goodsData != undefined) {
                if (res.orderData.goodsData.length > 2) {
                  var list = res.orderData.goodsData.slice(0, 2)
                  for (var i = 0; i < list.length; i++) {
                    list[i].checked = false
                  }
                  console.log(list)
                  that.setData({
                    orderData: res.orderData,
                    battery_list: list,
                    more: true
                  })
                } else {
                  var list = res.orderData.goodsData
                  for (var i = 0; i < list.length; i++) {
                    list[i].checked = false
                  }

                  that.setData({
                    orderData: res.orderData,
                    battery_list: list,
                    more: false
                  })
                  console.log(that.data.orderData)
                }
              } else {
                that.setData({
                  orderData: res.orderData
                })
              }

            })
          }
        })
      })
    }

  },
  //点击确认完工
  confirmCompleted: function () {
    var that = this
    //搭电点击确认完工
    if (this.data.orderData.goodsData.length != undefined) {
      rescueHttp.surePay({
        order_id: that.data.orderData.id
      }).then((res) => {
        if (res.sure_pay == 3) {
          console.log("非常抱歉，因电瓶单客户未支付，无法确认完工，请督促客户及时操作付款！")
          this.setData({
            hint: "非常抱歉，因电瓶单客户未支付，无法确认完工，请督促客户及时操作付款！",
            ok: true
          })
          setTimeout(function () {
            that.setData({
              ok: false
            })
          }, 2000)
        } else if (res.sure_pay == 1 || res.sure_pay == 2) {
          rescueHttp.updateOrderStatus({
            order_id: that.data.orderData.id,
            order_status: 6
          }).then((res) => {
            console.log(res)
            // that.onLoad()
            wx.getLocation({ //获取当前经纬度
              type: 'wgs84',
              success: function (res) {
                rescueHttp.selectOrderDetail({
                  type: 0,
                  order_id: that.data.id,
                  "log": res.longitude,
                  "lat": res.latitude
                }).then((res) => {
                  that.setData({
                    lat: res.orderData.lat,
                    log: res.orderData.lng,
                    phone: res.orderData.user_phone
                  })
                  if (res.orderData.goodsData != undefined) {
                    if (res.orderData.goodsData.length > 2) {
                      var list = res.orderData.goodsData.slice(0, 2)
                      for (var i = 0; i < list.length; i++) {
                        list[i].checked = false
                      }
                      console.log(list)
                      that.setData({
                        orderData: res.orderData,
                        battery_list: list,
                        more: true
                      })
                    } else {
                      var list = res.orderData.goodsData
                      for (var i = 0; i < list.length; i++) {
                        list[i].checked = false
                      }

                      that.setData({
                        orderData: res.orderData,
                        battery_list: list,
                        more: false
                      })
                      console.log(that.data.orderData)
                    }
                  } else {
                    that.setData({
                      orderData: res.orderData
                    })
                  }

                })
              }
            })
          })
        } else if (res.sure_pay == 0) {
          this.setData({
            hint: "用户支付失败，请稍后再试。",
            ok: true
          })
          setTimeout(function () {
            that.setData({
              ok: false
            })
          }, 2000)
        }
      })

    } else {
      rescueHttp.surePay({
        order_id: that.data.orderData.id
      }).then((res) => {
        if (res.sure_pay == 1 || sure_pay == 2) {
          // 换胎 拖车点击确认完工
          rescueHttp.updateOrderStatus({
            order_id: that.data.orderData.id,
            order_status: 6
          }).then((res) => {
            console.log(res)
            // that.onLoad()
            wx.getLocation({ //获取当前经纬度
              type: 'wgs84',
              success: function (res) {
                rescueHttp.selectOrderDetail({
                  type: 0,
                  order_id: that.data.id,
                  "log": res.longitude,
                  "lat": res.latitude
                }).then((res) => {
                  that.setData({
                    lat: res.orderData.lat,
                    log: res.orderData.lng,
                    phone: res.orderData.user_phone
                  })
                  if (res.orderData.goodsData != undefined) {
                    if (res.orderData.goodsData.length > 2) {
                      var list = res.orderData.goodsData.slice(0, 2)
                      for (var i = 0; i < list.length; i++) {
                        list[i].checked = false
                      }
                      console.log(list)
                      that.setData({
                        orderData: res.orderData,
                        battery_list: list,
                        more: true
                      })
                    } else {
                      var list = res.orderData.goodsData
                      for (var i = 0; i < list.length; i++) {
                        list[i].checked = false
                      }

                      that.setData({
                        orderData: res.orderData,
                        battery_list: list,
                        more: false
                      })
                      console.log(that.data.orderData)
                    }
                  } else {
                    that.setData({
                      orderData: res.orderData
                    })
                  }

                })
              }
            })
          })
        }
      })
    }
  },
  //现场确认更换电瓶打开
  sureOrderGoods: function () {
    this.setData({
      checked: true
    })

  },
  //现场确认更换电瓶
  unbundle: function () {
    var that = this
    rescueHttp.sureOrderGoods({
      order_id: that.data.orderData.goodsData[0].order_goods_id
    }).then((res) => {
      console.log(res)
      that.setData({
        checked: false
      })
    })
  },
  //现场确认更换电瓶关闭
  cancel: function () {
    this.setData({
      checked: false
    })
  },
  //搭电服务中跳转电瓶详情单
  // goGoodsList: function () {
  //   var that = this
  //   wx.navigateTo({
  //     url: '../battery_details/index?order_id=' + that.data.orderData.goodsData[0].order_goods_id
  //   })
  // },
  //打电话
  ringUp: function () {
    wx.makePhoneCall({
      phoneNumber: this.data.phone,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})