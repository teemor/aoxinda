Component({
  properties: {
    show: Boolean,
    carBrand: Array
  },

  data: {

  },
  methods: {
    /**
     * 关闭图层
     */
    clickMask: function() {
      this.setData({
        show: false
      })
      this.triggerEvent('clickMask', {})
    },
    /**
     * 选择类别
     */
    chooseType: function(e) {
      this.triggerEvent('chooseType',e.currentTarget.dataset.id)
    }
  }
})