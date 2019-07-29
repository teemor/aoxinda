import {
  HttpServer
} from "../../utils/method"
// import { IP_MYHTTP } from "../../packageA/common/api/api";
const http = new HttpServer()
export const IP_YXHTTP = `http://192.168.31.158:9015/wash/v1.0` //前三
export const IP_MYHTTP = `http://192.168.31.186:9015/wash/v1.0/mcfwcborder`
export const IP_XSHTTP = `https://39.97.167.237:9020/wash/v1.0`

export class store {
  // 获取保养类型
  findShopList = (model) => {
    return http.httpRequest({
      url: `${IP_YXHTTP}/findShopList`,
      method: `post`,
      data: model
    })
  }
  // 获取门店详情
  findShopDet = (id) => {
    return http.httpRequest({
      url: `${IP_YXHTTP}/findShopDet`,
      method: `post`,
      data: id
    })
  }
  // 订单列表分页接口
  findOrderPage = (model) => {
    return http.httpRequest({
      url: `${IP_MYHTTP}/findOrderPage`,
      method: `post`,
      data: model
    })
  }
  // 订单列表（已取消+已退款）
  findOrderPageCancel = (model) => {
    return http.httpRequest({
      url: `${IP_MYHTTP}/findOrderPageCancel`,
      method: `post`,
      data: model
    })
  }
  // 
  findRefundByUserId = (model) => {
    return http.httpRequest({
      url: `http://192.168.31.186:9015/wash/v1.0/mcf-wcb-refund/findRefundByUserId`,
      method: `post`,
      data: model
    })
  }
  // 卡列表
  cardList = (model) => {
    return http.httpRequest({
      url: `${IP_YXHTTP}/cardList`,
      method: `post`,
      data: model
    })
  }
  // 卡详情
  cardDet = (model) => {
    return http.httpRequest({
      url: `${IP_YXHTTP}/cardDet`,
      method: `post`,
      data: model
    })
  }
  // 金麦卡详情
  goldDetail = (model) => {
    return http.httpRequest({
      url: `${IP_YXHTTP}/cardUserD`,
      method: `post`,
      data: model
    })
  }
  // 取消订单
  cancelOrder = (model) => {
    return http.httpRequest({
      url: `${IP_MYHTTP}/cancelOrder`,
      method: `post`,
      data: model
    })
  }
  cardDetCon = (model) => {
    return http.httpRequest({
      url: `${IP_YXHTTP}/cardDetCon`,
      method: `post`,
      data: model
    })
  }
  // banner图查询
  findHome = () => {
    return http.httpRequest({
      url: `${IP_YXHTTP}/findHome`,
      method: `get`
    })
  }
  // 订单门店列表
  findOrderShop = (model) => {
    return http.httpRequest({
      url: `${IP_YXHTTP}/findOrderShop`,
      method: `post`,
      data: model
    })
  }

}