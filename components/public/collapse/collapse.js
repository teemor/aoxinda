Component({
  properties: {

  },
  data: {
    collapse:false
  },
  methods: {
    /**
     * 折叠收起
     * dzl
     */
    collapseClick:function(){
      this.setData({
        collapse:!this.data.collapse
      })
      // this.triggerEvent('collapseClick',{})
    }
  }
})
