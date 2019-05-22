import {
  Technician
} from '../../common/api/api'
const request = new Technician
import shop_list from '../../mixin/shop_list'
Page({
    mixins: [shop_list],
  /**
   * 页面的初始数据
   */
  data: {
    // typeData: [{ id: "001", name: "维修保养" }, { id: "002", name: "轮胎配件" }, { id: "003", name: "车载电器" }, { id: "004", name: "汽车配件" }, { id: "2", name: "美容清洗" }]
  },
  addCar: function() {
    wx.navigateTo({
      url: '../../pages/add_car_mes/index'
    })
  },
  /**
   * 分类切换
   * dzl
   * 2019-03-28
   */
  onChange: function(e) {

    this.setData({
      shop_title: e.detail.title
    })
    console.log(e.detail.title, 'detail')
    request.selectGoodsType({
      parentId: e.detail.titlea
    }).then(res => {
      this.setData({
        storeList: res.data.tableData
      })
    })
  },
  /**
   * 编辑我的爱车
   */
  editCar: function() {
    wx.navigateTo({
      url: '../my_car_edit/index'
    })
  },
  /**
   * 搜索
   */
  onSearch: function(e) {
    console.log('rwer',e)
    wx.navigateTo({
      url: '../search_shop_list/index'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    request.findCarList().then(res => {
      if (res.result.length > 0) {
        this.setData({
          car: true,
          model: res.result[0]
        })
      }

    })
    request.selectGoodsType().then(res => {
      this.setData({
        shop_title: res.data.tableData[0].name,
        typeData: res.data.tableData,
      })
      request.selectGoodsType({
        parentId: res.data.tableData[0].id
      }).then(res => {
        this.setData({
          storeList: res.data.tableData
        })
        console.log(res, 'res')
      })
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})