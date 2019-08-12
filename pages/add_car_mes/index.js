import {
  Technician
} from '../../common/api/api'
const request = new Technician
const app =  getApp();

  
Page({

  /**
   * 页面的初始数据
   */
  data: {
    focus: false,
    show: false,
    plateNum: '',
    carType: '',
    region: ['河北省', '唐山市', '路北区'],
  },
  /**
   * 保存
   */
  addCar: function() {
  let that = this
    wx.getStorage({
      key:'userPhone',
      success:(result)=>{
        that.setData({
          userTel:result.data
        })
      }
    })
    wx.getStorage({
      key: 'user',
      success: (result) => {
        request.saveCar({
          ZWS:this.data.model.ZWS,
          plateNum: this.data.plateNum,
          CMS:this.data.model.CMS,
          PP:this.data.model.PP,
          registerDate: this.data.date,
          carTypeId: this.data.model.LevelID,
          engineNum: this.data.model.FDJXH,
          mileage: this.data.kmTxt,
          model: this.data.model.XSMC,
          vehicleType: this.data.model.CX,
          userId:app.globalData.openId,userName:result.data.nickName,userTel:that.data.userTel,
        }).then(res => {
          if(res.status===true){
            wx.showToast({
              title:'添加成功'
            })
            wx.navigateBack({
              url: '1'
            });
              
          }
        })
      },
      fail: () => {},
      complete: () => {}
    });
  },
  //点击行驶里程获取焦点
  openKeyboard: function(e) {
    this.setData({
      focus: true
    })
  },
  kmChange: function(e) {
    this.setData({
      kmTxt: e.detail.value
    })
  },
  bindDateChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindRegionChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  onShow: function() {
    if (this.data.item) {
      this.setData({
        carType: this.data.item.PP + this.data.item.CX,
        model: this.data.item
      })
    }

    console.log(this.data.item, 'item')
    // request.saveCar({userId:'1222799294104538bd06930e37a8ab08',UserName:'',UserTel:'',carType:e.detail.LevelID,engineNum:e.detail.FDJXH,mileage:'',model:e.detail.XSMC,vehicleType:e.detail.CX}).then(res=>{
    //   console.log(res,'res')
    // })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },
  //展示弹框
  showPlate() {
    this.setData({
      show: true
    })
  },
  //隐藏弹框
  onClose() {
    this.setData({
      show: false
    })
  },
  //隐藏弹框
  getPlate(e) {
    this.onClose();
    this.setData({
      plateNum: e.detail
    })
  }
})