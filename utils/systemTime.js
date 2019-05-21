
// 系统时间
function SystemTime(day) {
  //  获取当前系统时间
  var timestamp = Date.parse(day ? new Date(day) : new Date());
  timestamp = timestamp / 1000;
  var n = timestamp * 1000;
  var date = new Date(n);
  var Y = date.getFullYear(); //年
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);//月
  var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();  //日
  var dateSys = Y + '-' + M + '-' + D;//当前系统日期

  // 当前日期+1天
  var tomorrow_timetamp = timestamp + 24 * 60 * 60;//加一天的时间戳：
  var n_to = tomorrow_timetamp * 1000; //加一天的时间：
  var tomorrow_date = new Date(n_to);//加一天后的年份
  var Y_tomorrow = tomorrow_date.getFullYear();//加一天后的月份
  var M_tomorrow = (tomorrow_date.getMonth() + 1 < 10 ? '0' + (tomorrow_date.getMonth() + 1) : tomorrow_date.getMonth() + 1);//加一天后的日期
  var D_tomorrow = tomorrow_date.getDate() < 10 ? '0' + tomorrow_date.getDate() : tomorrow_date.getDate();
  var tom_Date = Y_tomorrow + '-' + M_tomorrow + '-' + D_tomorrow;//当前系统日期+1
  // 当前日期+2天
  var tomorrow_timetamp = timestamp + 48 * 60 * 60;//加一天的时间戳：
  var n_to = tomorrow_timetamp * 1000; //加一天的时间：
  var tomorrow_date = new Date(n_to);//加一天后的年份
  var YAF_tomorrow = tomorrow_date.getFullYear();//加一天后的月份
  var MAF_tomorrow = (tomorrow_date.getMonth() + 1 < 10 ? '0' + (tomorrow_date.getMonth() + 1) : tomorrow_date.getMonth() + 1);//加一天后的日期
  var DAF_tomorrow = tomorrow_date.getDate() < 10 ? '0' + tomorrow_date.getDate() : tomorrow_date.getDate();
  var tomAfter_Date = YAF_tomorrow + '-' + MAF_tomorrow + '-' + DAF_tomorrow;//当前系统日期+2
  return {
    dateSys: dateSys,
    tom_Date: tom_Date,
    tomAfter_Date: tomAfter_Date
  }
}
module.exports = { SystemTime: SystemTime };