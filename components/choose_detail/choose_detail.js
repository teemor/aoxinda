Component({
  properties: {
    show: Boolean

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
