import {
  Technician
} from '../../common/api/api'
const request = new Technician
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: 'https://maichefu.oss-cn-beijing.aliyuncs.com/comment',
    //质量
    qualityData: [],
    //速度
    speedData: [],
    sourceData: [
      { "name": "差", "img": "first", "star": 0, "id": "1" },
      { "name": "一般", "img": "second", "star": 0, "id": "2" },
      { "name": "还不错", "img": "third", "star": 0, "id": "3" },
      { "name": "很满意", "img": "fourth", "star": 0, "id": "4" },
      { "name": "强烈推荐", "img": "fifth", "star": 0, "id": "5" }
    ],
    form: {
      "user_id": "",
      "detail_type": "1", //1代表洗车
      "record_lists": [
        { "level": 0, "name": "质量" }, { "level": 0, "name": "速度" }
      ],
      "relation_lists": [], //消费表id
      "detail_id": "",
      "content": "",
      "file_lists": [],
      "card_type": 0, //订单类型：2单次服务3不计次数4月月卡
      "order_code": "", //订单编号/卡号
      "user_name": "", //用户昵称
      "user_phone": "" //用户手机号
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getStorageInfo();
    this.getStoragePhone();
    this.setData({
      qualityData: this.data.sourceData,
      speedData: this.data.sourceData,
      ["form.relation_lists"]: options.relation_lists ? options.relation_lists.split(",") : [],
      ["form.detail_id"]: options.cardId,
      ["form.card_type"]: options.cardtype,
      ["form.order_code"]: options.cardtype == "2" ? options.cardnum : options.ordercode
    })
  },

  // 获取用户信息
  getStorageInfo: function () {
    let that = this
    wx.getStorage({
      key: 'user',
      success: function (res) {
        that.setData({
          ["form.user_id"]: res.data.openId,
          ["form.user_name"]: res.data.nickName
        })
      }
    })
  },

  //获取用户手机号
  getStoragePhone: function(){
    let that = this;
    wx.getStorage({
      key: 'userPhone',
      success: function (res) {
        that.setData({
          ["form.user_phone"]: res.data
        })
      }
    })
  },

  //质量选择分数
  bindQuality: function(e){
    let that = this;
    that.setData({
      qualityData: this.data.sourceData
    })
    let query = e.currentTarget.dataset['index'];
    let index = query - 1;
    let completeStatus = `qualityData[${index}].img`; //图片
    let completeStar = `qualityData[${index}].star`;  //分数
    that.setData({
      [completeStatus]: this.data.qualityData[index].img + "_click",
      [completeStar]: parseInt(query),
      [`form.record_lists[0].level`]: parseInt(query)
    })
  },

  //速度选择分数
  bindSpeed: function(e){
    let that = this;
    that.setData({
      speedData: this.data.sourceData
    })
    let query = e.currentTarget.dataset['index'];
    let index = query - 1;
    let completeStatus = `speedData[${index}].img`;
    let completeStar = `speedData[${index}].star`;
    that.setData({
      [completeStatus]: this.data.speedData[index].img + "_click",
      [completeStar]: parseInt(query),
      [`form.record_lists[1].level`]: parseInt(query)
    })
  },

  //评论发布
  release: function(){
    if (this.data.form.record_lists[0].level == 0){
      wx.showToast({
        title: '请添写服务质量评分',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    if (this.data.form.record_lists[1].level == 0) {
      wx.showToast({
        title: '请添写服务速度评分',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    request.addComment(this.data.form).then(res => {
      if (res.status == '200') {
        wx.showToast({
          title: '评论发布成功',
          icon: 'none',
          duration: 2000,
        })
        setTimeout(() => {
          wx.navigateBack({
            url: '1'
          });
        }, 2000);
      }else{
        wx.showToast({
          title: '评论发布失败',
          icon: 'none',
          duration: 2000,
        })
      }
    })
  },

  /**
   * 评论内容
   */
  bindContent: function(e){
    this.setData({
      ["form.content"]: e.detail.value
    })
  },

  /**
   * 上传照片
   */
  uploadImage: function(){
    let that = this
    wx.chooseImage({
      count: 6,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        let tempFilePath = res.tempFilePaths, uploadImgCount = 0;
        wx.showLoading({
          icon: 'loading'
        });

        let list = tempFilePath.map(item => {
          wx.uploadFile({
            url: 'http://192.168.31.156:9015/common/v1.0/upload',
            filePath: item,
            name: 'file',
            formData: { "file_path": "mcf-comment"},
            success: function (res) {
              uploadImgCount++;

              that.data.form.file_lists.push(JSON.parse(res.data));
              let arr = that.data.form.file_lists;
              that.setData({
                ["form.file_lists"]: arr
              });

              //如果是最后一张,则隐藏等待中
              if (uploadImgCount == tempFilePath.length) {
                wx.hideLoading();
              }
            },
            fail: function (res) {
              wx.hideLoading();
              wx.showModal({
                title: '错误提示',
                content: '上传图片失败',
                showCancel: false
              })
            }
          })
        })
      },
      fail: () => {
        wx.showToast({
          title: '请求错误',
          icon: 'none'
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})