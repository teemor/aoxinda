// pages/sa_attendance/sa_attendance_technician.js
import { userAuthorizer } from '../../common/api/c_api.js'
const request = new userAuthorizer
let that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mineInfo: {}, //个人信息
    mesgList:[], //消息列表
    unCounts:0, //未读消息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this;
    that.getUserInfo()//获取个人信息
  },

  /**
  * 页面相关事件处理函数--监听用户下拉动作
  */
  onPullDownRefresh:function(){
    that.getUserInfo()//获取个人信息
    wx.stopPullDownRefresh()
  },

  //获取用户个人信息
  getUserInfo() {
    wx.getStorage({
      key: 'mineInfo',
      success: function (res) {
        that.setData({
          mineInfo: res.data
        })
        let params = {
          "id": res.data.id,
          "pageable": 0
        }
        that.getMesgList(params)
      },
    })
  },
 
  //获取消息列表
  getMesgList(params) {
    request.userMesg(params).then(res => {
      if (res.code == '200') {
          that.setData({
            mesgList:res.result
          })
      } else if (res.code == '500') {
          wx.showToast({
            title: '获取列表失败',
            icon:'loading',
            duration:1500
          })
      }
    })
  },

  //同意
  agreeBtn(e){
    let index = e.currentTarget.dataset.index;
    let currentInfo = that.data.mesgList[index];
    let orderId = currentInfo.orderId;
    let messageId = currentInfo.id;
    let authorizer = 2;
    that.getUserAuth(messageId, authorizer, orderId)
    that.onLoad();
  },
  //拒绝
  refuseBtn(e){
    let index = e.currentTarget.dataset.index;
    let currentInfo = that.data.mesgList[index];
    let orderId = currentInfo.orderId;
    let messageId = currentInfo.id;
    let authorizer = 1;
    that.getUserAuth(messageId, authorizer, orderId)
    that.onLoad();
  },  

  //获取一键授权
  getUserAuth(messageId, authorizer, orderId) {
    let params = {
      "orderId": orderId,
      "messageId": messageId,
      "authorizer": authorizer
    }
    request.userAuth(params).then(res => {
      if (res.code == '200') {
      
      } else if (res.code == '500') {

      }
    })
  },

})