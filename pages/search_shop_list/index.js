// pages/search_shop_list/index.js
let that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    history: [],
    hot: [{
      name: "汽车坐垫",
      id: null,
      goodsName: "汽车坐垫"
    }],
    index: 1,
    array: [ '商品', '门店']
  },
  bindPickerChange: function(e) {
    this.setData({
      index: e.detail.value
    })
  },
  /**
   * 输入时赋值
   */
  inValue: function(e) {
    this.setData({
      value: e.detail
    })
  },

  /**
   * 搜索列表页的跳转
   */
  onSearch: function(e) {
    let json = {};
    if (this.data.value != '') {
      json = {
        name: this.data.value,
        id: null,
        goodsName: this.data.value,
      }
      //添加历史纪录
      // 跳转商品服务门店

      if (this.data.array[this.data.index] == '商品') {
        //跳转-列表
        let model = encodeURIComponent(JSON.stringify(json))
        wx.navigateTo({
          url: `../shop_goods_list/index?id=${model}`
        });
      } else if (this.data.array[this.data.index] == '门店') {
        json = {
          name: this.data.value,
          id: null,
          index: this.data.index,
          shopName: this.data.value
        }
        let model = encodeURIComponent(JSON.stringify(json))
        wx.navigateTo({
          url: `../../pages/copy_store_list/index?model=${model}`
        });
      } else if (this.data.array[this.data.index] == '服务') {
        json = {
          name: this.data.value,
          id: null,
          index: this.data.index,
          actName: this.data.value
        }
        let model = encodeURIComponent(JSON.stringify(json))
        wx.navigateTo({
          url: `../../pages/copy_store_list/index?model=${model}`
        });
      }

      if (that.data.history.length >= 10) {
        that.data.history.shift()
      }
      that.data.history.push(json)
      wx.setStorage({
        key: 'searchHistory',
        data: that.data.history
      })
    }
  },
  /**
   * 搜索列表 历史 跳转
   */
  onHistorySearch: function(e) {
    let model = encodeURIComponent(JSON.stringify(e.currentTarget.dataset.info))
    wx.navigateTo({
      url: `../shop_goods_list/index?id=${model}`
    })
  },
  /**
   * 搜索列表 删除历史
   */
  deleteHistory: function() {
    wx.removeStorage({
      key: 'searchHistory',
      success(res) {
        that.setData({
          history: []
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this
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
    //获取历史搜索
    wx.getStorage({
      key: 'searchHistory',
      success: function(res) {
        that.setData({
          history: res.data
        })
      },
      fail: function() {
        that.setData({
          history: []
        })
      }
    })
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