// pages/upkeep_car/index.js
var that
var checkBtn
import {
  careItem
} from '../../common/api/c_api.js'
import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog';

const request = new careItem
Page({
  /**
   * 页面的初始数据
   */
  data: {
    carMiles: '', //用户输入的公里数
    show: false,
    carInfo: '', //车辆信息
    carName: '', //车辆名字
    goodsList: {}, //保养项目列表
    activeList: [], //用户选中保养index
    checkMaintain: [], //用户选中保养列表
    allPrice: 0, //合计价格
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    //更换返回来的--带有单个商品数
    if (options.info) {
      wx.getStorage({
        key: 'carInfo',
        success: function (res) {
          that.setData({
            show: res.data[0].mileage ? false : true,
            carMiles: res.data[0].mileage || 0,
            carInfo: res.data[0],
            carName: res.data[0].model
          })
        },
      })
      wx.getStorage({
        key: 'ghInfo',
        success: function (res) {
          that.setData({
            allPrice: res.data.allPrice,
            activeList: res.data.activeList,
            checkMaintain: res.data.checkMaintain,
            goodsList: res.data.goodsList
          })
        },
      })

    } else {
      that.getCarInfo();
    }
  },

  //获取check值
  getCheckedBtn(e) {
    that.setData({
      allPrice: e.detail.allPrice,
      activeList: e.detail.activeList,
      checkMaintain: e.detail.checkMaintain,
      goodsList: e.detail.goodsList
    })
  },

  //弹出输入框
  onClose(event) {
    if (event.detail === 'confirm') {
      if (that.data.carMiles == '') {
        wx.showToast({
          title: '请输入公里数',
          icon: 'loading',
          duration: 1500
        })
        this.setData({
          show: false
        });
        setTimeout(() => {
          this.setData({
            show: true
          });
        }, 500)
      } else {
        this.setData({
          show: false,
          carMiles: that.data.carMiles
        });
        that.editCarMiles(); //调用修改车辆公里数
      }
    } else { }
  },

  //获取用户输入公里数
  carMilesValue(e) {
    that.setData({
      carMiles: e.detail.value
    })
  },

  //修改公里数
  editMiles() {
    that.setData({
      show: true
    })
  },

  //获取车辆信息
  getCarInfo() {
    wx.getStorage({
      key: 'userPhone',
      success: function (res) {
        request.isCarInfo(res.data).then(res => {
          if (res.code === "200" && res.result && res.result.length > 0) {
            wx.setStorage({
              key: 'carInfo',
              data: res.result,
            })
            that.setData({
              show: res.result[0].mileage ? false : true,
              carMiles: res.result[0].mileage || 0,
              carInfo: res.result[0],
              carName: res.result[0].model
            })
            if (res.result[0].mileage) {
              that.recommendItem() //调推荐保养项目
            } else {
              that.editMiles()
            }
          } else {
            wx.showModal({
              title: '麦车服',
              content: '您还没有认证车辆',
              confirmText: '去认证',
              showCancel: false,
              success(res) {
                if (res.confirm) {
                  wx.navigateTo({
                    url: '../../pages/add_car/index'
                  })
                } else {
                  wx.reLaunch({
                    url: '../../pages/index/index'
                  })
                }
              }
            })
          }
        })
      }, fail: function (res) {
        wx.showModal({
          title: '麦车服',
          content: '您还没有许可手机号',
          confirmText: '回到首页',
          showCancel: false,
          success(res) {
            wx.reLaunch({
              url: '../../pages/index/index'
            })
          }
        })
      }
    })
  },

  //修改车辆公里数
  editCarMiles() {
    let editCar = {
      "id": that.data.carInfo.id,
      "mileage": that.data.carMiles
    }
    request.editCarMiles(editCar).then(res => {
      if (res.code == '200') {
        that.data.carInfo.mileage = that.data.carMiles;
        wx.setStorage({
          key: 'carInfo',
          data: that.data.carInfo
        })
        that.setData({
          allPrice: 0,
          activeList: null,
          goodsList: []
        })
        that.recommendItem() //调推荐保养项目
      } else if (res.code == '500') {
        wx.showToast({
          title: '服务器错误',
          icon: 'loading',
          duration: 1500
        })
      }
    })
  },

  //智能推荐保养项目
  recommendItem() {
    let params = {
      "last_time": that.data.carInfo.registerDate, //上牌时间
      "LevelID": that.data.carInfo.carTypeId, //车类型
      "jy_km": that.data.carInfo.mileage, //车里程
      "last_km": that.data.carInfo.lastMileage //车上次里程
    }
    request.recommendItem(params).then(res => {
      if (res.result) {
        //处理返回数据 添加购买数量
        //0为默认选中-算价格
        let c_price = 0,
          c_index = [],
          arr = res.data.sort((a, b) => {
            return a.checkedBtn - b.checkedBtn
          }).filter(n => {
            if (n.goodsMsg && n.goodsMsg.length > 0) {
              return true
            }
          }).map((n, i) => {
            n.checkedBtn = n.checkedBtn === 0 ? true : false;
            //初始数据添加--数量
            n.goodsMsg = n.goodsMsg.map(m => {
              if (n.jzl && n.maintainName == "机油") {
                m.priceAll = Math.round(m.price / m.goods_measure * n.jzl * 100) / 100
                m.goodsNum = n.jzl
              } else if (n.jzl && n.maintainName != "机油") {
                m.goodsNum = Math.ceil(n.jzl / m.goods_measure)
              } else {
                m.goodsNum = 1
              }
              return m
            })
            if (n.checkedBtn) {
              //初始选中的集合
              c_index.push(i);
              //初始算选中的总价
              n.goodsMsg.forEach(m => {
                c_price += m.priceAll ? m.priceAll : m.price * m.goodsNum
              })
            }
            return n
          })
        that.setData({
          allPrice: c_price,
          activeList: c_index,
          goodsList: {
            result: res.result,
            status: res.status,
            count: res.count,
            data: arr
          },
          checkMaintain: arr.filter((n, i) => {
            let off = false;
            c_index.forEach(m => {
              if (i == m) {
                off = true;
              }
            })
            return off
          })
        })

      } else {
        wx.showToast({
          title: '获取列表失败',
          icon: 'loading',
          duration: 1500
        })
      }
    })
  },

  // 跳转选择技师与时间
  choicetech: function () {
    if (that.data.activeList.length > 0) {
      wx.setStorage({
        key: 'checkMaintain',
        data: that.data.checkMaintain.map((n, i) => {
          if (n.jzl && n.maintainName == "机油") {
            n.goodsMsg[0].price = n.goodsMsg[0].price / n.goodsMsg[0].goods_measure
          }
          return n
        }),
      })
      wx.navigateTo({
        url: '../../pages/c_choice_technician/c_choice_technician?allPrice=' + that.data.allPrice,
      })
    } else {
      wx.showToast({
        title: '请选择保养项目',
        duration: 2000
      })
    }
  },

  //更换爱车
  toCar: function () {
    wx.navigateTo({
      url: '../../pages/c_my_car/c_my_car'
    })
  }
})