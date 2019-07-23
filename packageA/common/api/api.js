import {
  HttpServer
} from "../../../utils/method"
const http = new HttpServer()
export const IP_YXHTTP = `http://192.168.31.158:9015/wash/v1.0` //前三
export const IP_MYHTTP = `http://192.168.31.186:9015/wash/v1.0`
export const IP_YBHTTP = `http://192.168.31.156:9015/wash/v1.0`
export const IP_LYHTTP = `http://192.168.31.220:9015/myPay/v1.0`
export class store {
  // banner图查询
  findHome = () => {
    return http.httpRequest({
      url: `${IP_YXHTTP}/findHome`,
      method: `get`
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
      url: `${IP_YXHTTP}/mcfwcborder/findOrderDetailsByOrderId`,
      method: `post`,
      data: model
    })
  }
  // 手动退款
  backMoney = (model) => {
    return http.httpRequest({
      url: `${IP_MYHTTP}/mcfwcbpay/backMoneyService`,
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
  // 订单详情消费记录
  cardDetCon = (model) => {
    return http.httpRequest({
      url: `${IP_YXHTTP}/cardDetCon`,
      method: `post`,
      data: model
    })
  }
  //评价列表
  selectWashCarComment=(model)=>{
    return http.httpRequest({
      url: `${IP_YBHTTP}/selectWashCarComment`,
      method: `post`,
      data: model
    })
  }
}