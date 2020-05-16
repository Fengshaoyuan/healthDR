// components/questionItem/questionItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    questionItem: Object
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindDateChange: function(e) {
      console.log(e.detail.value)
      this.setData({
        date: e.detail.value, 
      })
    },
  }
})
