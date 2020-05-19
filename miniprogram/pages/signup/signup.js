// miniprogram/pages/signin/signin.js
const app = getApp()
//用于存储用户输入的个人信息
var inputInfo = {
  ZJUID: "",
  school: "地球科学学院",
  major: "地理信息科学",
  class: "",
  name: ""
}
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
    //学院/学园列表
    schools: ["地球科学学院", "丹青学园", "其他"],
    schoolIndex: 0,
    //专业列表
    majors: [
      ["地理信息科学", "人文地理与城乡规划", "地球信息科学与技术", "地质学", "大气科学"],
      ["理科试验班", "理科试验班（生环化地）", "人文科学试验班", "人文科学试验班（外语）", "人文科学试验班（传媒）", "社会科学试验班"],
      ["其他"]
    ],
    majorIndex: 0,
    idErr: false,
    nameErr: false,
    classErr: false,
    ErrMessage: "",
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
          console.log(res);
          var avatarUrl = 'userInfo.avatarUrl';
          var nickName = 'userInfo.nickName';
          that.setData({
            [avatarUrl]: res.userInfo.avatarUrl,
            [nickName]: res.userInfo.nickName,
          })
        }
      }),

      // 调用云函数 getOpenID 来获取用户OpenID并存储
      // if 报错：https://blog.csdn.net/New_Yao/article/details/84657774
      wx.cloud.callFunction({
        name: 'getOpenID',
        complete: res => {
          //console.log("OpenID: ", res.result.userInfo.openId);
          OpenID = res.result.userInfo.openId;
        }
      })
    // 数据更新
    this.setData(Page.data)
  },

  // 学院选择内容的更变
  bindSchoolChange: function (e) {
    this.setData({
      schoolIndex: e.detail.value,
      majorIndex: 0
    });
    // 每次更变记录选择的学院，存入inputInfo对象
    inputInfo.school = this.data.schools[this.data.schoolIndex];
    console.log('picker school 发生选择改变，携带值为', inputInfo.school);
  },
  // 专业选择内容的更变
  bindMajorChange: function (e) {
    this.setData({
      majorIndex: e.detail.value
    })
    // 每次更变记录选择的专业，存入inputInfo对象
    inputInfo.major = this.data.majors[this.data.schoolIndex][this.data.majorIndex];
    console.log('picker school 发生选择改变，携带值为', inputInfo.major);
  },
  // 响应学号输入内容的更变
  bindZjuIdBlur: function (e) {
    console.log('input ZJUID 输入完成，携带值为', e.detail.value);
    // 每次更变记录输入的学号，存入inputInfo对象
    inputInfo.ZJUID = e.detail.value;
  },
  // 响应姓名输入内容的更变
  bindNameBlur: function (e) {
    console.log('input name 输入完成，携带值为', e.detail.value);
    // 每次更变记录输入的姓名，存入inputInfo对象
    inputInfo.name = e.detail.value;
  },
  // 响应班级输入内容的更变
  bindClassBlur: function (e) {
    console.log('input class 输入完成，携带值为', e.detail.value);
    // 每次更变记录输入的班级，存入inputInfo对象
    inputInfo.class = e.detail.value;
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

  /**
   * 确定按钮
   */
  btnclick: function (e) {
    // 判断学号输入是否正确
    if (inputInfo.ZJUID.length != 10) {
      this.setData({
        idErr: true
      });
      console.log("学工号填写有误");
    } else {
      this.setData({
        idErr: false
      });
    }
    // 判断姓名输入是否正确
    if (inputInfo.name == "") {
      this.setData({
        nameErr: true
      });
      console.log("姓名未填写完整");
    } else {
      this.setData({
        nameErr: false
      });
    }
    // 判断班级输入是否正确
    if (inputInfo.class.length != 4) {
      this.setData({
        classErr: true
      });
      console.log("班级填写有误");
    } else {
      this.setData({
        classErr: false
      });
    }
    // 判断信息是否填写有误，有误则提示，同时不上传数据
    if (this.data.idErr || this.data.nameErr || this.data.classErr) {
      this.setData({
        ErrMessage: "个人信息填写有误或不完整"
      })
      return
    }

    // 调用云函数 addUserInfo2Cloud，将用户信息上传到云数据库 UserInfo
    wx.cloud.callFunction({
        name: 'addUserInfo2Cloud',
        data: {
          OpenID: OpenID,
          ZJUID: inputInfo.ZJUID,
          school: inputInfo.school,
          major: inputInfo.major,
          class: inputInfo.class,
          name: inputInfo.name
        }
      }).then(res => {
        if (res.result != 1) {
          console.log("upload failed!", res.result)
          this.setData({
            ErrMessage: "个人信息填写有误：该学/工号已注册"
          })
          return
        } else {
          console.log("upload result:", res)
          console.log("用户信息注册完成:", inputInfo)
          // 进入主界面
          wx.switchTab({
            url: '/pages/PersonalCenter/PersonalCenter'
          })
        }
      })
  }
})