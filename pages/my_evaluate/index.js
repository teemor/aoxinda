import {
  Technician
} from '../../common/api/api'
const request = new Technician
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabList: [],
    evaluateList: [],
    load: true,
    loading: false,//加载动画的显示
    form: {
      "is_comment": 0,
      "user_id": "",
      "pageIndex": 1,
      "pageSize": 10
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getStorageInfo();
  },
  // 获取用户信息
  getStorageInfo: function () {
    let that = this
    wx.getStorage({
      key: 'user',
      success: function (res) {
        that.setData({
          ["form.user_id"]: res.data.openId
        })
        that.countConsumeComment(that.data.form);
        that.selectConsumeComment(that.data.form);
      }
    })
  },
  /**
   * 统计洗车未评价/已评价数量
   */
  countConsumeComment: function (model){
    request.countConsumeComment(model).then(res => {
      if (res.status == '200') {
        this.setData({
          tabList: [
            { "name": "待评价（" + res.data.notCount + "）", "id": "1" },
            { "name": "已评价（" + res.data.alreadyCount + "）", "id": "2" }
          ]
        });
      }
    })
  },
  /**
   * 查询评价记录
   */
  selectConsumeComment: function (model) {
    request.selectConsumeComment(model).then(res => {
      if (res.status == '200') {
        this.setData({
          evaluateList: res.data.consumeList
        })
      }
    })
  },

  tabClick(event) {
    this.setData({
      evaluateList: [],
      ["form.pageIndex"]: 1,
      ["form.is_comment"]: event.detail.index
    });
    this.selectConsumeComment(this.data.form);
  },

  /**
   * 进入评价页面
   */
  goEvaluate: function(e){
    // console.log(e.currentTarget.dataset['status'] + "status")
    let relation_lists = [];
    let sers = e.currentTarget.dataset['sers'];
    for(let i in sers){
      relation_lists.push(sers[i].id);
    }
    wx.navigateTo({
      url: '../my_evaluate_record/index?relation_lists=' + relation_lists + '&cardId=' + e.currentTarget.dataset['cardid']
    });
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
    var that = this;
    that.setData({
      evaluateList: [],
      ["form.pageIndex"]: 1
    });
    that.selectConsumeComment(that.data.form);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    if (that.data.load) {//全局标志位，方式请求未响应时多次触发
        that.setData({
          ["form.pageIndex"]: that.data.form.pageIndex * 1 + 1,
          load: false,
          loading: true//加载动画的显示
        })
      request.selectConsumeComment(this.data.form).then(res => {
        if (res.status == '200' && res.data.consumeList.length > 0) {
          var content = that.data.evaluateList.concat(res.data.consumeList)//将返回结果放入content
          that.setData({
            evaluateList: content,
            load: true,
            loading: false
          })
        }else{
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