
import { Technician } from '../../common/api/api'
const request = new Technician
Page({
  data: {
    finish: false,
    list: ['a', 'b', 'c'],
    result: [],
    total_price: 0
  },
  /**
   * 删除
   */
  deleteAll: function () {
    console.log(this.data.result.length)
    if (this.data.result.length === 0) {
      wx.showToast({
        title: '您还没有选择商品哦',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: false,
        success: (result) => {

        },
        fail: () => { },
        complete: () => { }
      });

    } else {
      this.updateCart({ ids: this.data.result, version: '-1' })
    }
  },
  onShow: function () {
    this.cartList()
  },
  /**
   * 编辑全部完成
   */
  finishclick: function () {
    this.setData({
      finish: !this.data.finish
    })
  },
  /**
   * 全选
   */
  allChange: function ({ detail }) {
    this.setData({
      checked: !this.data.checked
    })
    let arr = []
    let num = 0
    let modelarr = []
    let sum = 0
    if (this.data.checked) {
      this.data.cartList.forEach(item => {
        arr.push(JSON.stringify(item.id))
        modelarr.push(item)
        num += item.goods_price * item.buy_num
        sum += item.buy_num
        this.setData({
          total_price: num,
          result: arr,
          modelarr: modelarr,
          sum: sum
        })
      });
    } else {
      this.setData({
        result: arr,
        total_price: 0,
        modelarr: modelarr
      })
    }
  },
  /**
   * 选择
   */
  onChange: function ({ detail }) {
    let num = 0;
    if (detail.length > 0) {
      this.setData({
        ischecked: true
      })
    } else {
      this.setData({
        ischecked: false
      })
    }
    this.data.cartList.forEach(item => {
      detail.forEach(e => {
        if (item.id == e) {
          num += item.goods_price * item.buy_num
          console.log(item.goods_price + 'rwe' + item.buy_num)
          return
        }
      })
    })
    if (this.data.cartList.length === detail.length) {
      this.setData({
        checked: true
      })
    } else {
      this.setData({
        checked: false
      })
    }
    this.setData({
      total_price: num,
      result: detail
    })
    console.log(this.data.result)
  },
  /**
   * 提交订单
   * @param {*} options 
   */
  goOrder: function () {
    let data = {}
    data.total_price = this.data.total_price
    data.arr = this.data.modelarr
    data.sum = this.data.sum
    let model = encodeURIComponent(JSON.stringify(data))

    wx.navigateTo({
      url: `../add_order/index?model=${model}`,
      success: (result) => {

      },
      fail: () => { },
      complete: () => { }
    });
  },
  onLoad: function (options) {

  },
  /**
   * 购物车列表
   * @param {*} param0 
   */
  cartList: function () {
    request.selectCartList().then(res => {
      if (res.data.length === 0) {
        this.setData({
          showNull: false
        })
      } else {
        this.setData({
          showNull: true,
          cartList: res.data
        })
      }
    })
  },
  /**
   * 购物车数量
   */
  numChange: function ({ detail }) {
    console.log(detail, 'detao')
    console.log(this.data.result, 'detail')
    let sum = 0
    this.data.result.forEach(item => {
      if (detail.id = item) {
        sum += detail.goods_price * detail.buy_num
        console.log(sum)
        this.setData({
          total_price: sum
        })
      }
    })
    this.updateCart({ id: detail.id, buy_num: detail.buy_num })

  },
  // 购物车服务
  updateCart: function (data) {
    request.updateCart(data).then(res => {
      this.cartList()
    })
  },
  typego: function () {
    wx.switchTab({
      url: `../shopping_mall/index`
    })
  }
})