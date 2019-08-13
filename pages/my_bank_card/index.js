// pages/my_bank_card/index.js
import {
  store
} from '../../common/api/clean_api'
const bankCard = new store
/**
 * 岳家棋
 * 银行卡list查询  银行卡解绑  跳转银行卡修改 银行卡添加
 */
Page({

  /**
   * 页面的初始数据
   */
  data: {
    deleat:false,
    add_bank : 1,
    cardList:[],
    username :"",
    userid:"",
    bank_name:"",
    last_num:"",
    type:"",
    card_num :"",
    item :{},
    ok:false
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
      if (newres && newres.length > 0){
        for (var i = 0; i < newres.length; i++) {
          if (newres[i].bank == "北京银行") {
            newres[i].path = 'https://maichefu.oss-cn-beijing.aliyuncs.com/bankCard/my_card_red.png'
            newres[i].logo = 'https://maichefu.oss-cn-beijing.aliyuncs.com/bankCard/bj_bank.png'
            newres[i].type = '储蓄卡'
          } else if (newres[i].bank == "中国工商银行" || newres[i].bank == "工商银行") {
            newres[i].path = 'https://maichefu.oss-cn-beijing.aliyuncs.com/bankCard/my_card_red.png'
            newres[i].logo = 'https://maichefu.oss-cn-beijing.aliyuncs.com/bankCard/gs_bank.png'
            newres[i].type = '储蓄卡'
          } else if (newres[i].bank == "中国农业银行" || newres[i].bank == "农业银行") {
            newres[i].path = 'https://maichefu.oss-cn-beijing.aliyuncs.com/bankCard/my_card_green.png'
            newres[i].logo = 'https://maichefu.oss-cn-beijing.aliyuncs.com/bankCard/ny_bank.png'
            newres[i].type = '储蓄卡'
          } else if (newres[i].bank == "中国银行") {
            newres[i].path = 'https://maichefu.oss-cn-beijing.aliyuncs.com/bankCard/my_card_red.png'
            newres[i].logo = 'https://maichefu.oss-cn-beijing.aliyuncs.com/bankCard/zg_bank.png'
            newres[i].type = '储蓄卡'
          } else if (newres[i].bank == "中国建设银行" || newres[i].bank == "建设银行") {
            newres[i].path = 'https://maichefu.oss-cn-beijing.aliyuncs.com/bankCard/my_card_blue.png'
            newres[i].logo = 'https://maichefu.oss-cn-beijing.aliyuncs.com/bankCard/js_bank.png'
            newres[i].type = '储蓄卡'
          } else if (newres[i].bank == "招商银行") {
            newres[i].path = 'https://maichefu.oss-cn-beijing.aliyuncs.com/bankCard/my_card_red.png'
            newres[i].logo = 'https://maichefu.oss-cn-beijing.aliyuncs.com/bankCard/zs_bank.png'
            newres[i].type = '储蓄卡'
          } else if (newres[i].bank == "邮储银行" || newres[i].bank == "邮政储蓄银行" || newres[i].bank == "邮政银行") {
            newres[i].path = 'https://maichefu.oss-cn-beijing.aliyuncs.com/bankCard/my_card_green.png'
            newres[i].logo = 'https://maichefu.oss-cn-beijing.aliyuncs.com/bankCard/yc_bank.png'
            newres[i].type = '储蓄卡'
          } else if (newres[i].bank == "交通银行") {
            newres[i].path = 'https://maichefu.oss-cn-beijing.aliyuncs.com/bankCard/my_card_blue.png'
            newres[i].logo = 'https://maichefu.oss-cn-beijing.aliyuncs.com/bankCard/jt_bank.png'
            newres[i].type = '储蓄卡'
          } else if (newres[i].bank == "浦发银行") {
            newres[i].path = 'https://maichefu.oss-cn-beijing.aliyuncs.com/bankCard/my_card_blue.png'
            newres[i].logo = 'https://maichefu.oss-cn-beijing.aliyuncs.com/bankCard/pf_bank.png'
            newres[i].type = '储蓄卡'
          } else if (newres[i].bank == "民生银行") {
            newres[i].path = 'https://maichefu.oss-cn-beijing.aliyuncs.com/bankCard/my_card_blue.png'
            newres[i].logo = 'https://maichefu.oss-cn-beijing.aliyuncs.com/bankCard/ms_bank.png'
            newres[i].type = '储蓄卡'
          } else if (newres[i].bank == "兴业银行") {
            newres[i].path = 'https://maichefu.oss-cn-beijing.aliyuncs.com/bankCard/my_card_blue.png'
            newres[i].logo = 'https://maichefu.oss-cn-beijing.aliyuncs.com/bankCard/xy_bank.png'
            newres[i].type = '储蓄卡'
          } else if (newres[i].bank == "平安银行") {
            newres[i].path = 'https://maichefu.oss-cn-beijing.aliyuncs.com/bankCard/my_card_orange.png'
            newres[i].logo = 'https://maichefu.oss-cn-beijing.aliyuncs.com/bankCard/pa_bank.png'
            newres[i].type = '储蓄卡'
          } else if (newres[i].bank == "中信银行") {
            newres[i].path = 'https://maichefu.oss-cn-beijing.aliyuncs.com/bankCard/my_card_red.png'
            newres[i].logo = 'https://maichefu.oss-cn-beijing.aliyuncs.com/bankCard/zx_bank.png'
            newres[i].type = '储蓄卡'
          } else if (newres[i].bank == "华夏银行") {
            newres[i].path = 'https://maichefu.oss-cn-beijing.aliyuncs.com/bankCard/my_card_red.png'
            newres[i].logo = 'https://maichefu.oss-cn-beijing.aliyuncs.com/bankCard/hx_bank.png'
            newres[i].type = '储蓄卡'
          } else if (newres[i].bank == "广发银行") {
            newres[i].path = 'https://maichefu.oss-cn-beijing.aliyuncs.com/bankCard/my_card_red.png'
            newres[i].logo = 'https://maichefu.oss-cn-beijing.aliyuncs.com/bankCard/gf_bank.png'
            newres[i].type = '储蓄卡'
          } else if (newres[i].bank == "光大银行") {
            newres[i].path = 'https://maichefu.oss-cn-beijing.aliyuncs.com/bankCard/my_cardpurple.png'
            newres[i].logo = 'https://maichefu.oss-cn-beijing.aliyuncs.com/bankCard/gd_bank.png'
            newres[i].type = '储蓄卡'
          } else if (newres[i].bank == "宁波银行") {
            newres[i].path = 'https://maichefu.oss-cn-beijing.aliyuncs.com/bankCard/my_card_orange.png'
            newres[i].logo = 'https://maichefu.oss-cn-beijing.aliyuncs.com/bankCard/nb_bank.png'
            newres[i].type = '储蓄卡'
          } else if (newres[i].bank == "上海银行") {
            newres[i].path = 'https://maichefu.oss-cn-beijing.aliyuncs.com/bankCard/my_card_blue.png'
            newres[i].logo = 'https://maichefu.oss-cn-beijing.aliyuncs.com/bankCard/sh_bank.png'
            newres[i].type = '储蓄卡'
          }
        }
        //银行卡号循环显示后四位
        for (let l = 0; l < newres.length; l++) {
          newres[l].newCardNumber = newres[l].cardNumber.replace(/\s/g, '').replace(/(\d{4})\d+(\d{4})$/, "**** **** **** $2")
        }
        that.setData({
          cardList: newres,
          username: newres[newres.length - 1].ownerName,
          userid: newres[newres.length - 1].identityCard
        })
      } 
    })
  },
  //添加银行卡
  addBankCard(){
    var username = this.data.username
    var userid = this.data.userid
    wx.navigateTo({
      url: `../choose_bank/index?username=${username}&userid=${userid}`
    })
  },
  cancel(){
    this.setData({
      deleat: false
    })
  },
  //点击银行卡显示解绑修改
  longPress(e){
    console.log(e)
    var last = e.currentTarget.dataset.num.substring(e.currentTarget.dataset.num.length - 4)
    this.setData({
      deleat: true,
      bank_name: e.currentTarget.dataset.name,
      last_num: last,
      type: e.currentTarget.dataset.type,
      card_num: e.currentTarget.dataset.newnum,
      item: e.currentTarget.dataset.res
    })
  },
  //解绑
  unbundle(){
    var that = this
    console.log(this.data.card_num)
    bankCard.bankCardUnbind({ "cardNumber": that.data.card_num}).then((res) =>{
      console.log(res)
      that.setData({
        deleat: false
      })
      this.setData({
        ok: true
      })
      setTimeout(function () {
        that.setData({
          ok: false
        })
      }, 1000)
      that.getBankCard()
    })
  },
  //修改卡
  modify(){
    var that = this
    wx.navigateTo({
      url: `../modify_card/index?logo=${that.data.item.logo}&name=${that.data.item.bank}&cardNumber=${that.data.item.cardNumber}&ownerName=${that.data.item.ownerName}&shopId=${that.data.item.identityCard}&id=${that.data.item.id}`
    })
    this.setData({
      deleat: false
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
    var that = this
    setTimeout(function () {
      that.getBankCard()
    }, 200)
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