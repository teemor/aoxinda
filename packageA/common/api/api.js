import {
  HttpServer
} from "../../../utils/method"
const http = new HttpServer()
export const IP_YXHTTP = `http://192.168.31.158:9015/wash/v1.0` //前三
export const IP_MYHTTP = `http://192.168.31.186:9015/wash/v1.0`
export class store {
  // 获取门店详情
  findShopDet = (id) => {
    return http.httpRequest({
      url: `${IP_YXHTTP}/findShopDet`,
      method: `post`,
      data: id
    })
  }
  // 卡牌或者单次洗车购买详情
  findPayType = (model) => {
    return http.httpRequest({
      url: `${IP_YXHTTP}/findPayType`,
      method: `post`,
      data: model
    })
  }
  // 加入购物车
  addCart = (model) => {
    return http.httpRequest({
      url: `${IP_MYHTTP}/mcfwcbcart/insertCart`,
      method: `post`,
      data: model
    })
  }
  // 查询购物车列表
  findcarList = (model) => {
    return http.httpRequest({
      url: `${IP_MYHTTP}/mcfwcbcart/findCartListPageByUserId`,
      method: `post`,
      data: model
    })
  }
  // 支付订单接口
  pay = (model) => {
    return http.httpRequest({
      url: `${IP_MYHTTP}/mcfwcbpay/pay`,
      method: `post`,
      data: model
    })
  }
  // 添加发票接口
  insertInvoice = (model)=>{
    return http.httpRequest({
      url:`${IP_MYHTTP}/mcfwcbinvoice/insertInvoice`,
      method:`post`,
      data:model
    })
  }
}