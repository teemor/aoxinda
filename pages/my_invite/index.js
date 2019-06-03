// pages/my_invite/index.js
import { Technician } from '../../common/api/api'
const request = new Technician
let that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inviteCount: 0,
    is_recommender: 0,
    user: {}, // 用户登录信息
    imgUrl: 'http://maichefu.oss-cn-beijing.aliyuncs.com/toC'
  },

  inviteRecord: function () {
    wx.navigateTo({
      url: '../my_invite_record/index'
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    that.getOpenId();
  },

  getOpenId() {
    wx.getStorage({
      key: 'user',
      success: function (res) {
        that.setData({
          user: res.data
        })
        //获取我的邀请人数
        that.getInviteRecord();
      },
    })
  },

  getInviteRecord(){
    request.inviteCount(that.data.user.openId).then(res => {
      if (res.code == '200') {
        this.setData({
          inviteCount: res.result.c,
          is_recommender: res.result.is_recommender
        })
      }
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    // if (res.from === 'button') {
    return {
      title: "分享",
      path: '/pages/c_login/c_login?parentOpenId='+ that.data.user.openId,
      success: function (res) {
        // 转发成功
        wx.showToast({
          title: '分享成功',
          icon: 'none'
        })
      },
      fail: function (res) {
        // 转发失败
      }
    }
    // }
  }
})