
/**
 * 数据接口文件
 * -@author dzl
 */
import {
  HttpServer
} from "../../utils/method"
const http = new HttpServer()
export const IP_HTTP = `https://192.168.31.156:8081`
export const IP_DHTTP = `https://192.168.31.76`
export const IP_YTHTTP = `http://192.168.31.75:9015`
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
  //第一次进小程序授权
  loginByWx = (code, iv, encryptedData) => {
    return http.httpRequest({
      url: `${HTTP}/user/loginByWx?code=${code}&iv=${iv}&encryptedData=${encryptedData}`
    })
  }
  // 添加爱车详情页
  addCarService = (id, code) => {
    return http.httpRequest({
      url: `${HTTP}/addCarService/manual?modelid=${id}&code=${code}`
    })
  }
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
  /**
   * lat 经度
   * lag 纬度
   * sorttype 1销量 2距离
   * scope洗车1,内饰清洗2,镀晶3
   */
  findallStore = (lat, lng, sorttype, scope) => {
    return http.httpRequest({
      url: `${HTTP}/bstore/findAll?lat=${lat}&lng=${lng}&sorttype=${sorttype}&scope=${scope}`
    })
  }
  // 门店字典表
  findcodeType = () => {
    return http.httpRequest({
      url: `${HTTP}/sysDic/findSysDic?codeType=CODE_CAR_WASH`
    })
  }
  // 洗车购买
  payCard = (code, washNum, waxNum, price) => {
    return http.httpRequest({
      url: `${HTTP}/carWash/payCard?code=${code}&washNum=${washNum}&waxNum=${waxNum}&price=${price}`
    })
  }
  // 查询门店详情
  findStore = (id) => {
    return http.httpRequest({
      url: `${HTTP}/bstore/findStore?id=${id}`
    })
  }
  // 增加会员卡信息
  addCarWash = () => {
    return http.httpRequest({
      url: `${HTTP}/carWash/addCarWash`
    })
  }
  // 会员卡消减
  updateCarWash = () => {
    return http.httpRequest({
      url: `${HTTP}/carWash/updateCarWash`
    })
  }
  // 查询自己的会员卡
  findMyCarNumCard = (id) => {
    return http.httpRequest({
      url: `${HTTP}/carWash/findMyCarNumCard?userId=${id}`
    })
  }
  // 商城
  // 获取所有分类信息
  selectGoodsType = (model) => {
    return http.httpRequest({
      url: `${IP_YTHTTP}/appapi/v1.0/parameter/selectGoodsType`,
      method: 'post',
      data: model
    })
  }
  // 根据分类查询商品信息
  selectGoodsList = (model) => {
    return http.httpRequest({
      url: `${IP_YTHTTP}/appapi/v1.0/product/app/selectGoodsList`,
      data: model,
      method: 'post'
    })
  }
  //商品详情
  goodsDetail = (model) => {
    return http.httpRequest({
      url: `${IP_YTHTTP}/appapi/v1.0/product/app/editGoods`,
      data: model,
      method: 'post'
    })
  }
  // 商品添加购物车
  toCart = (model) => {
    return http.httpRequest({
      url: `${IP_YTHTTP}/appapi/v1.0/cart/toCart`,
      data: model,
      method: `post`
    })
  }
  // 查询该用户的购物车列表
  selectCartList = (model) => {
    return http.httpRequest({
      url: `${IP_YTHTTP}/appapi/v1.0/cart/selectCartList`,
      data: model,
      method: `post`
    })
  }
  // 更新购物车数量
  updateCart = (model) => {
    return http.httpRequest({
      url: `${IP_YTHTTP}/appapi/v1.0/cart/updateCart`,
      data: model,
      method: `post`
    })
  }
  // 查詢地址列表
  selectAddressList = (model) => {
    return http.httpRequest({
      url: `${IP_YTHTTP}/appapi/v1.0/address/selectAddressList`,
      method: `post`,
      data: model
    })
  }
  // 新增地址
  saveAddress = (model) => {
    return http.httpRequest({
      url: `${IP_YTHTTP}/appapi/v1.0/address/saveAddress`,
      data: model,
      method: `post`
    })
  }
  // 編輯地址
  updateAddress = (model) => {
    return http.httpRequest({
      url: `${IP_YTHTTP}/appapi/v1.0/address/updateAddress`,
      data: model,
      method: `post`
    })
  }
  // 刪除地址
  deleteAddress = (model) => {
    return http.httpRequest({
      url: `${IP_YTHTTP}/appapi/v1.0/address/updateAddress`,
      data: model,
      method: `post`
    })
  }
  // 填写订单
  writeOrder = (model) => {
    return http.httpRequest({
      url: `${IP_YTHTTP}/appapi/v1.0/order/writeOrder`,
      data: model,
      method: `post`
    })
  }
  // 查询订单列表
  selectMyOrder = () => {
    return http.httpRequest({
      url: `${IP_YTHTTP}/appapi/v1.0/order/selectMyOrder`,
      method: `post`
    })
  }
  // 查询订单详情
  selectOrderDetail = (id) => {
    return http.httpRequest({
      url: `${IP_YTHTTP}/appapi/v1.0/order/app/selectOrderDetail`,
      method: `post`,
      data:id
    })
  }
  // 查询发票信息
  selectInvoice = (id) => {
    return http.httpRequest({
      url: `${IP_YTHTTP}/appapi/v1.0/invoice/selectInvoice`,
      method: `post`,
      data: id
    })
  }
  // 新增发票信息
  saveInvoice = (model) => {
    return http.httpRequest({
      url: `${IP_YTHTTP}/appapi/v1.0/invoice/saveInvoice`,
      method: `post`,
      data: model
    })
  }
  // 更新发票信息
  updateInvoice = (model) => {
    return http.httpRequest({
      url: `${IP_YTHTTP}/appapi/v1.0/invoice/updateInvoice`,
      method: `post`,
      data: model
    })
  }
  // 提交订单
  payOrder = (model)=>{
    return http.httpRequest({
      url:`${IP_YTHTTP}/appapi/v1.0/pay`,
      method:`post`,
      data:model
    })
  }
  selectMyBackOrderList=(model)=>{
    return http.httpRequest({
      url:`${IP_YTHTTP}/appapi/v1.0/backOrder/selectMyBackOrderList`,
      method:`post`,
      data:model
    })
  }
  writeBackOrder=(model)=>{
    return http.httpRequest({
      url:`${IP_YTHTTP}/appapi/v1.0/backOrder/writeBackOrder`,
      method:`post`,
      data:model
    })
  }
  selectBackOrderDetail = (model)=>{
    return http.httpRequest({
      url:`${IP_YTHTTP}/appapi/v1.0/backOrder/selectBackOrderDetail`,
      method:`post`,
      data:model
    })
  }
  updateBackOrder = (model)=>{
    return http.httpRequest({
      url:`${IP_YTHTTP}/appapi/v1.0/backOrder/updateBackOrder`,
      method:`post`,
      data:model
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

