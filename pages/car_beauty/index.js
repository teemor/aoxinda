import {Technician} from '../../common/api/api'
const request = new Technician
Page({
  data: {
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    previousMargin: 0,
    nextMargin: 0,
  },
  /**
   * 洗车
   * dzl
   */
  cleanBtn: function(e) {
    this.setData({
      num:e.currentTarget.dataset.num
    })
  },
  /**
   * 内饰清洗
   * dzl
   */
  trimBtn: function(e) {
    this.setData({
      num:e.currentTarget.dataset.num
    })
  },
  /**
   * 镀晶
   * dzl
   */
  skinBtn: function(e) {
    this.setData({
      num:e.currentTarget.dataset.num
    })
  },
  /**
   * 销量
   * dzl
   */
  sortsaleBtn:function(e){
    this.setData({
      sort:e.currentTarget.dataset.sort
    })
  },
   /**
   * 距离
   * dzl
   */
  sortfarBtn:function(e){
    this.setData({
      sort:e.currentTarget.dataset.sort
    })
  },
  /**
   * 购买
   * dzl
   */
  carbeautyBtn:function(item){
    let that =this
    request.findStore(item.detail.id).then(res=>{
      wx.navigateTo({
        url: `../car_beauty_shop/index?id=${JSON.stringify(res[0])}`,
      })
    })
    
  },
  onLoad: function(options) {
    wx.getSetting({
      success:(res)=>{
       console.log(res.authSetting,'res')
       if(res.authSetting['scope.userLocation']!=true){
         wx.showModal({
           title:'是否授权当前位置',
           content:'需要获取您的地理位置，请确认授权，否则地图功能将无法使用',
           success:function(res){
            if(res.cancel){
              console.info('授权失败')
            }else if(res.confirm){
              wx.openSetting({
                success:function(data){
                  if(data.authSetting['scope.userLocation']==true){
                    wx.showToast({
                      title:'授权成功',
                      icon:'success',
                      duration:3000
                    })
                  }else{
                    wx.showToast({
                      title:'授权失败',
                      icon:'success',
                      duration:5000
                    })
                  }
                }
              })
            }
           }
         })
       }
      }
    })
    let that = this
    wx.getLocation({
      type:'wgs84',
      success:function(res){
        let lat = res.latitude
        let long = res.longitude
        request.findallStore(lat,long).then(res=>{
          that.setData({
            stores:res
          })
        })
      }
    })
  },
  onReady: function() {

  },
  onShow: function() {

  },
  onHide: function() {

  },
  onUnload: function() {

  },
  onPullDownRefresh: function() {

  },
  onReachBottom: function() {

  },
  onShareAppMessage: function() {

  }
})