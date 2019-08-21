import { HttpServer } from "../../utils/method"
const http = new HttpServer()
export const IP_HTTP = `http://192.168.31.184:9015/appapi/v1.0`
export class RescueHttp {
  //救援订单列表
  selectOrderList = (params) => {
    return http.httpRequest({
      url: `http://192.168.31.220:9015/help/v1.0/selectOrderList`,
      method: `POST`,
      data: params
    })
  }
}