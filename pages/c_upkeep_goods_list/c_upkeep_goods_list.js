import {
  careItem
} from '../../common/api/c_api.js'
const request = new careItem
let that, _j, _i
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //查询
    sortShow: false,
    brandType: [{
      name: '宝马(BMN)',
      id: '1'
    }, {
      name: '博世(BOS)',
      id: '2'
    }, {
      name: '博世(BOS)',
      id: '3'
    }],
    sortType: [{
      name: '销量',
      id: '1'
    }, {
      name: '价格',
      id: '2'
    }, {
      name: '筛选',
      id: '3'
    }],
    search: {
      car_type: '', //车型
      goods_type: '', //商品类型
      goods_info: [], //需要排除的商品
      sailNum: '', //销量
      goodsPrice: '', //价格
      sorting: 'desc', //排序方法
      minimum: null, //最低价格
      highest: null, //最高价格
      brand: null //选择的品牌
    },
    otherInfo: {
      i: null,
      j: null
    },
    //展示车名
    car_name: ''
  },
  /**
   * 选择品牌
   */
  labelchoose: function (e) {
    this.setData({
      'search.brand': that.data.brandType[e.currentTarget.dataset.index].id
    })
  },
  closeMask: function () {
    this.setData({
      sortShow: false
    })
  },
  addSort: function (e) {
    if (e.currentTarget.dataset.item.name === "销量") {
      this.setData({
        'search.sailNum': 'sailNum',
        'search.goodsPrice': null
      })
      this.changeGoods()
    } else if (e.currentTarget.dataset.item.name === '价格') {
      this.setData({
        'search.sailNum': null,
        'search.goodsPrice': 'goodsPrice'
      })
      this.changeGoods()
    } else {
      this.setData({
        sortShow: true,
        'search.sailNum': null,
        'search.goodsPrice': null
      })
    }
    this.setData({
      'search.sorting': this.data.search.sorting == 'asc' ? 'desc' : 'asc'
    })
  },
  //最小价格
  minimum(e) {
    this.setData({
      'search.minimum': e.detail.value
    })
  },
  //最大价格
  highest(e) {
    this.setData({
      'search.highest': e.detail.value
    })
  },
  //重置
  resetSX() {
    this.setData({
      'search.minimum': null,
      'search.highest': null,
      'search.brand': null,
    })
  },
  //确定
  /**
   * 商品详情
   * dzl
   */
  shop_detail: function (e) {

    let json = {
      goods_name: e.currentTarget.dataset.info.goods_name,//商品名称
      goods_code: e.currentTarget.dataset.info.goods_code,//商品编码
      id: e.currentTarget.dataset.info.id,//商品id
      goods_sku: e.currentTarget.dataset.info.goods_sku,//商品sku
      img: e.currentTarget.dataset.info.img,//商品图片
      price: e.currentTarget.dataset.info.price,//商品单价
      productCode: e.currentTarget.dataset.info.productCode,//货品编码
      product_sku: e.currentTarget.dataset.info.product_sku,//货品sku
      use_cycle: "",
      goodsNum: 1//商品数量
    }

    wx.getStorage({
      key: 'ghInfo',
      success: function (res) {
        let _otherInfo = res.data
        let arr = _otherInfo.goodsList.data[_j].goodsMsg

        _otherInfo.allPrice = (_otherInfo.allPrice - (arr[_i].price * arr[_i].goodsNum)) + e.currentTarget.dataset.info.price
        _otherInfo.goodsList.data[_j].goodsMsg.splice(_i, 1, json)
        wx.setStorage({
          key: 'ghInfo',
          data: _otherInfo,
        })
        wx.redirectTo({
          url: `../c_upkeep_car/c_upkeep_car?info=true`
        })
      },
    })

    // wx.navigateTo({
    //   url: `../shop_goods_detail/index?product_code=${e.currentTarget.dataset.item}`
    // })
  },
  /**
   * 编辑车辆
   * dzl
   */
  editCar: function () {
    wx.navigateTo({
      url: '../my_car/index',
    });

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let info = JSON.parse(options.info)
    that = this
    _i = info.i
    _j = info.j


    wx.getStorage({
      key: 'carInfo',
      success: function (res) {
        that.setData({
          car_name: `${res.data[0].model}(${res.data[0].vehicleType})`,
          'search.car_type': res.data[0].carTypeId,
          'search.goods_type': info.type,
          'search.goods_info': info.goods_info
        })

        that.changeGoods();
      },
    })
  },
  /**
   * 列表
   */
  changeGoods: function () {
    this.setData({
      sortShow: false
    })
    request.changeGoods(this.data.search).then(res => {
      this.setData({
        storeList: res.data.tableData
      })
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