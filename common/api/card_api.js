import { HttpServer } from "../../utils/method"
const http = new HttpServer()
export const IP_HTTP = `http://192.168.31.76:9015/appapi/v1.0`
export class CardHttp {
  /**
   * 卡包=============================
   */
  //查询卡包列表
  selectMyCard = (params) => {
    return http.httpRequest({
      url: `${IP_HTTP}/card/selectMyCard`,
      method: `POST`,
      data: params
    })
  }
  // 查询卡详情
  selectMyCardDetail = (params) => {
    return http.httpRequest({
      url: `${IP_HTTP}/card/selectMyCardDetail`,
      method: `POST`,
      data: params
    })
  }
  //查询卡包所需门店 - 查询全部门店
  selectShopList = (params) => {
    return http.httpRequest({
      url: `${IP_HTTP}/card/selectShopList`,
      method: `POST`,
      data: params
    })
  }
  /**
   * 新人有礼=============================
   */
  //获取服务项目
  selectFirstActivity = () => {
    return http.httpRequest({
      url: `${IP_HTTP}/card/selectFirstActivity`,
      method: `POST`,
    })
  }
  /**
   * 储值卡=============================
   */
  // 查询储值卡是否已购买和金额
  hasCard = (params) => {
    return http.httpRequest({
      url: `${IP_HTTP}/hasCard`,
      method: `POST`,
      data: params
    })
  }
  // 查询储值卡购买与充值
  payCard = (params) => {
    return http.httpRequest({
      url: `${IP_HTTP}/payCard`,
      method: `POST`,
      data: params
    })
  }
  // 查询储值卡详情
  selectPayCard = (params) => {
    return http.httpRequest({
      url: `${IP_HTTP}/selectPayCard`,
      method: `POST`,
      data: params
    })
  }
}