Component({
  properties: {
    show: Boolean,
    carTypeData: Array,
    carYear:Array
  },
  data: {
    index: '0'
  },
  methods: {
    /**
     * 切换年份
     */
    tabchange: function (e) {
      console.log(e.detail,'heh')
      this.triggerEvent('tabYear', e.detail.title)
    },
    /**
     * 点击进入详情
     */
    detailBtn: function (e) {
      this.triggerEvent('detailBtn', e.currentTarget.dataset.id)
    },
    /**
     * 退出
     */
    exitType: function () {
      this.triggerEvent('exitType', {})
    }
  }
})