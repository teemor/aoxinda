import { Technician } from '../../../common/api/api'
const request = new Technician
import { img } from "../../../utils/method"
import shop_detail from '../../../mixin/shop_detail'

Page({
  mixins: [shop_detail],
  /**
   * 页面的初始数据
   */
  data: {
    orderInfo: {
      order_id: null, // 订单id
      order_type: 0, // 0仅退款1退款退货
      back_desription: '',// 退款理由
      back_reason: '',// 退款原因
      back_money: null,// 退款钱
      goods_num: 1,// 退款数
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
          url: 'https://www.maichefu.cn:9015/appapi/v1.0/upload',
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
      if (this.data.back_reason == '') {
        wx.showToast({
          title: '退款原因不能为空',
          icon: 'none',
          image: '',
          duration: 1500,
          mask: false,
          success: (result) => {

          },
          fail: () => { },
          complete: () => { }
        });
      } else if (this.data.back_desription == '') {
        wx.showToast({
          title: '退款描述不能为空'
        })
      } else {

        let order_id = res.data
        wx.redirectTo({
          url: `../../../pages/my_order_refund_detail/index?id=${order_id}`
        });
      }
    })
  },
  /**
   * 退款说明
   */
  description: function (e) {
    this.setData({
      'orderInfo.back_desription': e.detail
    })
    console.log(e, 'e123')
  },
  /**
   * 数量变化
   */
  onChange: function (e) {
    this.setData({
      'orderInfo.back_money': e.detail * this.data.goodsData.goods_price + (this.data.serverData ? e.detail * this.data.serverData.money : 0),
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
    // this.selectOrderDetail(model)

    // if (model.serverData && model.serverData.length > 0) {
    //   this.setData({
    //     'orderInfo.goods_num': model.goodsData[0].buy_num,
    //     serverData: model.serverData[0]
    //   })
    // }
    this.setData({
      // 'orderInfo.order_id': model.order_id,
      // 'orderInfo.back_money': this.data.serverData ? model.goodsData[0].goods_price * model.goodsData[0].buy_num + this.data.serverData.money * this.data.serverData.server_num : model.goodsData[0].goods_price,
      // 'orderInfo.goods_detail_id': model.goodsData[0].goods_detail_id,
      // 'orderInfo.order_detail_id': model.goodsData[0].order_detail_id,
      goodsData: model
    })
  }

})