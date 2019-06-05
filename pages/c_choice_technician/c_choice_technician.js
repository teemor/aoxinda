var systemTime = require("../../utils/systemTime.js");
var that;
import {
  choiceSp
} from '../../common/api/c_api.js'
const request = new choiceSp
Page({
  /**
   * 页面的初始数据
   */
  data: {
    goodsInfo: false,
    animationData: {},
    activeNames: [],
    checked: false,
    sp_List: [], //门店列表
    dateChoice: '', //选择日期
    todaySysDate: '', //当天系统日期
    tomSysDate: '', //明天系统日期
    tomAftSysDate: '', //后天系统日期
    getInputSp: false, //获取用户输入搜索的门店
    isshowSp: false, //无门店显示
    showSpInfo: true, //有门店显示
    lat: '', // 经度
    log: '', // 纬度
    pageNumber: 0,
    chooseDate: '', // 当前系统日期或者选择的日期
    alltimeBtnIndex: '', //预约按钮索引
    constructTime: '', //商品到货时间
    userReserveTime: {}, //用户预订的详细信息
    checkMaintain: [], //用户选择的保养项目
    timeBtnIdCont: '', //用户选择的日期
    userLoaction: '', //用户地址
    showLocation: false, //获取地理位置失败显示提示
    allPrice: 0, //商品价格
    thCost: 0, //技师服务费
    totalPrice: 0, //商品和服务费总价格
    stopWork: '', // 歇业日期
    goodsCode: [], //商品编码
    getGoodsTime: {}, //奥新达商品到货时间
    noGoodsList: [], //无货时的商品到货时间列表
    goodsTime_Date: '', //商品到货日期
    spFirstStatus: '', //门店第一天状态
    spSecStatus: '', //门店第二天状态
    spThreeStatus: '', //门店第三天状态
    chooseThDate: '',
    spIndex: -1, // 点击技师的索引（防止连续点击）
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var dateSysList = systemTime.SystemTime()
    that = this;
    that.setData({
      allPrice: options.allPrice || 0,
      totalPrice: options.allPrice || 0,
      todaySysDate: dateSysList.dateSys,
      chooseThDate: dateSysList.dateSys,
      tomSysDate: dateSysList.tom_Date,
      tomAftSysDate: dateSysList.tomAfter_Date
    })
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        that.setData({
          lat: res.latitude,
          log: res.longitude
        })
        let userdistance = {
          "lat": that.data.lat,
          "log": that.data.log,
          "type": 1,
          "pageNumber": that.data.pageNumber
        }
        // 调用所有门店
        that.distanceSp(userdistance)
      },
      fail(res) {
        that.setData({
          showLocation: true
        })
      }
    })
    that.getMaintain() //调用用户选中保养项目
  },

  // 获取用户地理位置
  getUserLocation() {
    wx.chooseLocation({
      success: function(res) {
        that.setData({
          userLoaction: res.name,
          lat: res.latitude,
          log: res.longitude,
          pageNumber: 0,
          showLocation: false
        })
        let userdistance = {
          "lat": that.data.lat,
          "log": that.data.log,
          "type": 1,
          "pageNumber": that.data.pageNumber
        }
        // 调用所有门店
        that.distanceSp(userdistance)
      },
      fail: function(res) {
        that.setData({
          showLocation: true
        })
      }
    })
  },

  //所有门店
  distanceSp(userdistance) {
    request.distanceSp(userdistance).then(res => {
      if (res.code === "200") {
        for (let i = 0; i < res.result.content.length; i++) {
          for (let j = 0; j < res.result.content[i].mcfSysEmpList.length; j++) {
            res.result.content[i].mcfSysEmpList[j]['flag'] = j;
          }
        }
        that.setData({
          sp_List: res.result
        })
      } else if (res.code === '300') {
        that.setData({
          isshowSp: true,
          showSpInfo: false
        })
      } else if (res.code === "500") {
        wx.showToast({
          title: '服务器错误',
          icon: 'loading',
          duration: 1500
        })
      }
    })
  },

  //搜索门店
  searchSp(e) {
    that.setData({
      getInputSp: e.detail.value
    })
    if (e.detail.value != "") {
      let searchValue = {
        "name": e.detail.value,
        "lat": that.data.lat,
        "log": that.data.log,
        "type": 1
      }
      request.searchSp(searchValue).then(res => {
        if (res.code === '200') {
          that.data.sp_List.content = [];
          that.data.sp_List.content.push(res.result[0]);
          that.setData({
            isshowSp: false,
            showSpInfo: true,
            sp_List: that.data.sp_List
          })
        } else if (res.code === '300') {
          that.setData({
            isshowSp: true,
            showSpInfo: false
          })
        } else if (res.code === "500") {
          wx.showToast({
            title: '服务器错误',
            icon: 'loading',
            duration: 1500
          })
        }
      })
    } else if (e.detail.value == '') {
      let userdistance = {
        "lat": that.data.lat,
        "log": that.data.log,
        "type": 1,
        "pageNumber": 0
      }
      that.distanceSp(userdistance);
    }

  },
  // 点击购物车弹出层
  goodsInfo: function(e) {
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'linear'
    })
    that.animation = animation
    animation.translateY(500).step()
    if (that.data.goodsInfo == true) {
      that.setData({
        animationData: animation.export()
      })
      setTimeout(function() {
        that.setData({
          goodsInfo: false
        })
      }, 500)
    } else {
      that.setData({
        animationData: animation.export(),
        goodsInfo: true
      })
      setTimeout(function() {
        animation.translateY(0).step()
        that.setData({
          animationData: animation.export()
        })
      }, 500)
    }
  },
  // 点击遮罩层隐藏弹出层
  hideModal: function(e) {
    var that = this;
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'linear'
    })
    that.animation = animation
    animation.translateY(500).step()
    that.setData({
      animationData: animation.export()
    })
    setTimeout(function() {
      that.setData({
        goodsInfo: false
      })
    }, 500)
  },

  //点击门店
  onChange(e) {
    //清楚之前数据
    if (e.detail.length === 0) {
      return false;
    }
    wx.removeStorage({
      key: 'userReserveTime'
    })

    that.setData({
      activeNames: "",
      spIndex: "",
      dateChoice: "",
      uhide: null,
      alltimeBtnIndex: ''
    })
    let spIndex = e.currentTarget.dataset.index; //门店索引
    let currentShop = that.data.sp_List.content[spIndex];
    that.noGoods(spIndex, currentShop, e.detail);

  },

  //获取选择保养项目缓存
  getMaintain() {
    wx.getStorage({
      key: 'checkMaintain',
      success: function(res) {
        that.setData({
          checkMaintain: res.data
        })
        for (var i = 0; i < res.data.length; i++) {
          for (var j = 0; j < res.data[i].goodsMsg.length; j++) {
            that.data.goodsCode.push({
              goods_num: res.data[i].goodsMsg[j].goodsNum,
              goods_code: res.data[i].goodsMsg[j].productCode,
              sku: res.data[i].goodsMsg[j].goods_sku,
            });
            that.setData({
              goodsCode: that.data.goodsCode
            })
          }
        }
      },
    })
  },

  //预约按钮
  timeBtn(e) {
    var timeBtnId = e.currentTarget.dataset.id; //预约按钮ID
    var timeBtnIndex = e.currentTarget.dataset.index; //预约按钮index
    var thIndex = e.currentTarget.dataset.thindex;
    var spIndex = e.currentTarget.dataset.spindex;
    var alltimeBtnIndex = spIndex + '_' + thIndex + '_' + timeBtnId + '_' + timeBtnIndex;
    var userClickSpId, userClickThId, userClickThName, timeBtnIdCont;

    //判断第几天
    if (timeBtnId == "0") {
      timeBtnIdCont = that.data.chooseThDate;
    } else if (timeBtnId == "1") {
      timeBtnIdCont = that.data.tomSysDate;
    } else if (timeBtnId == "2") {
      timeBtnIdCont = that.data.tomAftSysDate
    }
    that.setData({
      timeBtnIdCont: timeBtnIdCont
    })
    var userReserveTime = {
      "userClickSp": that.data.sp_List.content[spIndex],
      "userClickTh": that.data.sp_List.content[spIndex].mcfSysEmpList[thIndex],
      "userClickMaintain": that.data.checkMaintain,
      "userClickTime": timeBtnIndex, //上午下午晚上时间段
      "timeBtnIdCont": timeBtnIdCont //预约时间
    }
    that.setData({
      thCost: that.data.sp_List.content[spIndex].mcfSysEmpList[thIndex].thCost,
      alltimeBtnIndex: alltimeBtnIndex,
      userReserveTime: userReserveTime
    })
    var totalPrice = Number(that.data.allPrice) + Number(that.data.thCost);
    that.setData({
      totalPrice: totalPrice
    })
    //用户选择门店技师和时间缓存
    wx.setStorage({
      key: 'userReserveTime',
      data: that.data.userReserveTime,
    })
  },

  //点击预约技师
  onClickBtn(e) {
    let thIndex = e.currentTarget.dataset.index; // 技师索引
    let spIndex = e.currentTarget.dataset.sp_index; // 门店索引
    let thTime = {
      "date": that.data.chooseThDate,
      "id": that.data.sp_List.content[spIndex].mcfSysEmpList[thIndex].id
    }

    if (that.data.spIndex != spIndex) {
      that.setData({
        spIndex: spIndex
      })
      //技师是否有时间
      request.queryThWork(thTime).then(res => {
        if (res.code == '200') {
          that.setData({
            timeTh: res.result
          })
          let toggleBtnVal = that.data.uhide;
          let clickThFlag = that.data.sp_List.content[spIndex].mcfSysEmpList[thIndex].flag
          if (toggleBtnVal == clickThFlag) {
            that.setData({
              uhide: 0
            })
          } else {
            that.setData({
              uhide: clickThFlag
            })
          }
          var obj = systemTime.SystemTime(that.data.chooseThDate);
          var tomorrow_date = obj.tom_Date;
          var tomAft_date = obj.tomAfter_Date;

          that.setData({
            dateChoice: that.data.chooseThDate,
            chooseDate: that.data.chooseThDate,
            alltimeBtnIndex: '',
            tomSysDate: tomorrow_date,
            tomAftSysDate: tomAft_date
          })

          let restStartTime = that.data.sp_List.content[spIndex].restStartTime
          let restEndTime = that.data.sp_List.content[spIndex].restEndTime
          //将用户选择的时间转换为时间戳
          let userChoict_tamp = new Date(that.data.chooseThDate).getTime(); //用户选择的第一天
          let userTwo_tamp = new Date(that.data.tomSysDate).getTime(); // 用户选择的第二天
          let userThree_tamp = new Date(that.data.tomAftSysDate).getTime(); //用户选择的第三天
          let restStartTime_tamp = new Date(restStartTime).getTime();
          let restEndTime_tamp = new Date(restEndTime).getTime();
          //判断用户选择的日期是否在歇业区间内
          if (userChoict_tamp >= restStartTime_tamp && userChoict_tamp <= restEndTime_tamp) {
            for (let i = 0; i < res.result[0].length; i++) {
              res.result[0][i] = false;
            }
            that.setData({
              timeTh: res.result,
              spFirstStatus: '歇业',
            })
          } else {
            that.setData({
              timeTh: res.result,
              spFirstStatus: '',
            })
          }

          if (userTwo_tamp >= restStartTime_tamp && userTwo_tamp <= restEndTime_tamp) {
            for (let j = 0; j < res.result[1].length; j++) {
              res.result[1][j] = false;
            }
            that.setData({
              timeTh: res.result,
              spSecStatus: '歇业',
            })
          } else {
            that.setData({
              timeTh: res.result,
              spSecStatus: '',
            })
          }

          if (userThree_tamp >= restStartTime_tamp && userThree_tamp <= restEndTime_tamp) {
            for (let k = 0; k < res.result[2].length; k++) {
              res.result[2][k] = false;
            }
            that.setData({
              timeTh: res.result,
              spThreeStatus: '歇业',
            })
          } else {
            that.setData({
              timeTh: res.result,
              spThreeStatus: '',
            })
          }
        } else if (res.code == '500') {

        }
      })
    }

  },

  //无货时调用奥鑫达供应链计算到货时间（应该放到点击门店下）
  noGoods(i, currentShop, detail) {
    // let isGoods = {
    //   "orderCode": that.data.goodsCode,
    //   "storeId": that.data.sp_List[i]
    // }
    let isGoods = {
      shopId: that.data.sp_List.content[i].id,
      goods: that.data.goodsCode
    };
    request.noGoods(isGoods).then(res => {
      if (res.result == '200') {
        that.setData({
          getGoodsTime: res
        })
        for (var i = 0; i < that.data.getGoodsTime.data.length; i++) {
          if (that.data.getGoodsTime.data[i].hasGoods == 1) {
            that.data.noGoodsList.push(that.data.getGoodsTime.data[i].constructTime)
            that.setData({
              noGoodsList: that.data.noGoodsList
            })
            Array.prototype.max = function() {
              var max = this[0];
              for (var m = 0; m < this.length; m++) {
                if (this[m] > max) {
                  max = this[m];
                }
                return max;
              }
            }
            var maxTime = that.data.noGoodsList.max()

            //计算商品到货时间
            var todayDate = new Date(that.data.todaySysDate);
            var today_timetamp = todayDate.getTime();

            //选择到货日期
            var getgoods_timetap = today_timetamp + 24 * 60 * 60 * 1000 * maxTime;
            var goodsTime = new Date(getgoods_timetap);
            var goodsTime_year = goodsTime.getFullYear();
            var goodsTime_month = goodsTime.getMonth() + 1 < 10 ? '0' + (goodsTime.getMonth() + 1) : goodsTime.getMonth() + 1;
            var goodsTime_day = goodsTime.getDate() < 10 ? '0' + goodsTime.getDate() : goodsTime.getDate();
            var goodsTime_Date = goodsTime_year + '-' + goodsTime_month + '-' + goodsTime_day;

            that.setData({
              goodsTime_Date: goodsTime_Date
            })
          }
        }
        if (currentShop.mcfSysEmpList.length === 0) {
          wx.showToast({
            title: '本店暂无技师',
            icon: 'loading',
            duration: 1500
          })
        } else if (currentShop.saNum === 0) {
          wx.showToast({
            title: '暂无服务顾问',
            icon: 'loading',
            duration: 1500
          })
        } else if (that.data.noGoodsList.length != 0) {
          wx.showModal({
            title: '麦车服提示您',
            content: '商品暂时缺货，商品到货日期为：' + that.data.goodsTime_Date,
            success(res) {
              if (res.confirm) {
                var obj = systemTime.SystemTime(that.data.goodsTime_Date);
                var tomorrow_date = obj.tom_Date;
                var tomAft_date = obj.tomAfter_Date;
                that.setData({
                  activeNames: detail,
                  dateChoice: that.data.goodsTime_Date,
                  chooseThDate: that.data.goodsTime_Date,
                  tomSysDate: tomorrow_date,
                  tomAftSysDate: tomAft_date
                })
              } else if (res.cancel) {}
            }
          })
        } else {
          if (currentShop.hasstation) {
            that.setData({
              activeNames: detail
            })
          } else {
            wx.showToast({
              title: '该门店没工位',
              icon: 'loading',
              duration: 1500
            })
          }
        }
      } else if (res.code == '500' || res.status == '500') {
        wx.showToast({
          title: '服务器错误',
          icon: 'loading',
          duration: 2000
        })
      } else {
        wx.showToast({
          title: '访问出错，请重试',
          icon: 'loading',
          duration: 2000
        })
      }
    })
  },

  nullFun: function(e) {

  },

  // 预约技师日期选择
  bindDateChange(e) {
    let thIndex = e.currentTarget.dataset.index; // 技师索引
    let spIndex = e.currentTarget.dataset.sp_index; // 门店索引
    let thTime = {
      "date": e.detail.value,
      "id": that.data.sp_List.content[spIndex].mcfSysEmpList[thIndex].id
    }
    //技师是否有时间
    request.queryThWork(thTime).then(res => {
      if (res.code == '200') {
        var obj = systemTime.SystemTime(e.detail.value);
        var tomorrow_date = obj.tom_Date;
        var tomAft_date = obj.tomAfter_Date;

        that.setData({
          dateChoice: e.detail.value,
          chooseThDate: e.detail.value,
          alltimeBtnIndex: '',
          tomSysDate: tomorrow_date,
          tomAftSysDate: tomAft_date
        })
        let restStartTime = that.data.sp_List.content[spIndex].restStartTime
        let restEndTime = that.data.sp_List.content[spIndex].restEndTime
        //将用户选择的时间转换为时间戳
        let userChoict_tamp = new Date(e.detail.value).getTime(); //用户选择的第一天
        let userTwo_tamp = new Date(that.data.tomSysDate).getTime(); // 用户选择的第二天
        let userThree_tamp = new Date(that.data.tomAftSysDate).getTime(); //用户选择的第三天
        let restStartTime_tamp = new Date(restStartTime).getTime();
        let restEndTime_tamp = new Date(restEndTime).getTime();
        //判断用户选择的日期是否在歇业区间内
        if (userChoict_tamp >= restStartTime_tamp && userChoict_tamp <= restEndTime_tamp) {
          for (let i = 0; i < res.result[0].length; i++) {
            res.result[0][i] = false;
          }
          that.setData({
            timeTh: res.result,
            spFirstStatus: '歇业'
          })
        } else {
          that.setData({
            timeTh: res.result,
            spFirstStatus: '',
          })
        }

        if (userTwo_tamp >= restStartTime_tamp && userTwo_tamp <= restEndTime_tamp) {
          for (let j = 0; j < res.result[1].length; j++) {
            res.result[1][j] = false;
          }
          that.setData({
            timeTh: res.result,
            spSecStatus: '歇业',
          })
        } else {
          that.setData({
            timeTh: res.result,
            spSecStatus: '',
          })
        }

        if (userThree_tamp >= restStartTime_tamp && userThree_tamp <= restEndTime_tamp) {
          for (let k = 0; k < res.result[2].length; k++) {
            res.result[2][k] = false;
          }
          that.setData({
            timeTh: res.result,
            spThreeStatus: '歇业',
          })
        } else {
          that.setData({
            timeTh: res.result,
            spThreeStatus: '',
          })
        }

      } else if (res.code == '500') {

      }
    })

  },

  // 跳转付款
  payment: function() {
    if (that.data.alltimeBtnIndex == '') {
      wx.showToast({
        title: '请选择技师',
        icon: 'loading',
        duration: 1500
      })
    } else {
      wx.navigateTo({
        url: `../c_order/c_order?totalPrice=${that.data.totalPrice}&allPrice=${that.data.allPrice}&thCost=${that.data.thCost}`
      })
      that.setData({
        alltimeBtnIndex: '',
      })
    }

  },

  // 打开权限
  btnFun: function(e) {
    wx.openSetting({
      success(res) {
        that.getUserLocation();
      }
    })
  },
  //门店分页
  onReachBottom: function(e) {
    wx.showNavigationBarLoading();
    wx.showLoading({
      title: '加载中',
    })
    let mynumber = that.data.pageNumber + 1;
    if (mynumber < that.data.sp_List.totalPages) {
      let userdistance = {
        "lat": that.data.lat,
        "log": that.data.log,
        "type": 1,
        "pageNumber": mynumber
      }
      that.setData({
        pageNumber: mynumber
      })
      request.distanceSp(userdistance).then(res => {
        wx.hideNavigationBarLoading();
        wx.hideLoading();
        for (var f = 0; f < res.result.content.length; ++f) {
          for (let j = 0; j < res.result.content[f].mcfSysEmpList.length; j++) {
            res.result.content[f].mcfSysEmpList[j]['flag'] = j;
          }
          that.data.sp_List.content.splice(that.data.sp_List.content.length + f, 0, res.result.content[f])
        }

        that.data.sp_List.number = res.result.number;
        that.setData({
          sp_List: that.data.sp_List
        })
      })
    } else {
      wx.hideNavigationBarLoading();
      wx.hideLoading();
    }
  },
})