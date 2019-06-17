import {
  Technician
} from '../../common/api/api'
const request = new Technician
const app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    carType: '',
    region: ['河北省', '唐山市', '路北区'],
  },
  /**
   * 保存
   */
  addCar: function() {
    let that = this
    wx.getStorage({
      key: 'userPhone',
      success: (result) => {
        that.setData({
          userTel: result.data
        })
      }
    })
    wx.getStorage({
      key: 'user',
      success: (result) => {
        let json = {}
        if (this.data.model) {
          json = {
            carId: this.data.carId,
            registerDate: this.data.date,
            carTypeId: this.data.model.LevelID,
            vehicleType: this.data.model.CX,
            engineNum: this.data.model.FDJXH,
            PP: this.data.model.PP,
            mileage: this.data.kmTxt,
            model: this.data.model.XSMC,
          }
        } else {
          json = {
            carId: this.data.carId,
            registerDate: this.data.date,
            carTypeId: this.data.carTypeId_,
            vehicleType: this.data.vehicleType_,
            engineNum: this.data.engineNum_,
            PP: this.data.PP_,
            mileage: this.data.kmTxt,
            model: this.data.model_,
          }
        } {
          // CMS:this.data.model.CMS,
          // carId:this.data.carId,
          // PP:this.data.model.PP,
          // registerDate: this.data.date,
          // carTypeId: this.data.model.LevelID,
          // engineNum: this.data.model.FDJXH,
          // mileage: this.data.kmTxt,
          // model: this.data.model.XSMC,
          // vehicleType: this.data.model.CX,
          // userId:result.data.unionId ,
          // userName:result.data.nickName,
          // userTel:that.data.userTel,
        }
        request.updateCar(json).then(res => {
          if (res.status === true) {
            wx.showToast({
              title: '添加成功'
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
    console.log(options, 'options')
    this.setData({
      carId: options.id
    })
    if (options.info) {
      let car = JSON.parse(options.info)
      let date_ = new Date(car.lastUpkeep);
      this.setData({
        date: date_.getFullYear() + '-' + (date_.getMonth() + 1) + '-' + date_.getDate(),
        kmTxt: car.mileage,
        carType: car.model + car.vehicleType,
        carTypeId_: car.LevelID,
        vehicleType_: car.vehicleType,
        engineNum_: car.mileage,
        PP_: car.model,
        model_: car.carType,
      })
    }
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

  }
})