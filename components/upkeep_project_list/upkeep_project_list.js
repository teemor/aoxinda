// components/upkeep_project_list/upkeep_project_list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
checkout:true,
activeNames:['1'],
checked:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeCollapse:function(e){
      this.setData({
        activeNames:e.detail
      })
    }
  }
})
