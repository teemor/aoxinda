// components/login_phone/login_phone.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    loginMask:Number,
    phoneMask:Number
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    getPhoneNumber:function(e){
      this.triggerEvent('getPhoneNumber',e.detail)
    },
    getUserInfoBtn:function(e){
      this.triggerEvent('getUserInfoBtn',e.detail)
    }
  }
})
