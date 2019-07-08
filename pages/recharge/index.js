Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false, //弹框展示
    miniAmount: 300, //最低充值金额
    payAmount: 0, //充值金额
    errorMsg: '', //输入金额的错误提示
    nextDisabled: true, //是否可以下一步
    payType: { //支付方式
      id: 1,
      img: '',
      icon: 'wechat',
      text: '微信支付'
    },
    payTypeList: [{ //支付方式列表
      id: 1,
      img: '',
      icon: 'wechat',
      text: '微信支付'
    }, {
      id: 2,
      img: 'http://img4.imgtn.bdimg.com/it/u=1399522346,959393246&fm=26&gp=0.jpg',
      icon: '',
      text: '建行付款'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  //输入充值金额
  onPayInput(e) {
    this.setData({
      payAmount: Number(e.detail.value),
      errorMsg: Number(e.detail.value) < this.data.miniAmount ? `输入金额不能低于${this.data.miniAmount}` : "",
      nextDisabled: Number(e.detail.value) < this.data.miniAmount ? true : false
    })
  },
  //支付方式-展示
  onPayTypeShow() {
    this.setData({
      show: true
    })
  },
  //支付方式-隐藏
  onPayTypeHide() {
    this.setData({
      show: false
    })
  },
  //选择支付方式
  chosePayType(e) {
    this.setData({
      payType: e.detail.value,
      show: false
    })
  },
  //下一步
  toPay() {
    if (!this.data.nextDisabled) {
      console.log(this.data.payAmount)
    }
  }
})