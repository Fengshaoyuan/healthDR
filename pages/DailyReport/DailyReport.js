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
    location: "",
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
        desc: "所在地点（请打开手机位置功能，并在手机权限设置中选择允许访问位置信息）Your location (Please turn on the location access function on your mobile phone and allow App to access your location)"
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
      },{
        type: 1,
        name: "sffrqjwdg",
        hidden: false,
        desc: "今日是否因发热请假未到岗（教职工）或未返校（学生）？ Are you on leave due to fever?",
        option: [
          { id: 1, value: "是 Yes" },
          { id: 2, value: "否 No" }
        ]
      },{
        type: 1,
        name: "sfqtyyqjwdg",
        hidden: false,
        desc: "今日是否因发热外的其他原因请假未到岗（教职工）或未返校（学生）？ Are you on leave due to other symptoms except fever?",
        option: [
          { id: 1, value: "是 Yes" },
          { id: 2, value: "否 No" }
        ]
      },{
        type: 1,
        name: "tw",
        hidden: false,
        desc: "今日是否有发热症状（高于37.2 ℃）？ Do you have a fever(above 37.2℃) today?",
        option: [
          { id: 1, value: "是 Yes" },
          { id: 2, value: "否 No" }
        ]
      },{
        type: 1,
        name: "sfcxtz",
        hidden: false,
        desc: "今日是否有咳嗽、呼吸道不畅、腹泻等其他症状？ Do you have cough, poor respiratory tract, diarrhea and other symptoms today?",
        option: [
          { id: 1, value: "是 Yes" },
          { id: 2, value: "否 No" }
        ]
      },{
        type: 1,
        name: "sfyyjc",
        hidden: true,
        desc: "是否到相关医院或门诊检查？ Have you been to hospital or clinic today?",
        option: [
          { id: 1, value: "是 Yes" },
          { id: 2, value: "否 No" }
        ]
      },{
        type: 1,
        name: "jcjgqr",
        hidden: true,
        desc: "检查结果属于以下哪种情况？ Choose your test result",
        option: [
          { id: 1, value: "疑似感染 With suspected Novel coronavirus pneumonia infection" },
          { id: 2, value: "确诊感染 Confirmed Novel coronavirus pneumonia infection" },
          { id: 3, value: "其他 Other" }
        ]
      },{
        type: 2,
        naem: "gcjg",
        hidden: true,
        desc: "观察或诊疗情况 Doctor's diagnosis",
        answer: ""
      },{
        type: 2,
        naem: "jcjg",
        hidden: true,
        desc: "检查结果 Diagnose result",
        answer: ""
      },{
        type: 1,
        name: "sfjcbh",
        hidden: false,
        desc: "今日是否接触过新冠肺炎疑似感染者？ Have you met suspected Novel coronavirus pneumonia patient today?",
        option: [
          { id: 1, value: "是 Yes" },
          { id: 2, value: "否 No" }
        ]
      },{
        type: 1,
        name: "jcbhrq",
        hidden: true,
        desc: "接触疑似人群时间 When did you met the suspected patient today?",
        answer: ""
      },{
        type: 1,
        name: "sfjcqz",
        hidden: false,
        desc: "今日是否接触过新冠肺炎感染者？ Have you met confirmed Novel coronavirus pneumonia patient today",
        option: [
          { id: 1, value: "是 Yes" },
          { id: 2, value: "否 No" }
        ]
      },{
        type: 1,
        name: "jcqzrq",
        hidden: true,
        desc: "接触确诊人群时间 When did you met the Novel coronavirus pneumonia patient today?",
        answer: ""
      },{
        type: 1,
        name: "sfyqjzgc",
        hidden: true,
        desc: "今日是否被当地管理部门要求在集中隔离点医学观察？ Have you been isolated by the local authorities at centralized isolation point for medical observation today?",
        option: [
          { id: 1, value: "是 Yes" },
          { id: 2, value: "否 No" }
        ]
      },{
        type: 1,
        name: "sfcyglq",
        hidden: true,
        desc: "今日是否居家隔离观察（居家非隔离状态填否）? Have you been in self-isolation at home today (select No if you are just stay at home but not isolated)?",
        option: [
          { id: 1, value: "是 Yes" },
          { id: 2, value: "否 No" }
        ]
      },{
        type: 1,
        name: "sfjcqz",
        hidden: true,
        desc: "观察开始时间 The start time",
        answer: ""
      },{
        type: 1,
        name: "jrsfqzys",
        hidden: false,
        desc: "今日是否确诊疑似新冠肺炎？ Have you been diagnosed as suspected Novel coronavirus pneumonia patient?",
        option: [
          { id: 1, value: "是 Yes" },
          { id: 2, value: "否 No" }
        ]
      },{
        type: 1,
        name: "jrdqtlqk",
        hidden: false,
        desc: "你是否4月10日后从下列地区返回浙江（含经停）? Did you return to Zhejiang from the following areas after April 10th (including stopovers)？",
        option: [
          { id: 1, value: "武汉 Wuhan" },
          { id: 2, value: "湖北（除武汉） Hubei (non-Wuhan regions)" },
          { id: 3, value: "哈尔滨市 Harbin" },
          { id: 4, value: "绥芬河市 Suifenhe" },
          { id: 5, value: "满洲里市 Manzhouli" },
          { id: 6, value: "广州市 Guangzhou" },
          { id: 7, value: "深圳市 Shenzhen" },
          { id: 8, value: "揭阳市 Jieyang" },
          { id: 9, value: "否 None of the above" }
        ]
      },{
        type: 1,
        name: "sfhsjc",
        hidden: false,
        desc: "你是否做过核酸检测？Did you screen by COVID-2019 Nucleic Acid Diagnosis Kit?",
        option: [
          { id: 1, value: "是 Yes" },
          { id: 2, value: "否 No" }
        ]
      },{
        type: 1,
        name: "sfcxzysx",
        hidden: false,
        desc: "是否有任何与疫情相关的，值得注意的情况？ Do you have any situation related to the epidemic that deserves attention?",
        option: [
          { id: 1, value: "是 Yes" },
          { id: 2, value: "否 No" }
        ]
      },{
        type: 2,
        name: "qksm",
        hidden: true,
        desc: "情况说明 Situation explanation",
        answer: ""
      },{
        type: 1,
        name: "sfsqhzjkk",
        hidden: false,
        desc: "是否已经申领校区所在地健康码？Have you got the health code of the city where the campus is located？",
        option: [
          { id: 1, value: "是 Yes" },
          { id: 2, value: "否 No" }
        ]
      },{
        type: 1,
        name: "sqhzjkkys",
        hidden: true,
        desc: "今日申领校区所在地健康码的颜色？What's the color of today's health code？",
        option: [
          { id: 1, value: "绿码" },
          { id: 2, value: "黄码" },
          { id: 3, value: "橙码" },
          { id: 4, value: "红码" }
        ]
      },{
        type: 1,
        name: "sfymqjczrj",
        hidden: false,
        desc: "本人家庭成员(包括其他密切接触人员)是否有近14日入境或近14日拟入境的情况？Have your family members (including other close contact persons）entered Chinese Mainland over the past 14 days or plan to enter Chinese Mainland in 14 days?",
        option: [
          { id: 1, value: "是 Yes，请及时向所在单位报告实际情况。please contact your college/school immediately"},
          { id: 2, value: "否 No" }
        ]
      },{
        type: 2,
        name: "zjdfgj",
        hidden: true,
        desc: "近14日到访过的国家/地区 Countries you’ve visited over the past 14 days",
        answer: ""
      },{
        type: 1,
        name: "sfyrjjh",
        hidden: true,
        desc: "未来14天内是否有入境计划? Do you have plan to enter Chinese Mainland in the next 14 days?",
        option: [
          { id: 1, value: "是 Yes"},
          { id: 2, value: "否 No" }
        ]
      },{
        type: 2,
        name: "cfgj",
        hidden: true,
        desc: "出发国家或地区 Departure country or region?",
        answer: ""
      },{
        type: 2,
        name: "tjgj",
        hidden: true,
        desc: "途经国家/地区（直航填无）Transit Country/region? (Enter “no” if direct flights).",
        answer: ""
      },{
        type: 2,
        name: "nrjrq",
        hidden: true,
        desc: "拟入境日期（北京时间） Planned date of arrival",
        answer: ""
      },{
        type: 2,
        name: "rjka",
        hidden: true,
        desc: "入境口岸 Port of Entry",
        answer: ""
      },{
        type: 2,
        name: "jnmdd",
        hidden: true,
        desc: "境内目的地 Destination in Chinese Mainland",
        answer: ""
      },{
        type: 1,
        name: "rjjtfs",
        hidden: true,
        desc: "入境交通方式 Mode of transport by which you enter Chinese Mainland",
        option: [
              { id: 1, type: "飞机 By plane" },
              { id: 2, type: "火车 By train" },
              { id: 3, type: "其他 Other" }
            ]
      },{
        type: 2,
        name: "rjjtgjbc",
        hidden: true,
        desc: "入境交通工具班次（航班号，火车车次） Details of the inbound transportation (Flight number, train number)",
        answer: ""
      },{
        type: 1,
        name: "jnjtfs",
        hidden: true,
        desc: "境内交通方式 Mode of transport in Chinese Mainland",
        option: [
              { id: 1, type: "飞机 By plane" },
              { id: 2, type: "火车 By train" },
              { id: 3, type: "其他 Other" }
            ]
      },{
        type: 1,
        name: "sfsqhzjkk",
        hidden: false,
        desc: "是否已经申领校区所在地健康码？Have you got the health code of the city where the campus is located？",
        option: [
          { id: 1, value: "是 Yes" },
          { id: 2, value: "否 No" }
        ]
      },{
        type: 2,
        name: "jnjtgjbc",
        hidden: true,
        desc: "境内交通工具班次（航班号，火车车次，汽车牌照） Transportation details in Chinese Mainland (Flight number, train number, license plate)",
        answer: ""
      }
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