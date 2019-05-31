// 数据接口
import { HttpServer } from "../../utils/method"
const http = new HttpServer()
export const IP_HTTP = `https://www.maichefu.cn:444`
export const IP_MY_HTTP = `https://www.maichefu.cn:9015`
export const IP_YT_HTTP = `https://www.maichefu.cn:9015`
const app = getApp()



/** 选择门店与技师 start */
export class choiceSp {
  // 获取openId
  getOpenId = (code) => {
    return http.httpRequest({
      url: `${IP_HTTP}/mcf/api/v1/sys/auth/sessionkey?appid=${app.appid}&secret=${app.appSecret}&js_code=${code}&grant_type=authorization_code`,
      method: `get`
    })
  }
  // 获取用户信息
  authDecode = (params) => {
    return http.httpRequest({
      url: `${IP_HTTP}/mcf/api/v1/sys/auth/decode`,
      method: `post`,
      data: params
    })
  }
  //搜索门店
  searchSp = (searchValue) => {
    return http.httpRequest({
      url: `${IP_HTTP}/mcf/api/v1/c/sp/entity?lat=${searchValue.lat}&log=${searchValue.log}&name=${searchValue.name}&type=${searchValue.type}`,
      method: `post`,
    })
  }

  //所有门店
  distanceSp = (userdistance) => {
    return http.httpRequest({
      url: `${IP_HTTP}/mcf/api/v1/c/sp/distance/query?lat=${userdistance.lat}&log=${userdistance.log}&type=${userdistance.type}&pageNumber=${userdistance.pageNumber}`,
      method: `post`
    })
  }

  //无货时调用奥鑫达供应链计算到货时间
  noGoods = (isGoods) => {
    return http.httpRequest({
      url: `${IP_MY_HTTP}/scm/v1.0/findGoodsTimeAndGoods`,
      data: isGoods,
      method: `post`
    })
  }

  //确认到店服务
  writeServerOrder = (model) => {
    return http.httpRequest({
      url: `${IP_YT_HTTP}/appapi/v1.0/order/writeServerOrder`,
      method: `post`,
      data: model
    })
  }
  //更改到店服务
  updateServerOrder = (model) => {
    return http.httpRequest({
      url: `${IP_YT_HTTP}/appapi/v1.0/order/updateServerOrder`,
      method: `post`,
      data: model
    })
  }
  //查询门店服务单
  selectServerOrder = (model) => {
    return http.httpRequest({
      url: `${IP_YT_HTTP}/appapi/v1.0/order/selectServerOrder`,
      method: `post`,
      data: model
    })
  }

  //门店是否有空工位
  checkSp = (params) => {
    return http.httpRequest({
      url: `${IP_HTTP}/mcf/api/v1/c/sp/message/query?shopId=${params.shopId}`,
      method: `post`
    })
  }

  // 查询门店下技师是否有时间
  queryThWork = (thTime) => {
    return http.httpRequest({
      url: `${IP_HTTP}/mcf/api/v1/c/order/isfree?date1=${thTime.date}&id=${thTime.id}`,
      method: `post`
    })
  }

}
/** 选择门店与技师 start */

/**订单 start */
export class orderStatus {
  //判断sa是否请假
  isSaWork = (mcfSysOrder) => {
    return http.httpRequest({
      url: `${IP_HTTP}/mcf/api/v1/c/define/Order`,
      method: `post`,
      data: mcfSysOrder
    })
  }

  //发短信 /mcf/api/v1/c/sms/push
  messageOrder = (mcfSysOrder) => {
    return http.httpRequest({
      url: `${IP_HTTP}/mcf/api/v1/c/sms/push`,
      method: `post`,
      data: mcfSysOrder
    })
  }

  //用户拒绝
  refuseOrder = (params) => {
    return http.httpRequest({
      url: `${IP_HTTP}/mcf/api/v1/c/order/cancel?id=${params.id}`,
      method: `post`
    })
  }

  //付完款之后返回的流水号
  agreenPay = (params) => {
    return http.httpRequest({
      url: `${IP_HTTP}/mcf/api/v1/c/pay/writeback?id=${params.id}&wechatOrder=${params.wechatOrder}`,
      method: `post`
    })
  }

  //所有订单
  allOrder = (params) => {
    return http.httpRequest({
      url: `${IP_HTTP}/mcf/api/v1/c/user/query?userId=${params.userId}&status=${params.status}&page=${params.page}`,
      method: `post`
    })
  }

  //订单支付接口 /mcf/api/v1/sys/pay/payment
  payment = (params) => {
    return http.httpRequest({
      url: `${IP_HTTP}/mcf/api/v1/c/pay/payment?appId=${params.appId}&openId=${params.openId}&price=${params.price}`,
      method: `get`
    })
  }

  //保存订单
  saveOrder = (mcfSysOrder) => {
    return http.httpRequest({
      url: `${IP_HTTP}/mcf/api/v1/c/order/save`,
      method: `post`,
      data: mcfSysOrder
    })
  }

  //用户评分
  userScore = (oderScore) => {
    return http.httpRequest({
      url: `${IP_HTTP}/mcf/api/v1/c/order/score`,
      method: `post`,
      data: oderScore
    })
  }


}
/**订单 start */
