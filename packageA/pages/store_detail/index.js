import {
  store
} from '../../common/api/api'
import find_car from '../../../mixin/find_car'
const request = new store
const app = getApp();
Page({
  mixins: [find_car],
  data: {
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    add: false,
    cartShow: false,
    totalPrice: 0,
    cartIcon: false,
    cardShow: true,
    commentList: [], //评论
    load: true,
    loading: false, //加载动画的显示
    commentForm: {
      "pageIndex": 1,
      "pageSize": 10,
      "shop_id": ""
    },
    plusData: true,
    tabIndex: 0 //当前tabs页签下标
  },
  serviceBtn: function ({
    detail
  }) {
    let model = encodeURIComponent(JSON.stringify(detail))
    wx.navigateTo({
      url: `../service_detail/index?model=${model}`,
    })
  },
  showCard: function () {
    this.setData({
      cardShow: !this.data.cardShow
    })
  },
  cardMDetail: function (item) {
    console.log(item.currentTarget.dataset.item, 'detail')
    let id = item.currentTarget.dataset.item
    let actCardType = 4
    let model = {}
    model.id = id
    model.actCardType = actCardType
    wx.navigateTo({
      url: `../../pages/my_card/index?actId=${JSON.stringify(model)}`
    })
  },
  cardQDetail: function (item) {
    console.log(item.currentTarget.dataset.item, 'detail')
    let id = item.currentTarget.dataset.item
    let actCardType = 3
    let model = {}
    model.id = id
    model.actCardType = actCardType
    wx.navigateTo({
      url: `../../pages/my_card/index?actId=${JSON.stringify(model)}`
    })
  },
  onClickButton: function () {
    this.carList()

    let model = encodeURIComponent(JSON.stringify(this.data.cartModel))
    wx.navigateTo({
      url: `../../pages/add_order/index?model=${model}`,
      success: (result) => { },
      fail: () => { },
      complete: () => { }
    });

  },
  numChange: function (e) {
    console.log(e, '购物车')
    let detail = e.currentTarget.dataset.item ? e.currentTarget.dataset.item : e.detail
    let num = e.currentTarget.dataset.item ? e.detail : e.detail.num
    console.log(num)
    // if (e.detail.num = 0) {
    //   this.setData({
    //     plusData: false
    //   })
    // }
    console.log(detail, 'detailwer')
    request.addCart({
      shopId: this.data.shopId,
      userId: app.globalData.openId,
      activityId: detail.item !== undefined ? detail.item.actId : detail.activityId,
      cartNum: num,
      price: detail.item !== undefined ? detail.item.actPrice : detail.actPrice
    }).then(res => {
      this.carList();
    })

  },
  makePhone: function ({
    currentTarget
  }) {
    console.log(currentTarget.dataset.item)
    if (currentTarget.dataset.item) {
      wx.makePhoneCall({
        phoneNumber: currentTarget.dataset.item
      })
    }

  },
  showCartList: function () {
    this.setData({
      cartShow: !this.data.cartShow
    })
    this.carList()
  },
  carList: function () {
    wx.showLoading({
      title: '加载中',
    })
    request.findcartList({
      userId: app.globalData.openId,
      shopId: this.data.storemodel.shopId,
      pageIndex: 1,
      pageSize: 10
    }).then(res => {
      this.setData({
        cartModel: res.data.records
      })
      let price = 0
      this.data.cartModel.forEach(item => {
        price += item.cartNum * item.actPrice
      })
      this.setData({
        totalPrice: price
      })
      if (res.data.total == 0) {
        this.setData({
          cartIcon: false
        })
      } else {
        this.setData({
          cartIcon: true,
          count: res.data.total
        })
      }
    })
  },
  allService: function () {
    this.setData({
      cartShow: false
    })
  },
  // 服务列表
  findServiceList: function (shopid) {
    request.findShopDet({
      shopId: shopId,
      log: app.globalData.longitude,
      lat: app.globalData.latitude,
      userId: app.globalData.openId
    }).then(res => {
      this.setData({
        shopId: model.shopId,
        detailModel: res.ser,
        cardModel: res.serCard,
        tel: res.shop.tel
      })

    })
  },
  onLoad: function (options) {
    this.carList()
    console.log(options,'options')
    if (options.model) {
      let model = JSON.parse(decodeURIComponent(options.model))
      console.log(model, 'ai')
      this.setData({
        storemodel: model,
        ["commentForm.shop_id"]: model.id
      })
      this.findServiceList(model.shopId)
      app.globalData.shopid = model.shopId
      this.onShow()
    }
  },

  //洗车评价
  washCarComment: function (model) {
    request.selectCommentByShopId(model).then(res => {
      if (res.status == '200') {
        this.setData({
          commentList: res.data.commentList
        })
      }
    })
  },

  tabClick(event) {
    if (event.detail.index == 1) {
      this.setData({
        tabIndex: event.detail.index,
        ["commentForm.pageIndex"]: 1
      });
      this.washCarComment(this.data.commentForm);
    }
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
    this.findCarList()
    this.findServiceList(app.globalData.shopid)
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
    var that = this;
    if (that.data.load && that.data.tabIndex == 1) { //全局标志位，方式请求未响应时多次触发
      that.setData({
        ["commentForm.pageIndex"]: that.data.commentForm.pageIndex * 1 + 1,
        load: false,
        loading: true //加载动画的显示
      })
      request.selectCommentByShopId(that.data.commentForm).then(res => {
        if (res.status == '200' && res.data.commentList.length > 0) {
          var content = that.data.commentList.concat(res.data.commentList) //将返回结果放入content
          that.setData({
            commentList: content,
            load: true,
            loading: false
          })
        } else {
          that.setData({
            loading: false,
            load: true
          })
          wx.showToast({
            title: '没有更多数据',
            icon: 'none',
            duration: 2000,
          })
        }
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})