// components/car_beauty_list/car_beauty_list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    stores: Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    http: 'https://www.maichefu.cn'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 查看详情
    carbeautyBtn: function(item) {
      this.triggerEvent('carbeautyBtn', item.currentTarget.dataset.item)
    }
  }
})