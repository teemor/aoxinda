/**
 * 数据接口文件
 * -@author dzl
 */
import {HttpServer} from "../../utils/method"
const http = new HttpServer()
 export const IP_HTTP=`https://192.168.31.156:8081`
 export class Technician {
     // 品牌
    findBrand = () =>{
        return http.httpRequest({
            url:`${IP_HTTP}/service/findBrand`,
            method:`get`
        })
    }
    // 车型
    findSerial = (id) =>{
        return http.httpRequest({
            url:`${IP_HTTP}/service/findSerial?pid=${id}`,
            method:`get`
        })
    }
    // 年份字典表
    findYear = (id) =>{
        return http.httpRequest({
            url:`${IP_HTTP}/service/findYear?id=${id}`,
            method:`get`
        })
    }
    // 根据年份和品牌查车型
    findModel = (pid,year) =>{
        return http.httpRequest({
            url:`${IP_HTTP}/service/findModel?pid=${pid}&year=${year}`,
            method:`get`
        })
    }
    // 配置
    findConfig = (id) =>{
        return http.httpRequest({
            url:`${IP_HTTP}/service/findConfig?id=${id}`,
            method:`get`
        })
    }
 }