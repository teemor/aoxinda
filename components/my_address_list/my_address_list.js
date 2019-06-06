Component({
  properties: {
    addressDefault:Boolean,
    chooseOff:Boolean,
    model:Object
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
    chooseAddress:function(){
      if (this.data.chooseOff) {
        this.triggerEvent('chooseAddress', this.data.model)
      }
    },
    editAddress:function(){
      let  model= encodeURIComponent(JSON.stringify(this.data.model))
      wx.navigateTo({
        url: `../../pages/my_edit_address/index?model=${model}`,
        success: (result) => {
          
        },
        fail: () => {},
        complete: () => {}
      });
        
    }
  }
})
