import { Technician } from '../../common/api/api'
const request = new Technician
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reasonShow:false,
    statusShow:false,
    status:[{name:'未收到货/未安装',text:'包含未收到或者未安装的商品'},{name:'已收到货',text:'已收到货，需要退换已收到的商品，已安装商品不予退换'}],
    reason:[{name:"商品无货",key:'1'},{name:"发货时间问题",key:'1'},{name:"不想要了",key:'1'},{name:"商品信息填写错误",key:'1'},{name:"商品降价",key:'1'},{name:"其他",key:'1'}]
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