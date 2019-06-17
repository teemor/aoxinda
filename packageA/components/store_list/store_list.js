// packageA/components/store_list/store_list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item:Object
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
    storeDetail:function(){
      this.triggerEvent('storeDetail',this.data.item)
    }
  }
})
