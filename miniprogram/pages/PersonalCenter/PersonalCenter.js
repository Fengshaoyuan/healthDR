// pages/PersonalCenter/PersonalCenter.js
Page({
  _handlerTap: function(e) {
    if(e.currentTarget.id == "myInfo") {
      wx.navigateTo({
        url: '/pages/MyInfo/MyInfo'
      })   
    }
    else if(e.currentTarget.id == "QRcode") {
      wx.navigateTo({
        url: '/pages/QRcode/QRcode'
      })   
    }
    else if(e.currentTarget.id == "alarm"){
      wx.navigateTo({
        url: '/pages/SetAlarm/SetAlarm'
      })
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    cardItems: [
      {
        name: "myInfo",
        title: "个人信息",
        img: "/images/personalMsg.png",
        description: "查看个人信息"
      },{
        name: "QRcode",
        title: "我的健康码",
        img: "/images/QRcode.png",
        description: "浙大家园 健康通行"
      },{
        name: "alarm",
        title: "设置打卡提醒",
        img: "/images/alarm.png",
        description: "不错过每一次打卡"
      }

    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})