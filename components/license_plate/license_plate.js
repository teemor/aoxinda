Component({
  properties: {
    licensePlate: String
  },
  data: {
    plate: '', //车牌号
    show: false, //弹框展示
    cont_show: true, //内容切换
    provinces: ["京", "沪", "浙", "苏", "粤", "鲁", "晋", "冀", "豫", "川", "渝", "辽",
      "吉", "黑", "皖", "鄂", "津", "贵", "云", "桂", "琼", "青", "新", "藏",
      "蒙", "宁", "甘", "陕", "闽", "赣", "湘"
    ], //车牌-省份
    disabled_n: true, //数字不可选
    number: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"], //车牌-数字
    letter: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N",
      "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
    ], //车牌-字母
    disabled_t: true, //标注名不可选
    text: ["港", "澳", "学"], //车牌-标注名
    inputOff: true //是否可输入
  },
  observers: {
    plate(val) { //监听车牌号数组
      this.setData({
        inputOff: val.length >= 7 ? false : true,
        disabled_t: val.length >= 6 ? false : true,
        disabled_n: val.length >= 2 && /[A-Z]/i.test(val[1]) ? false : true
      })
    }
  },
  methods: {
    //选择省份
    choseProvinces(e) {
      this.setData({
        plate: e.currentTarget.dataset.val,
        cont_show: false
      })
    },
    //选择时，如果超出限制车牌长度的提示
    onTips() {
      if (!this.data.inputOff) {
        wx.showToast({
          icon: 'none',
          title: '车牌最多不能超过7位'
        })
      }
    },
    //选择数字
    choseNumber(e) {
      this.onTips();
      if (!e.currentTarget.dataset.off && this.data.inputOff) {
        this.setData({
          plate: this.data.plate + e.currentTarget.dataset.val
        })
      }
    },
    //选择字母
    choseLetter(e) {
      this.onTips();
      if (this.data.inputOff) {
        this.setData({
          plate: this.data.plate + e.currentTarget.dataset.val
        })
      }
    },
    //选择未文字
    choseText(e) {
      this.onTips();
      if (!e.currentTarget.dataset.off && this.data.inputOff) {
        this.setData({
          plate: this.data.plate + e.currentTarget.dataset.val
        })
      }
    },
    //删除一个
    deletePlate() {
      if (this.data.plate.length == 1) {
        this.goBack()
      } else {
        this.setData({
          plate: this.data.plate.substring(0, this.data.plate.length - 1)
        })
      }
    },
    //上一步
    goBack() {
      this.setData({
        plate: '',
        inputOff: true,
        cont_show: true,
        disabled_n: true,
        disabled_t: true
      })
    },
    //确定
    onConfirm() {
      let result = false;
      if (this.data.plate.length == 7) {
        let express = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;
        result = express.test(this.data.plate);
      }
      if (result) {
        this.triggerEvent('getPlate', this.data.plate)
      } else if (this.data.plate == '' && this.data.licensePlate) {
        this.triggerEvent('getPlate', this.data.licensePlate)
      } else {
        wx.showToast({
          icon: 'none',
          title: '请输入有效车牌号'
        })
      }
    },
    //关闭
    onClose() {
      this.triggerEvent('onClose')
    }
  }
})