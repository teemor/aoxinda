Component({
  /**
   *  详情和列表里的tab
   * - @author           狄兆璐
   * - @date             2018-07-04
   *  scroll                默认输入
   *  fixed                 是否有搜索条件
   *  height              搜索条件model
   *  list                    数据
   *  selectedId        方法名称
   */
  externalClasses: 'class',
  properties: {
    scroll: {
      type: Boolean,
      value: false
    },
    fixed: {
      type: Boolean,
      value: false
    },
    height: {
      type: Number,
      value: 0
    },
    list: {
      type: Array,
      value: []
    },
    selectedId: {
      type: [String, Number],
      value: ''
    }
  },
  methods: {
    /**
     * 点击切换房客源详情列表tab方法
     */
    _handleZanTabChange(e) {
      // 获取tab方法名称
      const selectedId = e.currentTarget.dataset.itemId
      // 存储方法名称
      this.setData({ selectedId })
      // 调用父事件方法调取数据
      this.triggerEvent('tabchange', this.data.selectedId)
    }
  }
});
