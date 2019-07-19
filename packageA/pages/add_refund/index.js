import {
  store
} from '../../common/api/api'
const request = new store
import {
  img
} from "../../../utils/method"
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    orderInfo: {
      userId: app.globalData.openId, // 订单id
      orderId: 0, // 0仅退款1退款退货
      orderDetId: '', // 退款理由
      refundReason: '', // 退款原因
      refundPrice: null, // 退款钱
      goodsNum: 1, // 退款数
      shopId: null, // 状态
      refundDesc: ''
    },
    imgList: [], // 图片说明
    goodsData: {}, // 商品信息
    statusLabel: '',
    reasonShow: false,
    statusShow: false,
    reasonA: [{
      name: "计划有变，不想要了",
      key: '1'
    }, {
      name: "联系不到门店，约不到时间",
      key: '1'
    }, {
      name: "到店后，门店不让使用",
      key: '1'
    }, {
      name: "到门店后，刷卡/现金/第三方支付",
      key: '1'
    }, {
      name: "门店已停业",
      key: '1'
    }, {
      name: "其他",
      key: '1'
    }],
  },
  /**
   * 更改商品状态
   */
  statusChoose: function(e) {
    this.setData({
      reason: this.data.reasonA
    })
    this.setData({
      'orderInfo.order_type': e.currentTarget.dataset.item.id,
      statusLabel: e.currentTarget.dataset.item.name,
      statusShow: false
    })
  },
  /**
   * 上传图片
   */
  uploadImage: function() {
    let that = this
    img().then(res => {
      let tempFilePath = res.tempFilePaths,
        uploadImgCount = 0;
      wx.showLoading({
        icon: 'loading'
      });

      let list = tempFilePath.map(item => {
        console.log(item, 'item')
        wx.uploadFile({
          url: 'http://192.168.31.186:9015/common/v1.0/upload',
          filePath: item,
          name: 'file',
          formData: {
            'file_path': 'maichefutest'
          },
          success: function(res) {
            console.log(res, 'res')
            uploadImgCount++;
            that.data.imgList.push(JSON.parse(res.data))
            let arr = that.data.imgList
            that.setData({
              imgList: arr,
              'orderInfo.files': arr
            });

            //如果是最后一张,则隐藏等待中
            if (uploadImgCount == tempFilePath.length) {
              wx.hideLoading();
            }
          },
          fail: function(res) {
            wx.hideLoading();
            wx.showModal({
              title: '错误提示',
              content: '上传图片失败',
              showCancel: false
            })
          }
        })
        // return request.chooseImage({item}).then(res=>{
        //   console.log(res,'上传图片')
        // })
      })
    })
  },
  /**
   * 跳转退款详情
   */
  refundDetail: function() {
    if (this.data.orderInfo.refundReason == '') {
      wx.showToast({
        title: '退款原因不能为空',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: false,
        success: (result) => {

        },
        fail: () => {},
        complete: () => {}
      });
    } else if (this.data.orderInfo.refundDesc == '') {
      wx.showToast({
        title: '退款描述不能为空',
        icon: 'none'
      })
    } else {

      request.backMoney(this.data.orderInfo).then(res => {
        wx.showToast({
          title: res.data.description
        })
        let order_id = res.data
        wx.redirectTo({
          url: `../my_refund_detail/index?id=${order_id}`
        });

      })

    }

  },
  /**
   * 退款说明
   */
  description: function(e) {
    this.setData({
      'orderInfo.refundDesc': e.detail
    })
    console.log(e, 'e123')
  },
  /**
   * 数量变化
   */
  onChange: function(e) {
    console.log(e, 'e.detail')
    this.setData({
      'orderInfo.refundPrice': e.detail * this.data.goodsData.buyPrice,
      'orderInfo.goodsNum': e.detail
    })
  },
  /**
   * 选择商品状态
   */
  showShopstatus: function(e) {
    this.setData({
      statusShow: true
    })
  },
  /**
   * 选择退款原因
   */
  refundReason: function() {
    this.setData({
      reasonShow: true
    })
  },
  /**
   * 选择退款原因
   */
  reasonChoose: function(e) {
    this.setData({
      reasonShow: false,
      'orderInfo.refundReason': e.currentTarget.dataset.item.name
    })
  },
  /**
   * 关闭选择状态
   * @param {} options 
   */
  clickMask: function() {
    this.setData({
      reasonShow: false,
      statusShow: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let model = JSON.parse(decodeURIComponent(options.model))
    this.setData({
      'orderInfo.shopId': model.shopId,
      'orderInfo.orderId': model.id,
      'orderInfo.orderDetId': model.detail.orderDetailId,
      'orderInfo.goodsNum': model.detail.num,
      'orderInfo.refundPrice': model.detail.num * model.detail.buyPrice,
      goodsData: model.detail
    })
    console.log(model, '退款model')
    // this.selectOrderDetail(model)




  }
  // this.setData({
  //   'orderInfo.order_id': model.order_id,
  //   'orderInfo.back_money': this.data.serverData ? model.goodsData[0].goods_price * model.goodsData[0].buy_num + this.data.serverData.money * this.data.serverData.server_num : model.goodsData[0].goods_price,
  //   'orderInfo.goods_detail_id': model.goodsData[0].goods_detail_id,
  //   'orderInfo.order_detail_id': model.goodsData[0].order_detail_id,
  //   goodsData: model.goodsData[0]
  // })

})