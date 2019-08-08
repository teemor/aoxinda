const app = getApp();
Component({
  data: {
    tabbarConfig: app.tabbarConfig,
    active: 0
  },
  /**
   *  tab切换
   * - @author           狄兆璐
   * - @date             2018-07-02
   *  tabbarConfig   tab数据
   */
  properties: {},
  methods: {
    onChange: function(e) {
      this.setData({
        active: e.detail
      })
      console.log(this.data.active, 'active123')
      console.log(this.data.tabbarConfig[e.detail], '????')
      wx.switchTab({
        url: `../../${this.data.tabbarConfig[e.detail].pagePath}`,
      })
      console.log(e, 'e')
    },
    init: function() {
      console.log(this.data.tabbarConfig,'tabbar')
      const page = getCurrentPages().pop();
      this.setData({
        active: this.data.tabbarConfig.findIndex(item=>
          item.pagePath===`${page.route}`
        )
      })
      console.log(this.data.active,'nicaicai')
    }
  }
})