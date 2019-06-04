var that;
import { orderStatus} from '../../common/api/c_api.js'
const request = new orderStatus
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scoreList: [{
      title: '服务顾问评分',
      levelText: ['差', '不满意', '待提高', '一般', '满意', '很满意', '超预期'],
      stars: [{
        flag: '1',
        bgImg: 'https://maichefu.oss-cn-beijing.aliyuncs.com/toC/star.png',
        bgfImg: 'https://maichefu.oss-cn-beijing.aliyuncs.com/toC/star_f.png'
      }, {
        flag: '1',
          bgImg: 'https://maichefu.oss-cn-beijing.aliyuncs.com/toC/star.png',
          bgfImg: 'https://maichefu.oss-cn-beijing.aliyuncs.com/toC/star_f.png'
      }, {
        flag: '1',
          bgImg: 'https://maichefu.oss-cn-beijing.aliyuncs.com/toC/star.png',
          bgfImg: 'https://maichefu.oss-cn-beijing.aliyuncs.com/toC/star_f.png'
      }, {
        flag: '1',
          bgImg: 'https://maichefu.oss-cn-beijing.aliyuncs.com/toC/star.png',
          bgfImg: 'https://maichefu.oss-cn-beijing.aliyuncs.com/toC/star_f.png'
      }, {
        flag: '1',
          bgImg: 'https://maichefu.oss-cn-beijing.aliyuncs.com/toC/star.png',
          bgfImg: 'https://maichefu.oss-cn-beijing.aliyuncs.com/toC/star_f.png'
      }, {
        flag: '1',
          bgImg: 'https://maichefu.oss-cn-beijing.aliyuncs.com/toC/star.png',
          bgfImg: 'https://maichefu.oss-cn-beijing.aliyuncs.com/toC/star_f.png'
      }, {
        flag: '1',
          bgImg: 'https://maichefu.oss-cn-beijing.aliyuncs.com/toC/star.png',
          bgfImg: 'https://maichefu.oss-cn-beijing.aliyuncs.com/toC/star_f.png'
      }]
    },
    {
      title: '门店评分',
      levelText: ['差', '不满意', '待提高', '一般', '满意', '很满意', '超预期'],
      stars: [{
        flag: '1',
        bgImg: 'https://maichefu.oss-cn-beijing.aliyuncs.com/toC/star.png',
        bgfImg: 'https://maichefu.oss-cn-beijing.aliyuncs.com/toC/star_f.png'
      }, {
        flag: '1',
          bgImg: 'https://maichefu.oss-cn-beijing.aliyuncs.com/toC/star.png',
          bgfImg: 'https://maichefu.oss-cn-beijing.aliyuncs.com/toC/star_f.png'
      }, {
        flag: '1',
          bgImg: 'https://maichefu.oss-cn-beijing.aliyuncs.com/toC/star.png',
          bgfImg: 'https://maichefu.oss-cn-beijing.aliyuncs.com/toC/star_f.png'
      }, {
        flag: '1',
          bgImg: 'https://maichefu.oss-cn-beijing.aliyuncs.com/toC/star.png',
          bgfImg: 'https://maichefu.oss-cn-beijing.aliyuncs.com/toC/star_f.png'
      }, {
        flag: '1',
          bgImg: 'https://maichefu.oss-cn-beijing.aliyuncs.com/toC/star.png',
          bgfImg: 'https://maichefu.oss-cn-beijing.aliyuncs.com/toC/star_f.png'
      }, {
        flag: '1',
          bgImg: 'https://maichefu.oss-cn-beijing.aliyuncs.com/toC/star.png',
          bgfImg: 'https://maichefu.oss-cn-beijing.aliyuncs.com/toC/star_f.png'
      }, {
        flag: '1',
          bgImg: 'https://maichefu.oss-cn-beijing.aliyuncs.com/toC/star.png',
          bgfImg: 'https://maichefu.oss-cn-beijing.aliyuncs.com/toC/star_f.png'
      }]
    },
    {
      title: '技师评分',
      levelText: ['差', '不满意', '待提高', '一般', '满意', '很满意', '超预期'],
      stars: [{
        flag: '1',
        bgImg: 'https://maichefu.oss-cn-beijing.aliyuncs.com/toC/star.png',
        bgfImg: 'https://maichefu.oss-cn-beijing.aliyuncs.com/toC/star_f.png'
      }, {
        flag: '1',
          bgImg: 'https://maichefu.oss-cn-beijing.aliyuncs.com/toC/star.png',
          bgfImg: 'https://maichefu.oss-cn-beijing.aliyuncs.com/toC/star_f.png'
      }, {
        flag: '1',
          bgImg: 'https://maichefu.oss-cn-beijing.aliyuncs.com/toC/star.png',
          bgfImg: 'https://maichefu.oss-cn-beijing.aliyuncs.com/toC/star_f.png'
      }, {
        flag: '1',
          bgImg: 'https://maichefu.oss-cn-beijing.aliyuncs.com/toC/star.png',
          bgfImg: 'https://maichefu.oss-cn-beijing.aliyuncs.com/toC/star_f.png'
      }, {
        flag: '1',
          bgImg: 'https://maichefu.oss-cn-beijing.aliyuncs.com/toC/star.png',
          bgfImg: 'https://maichefu.oss-cn-beijing.aliyuncs.com/toC/star_f.png'
      }, {
        flag: '1',
          bgImg: 'https://maichefu.oss-cn-beijing.aliyuncs.com/toC/star.png',
          bgfImg: 'https://maichefu.oss-cn-beijing.aliyuncs.com/toC/star_f.png'
      }, {
        flag: '1',
          bgImg: 'https://maichefu.oss-cn-beijing.aliyuncs.com/toC/star.png',
          bgfImg: 'https://maichefu.oss-cn-beijing.aliyuncs.com/toC/star_f.png'
      }]
    }],
    saScore:0,//sa评分
    spScore:0,//门店评分
    thScore:0,//技师评分
    userOrder:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this; 
    wx.getStorage({
      key: 'userOrder',
      success: function(res) {
        console.log("用户的订单", res.data)
        that.setData({
          userOrder:res.data
        })
      },
    })
  },

  starScore: function(e) {
    var currentStart = that.data.scoreList[e.currentTarget.dataset.index];  //服务顾问、门店、技师评分
    var index = e.currentTarget.dataset.bindex;   //第几颗星星
    var fatherIndex = e.currentTarget.dataset.index;
    let startIndex = index + 1;
    if(fatherIndex == '0'){
      that.setData({
        saScore: startIndex
      })
    }else if(fatherIndex =='1'){
      that.setData({
        spScore: startIndex
      })
    }else if(fatherIndex =='2'){
      that.setData({
        thScore: startIndex
      })
    }
    for (var i = 0; i < currentStart.stars.length; i++) {
      if (i > index) {
        that.data.scoreList[e.currentTarget.dataset.index].stars[i].flag = 1;
      } else {
        that.data.scoreList[e.currentTarget.dataset.index].stars[i].flag = 2;
      }
    }
    that.setData({
      scoreList: that.data.scoreList,
    })
  },


  //提交评分
  submitScore(){
    if(that.data.saScore == 0){
        wx.showToast({
          title: '服务未评分',
          icon:'loading',
          duration:1500
        })
    }else if(that.data.spScore == 0){
      wx.showToast({
        title: '门店未评分',
        icon: 'loading',
        duration: 1500
      })
    }else if(that.data.thScore == 0){
      wx.showToast({
        title: '技师未评分',
        icon: 'loading',
        duration: 1500
      })
    } else {
      let oderScore = {
        "allOrderMoney": that.data.userOrder.allOrderMoney, //商品加服务费
        "authorizer": 1,
        "carId": that.data.userOrder.carId,
        "empSaId": that.data.userOrder.empSaId,
        "empThId": that.data.userOrder.empThId,
        "id": that.data.userOrder.id ,
        "invoice": that.data.userOrder.invoice, //是否要发票1是，0否
        "mileage": that.data.userOrder.mileage,
        "oldparts": that.data.userOrder.oldparts, //是否要旧件
        "orderMoney": that.data.userOrder.allPrice, //商品总价
        "orderSource": 1,
        "orderStatus": that.data.userOrder.orderStatus,
        "orderTime": that.data.userOrder.orderTime, //预定时间0上午，1下午，2晚上
        "profit": that.data.userOrder.allProfits, //总利润
        "scoreSa": that.data.saScore,
        "scoreShop": that.data.spScore,
        "scoreTh": that.data.thScore,
        "shopId": that.data.userOrder.shopId,
        "text": that.data.userOrder.text, //订单列表
        "starttime": that.data.userOrder.starttime, //用户选择日期
        "thCost": that.data.userOrder.thCost, //技师服务费
        "thName": that.data.userOrder.thName, //技师姓名
        "type": 1,
        "userName": that.data.userOrder.userName,
        "userTel": that.data.userOrder.userTel,
        "userId": that.data.userOrder.userId,
        "mcfCProduct": that.data.userOrder.mcfCProduct,
        "orderDate": that.data.userOrder.orderDate, //用户选择日期
        "wechatOrder": that.data.userOrder.wechatOrder, //微信流水单号
        "isPay": that.data.userOrder.isPay
      }
      console.log("打分参数", oderScore)
      request.userScore(oderScore).then(res => {
        console.log("用户打分", res)
        if (res.code == '200') {
          wx.showToast({
            title: '打分成功',
            icon: 'success',
            duration: 1500,
            success(res){
              wx.navigateBack({
                delta: 1
              })
            }
          })
         
        } else if (res.code == '300') {
          wx.showToast({
            title: '打分失败',
            icon: 'loading',
            duration: 1500
          })
        }
      })
    }
  }

})