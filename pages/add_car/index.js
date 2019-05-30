import {
  Technician
} from '../../common/api/api'
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
    bHeight: 0,
    winHeight:0,
    isShowLetter: false,
    http: 'https://www.maichefu.cn',
    showTypeBrand: true,
    choose_brand: false,
    choose_type: false,
    choose_detail: false,
    carList: [],
    carBrand: [],
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
    request.findCarType().then(res => {
      this.setData({
        carList: res.data
      })
      let sysInfo = wx.getSystemInfoSync();
      let winHeight = sysInfo.windowHeight;
      let searchLetter = this.data.searchLetter 
      // 添加屏幕高度设置子元素的高度
      let itemH = (winHeight-50)/searchLetter.length
      let tempObj = [];
      for(let i=0;i<searchLetter.length;i++){
        let temp = {};
        temp.name = searchLetter[i];
        temp.tHeight = i*itemH;
        temp.bHeight = (i+1)*itemH;
        tempObj.push(temp)
      }
      this.setData({
        winHeight:winHeight,
        searchLetter:tempObj,
        carData: this.carData()
      })
    })
  },
  /**
   * 滚动事件
   * @param {*} e 
   */
  bindScroll: function (e) {

  },
  /**
   * 点击大写字母
   * author dzl
   */
  searchStart: function (e) {
    let showLetter = e.currentTarget.dataset.letter
    this.setData({
      showLetter: showLetter,
      isShowLetter: true
    })
    // this.setScrollTop(showLetter)
  },
  /**
   * 跳转当前选中的信息
   */
  nowLetter: function (pageY, that) {
    // 当前选中的信息
    let letterData = this.data.carList;
    let bHeight = 0;
    let tHeight = 0;
    let showLetter = "";
    for (let i = 0; i < letterData.length; i++) {
      if (letterData[i].length <= pageY && pageY <= letterData[i].bHeight) {
        bHeight = letterData[i].bHeight;
        tHeight = letterData[i].tHeight;
        showLetter = letterData[i].name;
        break;
      }
    }
  that.setData({
    bHeight:bHeight,
    tHeight:tHeight,
    showLetter:showLetter,
    startPageY:pageY
  })
  },
  /**
   * 移动
   */
  searchMove:function(){
    console.log('rew')
  },
  /**
   * 结束点击
   * dzl
   */
  searchEnd: function (e) {
    let that = this
    setTimeout(function () {
      that.setData({
        isShowLetter: false
      })
    }, 1000)
  },

  /**
   * 选择品牌
   * author dzl
   */
  chooseBrand: function (e) {
    this.setData({
      BrandTitle:e.currentTarget.dataset.id
    })
    console.log(this.data.BrandTitle,'BrandTitle')
    request.findCars({PP:e.currentTarget.dataset.id}).then(res => {
      this.setData({
        carBrand: res.data
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
  clickMask: function () {
    console.log('关闭弹窗')
    this.setData({
      choose_brand: false
    })
  },
  /**
   * 选择类别
   * author dzl
   */
  chooseType: function (e) {
    console.log(e.detail,'选择类别')
    // this.setData({
    //   tabType: e.detail
    // })
    // 年份的跳转
    this.setData({
      choose_type:true
    })
    console.log('hhh')
    request.findCarThird({PP:e.detail.PP,CX:e.detail.CX
    }).then(res => {
      if (res.data.length > 0) {
        this.setData({
          carYear: res,
          choose_brand: false,
          choose_type: true,
          showTypeBrand: false,
          carTypeData: res.data
        })
      } else {
        this.setData({
          choose_type: false
        })
      }
      // request.findModel(e.detail, this.data.carYear[0].year).then(res => {
      //   console.log(res)
      //   this.setData({
          
      //   })
      //   console.log(this.data.carTypeData, 'di')
      // })
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
  tabYear: function (e) {
    this.setData({
      year: e.detail
    })
    console.log(this.data.year)
    request.findModel(this.data.tabType, e.detail).then(res => {
      this.setData({
        carTypeData: res
      })
      console.log(this.data.carTypeData, 'didi')
    })
  },
  /**
   * 进入详情
   * dzl
   */
  detailBtn: function (e) {
    let currentPages =  getCurrentPages();
      let prevPage = currentPages[currentPages.length-2];
      prevPage.setData({
        item:e.detail
      })
        wx.navigateBack({
          url: '1'
        })
    // request.findConfig(e.detail).then(res => {
    //   console.log(res[0])
    //   // this.setData({
    //   //   choose_type: false,
    //   //   choose_detail: true,

    //   //   detailData:res[0]
    //   // })
    //   let detailData = JSON.stringify(res[0])
    //   wx.navigateTo({
    //     url: `../add_car_detail/index?detailData=${detailData}`
    //   })
    // })


  },
  /**
   * 退出详情
   * dzl
   */
  // exitDetail: function () {
  //   this.setData({
  //     choose_type: !this.data.choose_type,
  //     choose_detail: !this.data.choose_detail
  //   })
  // },
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
      let firstCode = this.data.searchLetter[i];
      let carInfo = [];
      let tempArr = {};
      tempArr.firstCode = firstCode;
      for (let j = 0; j < this.data.carList.length; j++) {
        if (firstCode == this.data.carList[j].firstCode) {
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