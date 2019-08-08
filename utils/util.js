const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
// 管理全局路由
export const setRouterConfig = (config, path) => {
  config.forEach((item) => {
    item.active = item.pagePath === path ? true : false
  })
  return config
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
function getLocation(callback){
  wx.getLocation({
    success:function(res){
      callback(true,res.latitude,res.longitude)
    },
    fail:function(){
      callback(false)
    }
  })
}
module.exports = {
  formatTime: formatTime
}
