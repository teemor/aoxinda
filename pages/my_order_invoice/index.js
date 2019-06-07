import {
  Technician
} from '../../common/api/api'
const request = new Technician

Page({
  onLoad: function (options) {
    console.log(options,'options')
    request.selectInvoice({id:options.id}).then(res=>{
      console.log(res)
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    agree:false,
    checked: true,
    ptchecked: true,
    radio: 'pt',
    head: 'p',
    person:true,
    invoice_title:0,
    invoice_type:0
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
  
  argeeChange:function(e){
    console.log(e,'fdsf')
    this.setData({
      agree:e.detail
    })
  },
  /**
   * 添加发票
   */
  saveInvoice: function(data) {
    if(this.data.radio==='zzs'&&this.data.agree===false){
      wx.showToast({
        title:'请阅读并同意'
      })
    }else{
      request.saveInvoice(data).then(res => {
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
    }
    
  },
  /**
   * 保存
   * @param {*} param0 
   */
  addInvoice: function() {
    this.saveInvoice({
      invoice_title: this.data.invoice_title,
      invoice_type: this.data.invoice_type,
      unit:this.data.unit,
      person_code:this.data.person_code,
      sign_phone:this.data.sign_phone,
      bank:this.data.bank,
      bank_account:this.data.bank_account
    })
  },
  /**
   * 是否是普通发票
   * @param {*} param0 
   */
  invoiceChange: function({
    detail
  }) {
    this.setData({
      radio: detail
    })
    if (detail === 'pt') {
      this.setData({
        ptchecked: true,
        invoice_type: 0,
        unit: '',
        person_code: '',
        sign_address: '',
        sign_phone: '',
        bank: '',
        bank_account: ''
      })
    } else {
      this.setData({
        invoice_type: 1,
        ptchecked: false,
        unit: '',
        person_code: ''
      })
    }
  },
  /**
   * 是否是个人
   */
  headChange: function({
    detail
  }) {
    this.setData({
      head: detail
    })
    if (detail === 'p') {
      this.setData({
        person: true,
        invoice_title: 0
      })
    } else {
      this.setData({
        person: false,
        invoice_title: 1
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