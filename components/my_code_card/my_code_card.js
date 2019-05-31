// components/my_code_card/my_code_card.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    qrCode:Object
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
    /**
     * 放大图片
     * 
     * dzl
     */
    previewImg:function(){
      let that =this
      wx.previewImage({
        current: that.data.qrCode.img, // 当前显示图片的http链接
        urls:[that.data.qrCode.img] // 需要预览的图片http链接列表
      })
    }
    
  }
})
