import {
  carList,
  carBrand,
  carTypeData
} from '../../common/static/api_data'
Page({
  /**
   *  房源列表
   * - @author           dzl
   * choose_brand    品牌
   * choose_type 哪款
   * choose_detail 详情
   */
  data: {
    showTypeBrand: true,
    choose_brand: false,
    choose_type: false,
    choose_detail: false,
    carList,
    carBrand,
    carTypeData,
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
    this.setData({
      carData: this.carData()
    })
  },
  /**
   * 选择品牌
   * author dzl
   */
  chooseBrand: function () {
    this.setData({
      choose_brand: true,
      choose_type: false
    })
  },
  /**
   * 选择类别
   * author dzl
   */
  chooseType: function () {
    this.setData({
      choose_brand: false,
      choose_type: true,
      showTypeBrand: false
    })
  },
  /**
   * 进入详情
   * dzl
   */
  detailBtn: function () {
    this.setData({
      choose_type:false,
      choose_detail:true
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
      for (let j = 0; j < carList.length; j++) {
        if (initial == carList[j].initial) {
          carInfo.push(carList[j]);
        }
      }
      tempArr.carInfo = carInfo;
      temObj.push(tempArr);
    }
    console.log(temObj, 'hehe')
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