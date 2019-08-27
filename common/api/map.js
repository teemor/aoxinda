import {
  HttpServer
} from "../../utils/method"
const http = new HttpServer()
const IP_HTTP = `http://192.168.31.184:9015/manage/v1.0`
export class Map {
  //关键词输入提示  {"keyword":"关键词","region": "搜索范围"}
  checkSigAndGetJson = (params) => {
    return http.httpRequest({
      url: `${IP_HTTP}/checkSigAndGetJson`,
      method: `POST`,
      data: params
    })
  }
  //逆地址解析  {"location":"经度lat,纬度lng"}
  reverseAddressResolution = (params) => {
    return http.httpRequest({
      url: `${IP_HTTP}/reverseAddressResolution`,
      method: `POST`,
      data: params
    })
  }
  //距离计算（一对多）  {"form":"经度lat,纬度lng","to":"经度lat,纬度lng"}
  distanceCalculation = (params) => {
    return http.httpRequest({
      url: `${IP_HTTP}/distanceCalculation`,
      method: `POST`,
      data: params
    })
  }
  //地址搜索  {"boundary": "region(北京,0)","keyword": "KFC","page_size": 20,"page_index": 1,"orderby": "_distance"}
  distanceCalculation = (params) => {
    return http.httpRequest({
      url: `${IP_HTTP}/locationSearch`,
      method: `POST`,
      data: params
    })
  }
  //查询行政区
  list = (params) => {
    return http.httpRequest({
      url: `${IP_HTTP}/list`,
      method: `POST`,
      data: params
    })
  }
}