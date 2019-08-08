const app = getApp()

module.exports = {
  /**
   * 隐藏头部导航栏，导航切换
   * - @author           狄兆璐
   * - @date             2018-07-02
   */
  data: {
    page: 1,
    size: 5,
    tabbarConfig: app.tabbarConfig,
    isHideTabbar: app.isHideTabbar
  },
  /**
   * 隐藏导航栏
   */
  hideNavBar() {
    // 隐藏导航栏dzl
    wx.hideTabBar({
      success: () => {
        // 设置是否隐藏导航栏属性
        app.isHideTabbar = true
        // 数据跟新
        this.setData({
          isHideTabbar: app.isHideTabbar
        })
      }
    })
    // 获取当前路由dzl
    let path = this.route
    this.setData({
      tabbarConfig: app.setRouterConfig(app.tabbarConfig, path)
    })
  }
}