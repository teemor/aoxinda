import {
    HttpServer
  } from "../../utils/method"
  const http = new HttpServer()
 export const IP_YXHTTP = `http://192.168.31.158:9015/wash/v1.0` //前三

 export class store {
    // 获取保养类型
    findShopList=(model)=>{
      return http.httpRequest({
        url:`${IP_YXHTTP}/findShopList`,
        method:`post`,
        data:model
      })
    }
    // 获取门店详情
    findShopDet=(id)=>{
      return http.httpRequest({
        url:`${IP_YXHTTP}/findShopDet`,
        method:`post`,
        data:id
      })
    }
  }