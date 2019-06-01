import { Technician } from '../../common/api/api'
const request = new Technician
import { img } from "../../utils/method"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderInfo: {
      order_id: null, // 订单id
      order_type: null, // 0仅退款1退款退货
      back_desription: '',// 退款理由
      back_reason: '',// 退款原因
      back_money: null,// 退款钱
      goods_num: null,// 退款数
      goods_status: null,// 状态
      goods_detail_id: null,// 商品id
      order_detail_id: null,// 订单详情id
    },
    imgList: [],// 图片说明
    goodsData: {},// 商品信息
    statusLabel: '',
    reasonShow: false,
    statusShow: false,
    status: [{ name: '未收到货/未安装', id: 0, text: '包含未收到或者未安装的商品' }, { id: 1, name: '已收到货', text: '已收到货，需要退换已收到的商品，已安装商品不予退换' }],
    reasonA: [{ name: "商品无货", key: '1' }, { name: "发货时间问题", key: '1' }, { name: "不想要了", key: '1' }, { name: "商品信息填写错误", key: '1' }, { name: "商品降价", key: '1' }, { name: "其他", key: '1' }],
    reasonB: [{ name: "有延期/适用范围/余额不符", key: '1' }, { name: "发错货", key: '1' }, { name: "假冒品牌", key: '1' }, { name: "收到商品少件/破损/污渍等", key: '1' }, { name: "其他", key: '1' }],
  },
  /**
   * 更改商品状态
   */
  statusChoose: function (e) {
    console.log(e)
    if (e.currentTarget.dataset.item.id === 0) {
      this.setData({
        reason: this.data.reasonA
      })
    } else {
      this.setData({
        reason: this.data.reasonB
      })
    }
    this.setData({
      'orderInfo.order_type': e.currentTarget.dataset.item.id,
      statusLabel: e.currentTarget.dataset.item.name,
      statusShow: false
    })
  },
  /**
   * 上传图片
   */
  uploadImage: function () {
    let that = this
    img().then(res => {
      let tempFilePath = res.tempFilePaths, uploadImgCount = 0;
      wx.showLoading({
        icon: 'loading'
      });

      let list = tempFilePath.map(item => {
        console.log(item, 'item')
        wx.uploadFile({
          url: 'http://www.maichefu.cn:9014/mall/v1.0/upload',
          filePath: item,
          name: 'file',
          success: function (res) {
            uploadImgCount++;
            that.data.imgList.push(JSON.parse(res.data).data)
            let arr = that.data.imgList
            that.setData({
              imgList: arr
            });

            //如果是最后一张,则隐藏等待中
            if (uploadImgCount == tempFilePath.length) {
              wx.hideLoading();
            }
          },
          fail: function (res) {
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
  refundDetail: function () {
    request.writeBackOrder(this.data.orderInfo).then(res => {
      console.log(res, 'res')
    })
    let order_id = this.data.orderInfo.order_id
    wx.navigateTo({
      url: `../my_order_refund_detail/index?id=${order_id}`
    });

  },
  /**
   * 退款说明
   */
  description: function (e) {
    console.log(e,'e123')
  },
  /**
   * 数量变化
   */
  onChange: function (e) {
    this.setData({
      'orderInfo.back_money': e.detail * this.data.goodsData.goods_price,
      'orderInfo.goods_num': e.detail
    })
  },
  /**
   * 选择商品状态
   */
  showShopstatus: function (e) {
    this.setData({
      statusShow: true
    })
  },
  /**
   * 选择退款原因
   */
  refundReason: function () {
    this.setData({
      reasonShow: true
    })
  },
  /**
   * 选择退款原因
   */
  reasonChoose: function (e) {
    this.setData({
      reasonShow: false,
      'orderInfo.back_reason': e.currentTarget.dataset.item.name
    })
  },
  /**
   * 关闭选择状态
   * @param {} options 
   */
  clickMask: function () {
    this.setData({
      reasonShow: false,
      statusShow: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let model = JSON.parse(decodeURIComponent(options.model))
    console.log(model, '退款model')
    this.setData({
      'orderInfo.order_id': model.order_id,
      'orderInfo.back_money': model.goodsData[0].goods_price,
      goodsData: model.goodsData[0]
    })
    if (model.trade_status_name == "待发货") {
      console.log('代发货')
      this.setData({
        reason: this.data.reasonA
      })
    } else if (model.trade_status_name == "已发货" || model.trade_status_name == "待安装") {
      console.log('已发货--待安装')
      this.setData({
        shopstatus: true
      })
    } else if (model.trade_status_name == "已收货") {
      console.log('已收货')
      this.setData({
        reason: this.data.reasonB
      })
    }
  }

})