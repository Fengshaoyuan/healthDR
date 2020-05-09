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
    radioChange: function (e) {
      let name = this.data.questionItem.name,value = e.detail.value
      console.log('radio发生change事件，携带value值为：',this.data.questionItem.name,e.detail.value)
      if(name == "sfzx" && value == 2) {
        console.log("yes")
      }
      
    }
  }
})
