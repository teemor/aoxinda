Page({
  data: {
      searchLetter:  ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "W", "X", "Y", "Z"],
      showLetter: "",
      winHeight: 0,
      tHeight: 0,
      bHeight: 0,
      startPageY: 0,
      cityList: [],
      isShowLetter: false,
      scrollTop: 0,
      city: "",
      cityArr: [],
      src: './dw.png'
  },
  onLoad: function onLoad(options) {
      //历史选择，应该在缓存中记录，或者在在app中全局记录
      //当前城市通过之前的页面穿过来或者调用定位
      var c = '北京';
      var cityArr = ['上海', '北京'];
      this.setData({
          cityArr: cityArr,
          city: c
      });
      // 生命周期函数--监听页面加载
      var searchLetter = city.searchLetter;
      var cityList = city.cityList();
      // console.log(cityInfo);

      var sysInfo = wx.getSystemInfoSync();
      console.log(sysInfo);
      var winHeight = sysInfo.windowHeight;

      //添加要匹配的字母范围值
      //1、更加屏幕高度设置子元素的高度
      var itemH = (winHeight - 50) / searchLetter.length;
      var tempObj = [];
      for (var i = 0; i < searchLetter.length; i++) {
          var temp = {};
          temp.name = searchLetter[i];
          temp.tHeight = i * itemH;
          temp.bHeight = (i + 1) * itemH;

          tempObj.push(temp);
      }

      this.setData({
          winHeight: winHeight,
          itemH: itemH,
          searchLetter: tempObj,
          cityList: cityList
      });

      console.log(this.data.cityInfo);
  },
  searchStart: function searchStart(e) {
      var showLetter = e.currentTarget.dataset.letter;
      var pageY = e.touches[0].pageY;
      this.setScrollTop(this, showLetter);
      this.nowLetter(pageY, this);
      this.setData({
          showLetter: showLetter,
          startPageY: pageY,
          isShowLetter: true
      });
  },
  searchMove: function searchMove(e) {
      var pageY = e.touches[0].pageY;
      var startPageY = this.data.startPageY;
      var tHeight = this.data.tHeight;
      var bHeight = this.data.bHeight;
      var showLetter = 0;
      console.log(pageY);
      if (startPageY - pageY > 0) {
          //向上移动
          if (pageY < tHeight) {
              // showLetter=this.mateLetter(pageY,this);
              this.nowLetter(pageY, this);
          }
      } else {
          //向下移动
          if (pageY > bHeight) {
              // showLetter=this.mateLetter(pageY,this);
              this.nowLetter(pageY, this);
          }
      }
  },
  searchEnd: function searchEnd(e) {
      // console.log(e);
      // var showLetter=e.currentTarget.dataset.letter;
      var that = this;
      setTimeout(function () {
          that.setData({
              isShowLetter: false
          });
      }, 1000);
  },
  nowLetter: function nowLetter(pageY, that) {
      //当前选中的信息
      var letterData = this.data.searchLetter;
      var bHeight = 0;
      var tHeight = 0;
      var showLetter = "";
      for (var i = 0; i < letterData.length; i++) {
          if (letterData[i].tHeight <= pageY && pageY <= letterData[i].bHeight) {
              bHeight = letterData[i].bHeight;
              tHeight = letterData[i].tHeight;
              showLetter = letterData[i].name;
              break;
          }
      }

      this.setScrollTop(that, showLetter);

      that.setData({
          bHeight: bHeight,
          tHeight: tHeight,
          showLetter: showLetter,
          startPageY: pageY
      });
  },
  bindScroll: function bindScroll(e) {
      console.log(e.detail);
  },
  setScrollTop: function setScrollTop(that, showLetter) {
      var scrollTop = 0;
      var cityList = that.data.cityList;
      var cityCount = 0;
      var initialCount = 0;
      for (var i = 0; i < cityList.length; i++) {
          if (showLetter == cityList[i].initial) {
              scrollTop = initialCount * 30 + cityCount * 41;
              break;
          } else {
              initialCount++;
              cityCount += cityList[i].cityInfo.length;
          }
      }
      that.setData({
          scrollTop: scrollTop - 1558
      });
  },
  bindCity: function bindCity(e) {
      var city = e.currentTarget.dataset.city;
      this.setData({ city: city });
  },
  wxSortPickerViewItemTap: function wxSortPickerViewItemTap(e) {
      var city = e.target.dataset.text;
      //可以跳转了
      console.log('选择了城市：', city);
  },
  cxgps: function cxgps(e) {
      var that = this;
      wx.getLocation({
          type: 'wgs84',
          success: function success(res) {
              var latitude = res.latitude;
              var longitude = res.longitude;
              ajaxGes(latitude, longitude).then(function (data) {
                  if (data.status === 'success') {
                      that.setData({});
                  } else {
                      that.setData({
                          city: '定位失败'
                      });
                  }
              });
          },
          fail: function fail(res) {
              that.setData({
                  city: '定位失败'
              });
          }
      });
  }
});