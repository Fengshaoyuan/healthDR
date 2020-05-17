// miniprogram/pages/SetAlarm/SetAlarm.js
Page({

  /**
   * 页面的初始数据
   * 默认提醒时间为11:00
   */
  data: {
    times:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      times:'10:00',
    })
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

  },
  bindTimeChange:function(e){
    console.log(e.detail.value)
    this.setData({
      times: e.detail.value
    })
  },

  /*获取用户下发权限*/
  permission(){
    wx.requestSubscribeMessage({
      tmplIds: ['NkYsMf6eWw_lsj4HYskphmRCL_73vsK9lQSZvUI-qU0'],
      success(res) {
        console.log('已授权接收订阅消息')
      },
      complete(res) {
        console.log(res)
      }
    })
  },
})