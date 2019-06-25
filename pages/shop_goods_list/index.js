import { Technician } from '../../common/api/api'
const request = new Technician
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checked: true,
    desc:true,
    list: [1, 3, 4, 6],
    sortShow:false,
    brandType:[],
    sortType: [{ name: '销量', id: '1' }, { name: '价格', id: '2' },{name:'筛选',id:'3'}]
  },
  startPrice:function(e){
    this.setData({
      startPrice:e.detail.value
    })
  },
  clear:function(){
    this.setData({
      endPrice:'',
      startPrice:''      
    })
  },
  saveSort:function(){
    this.selectGoodsList({ goods_brand:this.data.goods_brand,start_price:this.data.startPrice,end_price:this.data.endPrice,goodsType: this.data.goodsType, sailNum: 'sailNum', sorting: this.data.desc?'desc':'asc', goodsName: this.data.goodsName})
    this.setData({
      sortShow:false
    })
  },
  endPrice:function(e){
    this.setData({
      endPrice:e.detail.value
    })
    console.log(e,'end')
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
      brandType:child,
      goods_brand:e.currentTarget.dataset.item
    })

    console.log(e,'是我')
  },
  closeMask:function(){
    this.setData({
      sortShow:false
    })
  },
  addSort:function(e){
    if(e.currentTarget.dataset.item.name==="销量"){
      this.selectGoodsList({ goodsType: this.data.goodsType, sailNum: 'sailNum', sorting: this.data.desc?'desc':'asc', goodsName: this.data.goodsName})
    }else if(e.currentTarget.dataset.item.name==='价格'){
      this.setData({
        desc:!this.data.desc
      })
      this.selectGoodsList({ goodsType: this.data.goodsType, goodsPrice: 'goodsPrice', sorting: this.data.desc?'asc':'desc', goodsName: this.data.goodsName})

    }else{
      this.setData({
        sortShow:!this.data.sortShow
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
   * 添加爱车
   */
  addCar:function(){
    wx.navigateTo({
      url: '../../pages/add_car/index'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      carType: app.globalData.carType
    })
    console.log(app)
    let model = decodeURIComponent(options.id)
    let id = JSON.parse(model).id
    let goods_name = JSON.parse(model).goodsName || ""
    wx.setNavigationBarTitle({
      title: JSON.parse(model).name
    })
    this.setData({
      goodsType: id,
      goodsName: goods_name,
      car_type: this.data.carType.LevelID
    })
    this.selectGoodsList({ goodsType: id, goodsName: goods_name, car_type: this.data.car_type })
  },
  /**
   * 列表
   */
  selectGoodsList: function (model) {
    request.selectGoodsList(model).then(res=>{
      if (res.data) {
        this.setData({
          storeList: res.data.tableData,
          brandType: res.brandData
        })
      } else {
        this.setData({
          storeList: [],
          brandType: []
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

  },
  //是否推荐车相关
  onChange(event) {
    this.setData({
      checked: event.detail
    });
    if (event.detail) {
      this.selectGoodsList({ goodsType: this.data.goodsType, goodsName: this.data.goodsName, car_type: this.data.car_type })
    } else {
      this.selectGoodsList({ goodsType: this.data.goodsType, goodsName: this.data.goodsName })
    }
  }
})