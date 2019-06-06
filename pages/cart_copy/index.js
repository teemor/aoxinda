
import { Technician } from '../../common/api/api'
const request = new Technician
import shop_detail from '../../mixin/shop_detail'
Page({
  mixins: [shop_detail],
  data: {
    finish: false,
    list: ['a', 'b', 'c'],
    result: [],
    total_price: 0,
    arrsum: []
  },
  /**
   * 详情
   */
  detail: function (e) {
    console.log(e, '进入')
    wx.navigateTo({
      url: `../shop_goods_detail/index?product_code=${e.detail.product_code}`
    })
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
      let ids = []
      this.data.modelarr.forEach(item => {
        ids.push(item.id)
      })
      this.updateCart({ ids: ids, version: '-1' })
      this.setData({
        result: [],
        ischecked: false
      })
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

    let num = 0
    let modelarr = []
    let sum = 0
    let arr = []
    if (this.data.checked) {
      for (let i = 0; i < this.data.cartList.length; i++) {
        arr.push(i.toString())
      }
      this.setData({
        result: arr
      })
      console.log(this.data.result, 'result')
      this.data.cartList.forEach(item => {
        modelarr.push(item)
        num += item.goods_price * item.buy_num
        sum += item.buy_num
        this.setData({
          ischecked: true,
          total_price: num,
          modelarr: modelarr,
          sum: sum
        })
      });
    } else {
      this.setData({
        ischecked: false,
        result: [],
        total_price: 0,
        modelarr: modelarr
      })
    }
  },
  /**
   * 选择
   */
  onChange: function ({ detail }) {
    let modelarr = []
    let num = 0;
    let sum = 0;
    if (detail.length > 0) {
      detail.forEach(item => {
        modelarr.push(this.data.cartList[item])
      })
      this.setData({
        modelarr: modelarr,
        ischecked: true
      })
      this.data.modelarr.forEach(item => {
        num += parseFloat(item.goods_price) * item.buy_num
        sum += item.buy_num
      })
      this.setData({
        total_price: num
      })
    } else {
      this.setData({
        ischecked: false,
        total_price:0
      })
      console.log(this.data.total_price,'total_price')
    }
    console.log(this.data.modelarr, 'modelarrar')
    
    // parseFloat(this.data.cartList[item].goods_price)*this.data.cartList
    // this.data.cartList.forEach(item => {

    //   detail.forEach(e => {
    //     if (item.id == e) {
    //       num += parseFloat(item.goods_price) * item.buy_num
    //       console.log(item.goods_price + 'rwe' + item.buy_num)
    //       return
    //     }
    //   })
    // })
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
      result: detail
    })
    console.log(this.data.result, '选中')
    this.setData({
      sum: sum
    })
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
    console.log(this.data.modelarr, 'modelarr')
    this.updateCart({ id: detail.id, buy_num: detail.buy_num })
    let sum = 0
    // if(){

    // }
    // this.data.result.forEach(item => {
    //   if (detail.id = item) {
    //     sum += detail.goods_price * detail.buy_num
    //     console.log(sum)
    //     this.setData({
    //       total_price: sum
    //     })
    //   }
    // })


  },
  // 购物车服务
  updateCart: function (data) {
    request.updateCart(data).then(res => {
      this.onShow();
    })
  },
  typego: function () {
    wx.switchTab({
      url: `../shopping_mall/index`
    })
  }
})