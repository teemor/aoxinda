Component({
  properties: {
    show: Boolean,
    detailData:Object
  },
  data: {
http:'https://www.maichefu.cn'
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
