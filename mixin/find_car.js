import {
    Technician
} from '../common/api/api'
const request = new Technician
module.exports = {
    data: {
        car: false
      },
  /**
   * 查询车型
   * @param {} options 
   */
  findCarList:function(){
    let that = this
    wx.getStorage({
      key: 'userPhone',
      success: (result) => {
        console.log(result,'result')
        request.findCarList({ userTel:result.data  }).then(res => {
          if (res.result.length > 0) {
            that.setData({
              car: true,
              model: res.result[0]
            })
          }
        })
      },
      fail: () => {},
      complete: () => {}
    });
  },
  }