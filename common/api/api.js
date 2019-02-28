/**
 * 数据接口文件
 * -@author dzl
 */
import {
  HttpServer
} from "../../utils/method"
const http = new HttpServer()
export const IP_HTTP = `https://192.168.31.156:8081`
export const IP_DHTTP = `https://192.168.31.75:8081`
export const HTTP = `https://www.maichefu.cn`
export class Technician {
  // 登录
  login = (code) => {
    return http.httpRequest({
      url: `${HTTP}/user/loginByWx?code=${code}`,
      method: `get`
    })
  }
  // 添加我的爱车
  // 品牌
  findBrand = () => {
    return http.httpRequest({
      url: `${HTTP}/service/findBrand`,
      method: `get`
    })
  }
  // 车型
  findSerial = (id) => {
    return http.httpRequest({
      url: `${HTTP}/service/findSerial?pid=${id}`,
      method: `get`
    })
  }
  // 年份字典表
  findYear = (id) => {
    return http.httpRequest({
      url: `${HTTP}/service/findYear?id=${id}`,
      method: `get`
    })
  }
  // 根据年份和品牌查车型
  findModel = (pid, year) => {
    return http.httpRequest({
      url: `${HTTP}/service/findModel?pid=${pid}&year=${year}`,
      method: `get`
    })
  }
  // 配置
  findConfig = (id) => {
    return http.httpRequest({
      url: `${HTTP}/service/findConfig?id=${id}`,
      method: `get`
    })
  }
  // 洗车美容
  // 查询全部门店
  findallStore = (lat, lng) => {
    return http.httpRequest({
      url: `${HTTP}/bstore/findAll?lat=${lat}&lng=${lng}`
    })
  }
  // 门店字典表
  findcodeType = () => {
    return http.httpRequest({
      url: `${HTTP}/sysDic/findSysDic?codeType=CODE_CAR_WASH`
    })
  }
  // 洗车购买
  payCard = (code,washNum,waxNum,price) =>{
    return http.httpRequest({
      url: `${HTTP}/carWash/payCard?code=${code}&washNum=${washNum}&waxNum=${waxNum}&price=${price}`
    })
  }
  // 查询门店详情
  findStore = (id)=>{
    return http.httpRequest({
      url: `${HTTP}/bstore/findStore?id=${id}`
    })
  }
}


// "tabBar": {
//   "color": "#959595",
//     "selectedColor": "#413e3e",
//       "backgroundColor": "#fff",
//         "position": "bottom",
//           "list": [
//             {
//               "pagePath": "pages/index/index",
//               "iconPath": "common/image/tab/index.png",
//               "selectedIconPath": "common/image/tab/index_after.png",
//               "text": "首页"
//             },
//             {
//               "pagePath": "pages/shopping_mall/index",
//               "iconPath": "common/image/tab/shop.png",
//               "selectedIconPath": "common/image/tab/shop_after.png",
//               "text": "商城"
//             },
//             {
//               "pagePath": "pages/message/index",
//               "iconPath": "common/image/tab/mes.png",
//               "selectedIconPath": "common/image/tab/mes_after.png",
//               "text": "消息"
//             },
//             {
//               "pagePath": "pages/mine/index",
//               "iconPath": "common/image/tab/mine.png",
//               "selectedIconPath": "common/image/tab/mine_after.png",
//               "text": "我的"
//             }
//           ]
// }