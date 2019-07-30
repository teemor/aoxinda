// pages/fill_card_information/index.js
import {
  store
} from '../../common/api/clean_api'
const bankCardHttp = new store
Page({

  /**
   * 页面的初始数据
   */
  data: {
    card_information:{
      logo:"",
      name:""
    },
    userName:"",
    bankCard:"",   
    mobile: "",
    highlight: true,
    id:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      'card_information.logo': options.logo,
      'card_information.name': options.name,
      userName: options.ownerName,
      mobile: options.shopId,
      bankCard: options.cardNumber,
      id : options.id
    })
  },
  //银行卡
  bankCardInput:function(e){
    this.setData({
      bankCard: e.detail.value
    })
    if (this.data.mobile != "" && this.data.userName != "" && this.data.bankCard != "") {
      this.setData({
        highlight: true
      })
    } else {
      this.setData({
        highlight: false
      })
    }
  },
  //姓名
  userNameInput: function (e) {
    this.setData({
      userName: e.detail.value
    })
    if (this.data.mobile != "" && this.data.userName != "" && this.data.bankCard != "") {
      this.setData({
        highlight: true
      })
    } else {
      this.setData({
        highlight: false
      })
    }
  },
  //身份证号
  mobileInput: function (e) {
    this.setData({
      mobile: e.detail.value
    })
    if (this.data.mobile != "" && this.data.userName != "" && this.data.bankCard != "") {
      this.setData({
        highlight: true
      })
    } else {
      this.setData({
        highlight: false
      })
    }
  },
  //确认修改银行卡
  onSubmit:function(){
    var that = this
    var userName = this.data.userName
    var bankCard = this.data.bankCard
    var mobile = this.data.mobile
    var bankCardNum = /^([1-9]{1})(\d{15}|\d{18})$/
    var numberID = /(^\d{8}(0\d|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/
    var name = /^([\u4e00-\u9fa5·]{2,10})$/
    if (this.data.highlight == false){
      wx.showToast({
        title: '银行卡、姓名、身份证号码不能为空！',
        icon: 'none',
        duration: 1500
      })
      return false;
    } else if (!bankCardNum.test(bankCard)){
      wx.showToast({
        title: '请输入正确银行卡号！',
        icon: 'none',
        duration: 1500
      })
      return false;
    } else if (!numberID.test(mobile)) {
      wx.showToast({
        title: '请输入正确身份证号！',
        icon: 'none',
        duration: 1500
      })
      return false;
    } else if (!name.test(userName)) {
      wx.showToast({
        title: '请输入正确姓名！',
        icon: 'none',
        duration: 1500
      })
      return false;userid
    }else{
      var app = getApp()
      var getOpenId = app.globalData.openId
      var obj = {
        "id": that.data.id,
        "bank": that.data.card_information.name,
        "identityCard": that.data.mobile,
        "cardNumber": that.data.bankCard,
        "ownerName": that.data.userName,
        "cardType": "1"
      }
      bankCardHttp.bankCardUpdata(obj).then((res) => {
        console.log(res)
      })
      wx.navigateBack({
        delta: 1
      })
      wx.showToast({
        title: '银行卡修改成功',
        icon: 'success',
        duration: 2500
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

  }
})