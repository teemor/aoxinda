import {
  store
} from '../common/api/clean_api'
const request = new store
const app = getApp();
module.exports = Behavior({
  behaviors: [],
  properties: {
    myBehaviorProperty: {
      type: String
    }
  },
  data: {
    car: false,
    myBehaviorData: {}
  },
  attached: function() {},
  methods: {
    findShopList: function(actCardType,serDictId,shopName,actCarCode,actId) {
      console.log(actCardType,'actCardType')
      request.findShopList({
        log: app.globalData.longitude,
        lat: app.globalData.latitude,
        actCardType:actCardType,
        serDictId:serDictId?serDictId:'',
        shopName:shopName?shopName:'',
        actCarCode:actCarCode?actCarCode:'',
        actId:actId,
        // type: 1,
        pageSize: 5,
        pageIndex: 1,
        // actId:''
      }).then(res => {
        this.setData({
          CleanStore: res.data
        })
      })
    },
    /**
   * 查询车型
   * @param {} options 
   */
    closeCar:function(){
      
    },
    edit: function() {
      console.log('haha')
    },
    myBehaviorMethod: function() {
      console.log('log from my-behavior.js')
    }
  }
})