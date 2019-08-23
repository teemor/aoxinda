import {
  HttpServer
} from "../../../utils/method"
const http = new HttpServer()
export const IP_YXHTTP = `http://192.168.31.158:9015/wash/v1.0` //前三
export const IP_MYHTTP = `http://192.168.31.184:9015/wash/v1.0`  //186
export const IP_YBHTTP = `http://192.168.31.184:9015`
export const IP_LYHTTP = `http://192.168.31.184:9015/myPay/v1.0` // 220
export const IP_XSHTTP = `https://39.97.167.237:9020/wash/v1.0`
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
      url: `http://192.168.31.158:9015/wash/v1.0/findPayType`,
      method: `post`,
      data: model
    })
  }
  // 加入购物车
  addCart = (model) => {
    return http.httpRequest({
      url: `http://192.168.31.184:9015/wash/v1.0/mcfwcbcart/insertCart`,
      method: `post`,
      data: model
    })
  }
  // 购物车列表
  findcartList = (model) => {
    return http.httpRequest({
      url: `${IP_MYHTTP}/mcfwcbcart/findCartListPageByUserId`,
      method: `post`,
      data: model
    })
  }
  // 支付订单接口
  pay = (model) => {
    return http.httpRequest({
      url: `http://192.168.31.186:9015/wash/v1.0/mcfwcbpay/pay`,
      method: `post`,
      data: model
    })
  }
  // 支付成功
  noticeSuccessfulPayment = (model) => {
    return http.httpRequest({
      url: `http://192.168.31.186:9015/wash/v1.0/mcfwcbnotice/noticeSuccessfulPayment`,
      method: `post`,
      data: model
    })
  }
  // 退款通知提醒
  noticeSuccessfulRefund = (model) => {
    return http.httpRequest({
      url: `${IP_MYHTTP}/mcfwcbnotice/noticeSuccessfulRefund`,
      method: `post`,
      data: model
    })
  }
  // 添加发票接口
  insertInvoice = (model) => {
    return http.httpRequest({
      url: `${IP_MYHTTP}/mcfwcbinvoice/insertInvoice`,
      method: `post`,
      data: model
    })
  }
  // 服务卡列表
  cardList = (model) => {
    return http.httpRequest({
      url: `${IP_YXHTTP}/cardList`,
      method: `post`,
      data: model
    })
  }
  // 订单详情
  findOrderDetailsByOrderId = (model) => {
    return http.httpRequest({
      url: `http://192.168.31.186:9015/wash/v1.0/mcfwcborder/findOrderDetailsByOrderId`,
      method: `post`,
      data: model
    })
  }
  // 手动退款
  backMoney = (model) => {
    return http.httpRequest({
      url: `http://192.168.31.186:9015/wash/v1.0/mcfwcbpay/backMoneyService`,
      method: `post`,
      data: model
    })
  }
  // 卡退款
  backMoneyCard = (model) => {
    return http.httpRequest({
      url: `${IP_MYHTTP}/mcfwcbpay/backMoneyCard`,
      method: `post`,
      data: model
    })
  }
  // 退款详情
  findRefundById = (model) => {
    return http.httpRequest({
      url: `${IP_MYHTTP}/mcf-wcb-refund/findRefundById`,
      method: `post`,
      data: model
    })
  }
  // 查看是否有密码
  findPass = (model) => {
    return http.httpRequest({
      url: `${IP_LYHTTP}/findPass`,
      method: `post`,
      data: model
    })
  }
  // 校验密码
  passCheck = (model) => {
    return http.httpRequest({
      url: `${IP_LYHTTP}/passCheck`,
      method: `post`,
      data: model
    })
  }
  // 查看是否有卡
  findCard = (model) => {
    return http.httpRequest({
      url: `${IP_LYHTTP}/findCard`,
      method: `post`,
      data: model
    })
  }
  // 发送短信
  sendSms = (model) => {
    return http.httpRequest({
      url: `${IP_LYHTTP}/sendSms`,
      method: `post`,
      data: model
    })
  }
  // 校验短信
  checkSms = (model) => {
    return http.httpRequest({
      url: `${IP_LYHTTP}/checkSms`,
      method: `post`,
      data: model
    })
  }
  // 修改密码
  updatePass = (model) => {
    return http.httpRequest({
      url: `${IP_LYHTTP}/checkSmsAndUpdatePass`,
      method: `post`,
      data: model
    })
  }
  // 订单详情
  cardDetCon = (model) => {
    return http.httpRequest({
      url: `${IP_YXHTTP}/cardDetCon`,
      method: `post`,
      data: model
    })
  }
  //评价列表
  selectWashCarComment = (model) => {
    return http.httpRequest({
      url: `${IP_YBHTTP}/wash/v1.0/selectWashCarComment`,
      method: `post`,
      data: model
    })
  }
  //根据门店查看评论信息
  selectCommentByShopId = (model) => {
    return http.httpRequest({
      url: `${IP_YBHTTP}/comment/v1.0/selectCommentByShopId`,
      method: `post`,
      data: model
    })
  }
  // 消费记录
  cardDetConOrder = (model) => {
    return http.httpRequest({
      url: `${IP_YXHTTP}/cardDetConOrder`,
      method: `post`,
      data: model
    })
  }
  // 全部门店
  findOrderShop = (model) => {
    return http.httpRequest({
      url: `http://192.168.31.184:9015/wash/v1.0/findOrderShop`,
      method: `post`,
      data: model
    })
  }
  // 全部门店
  cardDetShop = (model) => {
    return http.httpRequest({
      url: `${IP_YXHTTP}/cardDetShopQ`,
      method: `post`,
      data: model
    })
  }
  // 卡卷全部门店
  findAllShop = (model) => {
    return http.httpRequest({
      url: `${IP_YXHTTP}/findAllShop`,
      method: `post`,
      data: model
    })
  }
}