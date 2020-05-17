// pages/QRcode/QRcode.js
var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: "",
    realname: "张三",
    studentID: "3170100001",
    qr_url:"",
    college: "地球科学学院",
    healthColor: "00a650"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //调用utils方法获取当前时间
    var TIME = util.formatTime(new Date());
    this.setData({
    time: TIME,
    });
    this.getinfo()
  },
  getinfo(e) {
    let that = this

    const db = wx.cloud.database()
db.collection('HealthData').where({
  _openid:  wx.getStorageSync('id')// 填入当前用户 openid
}).get({
  success: function(res) {
    console.log(res.data)
    let color=res.data[0]
    let pars={"r":0,"g":100,"b":0}	
    if(color.jrsfqzys==0){//红
      pars={"r":255,"g":0,"b":0}	
  
    }else if(color.sfjcqz==0){//橙色
      pars={"r":255,"g":97,"b":0}	
  
    } else if(color.sfjcys==0){
//黄
      pars={"r":0,"g":100,"b":0}	
  
    }else{
      //吕
      pars={"r":0,"g":100,"b":0}	

    }

      
      that.getcode( res.data[0]._id,pars)
  }
})
   
  
   
  },
  getcode: function (id,pars) { 
    var that=this

    wx.cloud.callFunction({
      name: 'getcode',
      data: {
        page: 'pages/news/news?scene='+id,
        lineColor: pars,
      }
    }).then(res => {
      console.log(res.result);
      if (res.result.status == 0) {
        that.setData({
          qr_url: res.result.tempFileURL
        })
      }else{
        wx.showToast({
          icon: 'none',
          title: '调用失败',
        })
      }
    }).catch(err => {
      console.error(err);
      wx.showToast({
        icon: 'none',
        title: '调用失败',
      })
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

  }
})