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
    show: true,
    carInfo: '', //车辆信息
    carName: '', //车辆名字
    goodsList: {
      // result: true,
      // status: 0,
      // count: '总记录数',
      // data: [{
      //   maintainId: "保养id",
      //   maintainName: '小保养',
      //   pickLevel: '推荐等级',
      //   adviseKil: '推荐保养公里数',
      //   adviseCycle: '推荐保养周期',
      //   checkedBtn: false,
      //   goodsMsg: [{
      //     goodsName: '美孚速霸2000合成科技机油5w-40 sn级4L装',
      //     productCode: '货品编号',
      //     skuId: "sku码",
      //     batchNo: '批次号',
      //     goodsModel: '规格型号',
      //     goodsCode: '商品编码1',
      //     price: 199,
      //     profit: 100,
      //     useTime: 100,
      //     uderMil: '使用里程',
      //     checkedBtn: false
      //   }, {
      //     goodsName: '美孚速霸2000合成科技机油5w-40 sn级4L装',
      //     productCode: '货品编号',
      //     skuId: "sku码",
      //     batchNo: '批次号',
      //     goodsModel: '规格型号',
      //     goodsCode: '商品编码2',
      //     price: 229,
      //     profit: 137,
      //     useTime: 100,
      //     uderMil: '使用里程',
      //     checkedBtn: false
      //   }]
      // }, {
      //   maintainId: "保养id",
      //   maintainName: '常规保养',
      //   pickLevel: '推荐等级',
      //   adviseKil: '推荐保养公里数',
      //   adviseCycle: '推荐保养周期',
      //   checkedBtn: false,
      //   goodsMsg: [{
      //     img: '../../common/image/keepup02.png',
      //     goodsName: '美孚速霸2000合成科技机油5w-40 sn级4L装',
      //     productCode: '货品编号',
      //     skuId: "sku码",
      //     batchNo: '批次号',
      //     goodsModel: '规格型号',
      //     goodsCode: '商品编码3',
      //     price: 359,
      //     profit: 14,
      //     useTime: 100,
      //     uderMil: '使用里程',
      //     checkedBtn: false
      //   }]
      // }
      // ],
    }, //保养项目列表
    checkMaintain: [], //用户选中保养列表
    allPrice: 0, //合计价格
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    that.getCarInfo();
  },

  //获取check值
  getCheckedBtn(e) {
    var allPrice = 0;
    checkBtn = e.detail.a.checkedBtn;
    if (checkBtn === true) {
      that.data.checkMaintain.push(e.detail.a)
      that.setData({
        checkMaintain: that.data.checkMaintain
      })
      for (var i = 0; i < that.data.checkMaintain.length; i++) {
        for (var j = 0; j < that.data.checkMaintain[i].goodsMsg.length; j++) {

          allPrice += that.data.checkMaintain[i].goodsMsg[j].price;
        }
      }
      that.setData({
        allPrice: allPrice
      })
      //用户选中保养项目缓存
      wx.setStorage({
        key: 'checkMaintain',
        data: that.data.checkMaintain,
      })
    } else if (checkBtn === false) {
      let a = 0;
      for (let i = 0; i < that.data.checkMaintain.length; i++) {
        if (that.data.checkMaintain[i].checkedBtn === true) {
          for (let j = 0; j < that.data.checkMaintain[i].goodsMsg.length; j++) {

            a += that.data.checkMaintain[i].goodsMsg[j].price;
          }
        } else {
          that.data.checkMaintain.splice(i, 1);
        }
      }
      that.setData({
        checkMaintain: that.data.checkMaintain,
        allPrice: that.data.allPrice - (that.data.allPrice - a)
      })

      //用户选中保养项目缓存
      wx.setStorage({
        key: 'checkMaintain',
        data: that.data.checkMaintain,
      })
    }
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
    } else {
    }
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
      key: 'carInfo',
      success: function (res) {
        that.setData({
          carInfo: res.data,
          carName: res.data[0].model
        })
      },
    })
  },

  //修改车辆公里数
  editCarMiles() {
    let editCar = {
      "id": that.data.carInfo[0].id,
      "mileage": that.data.carMiles
    }
    request.editCarMiles(editCar).then(res => {
      if (res.code == '200') {
        that.recommendItem() //调推荐保养项目
        that.data.carInfo[0].mileage = that.data.carMiles;
        wx.setStorage({
          key: 'carInfo',
          data: that.data.carInfo
        })
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
      "carTypeId": that.data.carInfo[0].carTypeId,
      "kilometres": that.data.carInfo[0].mileage
    }
    request.recommendItem(params).then(res => {
      if (res.code == '200') {
        that.setData({
          goodsList: res.result
        })
      } else if (res.code == '500') {
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
    wx.navigateTo({
      url: '../../pages/c_choice_technician/c_choice_technician?allPrice=' + that.data.allPrice,
    })
    // if (checkBtn === true) {
    //   wx.navigateTo({
    //     url: '../../pages/c_choice_technician/c_choice_technician?allPrice=' + that.data.allPrice,
    //   })
    // } else {
    //   wx.showToast({
    //     title: '请选择保养项目',
    //     duration: 2000
    //   })
    // }
  },
})