var myBehavior = require('../relations')
Component({
  /**
   * 
   * 组件的属性列表
   */
  behaviors: [myBehavior],
  properties: {
    model: Object,
    car: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    carShow: true
  },
  /**
   * 组件的方法列表
   */
  methods: {
    closeCar: function() {
      this.setData({
        carShow: false
      })
    },
    editCar: function() {
      wx.navigateTo({
        url: '../../pages/my_car/index'
      })
    },
    /**
   * 跳转添加爱车界面
   */
    addCar: function () {
      console.log(1)
      wx.navigateTo({
        url: '../add_car_mes/index'
      })
    },
  }
})