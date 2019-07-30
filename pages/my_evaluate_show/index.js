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
    //施工专业性
    qualityData: [],
    //施工速度
    speedData: [],
    //服务顾问态度
    attitudeData: [],
    sourceData: [
      { "name": "差", "img": "first", "star": 0, "id": "1" },
      { "name": "一般", "img": "second", "star": 0, "id": "2" },
      { "name": "还不错", "img": "third", "star": 0, "id": "3" },
      { "name": "很满意", "img": "fourth", "star": 0, "id": "4" },
      { "name": "强烈推荐", "img": "fifth", "star": 0, "id": "5" }
    ],
    relation_ids: [], //洗车消费表id/救援订单表id
    describe: "", //备注
    file_lists: [], //图片
    detailtype: ""  //评论类型
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      qualityData: this.data.sourceData,
      speedData: this.data.sourceData,
      attitudeData: this.data.sourceData,
      relation_ids: options.relation_lists ? options.relation_lists.split(",") : [],
      detailtype: options.detailtype
    })
    this.selectComment({
      "relation_ids": this.data.relation_ids,
      "detailtype": this.data.detailtype
    });
  },

  /**
   * 查看评论
   */
  selectComment: function (model) {
    request.selectComment(model).then(res => {
      if (res.status == '200') {
        let qualityLevel = res.data.recordList[0].level; //施工专业性评分
        let qualityIndex = qualityLevel - 1;
        let speedLevel = res.data.recordList[1].level; //施工速度评分
        let speedIndex = speedLevel - 1;
        let attitudeLevel = res.data.recordList[2].level; //服务顾问态度评分
        let attitudeIndex = attitudeLevel - 1;
        this.setData({
          [`qualityData[${qualityIndex}].star`]: parseInt(qualityLevel),
          [`speedData[${speedIndex}].star`]: parseInt(speedLevel),
          [`attitudeData[${attitudeIndex}].star`]: parseInt(attitudeLevel),
          [`qualityData[${qualityIndex}].img`]: this.data.qualityData[qualityIndex].img + "_click",
          [`speedData[${speedIndex}].img`]: this.data.speedData[speedIndex].img + "_click",
          [`attitudeData[${attitudeIndex}].img`]: this.data.attitudeData[attitudeIndex].img + "_click",
          describe: res.data.content,
          file_lists: res.data.fileList
        })
      }else{
        wx.showToast({
          title: '获取评论失败',
          icon: 'none',
          duration: 2000,
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