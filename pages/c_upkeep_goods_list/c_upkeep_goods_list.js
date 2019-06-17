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
    }],
    search: {
      car_type: '', //车型
      goodsType: '', //商品类型
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
          'search.goodsType': info.type,
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
   * 商品详情
   * dzl
   */
  shop_detail: function (e) {

    let json = {
      goods_measure: e.currentTarget.dataset.info.goods_measure,//商品计量单位
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
        let _otherInfo = res.data,
          _goodsArr = _otherInfo.goodsList.data[_j]
        if (_goodsArr.goodsMsg[_i].priceAll) {
          json.goodsNum = _goodsArr.jzl
          json.priceAll = Math.round(json.price / json.goods_measure * json.goodsNum * 100) / 100
          _otherInfo.allPrice = _otherInfo.allPrice - _goodsArr.goodsMsg[_i].priceAll + json.priceAll
        } else {
          if (_goodsArr.jzl && _goodsArr.maintainName != '机油') {
            json.goodsNum = Math.ceil(_goodsArr.jzl / json.goods_measure)
          }
          _otherInfo.allPrice = _otherInfo.allPrice - (_goodsArr.goodsMsg[_i].goodsNum * _goodsArr.goodsMsg[_i].price) + (json.goodsNum * json.price)
        }
        _goodsArr.goodsMsg.splice(_i, 1, json)

        wx.setStorage({
          key: 'ghInfo',
          data: _otherInfo,
        })
        wx.redirectTo({
          url: `../c_upkeep_car/c_upkeep_car?info=true`
        })
      },
    })
  }
})