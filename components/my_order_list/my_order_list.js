// components/my_order_list/my_order_list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    ispay:Boolean,
    goodsList:Object
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
     * 进入详情
     */
    orderDetail:function(){
      this.triggerEvent('orderDetail', {id:this.data.goodsList.id})
    }
  }
})
