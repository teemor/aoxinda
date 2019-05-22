Component({
  properties: {
    btnRight:String,
    price:String,
    btnBuy:String,
    total:Boolean,
    checked:Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  methods: {
    /**
     * 触发点击事件
     * dzl
     */
    carClickBtn:function(){
      this.triggerEvent('carClickBtn', {})
    },
    /**
     * 里面的点击事件
     * dzl
     */
    btnBuy:function(){
      console.log('rwer')
      this.triggerEvent('btnBuy',{})
    }
  }
})
