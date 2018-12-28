import {Technician} from '../../common/api/api'
const request = new Technician
Page({
  /**
   *  房源列表
   * - @author           dzl
   * choose_brand    品牌
   * choose_type 哪款
   * choose_detail 详情
   * carTypeData 年份字典表
   */
  data: {
    showTypeBrand: true,
    choose_brand: false,
    choose_type: false,
    choose_detail: false,
    carList:[],
    carBrand:[],
    carTypeData:[],
    activeIndex: "1",
    hotbrandList: [{
      name: '阿斯顿·马丁'
    },
    {
      name: '大众'
    },
    {
      name: '雪佛兰'
    },
    {
      name: '大众'
    },
    {
      name: '大众'
    },
    {
      name: '大众'
    },

    {
      name: '大众'
    },
    {
      name: '大众'
    },
    {
      name: '大众'
    },
    {
      name: '大众'
    }
    ],
    tabData: [{
      name: '手动添加',
      key: '1'
    }, {
      name: '扫描行车本',
      key: '2'
    }],
    searchLetter: ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "W", "X", "Y", "Z"]
  },
  onLoad: function (options) {
    request.findBrand().then(res=>{
      this.setData({
        carList:res
      })
      this.setData({
        carData: this.carData()
      })
    })
  },
  /**
   * 点击大写字母
   * author dzl
   */
  searchStart: function (e) {
    let showLetter = e.currentTarget.dataset
    console.log(e.touches[0].pageY, 'pageY')
    this.setScrollTop(showLetter)
  },
  /**
   * 滚动定位
   * author dzl
   */
  setScrollTop: function (showLetter) {
    let scrollTop = 0
  },
  /**
   * 选择品牌
   * author dzl
   */
  chooseBrand: function (e) {
    request.findSerial(e.currentTarget.dataset.id).then(res=>{
      this.setData({
        carBrand:res
      })
    })
    this.setData({
      choose_brand: true,
      choose_type: false
    })
  },
  /**
   * 
   */
  clickMask:function(){
    this.setData({
      choose_brand:false
    })
  },
  /**
   * 选择类别
   * author dzl
   */
  chooseType: function (e) {
    this.setData({
      tabType:e.detail
    })
    request.findYear(e.detail).then(res=>{
      this.setData({
        carYear:res,
        choose_brand: false,
        choose_type: true,
        showTypeBrand: false
      })
      request.findModel(e.detail,this.data.carYear[0].year).then(res=>{
        this.setData({
          carTypeData:res
        })
      })
    })
  
   
  },
  /**
   * 退出类别
   * author dzl
   */
  exitType: function () {
    this.setData({
      choose_type: !this.data.choose_type,
      choose_brand: !this.data.choose_brand,
      showTypeBrand: !this.data.showTypeBrand
    })
  },
  /**
   * 切换年份
   * dzl
   */
  tabYear:function(e){
    this.setData({
      year:e.detail
    })
    request.findModel(this.data.tabType,e.detail).then(res=>{
      this.setData({
        carTypeData:res
      })
    })
  },
  /**
   * 进入详情
   * dzl
   */
  detailBtn: function (e) {
    request.findConfig(e.detail).then(res=>{
      this.setData({
        choose_type: false,
        choose_detail: true,
        detailData:res[0]
      })
    })
  },
  /**
   * 退出详情
   * dzl
   */
  exitDetail: function () {
    this.setData({
      choose_type: !this.data.choose_type,
      choose_detail: !this.data.choose_detail
    })
  },
  /**
   * 扫描行车本
   * author dzl
   */
  btnScan: function () {
    wx.navigateTo({
      url: '../car_photo/index',
    })
  },
  /**
   * 对城市信息进行分组
   * author dzl
   */
  carData: function () {
    let temObj = [];
    for (let i = 0; i < this.data.searchLetter.length; i++) {
      let initial = this.data.searchLetter[i];
      let carInfo = [];
      let tempArr = {};
      tempArr.initial = initial;
      for (let j = 0; j < this.data.carList.length; j++) {
        if (initial == this.data.carList[j].initial) {
          carInfo.push(this.data.carList[j]);
        }
      }
      tempArr.carInfo = carInfo;
      temObj.push(tempArr);
    }
    return temObj;
  },
  /**
   * tab页切换
   * author dzl
   */
  tabchange: function (e) {
    this.setData({
      activeIndex: e.detail
    })
  }
})