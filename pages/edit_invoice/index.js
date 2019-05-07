import {
  Technician
} from '../../common/api/api'
const request = new Technician

Page({
  onLoad: function (options) {
    request.selectInvoice({id:options.id}).then(res=>{
      this.setData({
        model:res.data[0]
      })
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    checked: true,
    ptchecked: true,
    person:true
  },
  unitChange: function({
    detail
  }) {
    this.setData({
      unit: detail
    })
  },
  person_codeChange: function({
    detail
  }) {
    this.setData({
      person_code: detail
    })
  },
  sign_addressChange: function({
    detail
  }) {
    this.setData({
      sign_address: detail
    })
  },
  sign_phoneChange: function({
    detail
  }) {
    this.setData({
      sign_phone: detail
    })
  },
  bankChange: function({
    detail
  }) {
    this.setData({
      bank: detail
    })
  },
  bank_accountChange: function({
    detail
  }) {
    this.setData({
      bank_account: detail
    })
  },
  read: function() {
    wx.navigateTo({
      url: '../read_book/index',
      success: (result) => {

      },
      fail: () => {},
      complete: () => {}
    });
  },
  /**
   * 添加发票
   */
  updateInvoice: function(data) {
    request.updateInvoice(data).then(res => {
      if(res.status===0){
        wx.showToast({
          title: '添加成功'
        })
      let currentPages =  getCurrentPages();
      let prevPage = currentPages[currentPages.length-2];
      prevPage.setData({
        item:res.data
      })
        wx.navigateBack({
          url: '1'
        })
      }
    })
  },
  /**
   * 保存
   * @param {*} param0 
   */
  addInvoice: function() {
    this.updateInvoice({
      id:this.data.model.id,
      invoice_title: this.data.model.invoice_title,
      invoice_type: this.data.model.invoice_type,
      unit:this.data.model.unit,
      person_code:this.data.model.person_code,
      sign_phone:this.data.model.sign_phone,
      bank:this.data.model.bank,
      bank_account:this.data.model.bank_account
    })
  },
  /**
   * 是否是普通发票
   * @param {*} param0 
   */
  invoiceChange: function({
    detail
  }) {
    if (detail === '0') {
      this.data.model.invoice_type=0
      this.setData({
       model:this.data.model,
       ptchecked:true
      })
    } else {
      this.data.model.invoice_type=1
      this.setData({
        model:this.data.model,
        ptchecked:false
      })
    }
  },
  /**
   * 是否是个人
   */
  headChange: function({
    detail
  }) {
    if (detail === '0') {
      this.data.model.invoice_title=0
      this.setData({
        person: true,
        model: this.data.model
      })
    } else {
       this.data.model.invoice_title=1
      this.setData({
        person: false,
        model: this.data.model
      })
    }
  },
  /**
   * 是否开发票
   * @param {*} options 
   */
  onChange: function({
    detail
  }) {
    this.setData({
      checked: detail
    })
    console.log(detail, 'hh')
  },
  radioChange: function({
    detail
  }) {
    this.setData({
      radio: detail
    })
  },

})