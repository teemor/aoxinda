import { choiceSp } from '../../common/api/c_api.js'
const request = new choiceSp

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null,
    server_id: null,
    orderInfo: {
      store_id: '', //门店id
      store_name: '', //门店名称
      store_address: '', //门店地址
      store_phone: '', //门店电话
      store_start_at: '', //门店营业开始时间
      store_end_at: '', //门店营业结束时间
      store_level: '', //门店星级
      server_user: '', //技师id
      server_user_name: '', //技师姓名
      server_user_money: '', //技师工时费
      server_time: '', //商品服务时间
      server_num: 1, //服务数量
      server_start_at: '', //预约开始时间
      server_end_at: '',//预约结束时间
      server_at: '',
      store_img: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    that.setData({
      id: options.id ? options.id : null,
      server_id: options.server_order_id ? options.server_order_id : null,
    })
    if (options.server_order_id) {
      request.selectServerOrder({ id: options.server_order_id }).then(res => {
        for (let key in res.server_order_id[0]) {
          that.data.orderInfo[key] = res.server_order_id[0][key]
        }
        that.setData({
          orderInfo: that.data.orderInfo
        })
      })

    } else {
      wx.getStorage({
        key: 'orderInfo',
        success(res) {
          for (let key in res.data) {
            that.data.orderInfo[key] = res.data[key]
          }
          that.setData({
            orderInfo: that.data.orderInfo
          })
        }
      })
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

  },

  /**
   * 获取服务数量
   */
  onChange: function ({ detail }) {
    this.setData({
      'orderInfo.server_num': detail
    })
  },

  /**
   * 确定服务单
   */
  confirm: function () {
    let that = this
    if (that.data.id) {
      wx.navigateTo({
        url: `../my_order_detail/index?id=${that.data.id}`
      });
    } else if (that.data.server_id) {
      let json = {
        id: that.data.server_id,
        server_num: this.data.orderInfo.server_num
      };
      request.updateServerOrder(json).then(res => {
        if (res.status) {
          wx.showToast({
            title: res.errmsg,
            icon: 'loading',
            duration: 1000
          })
        } else {
          let id = that.data.server_id
          wx.getStorage({
            key: 'mineGoods',
            success: function (res) {
              res.data.server_order_id = id
              res.data.off = true
              res.data.server_order = that.data.orderInfo
              let json = {
                total_price: res.data.buy_num * res.data.goods_price,
                storeTotal: that.data.orderInfo.server_num * that.data.orderInfo.server_time / 60 * that.data.orderInfo.server_user_money,
                sum: 1,
                arr: [res.data]
              };
              let model = encodeURIComponent(JSON.stringify(json))

              wx.navigateTo({
                url: `../add_order/index?model=${model}`
              });
            },
          })
        }
      })
    } else {
      request.writeServerOrder(this.data.orderInfo).then(res => {
        if (res.status) {
          wx.showToast({
            title: res.errmsg,
            icon: 'loading',
            duration: 1000
          })
        } else {
          let id = res.server_order_id
          wx.getStorage({
            key: 'mineGoods',
            success: function (res) {
              res.data.server_order_id = id
              res.data.off = true
              res.data.server_order = that.data.orderInfo
              let json = {
                total_price: res.data.buy_num * res.data.goods_price,
                storeTotal: that.data.orderInfo.server_num * that.data.orderInfo.server_time / 60 * that.data.orderInfo.server_user_money,
                sum: 1,
                arr: [res.data]
              };
              let model = encodeURIComponent(JSON.stringify(json))

              wx.navigateTo({
                url: `../add_order/index?model=${model}`
              });
            },
          })
        }
      })
    }
  }
})