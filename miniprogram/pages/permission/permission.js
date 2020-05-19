// miniprogram/pages/login.js
// https://blog.csdn.net/songokok/article/details/81237112
// https://www.jianshu.com/p/524c587f33d3
//用于存储用户唯一的OpenID
var OpenID = ""

Page({
  mixins: [require('../../mixin/themeChanged')],
  /**
   * 页面的初始数据
   */
  data: {
    showTopTips: false,
    //用户个人信息
    userInfo: {
      avatarUrl: "", //用户头像
      nickName: "", //用户昵称
    },
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //查看是否授权

    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          console.log("用户授权了");
          
          // 判断是否注册
          wx.cloud.callFunction({
            name: 'getUserInfo'
          }).then(res => {
            console.log("findResult", res)
            console.log("size", res.result.data.length)
            if (res.result.data.length == 1) {
              console.log("用户已注册", res.result)
              wx.switchTab({
                url: '../../pages/PersonalCenter/PersonalCenter'
              })
            } else {
              console.log("用户未注册", res.result)
              wx.redirectTo({
                url: '../../pages/signup/signup'
              })
            }
          })

        } else {
          //用户没有授权
          console.log("用户没有授权");
        }
      }
    });

  },
  bindGetUserInfo: function (res) {
    if (res.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      // 获取到用户的信息了，打印到控制台上看下
      console.log("用户的信息如下：");
      console.log(res.detail.userInfo);
      //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
      that.setData({
        isHide: false
      });
      //判断是否注册
      wx.cloud.callFunction({
        name: 'getUserInfo'
      }).then(res => {
        console.log("findResult", res)
        console.log("size", res.result.data.length)
        if (res.result.data.length == 1) {
          console.log("用户已注册", res.result)
          wx.switchTab({
            url: '../../pages/PersonalCenter/PersonalCenter'
          })
        } else {
          console.log("用户未注册", res.result)
          wx.redirectTo({
            url: '../../pages/signup/signup'
          })
        }
      })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      });
    }
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


})