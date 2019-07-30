  
  const app = getApp();
  import {
    Technician
  } from '../common/api/api'
  const request = new Technician
  module.exports = {
    /**
   * 商品跳转页面
   * @param {*} options 
   */
  shopList: function(e) {
    console.log(e)
    let model = encodeURIComponent(JSON.stringify(e.currentTarget.dataset.item))
    wx.navigateTo({
      url: `../shop_goods_list/index?id=${model}`
    });
  },
  }
