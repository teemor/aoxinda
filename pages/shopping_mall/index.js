import { Technician } from '../../common/api/api'
const request = new Technician
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // typeData: [{ id: "001", name: "维修保养" }, { id: "002", name: "轮胎配件" }, { id: "003", name: "车载电器" }, { id: "004", name: "汽车配件" }, { id: "2", name: "美容清洗" }]
  },
  /**
   * 分类切换
   * dzl
   * 2019-03-28
   */
  onChange: function (e) {
    this.setData({
      shop_title:e.detail.title
    })
    console.log(e.detail.title, 'detail')
    request.selectGoodsType({ parentId: e.detail.id }).then(res => {
      this.setData({
        storeList:res.data.tableData
      })
    })
  },
  /**
   * 搜索
   */
  onSearch: function () {
    wx.navigateTo({
      url: '../search_shop_list/index'
    })
  },
  /**
   * 商品跳转页面
   * @param {*} options 
   */
  shopList: function (e) {
  let  model= encodeURIComponent(JSON.stringify(e.currentTarget.dataset.item))
    wx.navigateTo({
      url: `../shop_goods_list/index?id=${model}`
    });

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    request.selectGoodsType().then(res => {
      this.setData({
        shop_title:res.data.tableData[0].name,
        typeData: res.data.tableData,
      })
      request.selectGoodsType({parentId:res.data.tableData[0].id}).then(res => {
        this.setData({
          storeList:res.data.tableData
        })
        console.log(res, 'res')
      })
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