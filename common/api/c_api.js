// 数据接口
import { HttpServer } from "../../utils/method"
const http = new HttpServer()
export const IP_HTTP = `https://www.maichefu.cn:444`
export const IP_HTTP_API = `https://www.maichefu.cn:9015`
const app = getApp()

/****c端登录 start */
export class c_login {
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
  // 判断用户是否注册过
  loginQuery = (mcfCUser) => {
    return http.httpRequest({
      url: `${IP_HTTP}/mcf/api/v1/c/login/query`,
      method: `post`,
      data: mcfCUser
    })
  }
}
/****c端登录 end*/

/*** 用户认证 start */
export class userAuth {
  //个人信息
  selfInfo = (mcfuserC) => {
    return http.httpRequest({
      url: `${IP_HTTP}/mcf/api/v1/c/selfInfo/backWrite`,
      method: `post`,
      data: mcfuserC
    })
  }

  //用户id
  userId = (openId) => {
    return http.httpRequest({
      url: `${IP_HTTP}/mcf/api/v1/c/openid/query?openid=${openId}`,
      method: `post`
    })
  }

  //车主认证
  carAttestation = () => {
    return http.httpRequest({
      url: `${IP_HTTP}/mcf/api/v1/c/car/attestation/save`,
      method: `post`
    })
  }
}
/*** 用户认证 end */

/**推荐保养项目 start */
export class careItem {

  //判断是否完善车辆信息
  isCarInfo = (tel) => {
    return http.httpRequest({
      // url: `${IP_HTTP}/mcf/api/v1/c/upkeep/car/entity?tel=${tel}`,
      url: `${IP_HTTP}/mcf/api/v1/c/upkeep/car/entity/new?tel=${tel}`,
      method: `post`
    })
  }
  
  //修改车辆公里数
  editCarMiles = (editCar) => {
    return http.httpRequest({
      url: `${IP_HTTP}/mcf/api/v1/c/car/mileage?id=${editCar.id}&mileage=${editCar.mileage}`,
      method: `post`,
    })
  }

  //根据智能推荐保养项目
  recommendItem = (params) => {
    return http.httpRequest({
      url: `${IP_HTTP_API}/appapi/v1.0/getMaintainGoods`,
      method: `post`,
      data: params
    })
  }
  //更换商品
  changeGoods = (params) => {
    return http.httpRequest({
      url: `${IP_HTTP_API}/appapi/v1.0/product/selectGoodsListByType`,
      method: `post`,
      data: params
    })
  }
}

/**推荐保养项目 end */

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
      url: `${IP_HTTP_API}/scm/v1.0/findGoodsTimeAndGoods`,
      data: isGoods,
      method: `post`
    })
  }

  //确认到店服务
  writeServerOrder = (model) => {
    return http.httpRequest({
      url: `${IP_HTTP_API}/appapi/v1.0/order/writeServerOrder`,
      method: `post`,
      data: model
    })
  }
  //更改到店服务
  updateServerOrder = (model) => {
    return http.httpRequest({
      url: `${IP_HTTP_API}/appapi/v1.0/order/updateServerOrder`,
      method: `post`,
      data: model
    })
  }
  //查询门店服务单
  selectServerOrder = (model) => {
    return http.httpRequest({
      url: `${IP_HTTP_API}/appapi/v1.0/order/selectServerOrder`,
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

/**** 一键授权*/
export class userAuthorizer {
  //获取用户消息列表
  userMesg = (params) => {
    return http.httpRequest({
      url: `${IP_HTTP}/mcf/api/v1/c/get/messages?id=${params.id}&pageable=${params.pageable}`,
      method: `post`
    })
  }

  //一键授权
  userAuth = (params) => {
    return http.httpRequest({
      url: `${IP_HTTP}/mcf/api/v1/c/order/authorizer?orderId=${params.orderId}&messageId=${params.messageId}&authorizer=${params.authorizer}`,
      method: `post`
    })
  }

}
/**** 一键授权*/