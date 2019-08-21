import {
  Technician
} from '../common/api/api'
const request = new Technician
const app = getApp();
module.exports = {
  data: {
    car: false
  },
  /**
   * 查询车型
   * @param {} options 
   */
  findCarList: function () {
    let that = this
    wx.getStorage({
      key: 'userPhone',
      success: (result) => {
        request.findCarList({ userTel: result.data }).then(res => {
          if (res.result.length > 0) {
            let arr = []
            res.result.forEach(item => {
              if (item.def === '0') {
                arr.push(item)
              }
            })
            if (arr.length === 0) {
              arr.push(res.result[0])
            }
            that.setData({
              car: true,
              carModel: arr[0],
              carList: res.result,
              carName: arr[0],
              actCarCode: arr[0].actCarCode
            })
            // that.findShopList(res.result[0].carType,'','',this.data.actCarCode,'')
            app.carType = res.result[0].carType
            actCarCode: arr[0].actCarCode
            app.actCarCode = this.data.actCarCode
          } else {
            this.setData({
              car: false
            })
          }
        })
      },
      fail: () => { },
      complete: () => { }
    });
  },
}