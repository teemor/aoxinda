import {
  store
} from '../../common/api/clean_api'
import {
  myServiceOrderMenu
} from '../../common/static/api_data'
const request = new store
const app = getApp();
Page({
  data: {
    myServiceOrderMenu,
    active: 0,
    page: 1,
    flag: 0,
    goodsList: []
  },
  cancelOrder: function (model) {
    request.cancelOrder({
      id: model.detail.id
    }).then(res => {
      if (res.msg == 'success') {
        wx.showToast({
          title: '删除成功',
          icon: 'none',
          image: '',
          duration: 1500,
          mask: false,
          success: (result) => {
            this.selectOrder(1, 100)
          },
          fail: () => { },
          complete: () => { }
        });
      }
    })
  },
  tabchange: function ({
    detail
  }) {
    if (detail.titlea === 0) {
      this.setData({
        goodsList: [],
        flag: 0
      })

      this.selectOrder(1, 5)
    } else if (detail.titlea === 10) {
      this.setData({
        flag: 1,
        goodsList:[]
      })
      this.selectOrder(1, 5)
    } else {
      this.setData({
        status: detail.titlea,
        goodsList: [],
        flag: 0
      })
      this.selectOrder(1, 5, detail.titlea)
    }
  },
  onPullDownRefresh: function () {
    this.setData({
      active: this.data.active
    })
    this.selectOrder(1, 3)
    wx.stopPullDownRefresh()

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id === "17") {
      this.setData({
        active: 1
      })
    } else if (options.id === "6") {
      this.setData({
        active: 2
      })
    } else if (options.id === "5") {
      this.setData({
        active: 3
      })
    } else if (options.id === "7") {
      this.setData({
        active: 4
      })
    }
    this.selectOrder(1, 5)
  },
  goOrder: function (e) {
    this.setData({
      total: e.detail.pay_money
    })
    this.pay(e.detail.id)
  },
  findOrderPageCancel: function (index, size) {
    request.findRefundById({ pageIndex: index, pageSize: size, userId: app.globalData.openId }).then(res => {
      console.log(res, '已取消')
    })
  },
  selectOrder: function (index, size, status) {
    if (this.data.goodsList.length === this.data.count) {
      return
    }
    if (this.data.flag == 1) {
        request.findOrderPageCancel({ pageIndex: index, pageSize: size, userId: app.globalData.openId }).then(res => {
          this.setData({
            count: res.data.current,
          })
          res.data.records.forEach(item => {
            this.data.goodsList.push(item)
            this.setData({
              goodsList: this.data.goodsList
            })
          })
        })
    } else {
      request.findOrderPage({
        pageIndex: index,
        pageSize: size,
        orderStatus: status,
        userId: app.globalData.openId
      }).then(res => {
        console.log(res.data.current, 'current')
        this.setData({
          count: res.data.current,
        })
        res.data.records.forEach(item => {
          this.data.goodsList.push(item)
          this.setData({
            goodsList: this.data.goodsList
          })
        })
      })
    }
  },
  /**
   * 订单详情
   * dzl
   */
  /**
   * 详情
   * dzl
   */
  orderDetail: function ({
    detail
  }) {
    wx.navigateTo({
      url: `../../packageA/pages/my_order_detail/index?ids=${detail.id}`
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
    this.data.current = parseInt(this.data.count) + this.data.page
    this.selectOrder(this.data.current, 5, this.data.status)
  },
})