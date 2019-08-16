// packageA/components/service_list/service_list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: Object,
    add:Boolean,
    payType:Number
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
    addNum: function () {
      this.setData({
        add: true
      })
      let model = {}
      model.num = 1
      model.item = this.data.item
      this.triggerEvent('numChange',model)
    },
    numChange: function ({detail}) {
      console.log(detail,'变化')
      let model = {}
      model.num = detail
      model.item = this.data.item
      this.triggerEvent('numChange',model)
    }
  }
})
