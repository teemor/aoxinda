// pages/choose_bank/index.js
/**
 * 岳家棋 
 * 选择添加银行卡类型
 */
Page({

  /**
   * 页面的初始数据
   */
  data: {
    card_list:[{
      src: "https://maichefu.oss-cn-beijing.aliyuncs.com/bankCard/gs_bank.png",
      text:"工商银行"
    }, {
        src: "https://maichefu.oss-cn-beijing.aliyuncs.com/bankCard/ny_bank.png",
        text: "农业银行"
      }, {
        src: "https://maichefu.oss-cn-beijing.aliyuncs.com/bankCard/zg_bank.png",
        text: "中国银行"
      }, {
        src: "https://maichefu.oss-cn-beijing.aliyuncs.com/bankCard/js_bank.png",
        text: "建设银行"
      }, {
        src: "https://maichefu.oss-cn-beijing.aliyuncs.com/bankCard/zs_bank.png",
        text: "招商银行"
      }, {
        src: "https://maichefu.oss-cn-beijing.aliyuncs.com/bankCard/yc_bank.png",
        text: "邮储银行"
      }, {
        src: "https://maichefu.oss-cn-beijing.aliyuncs.com/bankCard/jt_bank.png",
        text: "交通银行"
      }, {
        src: "https://maichefu.oss-cn-beijing.aliyuncs.com/bankCard/pf_bank.png",
        text: "浦发银行"
      }, {
        src: "https://maichefu.oss-cn-beijing.aliyuncs.com/bankCard/ms_bank.png",
        text: "民生银行"
      }, {
        src: "https://maichefu.oss-cn-beijing.aliyuncs.com/bankCard/xy_bank.png",
        text: "兴业银行"
      }, {
        src: "https://maichefu.oss-cn-beijing.aliyuncs.com/bankCard/pa_bank.png",
        text: "平安银行"
      }, {
        src: "https://maichefu.oss-cn-beijing.aliyuncs.com/bankCard/zx_bank.png",
        text: "中信银行"
      }, {
        src: "https://maichefu.oss-cn-beijing.aliyuncs.com/bankCard/hx_bank.png",
        text: "华夏银行"
      }, {
        src: "https://maichefu.oss-cn-beijing.aliyuncs.com/bankCard/gf_bank.png",
        text: "广发银行"
      }, {
        src: "https://maichefu.oss-cn-beijing.aliyuncs.com/bankCard/gd_bank.png",
        text: "光大银行"
      }, {
        src: "https://maichefu.oss-cn-beijing.aliyuncs.com/bankCard/bj_bank.png",
        text: "北京银行"
      }, {
        src: "https://maichefu.oss-cn-beijing.aliyuncs.com/bankCard/nb_bank.png",
        text: "宁波银行"
      }, {
        src: "https://maichefu.oss-cn-beijing.aliyuncs.com/bankCard/sh_bank.png",
        text: "上海银行"
      },],
    title_close:false,
    username:"",
    userid:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      username:options.username,
      userid:options.userid
    })
  },
  close : function (){
    this.setData({
      title_close : true
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

  }
})