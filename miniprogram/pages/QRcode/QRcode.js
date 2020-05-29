// pages/QRcode/QRcode.js
var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: "",
    realName: "",
    ZJUID: "",
    qr_url:"",
    college: "",
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

    //初始化个人信息
    wx.cloud.callFunction({
      name: 'getUserInfo'
    }).then(res => {
      this.setData({
        realName: res.result.data[0].name,
        ZJUID: res.result.data[0].ZJUID,
        college: res.result.data[0].school,
      })
    })

    this.getinfo()

  },
  getinfo(e) {
    wx.showLoading({
      title: '加载中',
    })
    let that = this
    const db = wx.cloud.database()
    db.collection('HealthData').where({
      _openid:  wx.getStorageSync('id')// 填入当前用户 openid
    }).get({
      success: function(res) {
        let color=res.data[res.data.length-1]
        console.log(res)
        let pars={"r":0,"g":100,"b":0}	
        if(color.jrsfqzys==0){//红色
          pars={"r":255,"g":0,"b":0}

        }else if(color.sfjcqz==0){//橙色
          pars={"r":255,"g":97,"b":0}	

        } else if(color.sfjcys==0){//黄色
          pars={"r":255,"g":222,"b":0}    

        }else{//绿色
          pars={"r":0,"g":100,"b":0}	
          
        }
        that.getcode( res.data[0]._id,pars)
        wx.hideLoading()
      },
      fail: function(res) {
        wx.showModal({
          title: '失败',
          content: '获取二维码失败',
          showCancel: false
        })
        wx.hideLoading()
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