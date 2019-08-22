import { HttpServer } from "../../utils/method"
const http = new HttpServer()
export const IP_HTTP = `http://192.168.31.220:9015/help/v1.0`
export class RescueHttp {
  //救援订单列表
  selectOrderList = (params) => {
    return http.httpRequest({
      url: `${IP_HTTP}/selectOrderList`,
      method: `POST`,
      data: params
    })
  }
  //救援订单详情
  selectOrderDetail = (params) => {
    return http.httpRequest({
      url: `${IP_HTTP}/selectOrderDetail`,
      method: `POST`,
      data: params
    })
  }
  // 退款/售后
  
}