import {
  Technician
} from '../common/api/api.js'
const request = new Technician
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