Component({
  properties: {
    show: Boolean,
    detailData:Object
  },
  data: {

  },

  methods: {
    collapseClick: function () {
    },
    /**
     * 退出详情
     * dzl
     */
    exitDetail: function () {
      this.triggerEvent('exitDetail', {})
    }
  }
})
