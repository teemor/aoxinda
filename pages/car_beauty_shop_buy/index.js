import {
  typeBigWaxingList,
  typeminiWaxingList,
  typeBigServiceList,
  typeminiServiceList
} from '../../common/static/api_data'
import {
  Technician 


  
} from '../../common/api/api'
const request = new Technician
let iphonex = require('../../mixin/iphonex.js')
Page({
  mixins:[iphonex],
  /**
   * 页面的初始数据
   */
  data: {
    typeBigWaxingList,
    typeminiWaxingList,
    typeBigServiceList,
    typeminiServiceList,
    waxPrice:0,
    cleanPrice:0,
    miniClick: true,
    reslut: Object,
    countPrice:0,
    cleanNum:0,
    waxNum:0
  },

  /**
   * 洗车服务复选框
   * dzl
   */
  typeCleanChange: function(e) {
    console.log(parseInt(e.detail.split('¥')[1]), 'e')
    this.setData({
      cleanReslut: e.detail,
      cleanPrice:parseInt(e.detail.split('¥')[1]),
      countPrice: parseInt(e.detail.split('¥')[1])+parseInt(this.data.waxPrice)
    })
    console.log(this.data.countPrice)
  },
  /**
   * 打蜡服务复选框
   * dzl
   */
  typeWaxingChange: function(e) {
    console.log(e.detail.split('¥')[0],'??')
    console.log(parseInt(e.detail.split('¥')[1])+this.data.cleanPrice,'hh')
    this.setData({
      waxingReslut: e.detail,
      waxPrice:e.detail.split('¥')[1],
      countPrice:parseInt(e.detail.split('¥')[1])+this.data.cleanPrice
    })
    console.log(this.data.countPrice,'?')
  },
  /**
   * 选择中大型汽车
   * @param {*} options 
   */
  bigClick: function() {
    this.setData({
      miniClick: false
    })
  },
  /**
   * 选择轿车
   * @param {*} options 
   */
  miniClick: function() {
    this.setData({
      miniClick: true
    })
  },
  /**
   * 结算
   * @param {*} options 
   */
  buy: function() {
    let clean = this.data.cleanReslut
    let wax = this.data.waxingReslut
    console.log(clean,'clean')
    console.log(wax,'wax')

    if(clean!==undefined){
      console.log(clean,'!===')
      // clean.forEach(item => {
        this.setData({
          cleanNum:parseInt(clean.split('¥')[0]),
          cleanPrice:parseInt(clean.split('¥')[1]) 
        })
      // });
    }
    if(wax!==undefined){
      // wax.forEach(item => {
        this.setData({
          waxNum:parseInt(wax.split('¥')[0]),
          waxPrice:parseInt(wax.split('¥')[1])
        })
      // })
    }
    // wx.showToast({
    //   title:'授权成功',
    //   icon:'success',
    //   duration:3000
    // })  
    let countPrice = this.data.countPrice
    // let countNum = cleanNum +waxNum
    let that =this
    console.log(that)
    wx.login({
      success(res) {
        if (res.code) { //that.data.countPrice
          request.payCard(res.code, that.data.cleanNum, that.data.waxNum, 0.01).then(res => {
            if(res.status===false){
              wx.showToast({
                title:res.description
              })
            }else{
              let description = JSON.parse(res.result)
              wx.requestPayment({
                timeStamp:description.timeStamp,
                nonceStr:description.nonceStr,
                package:description.package,
                signType:description.signType,
                paySign:description.paySign,
                success(res){
                  console.log('res')
                  let cleanNum = that.data.cleanNum
                  let waxNum = that.data.waxNum
                  let model = {}
                  model.waxNum = waxNum
                  model.cleanNum = cleanNum
                  wx.navigateTo({
                    url: '../car_beauty_shop_res/index',
                  })
                }
              })
            }
          })
        }
      }
    })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
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

  }
})