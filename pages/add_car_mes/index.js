import {
  Technician
} from '../../common/api/api'
const request = new Technician
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
    console.log(this.data,'this.data')
    request.saveCar({
      PP:this.data.model.PP,
      registerDate: this.data.date,
      carTypeId: this.data.model.LevelID,
      engineNum: this.data.model.FDJXH,
      mileage: this.data.kmTxt,
      model: this.data.model.XSMC,
      vehicleType: this.data.model.CX,
      userId: '29ef3c97c26847fcba1bccdbc22ab695',UserName:'露霸霸',UserTel:'13785518945',
    }).then(res => {
      if(res.status===true){
        wx.showToast({
          title:'添加成功'
        })
        wx.navigateBack({
          url: '1'
        });
          
      }
      console.log(res, 'res')
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

  }
})