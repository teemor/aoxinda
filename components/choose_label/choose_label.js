Component({
  /**
   *  筛选中的单选多选组件
   * - @author           狄兆璐
   * - @date             2018-07-13
   *  list                    选项数据
   *  ischeckbox       是否是多选
   *  label                 头部文本
   *  islabel              是否折叠
   *  part　              样式宽度
   *  radioCode       单选属性code
   *  check               多选展开收起选项
   *  radio                单选展开收起选项
   */
  properties: {
    islabel: {
      type: Boolean
    },
    list: {
      type: Array
    },
    ischeckbox: {
      type: Boolean,
      value: false
    },
    label: {
      type: String
    },
    part: {
      type: Number
    },
    radioCode: Number
  },
  data: {
    check: true,
    radio: true
  },
  methods: {
    /**
     * checkbox多选收起折叠
     * author dzl
     */
    handleTap: function() {
      this.setData({
        check: !this.data.check
      })
    },
    /**
     * radio单选收起折叠
     */
    checkHandle: function() {
      this.setData({
        radio: !this.data.radio
      })
    },
    /**
     * 遍历选项设置复选的check为true
     * author dzl
     */
    checkboxChange: function(e) {
      // 选项数据列表
      let items = e.currentTarget.dataset.item
      // 选择的数据
      let value = e.detail
      // 选择当前文本的code
      let code = JSON.parse(JSON.stringify(e.detail))
      // 循环选择的选项截取文本和code
      value.value.forEach((el, i) => {
        value.value[i] = el.split('.')[1]
        code.value[i] = el.split('.')[0]
      })
      // 返回新的数组，值相同为true
      let model = items.map((n) =>
        Object.assign({}, n, {
          checked: value.value.includes(n.value)
        }))
      // 调用父事件，传入数据
      this.triggerEvent("checkboxChange", {
        model,
        value,
        code
      })
    },
    /**
     * 遍历选项设置单选的check为true
     * author dzl
     */
    radioChange: function(e) {
      // 单选数据列表
      let items = e.currentTarget.dataset.item
      // 选择的数据
      let value = e.detail
      // 截取文本数据
      let values = e.detail.value.split('.')[1]
      // code相同的为true返回新的数组
      let model = items.map((n) => {
        // 给每个数据添加属性
        n.checked = false
        // 选择的code与列表中的code对比
        if (parseInt(n.code) === parseInt(value.value.split('.')[0])) {
          // 修改属性
          n.checked = true
        }
        return n
      })
      // 汇集数据
      let data = {
        model: model,
        value: values,
        code: e.detail.value.split('.')[0]
      }
      // 将当前code赋值主要用于点击筛选条件间距修改
      this.setData({
        radioCode: parseInt(data.code)
      })
      // 调用父事件传递数据
      this.triggerEvent("radioChange", data)
    },
    /**
     * 用于更改推送的类型
     */
    reselectPullType() {
      // 调用父修改类型事件
      this.triggerEvent("reselectPullType")
    },
  }
})