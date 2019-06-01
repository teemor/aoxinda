import { Technician } from '../../common/api/api'
const request = new Technician
import { img } from "../../utils/method"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reasonInfo: {
      key: '',
      name: '请选择退款原因'
    },
    imgList: [],
    reasonShow: false,
    statusShow: false,
    status: [{ name: '未收到货/未安装', id: '0', text: '包含未收到或者未安装的商品' }, { id: '1', name: '已收到货', text: '已收到货，需要退换已收到的商品，已安装商品不予退换' }],
    reasonA: [{ name: "商品无货", key: '1' }, { name: "发货时间问题", key: '1' }, { name: "不想要了", key: '1' }, { name: "商品信息填写错误", key: '1' }, { name: "商品降价", key: '1' }, { name: "其他", key: '1' }],
    reasonB: [{ name: "有延期/适用范围/余额不符", key: '1' }, { name: "发错货", key: '1' }, { name: "假冒品牌", key: '1' }, { name: "收到商品少件/破损/污渍等", key: '1' }, { name: "其他", key: '1' }],
  },
  /**
   * 更改商品状态
   */
  statusChoose: function (e) {
    this.setData({
      goods_status: e.currentTarget.dataset.item
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
    request.writeBackOrder({
      // goods_detail:
      // order_detail_id:
      // order_id:
      // goods_num:
      // back_money:
      // back_reason:
      // goods_status:
      // order_type:
      // back_desription:
    }).then(res => {
      console.log(res, 'res')
    })
    wx.navigateTo({
      url: '../my_order_refund_detail/index',
      success: (result) => {

      },
      fail: () => { },
      complete: () => { }
    });

  },
  /**
   * 选择商品状态
   */
  Shopstatus: function (e) {
    this.setData({
      statusShow: true
    })
  },
  /** */
  reasonChoose: function (e) {
    console.log(e.currentTarget.dataset.item)
    this.setData({
      reasonShow: false,
      reasonInfo: e.currentTarget.dataset.item
    })
  },
  /**
   * 选择退款原因
   */
  refundReason: function (e) {
    this.setData({
      reasonShow: true
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
      if (model.trade_status_name == "已发货") {
        this.setData({
          reason: this.data.reasonA
        })
      } else {
        this.setData({
          reason: this.data.reasonB
        })
      }
    } else if (model.trade_status_name == "已收货") {
      console.log('已收货')
      this.setData({
        reason: this.data.reasonB
      })
    }
    代付款
  },

})