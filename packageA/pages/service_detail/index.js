import {
  store
} from '../../common/api/api'
const request = new store
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    commentList: [], //评论
    load: true,
    loading: false, //加载动画的显示
    commentForm: {
      "pageIndex": 1,
      "pageSize": 10,
      "activity_id": ""
    },
    tabIndex: 0 //当前tabs页签下标
  },

  /**
   * 生命周期函数--监听页面加载
   */
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
  onLoad: function(options) {
    let isNot = 0
    if (options.model) {
      let model = JSON.parse(decodeURIComponent(options.model))
      if (typeof(model.serType)== 'undefined') {
        console.log("234")
        isNot = 5
      } else {
        if (model.serType[0].name == '不计次数卡') {
          isNot = 3
        } else if (model.serType[0].name == '单次卡') {
          isNot = 2
        } else if (model.serType[0].name == '月月卡') {
          isNot = 4
        }
      }
      console.log(typeof (model.serType) !== 'undefined' ? model.serType[0].actId : model.actId,'dd')
      request.findPayType({
        actId: typeof(model.serType) !== 'undefined' ? model.serType[0].actId : model.actId,
        actCardType: isNot = 5 ? model.actCardType : isNot ,
        log: app.globalData.longitude,
        lat: app.globalData.latitude,
        type: 1
      }).then(res => {
        this.setData({
          model: res.data[0]
        })
        console.log(res)
      })
    }
  },

  //洗车评价
  washCarComment: function(model) {
    request.selectWashCarComment(model).then(res => {
      if (res.status == '200') {
        this.setData({
          commentList: res.data.consumeCommentList
        })
      }
    })
  },
  //tab点击事件
  tabClick(event) {
    this.setData({
      tabIndex: event.detail.index,
      ["commentForm.pageIndex"]: 1
    });
    this.washCarComment(this.data.commentForm);
  },

  /**
   * 生命周期函数--监听页面初次
   * 渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

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
    var that = this;
    if (that.data.load && that.data.tabIndex == 2) { //全局标志位，方式请求未响应时多次触发
      that.setData({
        ["commentForm.pageIndex"]: that.data.commentForm.pageIndex * 1 + 1,
        load: false,
        loading: true //加载动画的显示
      })
      request.selectWashCarComment(that.data.commentForm).then(res => {
        if (res.status == '200' && res.data.consumeCommentList.length > 0) {
          var content = that.data.commentList.concat(res.data.consumeCommentList) //将返回结果放入content
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
  onShareAppMessage: function() {

  }
})