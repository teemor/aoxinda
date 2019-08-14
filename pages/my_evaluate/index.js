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
    commentType: 0, //当前评论的类型索引
    commentName: "洗车美容", //当前评论的类型名称
    load: true,
    loading: false,//加载动画的显示
    form: {
      "is_comment": 0,
      "user_id": "",
      "pageIndex": 1,
      "pageSize": 10
    },
    columns: ['洗车美容', '紧急救援'],
    typeShow: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getStorageInfo();
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
   * 统计未评价/已评价数量
   */
  countConsumeComment: function (model){
    let ra = "";
    if (this.data.commentType == 0) {
      ra = request.countConsumeComment;  //洗车美容
    } else if (this.data.commentType == 1) {
      ra = request.countHelpComment;     //道路救援
    }
    ra(model).then(res => {
      if (res.status == '200') {
        this.setData({
          tabList: [
            { "name": "待评价 (" + res.data.notCount + ")", "id": "1" },
            { "name": "已评价 (" + res.data.alreadyCount + ")", "id": "2" }
          ]
        });
      }
    })
  },
  /**
   * 查询评价记录
   */
  selectConsumeComment: function (model) {
    let ra = "";
    if(this.data.commentType == 0){
      ra = request.selectConsumeComment;  //洗车美容
    } else if (this.data.commentType == 1){
      ra = request.selectHelpComment;     //道路救援
    }
    ra(model).then(res => {
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
    let relation_lists = [];
    let sers = e.currentTarget.dataset['sers'];
    for(let i in sers){
      relation_lists.push(sers[i].id || sers[i]); //洗车 || 救援
    }
    let urlPath = "../my_evaluate_record/index?ordercode=" + e.currentTarget.dataset['ordercode'] + "&shopid=" + e.currentTarget.dataset['shopid'] + "&";
    if (e.currentTarget.dataset['status'] == 1){
      urlPath = "../my_evaluate_show/index?";
    }
    wx.navigateTo({
      url: urlPath + 'relation_lists=' + relation_lists + "&detailtype=" + e.currentTarget.dataset['detailtype']
    });
  },

  /**
   * 查看订单详情
   */
  goOrderDetail: function(e){
    let navUrl = "";
    if (this.data.commentType == 0) {
      navUrl = `../../packageA/pages/my_order_detail/index?ids=${e.currentTarget.dataset['id']}`;  //洗车美容
    } else if (this.data.commentType == 1) {
      navUrl = "";     //道路救援
    }
    wx.navigateTo({
      url: navUrl
    })
  },

/**
 * 查看卡详情
 */
  goCardDetail: function(e){
    wx.navigateTo({
      url: `../my_service_card_detail/index?id=${e.currentTarget.dataset['cardid']}`
    })
  },

  //选择评论类型
  selectType: function(e){
    this.setData({
      typeShow: true
    });
  },

  //关闭弹框
  onTypeClose() {
    this.setData({ typeShow: false });
  },

  //选择下拉框内容
  onTypeChange(event) {
    const { picker, value, index } = event.detail;
    this.setData({
      commentType: index,
      commentName: value,
      evaluateList: [],
      ["form.pageIndex"]: 1
    });
    this.onTypeClose();
    this.selectConsumeComment(this.data.form);
    this.countConsumeComment(this.data.form);
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
    this.getStorageInfo();
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
    wx.stopPullDownRefresh();
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
        let ra = "";
        if (that.data.commentType == 0) {
          ra = request.selectConsumeComment;  //洗车美容
        } else if (that.data.commentType == 1) {
          ra = request.selectHelpComment;     //道路救援
        }
      ra(this.data.form).then(res => {
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