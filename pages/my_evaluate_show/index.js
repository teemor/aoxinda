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
    qualityData: [],
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
      relation_ids: options.relation_lists ? options.relation_lists.split(",") : [],
      detailtype: options.detailtype
    })
    this.selectComment({
      "relation_ids": this.data.relation_ids,
      "detail_type": this.data.detailtype
    });
  },

  /**
   * 查看评论
   */
  selectComment: function (model) {
    let that = this;
    request.selectComment(model).then(res => {
      if (res.status == '200') {
        let recordList = res.data.recordList;
        let rcList = [];
        for (let i = 0;i < recordList.length;i ++){
          let sourceData = [
            { "name": "差", "img": "first", "star": 0, "id": "1" },
            { "name": "一般", "img": "second", "star": 0, "id": "2" },
            { "name": "还不错", "img": "third", "star": 0, "id": "3" },
            { "name": "很满意", "img": "fourth", "star": 0, "id": "4" },
            { "name": "强烈推荐", "img": "fifth", "star": 0, "id": "5" }
          ];
          let rl = recordList[i]; //副本
          recordList[i] = sourceData;
          recordList[i][parseInt(rl.level) - 1].star = parseInt(rl.level); //评分
          recordList[i][parseInt(rl.level) - 1].img = recordList[i][parseInt(rl.level) - 1].img + "_click"; //评分表情图片
          rcList.push({ "recordList": recordList[i], "title": rl.name});
        }
        this.setData({
          qualityData: rcList,
          describe: res.data.content,
          file_lists: res.data.fileList || []
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