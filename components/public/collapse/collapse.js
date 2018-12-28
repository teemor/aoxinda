Component({
  properties: {

  },
  data: {
    activeNames:["1"]
  },
  methods: {
    /**
     * 折叠收起
     * dzl
     */
    collapseClick:function(e){
      this.setData({
        activeNames:e.detail
      })
      // this.triggerEvent('collapseClick',{})
    }
  }
})
