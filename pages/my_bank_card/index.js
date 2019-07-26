// pages/my_bank_card/index.js
import {
  store
} from '../../common/api/clean_api'
const bankCard = new store
Page({

  /**
   * 页面的初始数据
   */
  data: {
    deleat:false,
    add_bank : 1,
    cardList:[],
    username :"",
    userid:""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    this.setData({
      add_bank : options.add_bank
    })
  },
  getBankCard(){
    var that = this
    var app = getApp()
    var getOpenId = app.globalData.openId
    bankCard.bankCardSelect({ "emp_id": getOpenId }).then((res) => {
      var newres = res.data
      //银行卡循环添加背景图logo
      for (var i = 0; i < newres.length; i++) {
        if (newres[i].bank == "北京银行") {
          newres[i].path = '../../common/image/my_card_red.png'
          newres[i].logo = '../../common/image/bj_bank.png'
          newres[i].type = '储蓄卡'
        } else if (newres[i].bank == "中国工商银行" || newres[i].bank == "工商银行") {
          newres[i].path = '../../common/image/my_card_red.png'
          newres[i].logo = '../../common/image/gs_bank.png'
          newres[i].type = '储蓄卡'
        } else if (newres[i].bank == "中国农业银行" || newres[i].bank == "农业银行") {
          newres[i].path = '../../common/image/my_card_green.png'
          newres[i].logo = '../../common/image/ny_bank.png'
          newres[i].type = '储蓄卡'
        } else if (newres[i].bank == "中国银行") {
          newres[i].path = '../../common/image/my_card_red.png'
          newres[i].logo = '../../common/image/zg_bank.png'
          newres[i].type = '储蓄卡'
        } else if (newres[i].bank == "中国建设银行" || newres[i].bank == "建设银行") {
          newres[i].path = '../../common/image/my_card_blue.png'
          newres[i].logo = '../../common/image/js_bank.png'
          newres[i].type = '储蓄卡'
        } else if (newres[i].bank == "招商银行") {
          newres[i].path = '../../common/image/my_card_red.png'
          newres[i].logo = '../../common/image/zs_bank.png'
          newres[i].type = '储蓄卡'
        } else if (newres[i].bank == "邮储银行" || newres[i].bank == "邮政储蓄银行" || newres[i].bank == "邮政银行") {
          newres[i].path = '../../common/image/my_card_green.png'
          newres[i].logo = '../../common/image/yc_bank.png'
          newres[i].type = '储蓄卡'
        } else if (newres[i].bank == "交通银行") {
          newres[i].path = '../../common/image/my_card_blue.png'
          newres[i].logo = '../../common/image/jt_bank.png'
          newres[i].type = '储蓄卡'
        } else if (newres[i].bank == "浦发银行") {
          newres[i].path = '../../common/image/my_card_bluepng'
          newres[i].logo = '../../common/image/pf_bank.png'
          newres[i].type = '储蓄卡'
        } else if (newres[i].bank == "民生银行") {
          newres[i].path = '../../common/image/my_card_blue.png'
          newres[i].logo = '../../common/image/ms_bank.png'
          newres[i].type = '储蓄卡'
        } else if (newres[i].bank == "兴业银行") {
          newres[i].path = '../../common/image/my_card_blue.png'
          newres[i].logo = '../../common/image/xy_bank.png'
          newres[i].type = '储蓄卡'
        } else if (newres[i].bank == "平安银行") {
          newres[i].path = '../../common/image/my_card_orange.png'
          newres[i].logo = '../../common/image/pa_bank.png'
          newres[i].type = '储蓄卡'
        } else if (newres[i].bank == "中信银行") {
          newres[i].path = '../../common/image/my_card_red.png'
          newres[i].logo = '../../common/image/zx_bank.png'
          newres[i].type = '储蓄卡'
        } else if (newres[i].bank == "华夏银行") {
          newres[i].path = '../../common/image/my_card_red.png'
          newres[i].logo = '../../common/image/hx_bank.png'
          newres[i].type = '储蓄卡'
        } else if (newres[i].bank == "广发银行") {
          newres[i].path = '../../common/image/my_card_red.png'
          newres[i].logo = '../../common/image/gf_bank.png'
          newres[i].type = '储蓄卡'
        } else if (newres[i].bank == "光大银行") {
          newres[i].path = '../../common/image/my_cardpurple.png'
          newres[i].logo = '../../common/image/gd_bank.png'
          newres[i].type = '储蓄卡'
        } else if (newres[i].bank == "宁波银行") {
          newres[i].path = '../../common/image/my_card_orange.png'
          newres[i].logo = '../../common/image/nb_bank.png'
          newres[i].type = '储蓄卡'
        } else if (newres[i].bank == "上海银行") {
          newres[i].path = '../../common/image/my_card_blue.png'
          newres[i].logo = '../../common/image/sh_bank.png'
          newres[i].type = '储蓄卡'
        }
      }
      //银行卡号循环显示后四位
      for (let l = 0; l < newres.length; l++) {
        newres[l].cardNumber = newres[l].cardNumber.replace(/\s/g, '').replace(/(\d{4})\d+(\d{4})$/, "**** **** **** $2")
      }
      console.log(newres)
      that.setData({
        cardList: newres,
        username: newres[newres.length-1].ownerName,
        userid: newres[newres.length - 1].shopId
      })
    })
  },
  addBankCard(){
    var username = this.data.username
    var userid = this.data.userid
    wx.navigateTo({
      url: `../choose_bank/index?username=${username}&userid=${userid}`
    })
  },
  //长按删除
  longPress(e){
    console.log(e)
    this.setData({
      deleat: true
    })
    console.log(this.data.deleat)
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
    this.getBankCard()
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