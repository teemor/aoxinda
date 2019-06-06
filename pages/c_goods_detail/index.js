import { Technician } from '../../common/api/api'
const request = new Technician

Page({
  /**
   * 页面的初始数据
   */
  data: {
    dataset: {
      name: '米其林轮胎', price: '666',
      goodstype: [{
        name: '类型', lists: []
      }],
      list: [
        { name: '服务', list: [{ active: true, name: "到店安装", id: '01' }, { name: '无需安装', id: '02' }] }]
    }
  },

  /**
       * 详情
       */
  goodsDetail: function (code) {
    request.goodsDetail({ product_code: code }).then(res => {
      let that = this
      that.data.dataset.goodstype[0].lists = res.tableDetail
      this.setData({
        item: res.tableDetail[0],
        tableDetail: res.tableDetail,
        orderImg: res.fileList[0],
        imgList: res.fileList,
        cartNum: res.total,
        goodsData: res.mainTable,
        detail: res.mainTable.content ? res.mainTable.content.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ') : '',
        dataset: that.data.dataset
      })
      if (res.tableDetail.length > 0) {
        that.data.dataset.goodstype[0].lists[0].active = true
        this.setData({
          item: res.tableDetail[0],
          price: res.tableDetail[0].goods_price,
          goods_id: res.tableDetail[0].goods_id,
          goods_detail_id: res.tableDetail[0].goods_detail_id,
          dataset: that.data.dataset
        })
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      product_code: options.product_code
    })
    this.goodsDetail(this.data.product_code)
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