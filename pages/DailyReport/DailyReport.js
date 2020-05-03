// pages/DailyReport/DailyReport.js
var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: "",
    realName: "张三",
    studentID: "3170100001",
    questionItems: [
      {
        type: 1,
        name: "sfzx",
        hidden: false,
        desc: "今日是否在校？ Are you on campus today?",
        option: [
          { id: 1, value: "是 Yes" },
          { id: 2, value: "否 No" }
        ]
      },{
        type: 2,
        name: "fxyy",
        hidden: true,
        desc: "返校原因 Reason for returning to school",
        answer: ""
      },{
        type: 1,
        name: "sfzgn",
        hidden: false,
        desc: "所在地点 Your Location",
        option: [
          { id: 1, value: "境内" },
          { id: 2, value: "境外" }
        ]
      },{
        type: 3,
        name: "szdd",
        hidden: false,
        desc: "所在地点（请打开手机位置功能，并在手机权限设置中选择允许访问位置信息）Your location (Please turn on the location access function on your mobile phone and allow App to access your location)",
        answer: ""
      },{
        type: 1,
        name: "bztcyy",
        hidden: false,
        desc: "当前地点与上次不在同一城市，原因如下 Current location is different from last time，why",
        option: [
          { id: 1, value: "探亲" },
          { id: 2, value: "旅游" },
          { id: 3, value: "其他" }
        ]
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var DATE = util.formatDate(new Date());
    this.setData({
    date: DATE,
    });
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