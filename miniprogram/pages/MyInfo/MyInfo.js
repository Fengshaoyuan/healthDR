// miniprogram/pages/MyInfo/MyInfo.js
// miniprogram/pages/UserInfo/UserInfo.js

Page({
  mixins: [require('../../mixin/themeChanged')],
  /**
   * 页面的初始数据
   */
  data: {
    showTopTips: false,
    userInfo: {
      avatarUrl: "", //用户头像
      nickName: "", //用户昵称
    },
    realName: "",
    ZJUID: "",
    school: "",
    major: "",
    class: ""

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    /**
     * 获取用户信息
     */
    wx.getUserInfo({
        success: function (res) {
          var avatarUrl = 'userInfo.avatarUrl';
          var nickName = 'userInfo.nickName';
          that.setData({
            [avatarUrl]: res.userInfo.avatarUrl,
            [nickName]: res.userInfo.nickName,
          })
        }
      }),
      wx.cloud.callFunction({
        name: 'getUserInfo'
      }).then(res => {
        console.log(res)
        this.setData({
          realName: res.result.data[0].name,
          ZJUID: res.result.data[0].ZJUID,
          school: res.result.data[0].school,
          major: res.result.data[0].major,
          class: res.result.data[0].class,
        })
      })

    // 数据更新
    this.setData(Page.data)
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