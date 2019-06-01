var that
import {
  userAuth
} from '../../common/api/c_api'
const request = new userAuth
Page({
  /**
   * 页面的初始数据
   */
  data: {
    date: '', // 出生年月
    sex: '', //性别
    dateJudge: true, // 出生年月的“请选择”显示隐藏
    sexJudge: true, // 性别的“请选择”显示隐藏
    imgJudge: true,
    sexList: ['男', '女'], // 性别
    addressValue:'',//用户输入地址
    phoneNum: '',//用户输入手机号
    username: '',//用户输入姓名
    user:{},  // 用户信息
    mineInfo:{},  // 用户注册信息
    headerImg:'',//用户头像
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this;
    that.getUserInfo();
    that.userId();
  },
  //用户输入地址
  addressValue(e) {
    that.setData({
      addressValue: e.detail.value
    })
  },

  //用户输入手机号
  phoneNum(e) {
    let phoneNum = e.detail.value
    var reg = /^[1][3,4,5,7,8][0-9]{9}$/; //手机号格式正则表达式
    if (reg.test(phoneNum)) {
      that.setData({
        phoneNum: phoneNum
      })
    } else {
      wx.showToast({
        title: '无效手机号',
        icon: 'loading',
        duration: 1500
      })
      that.setData({
        phoneNum: ''
      })
    }
  },

  //用户输入姓名
  username(e) {
    that.setData({
      username: e.detail.value
    })
  },

  //  选择出生年月
  setDateFun(e) {
    if (e.detail.value == '') {
      // that.setData({
      //   dateJudge: true
      // })
    } else {
      that.setData({
        date: e.detail.value,
        // dateJudge: false
      })
    }
  },
  //  选择性别
  setSexFun(e) {
    if (e.detail.value == '') {
      // that.setData({
        // sexJudge: true
      // })
    } else {
      that.setData({
        sex: that.data.sexList[e.detail.value],
        // sexJudge: false
      })
    }
  },

  // //获取用户信息
  getUserInfo(){
    wx.getStorage({
      key: 'user',
      success: function(res) {
        that.setData({
          user:res.data,
          headerImg:res.data.avatarUrl
        })
      },
    })
  },

  //获取用户id
  userId(){
    wx.getStorage({
      key: 'mineInfo',
      success: function(res) {
        that.setData({
          username: res.data.name,
          sex: res.data.sex,
          date: res.data.birthdate,
          phoneNum: res.data.tel,
          addressValue: res.data.address,
          mineInfo:res.data
        })
      }
    })
  },

  //提交个人信息
  editCard: function(e) {
    let mcfuserC = {
      "additionalMessage": "",
      "address": that.data.addressValue,
      "del": 1,
      "docNumber": "",
      "docType": 1,
      "createtime":that.data.mineInfo.createtime,
      "systemtime": that.data.mineInfo.systemtime,
      "id": that.data.mineInfo.id,
      "name": that.data.username,
      "openid": that.data.user.openId,
      "unionid": that.data.user.unionId,
      "birthdate":that.data.date,
      "remarks": "",
      "sex": that.data.sex,
      "tel": that.data.phoneNum,
      "userSource": that.data.mineInfo.userSource
    }
    request.selfInfo(mcfuserC).then(res => {
      if(res.code =='200'){
        wx.showToast({
          title: '提交成功',
          icon:'success',
          duration:1500,
          success(res){
            wx.navigateBack({
              delta: 1
            })
          }
        })
        wx.setStorage({
          key: 'mineInfo',
          data: res.result,
        })
      }else if(res.code== '500'){
        wx.showToast({
          title: '提交失败',
          icon: 'success',
          duration: 1500,
          success(res) {
            wx.navigateBack({
              delta: 1
            })
          }
        })
      }
    })
  }
})