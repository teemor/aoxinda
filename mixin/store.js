              
  import {
    store
  } from '../../common/api/clean_api'
  const request = new store
  module.exports = {
    findShopList:function(longitude,latitude){
        request.findShopList({log:longitude,lat:latitude,type:1,pageSize:5,pageIndex:1,actDetId:''}).then(res=>{
            that.setData({
              CleanStore:res.data
            })
          })
    }
}