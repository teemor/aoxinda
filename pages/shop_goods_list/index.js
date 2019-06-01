import { Technician } from '../../common/api/api'
const request = new Technician
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [1, 3, 4, 6],
    sortShow:false,
    brandType:[{name:'宝马(BMN)',id:'1'},{name:'博世(BOS)',id:'2'},{name:'博世(BOS)',id:'3'},{name:'博世(BOS)',id:'3'}],
    sortType: [{ name: '销量', id: '1' }, { name: '价格', id: '2' },{name:'筛选',id:'3'}]
  },
  /**
   * 选择品牌
   */
  labelchoose:function(e){
    let that = this
    let child = that.data.brandType
    for(let i =0;i<child.length;i++){
      child[i].active=false;
    }
    child[e.currentTarget.dataset.index].active=true;
    this.setData({
      brandType:child
    })
    console.log(this.data.brandType)
  },
  closeMask:function(){
    this.setData({
      sortShow:false
    })
  },
  addSort:function(e){
    if(e.currentTarget.dataset.item.name==="销量"){
      this.selectGoodsList({goodsType:this.data.goodsType,sailNum:'sailNum',sorting:'desc'})
    }else if(e.currentTarget.dataset.item.name==='价格'){
      this.selectGoodsList({goodsType:this.data.goodsType,goodsPrice:'goodsPrice',sorting:'desc'})

    }else{
      this.setData({
        sortShow:true
      })
    }
  },
  /**
   * 商品详情
   * dzl
   */
  shopDetail: function (e) {
    wx.navigateTo({
      url: `../shop_goods_detail/index?product_code=${e.currentTarget.dataset.item}`
    })
  },
  /**
   * 编辑车辆
   * dzl
   */
  editCar: function () {
    wx.navigateTo({
      url: '../my_car/index',
    });

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let model = decodeURIComponent(options.id)
   let id = JSON.parse(model).id
   wx.setNavigationBarTitle({
     title:JSON.parse(model).name
   })
   this.setData({
     goodsType:id
   })
    this.selectGoodsList({goodsType:id})
  },
  /**
   * 列表
   */
  selectGoodsList: function (model) {
    request.selectGoodsList(model).then(res=>{
      this.setData({
        storeList:res.data.tableData
      })
      console.log(res,'res')
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