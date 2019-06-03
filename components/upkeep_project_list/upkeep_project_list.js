// components/upkeep_project_list/upkeep_project_list.js
import {
  careItem
} from '../../common/api/c_api.js'
const request = new careItem
let closeOff = false
import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog';
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    goodsList: {
      type: Object,
      value: {}
    },
    activeList: {
      type: Object,
      value: {},
      observer: function (newVal, oldVal) {
        if (newVal != oldVal && newVal != '') {
          setTimeout(() => {
            this.setData({
              activeNames: newVal
            })
          }, 100)
        }
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    checkout: true,
    activeNames: [],
    checked: false,
    num: '1',
    minusStatus: 'normal',
    checkedColor: '#fdbb51',
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //选择
    changeCollapse: function (e) {
      let thisGood = this.data.goodsList.data[e.currentTarget.dataset.index]
      if (thisGood.goodsMsg && thisGood.goodsMsg.length > 0) {
        thisGood.checkedBtn = !thisGood.checkedBtn;
        this.setData({
          activeNames: e.detail,
          goodsList: this.data.goodsList
        })
        this.dataGo();
      } else {
        wx.showToast({
          title: '暂无商品',
          icon: 'loading',
          duration: 1000
        })
      }
    },

    //复选框-----暂时废除
    onChange: function (e) {
      let checkenBtn = this.data.goodsList.data[e.currentTarget.dataset.index].checkedBtn;
      console.log('checkenBtn', this.data.goodsList)
      let index = e.currentTarget.dataset.index;
      if (checkenBtn) {
        this.data.goodsList.data[e.currentTarget.dataset.index].checkedBtn = false;
        this.setData({
          goodsList: this.data.goodsList,
        })
      } else {
        this.data.goodsList.data[e.currentTarget.dataset.index].checkedBtn = true;
        this.setData({
          goodsList: this.data.goodsList
        })
      }
      this.triggerEvent('getCheckedBtn', {
        a: this.data.goodsList.data[e.currentTarget.dataset.index],
        b: index
      });
    },

    //去掉点击滑块回去
    onClose(event) {
      const {
        position,
        instance
      } = event.detail;
      switch (position) {
        case 'cell':
          instance.close();
          break;
        case 'right':
          if (closeOff) {
            instance.close();
          }
          break;
      }
    },

    //保存数量
    numChange: function (e) {
      closeOff = false
      this.data.goodsList.data[e.currentTarget.dataset.j].goodsMsg[e.currentTarget.dataset.i].goodsNum = e.detail
      let arr = this.data.goodsList
      this.setData({
        goodsList: arr
      })
      this.dataGo();
    },

    //删除
    toDetele: function (e) {
      closeOff = true
      this.data.goodsList.data[e.currentTarget.dataset.j].goodsMsg.splice(e.currentTarget.dataset.i, 1)
      if (this.data.goodsList.data[e.currentTarget.dataset.j].goodsMsg.length === 0) {
        this.data.activeNames.forEach((n, i) => {
          if (n === e.currentTarget.dataset.j) {
            this.data.activeNames.splice(i, 1)
          }
        })
        this.data.goodsList.data[e.currentTarget.dataset.j].checkedBtn = false
      }
      let arr = this.data.goodsList
      this.setData({
        activeNames: this.data.activeNames,
        goodsList: arr
      })
      this.dataGo();
    },

    //更换
    toChange(e) {
      closeOff = true
      wx.setStorage({
        key: 'ghInfo',
        data: this.dataGo(true),
      })
      let json = {
        goods_info: this.data.goodsList.data[e.currentTarget.dataset.j].goodsMsg.filter((n, i) => {
          if (e.currentTarget.dataset.i != i) {
            return true
          }
        }).map(m => {
          return {
            productCode: m.productCode,
            goods_sku: m.goods_sku
          }
        }),
        type: e.currentTarget.dataset.type,
        i: e.currentTarget.dataset.i,
        j: e.currentTarget.dataset.j
      }
      wx.navigateTo({
        url: `../c_upkeep_goods_list/c_upkeep_goods_list?info=${JSON.stringify(json)}`,
      })
    },

    //向父级返回--选中的服务和它的index
    dataGo(r) {
      //每次选择-传选中的index和选中的集合
      let money = 0;
      this.data.goodsList.data.forEach(n => {
        if (n.checkedBtn && n.goodsMsg && n.goodsMsg.length > 0) {
          n.goodsMsg.forEach(m => {
            money += m.price * m.goodsNum
          })
        }
      })
      let json = {
        allPrice: money,
        activeList: this.data.activeNames,
        checkMaintain: this.data.goodsList.data.filter((n, i) => {
          let off = false;
          this.data.activeNames.forEach(m => {
            if (i == m) {
              off = true;
            }
          })
          return off
        }),
        goodsList: this.data.goodsList
      }
      if (r) {
        return json
      } else {
        this.triggerEvent('getCheckedBtn', json);
      }
    }
  }
})