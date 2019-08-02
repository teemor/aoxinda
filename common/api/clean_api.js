import {
  HttpServer
} from "../../utils/method"
// import { IP_MYHTTP } from "../../packageA/common/api/api";
const http = new HttpServer()
export const IP_YXHTTP = `http://192.168.31.158:9015/wash/v1.0` //前三
export const IP_MYHTTP = `http://192.168.31.186:9015/wash/v1.0/mcfwcborder`
export const RECORD_HTTP = `http://192.168.31.184:9015/wash/v1.0` //158YJQ 金麦卡消费、退款、充值列表
export const IP_HTTP_TOPUP = `http://192.168.31.184:9014/balance/v1.0` //220YJQ储值卡充值消息推送
export const BANK_CARD_HTTP = `http://192.168.31.184:9014/mcf/v1.0` //220YJQ我的银行卡
export const IP_XSHTTP = `https://39.97.167.184:9020/wash/v1.0` //237

export class store {
  // 搜索
  findSearch = (model) => {
    return http.httpRequest({
      url: `http://192.168.31.158:9015/wash/v1.0/findSearch`,
      method: `post`,
      data: model
    })
  }
  // 获取保养类型
  findShopList = (model) => {
    return http.httpRequest({
      // url: `${IP_YXHTTP}/findShopList`,
      url: `${IP_YXHTTP}/selectShopList`,
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
  // 获取服务类型
  findSerType = () => {
    return http.httpRequest({
      url: `${IP_YXHTTP}/findSerType`,
      method: `get`
    })
  }
  // 洗车美容退款详情
  findRefundByWechatRefundNo = () => {
    return http.httpRequest({
      url: `${IP_MYHTTP}/wash/v1.0/mcf-wcb-refund/findRefundByWechatRefundNo`,
      method: `get`
    })
  }
}