import {
  Technician
} from '../../common/api/api'
const request = new Technician
let iphonex = require('../../mixin/iphonex.js');
const app = getApp()
Page({
  mixins:[iphonex],
  data: {
    region:'',
    defaultAddress:1,
    deleteShow:false
  },
  onLoad: function (options) {
      if (options.model) {
      let model = decodeURIComponent(options.model)
      this.setData({
           deleteShow:true,
        content: JSON.parse(model),
        region: [model.province, model.city, model.content]
      })
    }
else{
      // 隐藏删除
      this.setData({
        deleteShow:false
      })
    }
  },
  /**
   * 删除收货地址
   */
  deleteAdd:function(){
    let that = this
    wx.showModal({
      title:'提示',
      content:'是否确认删除',
      success(res){
        if(res.confirm){
          request.deleteAddress({id:that.data.content.id,version:'-1'}).then(res=>{
            wx.showToast({
              title:'删除成功'
            })
            if(res.status===0){
              wx.navigateBack({
                url:'2'
              })
            }
          })
        }else{

        }
      }
    })
  },
  nameChange:function(e){
    this.data.content.name = e.detail.value
    this.setData({
      content:this.data.content
    })
  },
  numberChange:function(e){
    this.data.content.phone = e.detail.value
    this.setData({
      content:this.data.content
    })
  },
  /**
   * 详细地址
   */
  addressChange:function(e){
    this.data.content.street = e.detail.value
    this.setData({
      content:this.data.content
    })
  },
  /**
   * 是否为默认地址
   */
  switchChange:function(e){
    this.data.content.is_check = e.detail === 0 ? 1 : 0
    this.setData({
      content: this.data.content
    })
  },
  onReady: function () {

  },
  /**
   * 省市区联动
   */
  bindRegionChange:function(e){
    this.data.content.region = e.detail.value
    this.data.content.province = e.detail.value[0]
    this.data.content.city = e.detail.value[1],
    this.data.content.county = e.detail.value[2]
    this.setData({
      content:this.data.content
    })
  },
  /**
   * 保存收货地址
   */
  saveAddress:function(){
    console.log(this.data,'hh')
    let reg = /^((13[0-9])|(14[5-9])|(15([0-3]|[5-9]))|(16[6])|(17[1-8])|(18[0-9])|(19[8-9]))\d{8}$/g;
    if (this.data.content.phone==='') {
      wx.showToast({
        title: '请输入手机号',
        icon: "none"
      })
      return
    } else if (!reg.test(this.data.content.phone)) {
      wx.showToast({
        title: '手机号格式错误',
        icon: "none"
      })
      return
    }
    console.log(this.data.content,'model')
    if(this.data.content.county===''){
      wx.showToast({
        title:'地址不能为空'
      })
    }else if(this.data.content.province===undefined){
      wx.showToast({
        title:'省份不能为空'
      })
    }else if(this.data.content.city===undefined){
      wx.showToast({
        title:'城市不能为空'
      })
    }else if(this.data.content.street===undefined){
      wx.showToast({
        title:'详细地址不能为空'
      })
    }else{
      request.updateAddress({name:this.data.content.name,phone:this.data.content.phone,province:this.data.content.province,city:this.data.content.city,county:this.data.content.county,street:this.data.content.street,is_check:this.data.content.is_check,id:this.data.content.id}).then(
        res=>{
          if(res.status===0){
          wx.showToast({
            title:'修改成功'
          })
            wx.navigateBack({
              url:'2'
            })
          }
        }
      )
    }
    
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

  }
})