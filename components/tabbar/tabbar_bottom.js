const app = getApp();
Component({
  data:{
    tabbarConfig: app.tabbarConfig
  },
  /**
  *  tab切换
  * - @author           狄兆璐
  * - @date             2018-07-02
  *  tabbarConfig   tab数据
  */
  properties: {
  },
  methods: {
    onChange:function(e){
      wx.switchTab({
        url: this.data.tabbarConfig[e.detail],
      })
    }
  }
})
