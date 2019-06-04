Component({
  properties: {
    model: Object,
    disabled:Boolean
  },
  data: {

  },
  methods: {
    numChange: function ({detail}) {
      let model = {}
      model.id = this.data.model.id
      model.goods_price = this.data.model.goods_price
      model.buy_num=detail
      this.triggerEvent('numChange', model)
    },
    detail:function(){
      this.triggerEvent('detail',this.data.model)
    }
  }
})
