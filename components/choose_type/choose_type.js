Component({
  properties: {
    show: Boolean,
    carTypeData: Array
  },
  data: {
    activeIndex: '001'
  },
  methods: {
    /**
     * 切换年份
     */
    tabchange: function (e) {
      // console.log(e, '选择')
    },
    /**
     * 点击进入详情
     */
    detailBtn: function () {
      this.triggerEvent('detailBtn', {})
    },
    /**
     * 退出
     */
    exitType: function () {
      this.triggerEvent('exitType', {})
    }
  }
})