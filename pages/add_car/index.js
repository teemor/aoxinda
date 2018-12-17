import {
  carList
} from '../../common/static/api_data'
Page({
  data: {
    carList,
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
  onLoad: function(options) {
    this.setData({
      carData: this.carData()
    })
  },
  /**
   * 对城市信息进行分组
   * author dzl
   */
  carData: function() {
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
  tabchange: function(e) {
    this.setData({
      activeIndex: e.detail
    })
  }
})