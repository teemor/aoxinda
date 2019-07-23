const app =getApp();
module.exports={
      /**
  * 表单提交事件，收集formId　
  * author dzl
  */
  formSubmit: function (e) {
    let formId = e.detail.formId
    //处理保存推送码
    app.dealFormIds(formId);
    app.saveFormIds()
  },
}