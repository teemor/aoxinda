import { Technician } from '../../common/api/api'
const request = new Technician
import {img} from "../../utils/method"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reasonShow:false,
    statusShow:false,
    status:[{name:'未收到货/未安装',id:'0',text:'包含未收到或者未安装的商品'},{id:'1',name:'已收到货',text:'已收到货，需要退换已收到的商品，已安装商品不予退换'}],
    reason:[{name:"商品无货",key:'1'},{name:"发货时间问题",key:'1'},{name:"不想要了",key:'1'},{name:"商品信息填写错误",key:'1'},{name:"商品降价",key:'1'},{name:"其他",key:'1'}]
  },
  /**
   * 更改商品状态
   */
  statusChoose:function(e){
    this.setData({
      goods_status: e.currentTarget.dataset.item
    })
  },
  /**
   * 上传图片
   */
  uploadImage:function(){
    img().then(res=>{
      wx.showLoading({
        icon:'loading'
      });
      let list = res.tempFilePaths.map(item=>{
        console.log(item,'item')
        wx.uploadFile({
          url:'http://192.168.31.156:9014/mall/v1.0/upload',
          filePath:item,
          name:'file',

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
  refundDetail:function(){
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
    }).then(res=>{
      console.log(res,'res')
    })
    wx.navigateTo({
      url: '../my_order_refund_detail/index',
      success: (result) => {
        
      },
      fail: () => {},
      complete: () => {}
    });
      
  },
  /**
   * 选择商品状态
   */
  Shopstatus:function(){
    this.setData({
     statusShow:true
    })
  },
  /**
   * 选择退款原因
   */
  refundReason:function(){
    this.setData({
      reasonShow:true
    })
  },
  /**
   * 关闭选择状态
   * @param {} options 
   */
  clickMask:function(){
    this.setData({
      reasonShow:false,
      statusShow:false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

})