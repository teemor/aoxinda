<<<<<<< HEAD
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
    evaluate: [
      {
        head_path: "https://maichefu.oss-cn-beijing.aliyuncs.com/ToShop/banner.png",
        user_name: "小明",
        grade: 3,
        data: "2019-3-39",
        content: "我是一条评论，I'm a comment",
        comment_path: [{
          path: "https://maichefu.oss-cn-beijing.aliyuncs.com/ToShop/banner.png",
        }, {
          path: "https://maichefu.oss-cn-beijing.aliyuncs.com/ToShop/banner.png",
        }, {
          path: "https://maichefu.oss-cn-beijing.aliyuncs.com/ToShop/banner.png",
        }, {
          path: "../../common/img/month.png",
        }],
        comment_content: [{
          name: "张三",
          content: "好好好"
        }, {
          name: "李四",
          content: "棒棒棒"
        },]
      }
    ],
  },
  showCard: function() {
    this.setData({
      cardShow: !this.data.cardShow
    })
  },
  cardMDetail: function(item) {
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
  cardQDetail: function(item) {
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
  onClickButton: function() {
    this.carList()
    let model = encodeURIComponent(JSON.stringify(this.data.cartModel))
    wx.navigateTo({
      url: `../../pages/add_order/index?model=${model}`,
      success: (result) => {},
      fail: () => {},
      complete: () => {}
    });

  },
  numChange: function({
    detail
  }) {
    let totalPrice = 0
    console.log(detail, 'detail')
    totalPrice = detail.num * detail.item.actPrice
    console.log(totalPrice)
    request.addCart({
      shopId: this.data.storemodel.id,
      userId: app.globalData.openId,
      activityId: detail.item.actId,
      cartNum: detail.num,
      price: detail.item.actPrice
    }).then(res => {})
    this.carList();
  },
  makePhone: function({
    currentTarget
  }) {
    console.log(currentTarget.dataset.item)
    if (currentTarget.dataset.item) {
      wx.makePhoneCall({
        phoneNumber: currentTarget.dataset.item
      })
    }

  },
  showCartList: function() {
    this.setData({
      cartShow: !this.data.cartShow
    })
    this.carList()
  },
  carList: function() {
    request.findcarList({
      userId: app.globalData.openId,
      shopId: this.data.storemodel.id,
      pageIndex: 1,
      pageSize: 10
    }).then(res => {
      this.setData({
        cartModel: res.data.records
      })
      if (this.data.cardModel.length == 0) {
        this.setData({
          cartIcon: false
        })
      } else {
        this.setData({
          cartIcon: true
        })
      }
      console.log(this.data.cartIcon, 'cartIcon')
    })
  },
  allService: function() {
    this.setData({
      cartShow: false
    })
  },
  onLoad: function(options) {
    if (options.model) {
      let model = JSON.parse(decodeURIComponent(options.model))
      this.setData({
        storemodel: model
      })
      request.findShopDet({
        shopId: model.id
      }).then(res => {
        this.setData({
          detailModel: res.ser,
          cardModel: res.serCard
        })
        this.onShow()
      })
    }
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
    this.findCarList()

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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
=======
>>>>>>> clean
