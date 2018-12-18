Component({
  /**
   *  各种弹出的容器
   * - @author           狄兆璐
   * - @date             2018-06-30
   *  overlay             遮罩层
   *  type                 内容从哪个方向出(center,top,bottom,left,right)
   *  show                显示隐藏
   *  showOverlay    改变阿背景颜色
   */
  properties: {
    show: {
      type: Boolean,
      value: false
    },
    showOverlay: {
      type: Boolean,
      value: true
    },
    overlay: {
      type: Boolean,
      value: true
    },
    type: {
      type: String,
      value: 'center'
    }
  },
  methods: {
    /**
     * 关闭当前所有使用manager组件的弹窗
     */
    closeMask: function () {
      this.triggerEvent('clickMask', {})
    }
  }
})
