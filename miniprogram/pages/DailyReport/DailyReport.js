// pages/DailyReport/DailyReport.js
var util = require('../../utils/util.js');

Page({
  radioChange: function (e) {
    let name = e.currentTarget.id
    let index = e.currentTarget.dataset.index
    let str1 = "message." + name
    let str2 = "questionnaire[" + index + "].value"

    if(name == "brcn" && !this.data.todayIfSubmited) {
      this.setData({
        canSubmit: true,
      })
      return
    }

    this.setData({
      [str1]: e.detail.value, 
      [str2]: e.detail.value,
    })

    // 为每次选项更改事件判定，是否选中了会产生二级问题的问题，并更新相应问题的hidden属性，此处语法有待改进
    // 实测直接合并设置this.setData（{})会导致莫名BUG，应该是每次触发函数都判断了的问题
    if(name == "sfzx") {
      this.setData({
      'questionnaire[1].visible': (this.data.message.sfzx == 0),
      })
    }
    if(name == "tw" || name == "sfcxtz") {
      this.setData({
        'questionnaire[9].visible': (this.data.message.sfcxtz == 0 || this.data.message.tw == 0),
      })
    }
    if(name == "sfyyjc") {
      this.setData({
        'questionnaire[10].visible': (this.data.message.sfyyjc == 0),
        'questionnaire[11].visible': (this.data.message.sfyyjc == 0),
        'questionnaire[12].visible': (this.data.message.sfyyjc == 0),
      })
    }
    if(name == "sfjcys") {
      this.setData({
      'questionnaire[14].visible': (this.data.message.sfjcys == 0),
      'questionnaire[17].visible': (this.data.message.sfjcys == 0 || this.data.message.sfjcqz == 0),
      'questionnaire[18].visible': (this.data.message.sfjcys == 0 || this.data.message.sfjcqz == 0),
      })
    }
    if(name == "sfjcqz") {
      this.setData({
      'questionnaire[16].visible': (this.data.message.sfjcqz == 0),
      'questionnaire[17].visible': (this.data.message.sfjcys == 0 || this.data.message.sfjcqz == 0),
      'questionnaire[18].visible': (this.data.message.sfjcys == 0 || this.data.message.sfjcqz == 0),
      })
    }
    if(name == "sfcyglq") {
      this.setData({
      'questionnaire[19].visible': (this.data.message.sfcyglq == 0),
      })
    }
    if(name == "sfcxzysx") {
      this.setData({
      'questionnaire[24].visible': (this.data.message.sfcxzysx == 0),
      })
    }
    if(name == "sfsqhzjkk") {
      this.setData({
      'questionnaire[26].visible': (this.data.message.sfsqhzjkk == 0),
      })
    }
    if(name == "sfzgn") {
      this.setData({
      'questionnaire[28].visible': (this.data.message.sfzgn == 1),
      })
    }
    if(name == "sfymqjczrj") {
      this.setData({
      'questionnaire[29].visible': (this.data.message.sfymqjczrj == 0),
      })
    }
    if(name == "sfyrjjh") {
      this.setData({
      'questionnaire[30].visible': (this.data.message.sfyrjjh == 0),
      'questionnaire[31].visible': (this.data.message.sfyrjjh == 0),
      'questionnaire[32].visible': (this.data.message.sfyrjjh == 0),
      'questionnaire[33].visible': (this.data.message.sfyrjjh == 0),
      'questionnaire[34].visible': (this.data.message.sfyrjjh == 0),
      'questionnaire[35].visible': (this.data.message.sfyrjjh == 0),
      'questionnaire[36].visible': (this.data.message.sfyrjjh == 0),
      'questionnaire[37].visible': (this.data.message.sfyrjjh == 0),
      'questionnaire[38].visible': (this.data.message.sfyrjjh == 0),
      })
    }
  },
  _getLocatin: function(e) {
    var that = this // 方便内部函数调用
    wx.showLoading({
      title: '加载中',
    });
    wx.getLocation({
      success: function (e) {
        console.log(e);
        const url= 'https://api.map.baidu.com/reverse_geocoding/v3/';
        const ak = 'rGWeHc0togunmDu7F38CZnbB67HINaHI';
        //小程序的ajax请求需要在后台安全域名配置增加 开发测试中在详情里勾选-不校验合法域名即可
        wx.request({
          url,
          data: {
            coordtype: 'wgs84ll',
            ak,
            location: `${e.latitude},${e.longitude}`,
            output: 'json',  //格式
          },
          success: function (e){
            console.log(e);
            if(e.data.status == "0"){
              let province = e.data.result.addressComponent.province
              let city = e.data.result.addressComponent.city
              let district = e.data.result.addressComponent.district
              let location = province + " " + city + " " + district
              console.log(location != that.data.questionnaire[3].value && that.data.questionnaire[3].value != null)
              that.setData({
                'questionnaire[4].visible': location != that.data.preLocation && that.data.preLocation != null,
                'message.szdd': location,
                'questionnaire[3].value': location
              });
              console.log(e.data.result.addressComponent)
              wx.hideLoading()
            }else{
              that.setData({
                'message.szdd': '未知位置 Unknown location',
              });
              wx.hideLoading()
            }
          },
          fail: function(e) {
            wx.hideLoading()
            wx.showToast({
              title: '获取位置信息失败',
              icon: 'none',
              duration: 2000
            })
          } 
        })
      }
    })
  },
  dateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e)
    let str2 = "questionnaire[" + e.currentTarget.dataset.index + "].value"
    this.setData({
      [str2]: e.detail.value
    })
  },
  inputChange: function(e) {
    let name = e.currentTarget.id
    let index = e.currentTarget.dataset.index
    let str1 = "message." + name
    let str2 = "questionnaire[" + index + "].value"
    if(e.detail.value != "") {
      this.setData({
      [str1]: e.detail.value, 
      [str2]: e.detail.value,
    })
    }
  },
  formSubmit(e) {
    // 判断是否有问题未填写
    for (let i = 0; i < this.data.questionnaire.length - 1; i++) {
      if(this.data.questionnaire[i].visible && this.data.questionnaire[i].value == null) {
        this.setData({
          toView:'toView' + this.data.questionnaire[i].name,
          topNum: this.data.topNum == 0
        })
        wx.showModal({
          title: '以下问题您还未完成',
          content: this.data.questionnaire[i].desc,
          showCancel: false
        })
        return
      }
    }
    //把数据给云数据库
    const db = wx.cloud.database({})
    const cont = db.collection('HealthData')
    let that = this
    cont.add({
      data: that.data.message,
      success: function (res) {
        wx.showModal({
          title: '成功',
          content: '今日打卡信息已上报',
          showCancel: false,
        })
        that.setData({
          canSubmit: false
        })
      },
      fail: function(res) {
        wx.showModal({
          title: '失败',
          content: '上报失败',
          showCancel: false
        })
      }
    });
  },
  
  /**
   * 页面的初始数据
   */
  data: {
    toView: "sfzx",
    preLocation: null,
    todayIfSubmited: false,
    canSubmit: false, //是否可以点击提交按钮
    // 基础信息和问题选择结果数据，这是用于上传的数据
    message: {
      date: null,
      realName: null,
      ZJUID: null,
      sfzx: null,
      fxyy: null,
      sfzgn: null,
      szdd: null,
      bztcyy: null,
      sffrqjwdg: null,
      sfqtyyqjwdg: null,
      tw: null,
      sfcxtz: null,
      sfyyjc: null,
      jcjgqr: null,
      gcjg: null,
      jcjg: null,
      sfjcys: null,
      jcbhrq: null,
      sfjcqz: null,
      jcqzrq: null,
      sfyqjzgc: null,
      sfcyglq: null,
      sfjcqz: null,
      jrsfqzys: null,
      jrdqtlqk: null,
      sfhsjc: null,
      sfcxzysx: null,
      qksm: null,
      sfsqhzjkk: null,
      sqhzjkkys: null,
      sfymqjczrj: null,
      zjdfgj: null,
      sfyrjjh: null,
      cfgj: null,
      tjgj: null,
      nrjrq: null,
      rjka: null,
      jnmdd: null,
      rjjtfs: null,
      rjjtgjbc: null,
      jnjtfs: null,
      jnjtgjbc: null,
    },
    // 问卷数据
    questionnaire: [
      {
        id: 0,
        type: 1,
        name: "sfzx",
        visible: true,
        desc: "今日是否在校？ Are you on campus today?",
        option: ["是 Yes" ,"否 No"],
        value: null,
      },{
        id: 1,
        type: 2,
        name: "fxyy",
        visible: false,
        desc: "返校原因 Reason for returning to school",
        value: null,
      },{
        id: 2,
        type: 1,
        name: "sfzgn",
        visible: true,
        desc: "所在地点 Your Location",
        option: ["境内 in Chinese Mainland","境外 outside Chinese Mainland"],
        value: null,
      },{
        id: 3,
        type: 3,
        name: "szdd",
        visible: true,
        desc: "所在地点（请打开手机位置功能，并在手机权限设置中选择允许访问位置信息）Your location (Please turn on the location access function on your mobile phone and allow App to access your location)",
        value: null,
      },{
        id: 4,
        type: 1,
        name: "bztcyy",
        visible: false,
        desc: "当前地点与上次不在同一城市，原因如下 Current location is different from last time，why",
        option: ["探亲" ,"旅游" ,"其他" ],
        value: null,
      },{
        id: 5,
        type: 1,
        name: "sffrqjwdg",
        visible: true,
        desc: "今日是否因发热请假未到岗（教职工）或未返校（学生）？ Are you on leave due to fever?",
        option: ["是 Yes" ,"否 No" ],
        value: null,
      },{
        id: 6,
        type: 1,
        name: "sfqtyyqjwdg",
        visible: true,
        desc: "今日是否因发热外的其他原因请假未到岗（教职工）或未返校（学生）？ Are you on leave due to other symptoms except fever?",
        option: ["是 Yes" ,"否 No" ],
        value: null,
      },{
        id: 7,
        type: 1,
        name: "tw",
        visible: true,
        desc: "今日是否有发热症状（高于37.2 ℃）？ Do you have a fever(above 37.2℃) today?",
        option: ["是 Yes" ,"否 No" ],
        value: null,
      },{
        id: 8,
        type: 1,
        name: "sfcxtz",
        visible: true,
        desc: "今日是否有咳嗽、呼吸道不畅、腹泻等其他症状？ Do you have cough, poor respiratory tract, diarrhea and other symptoms today?",
        option: ["是 Yes" ,"否 No" ],
        value: null,
      },{
        id: 9,
        type: 1,
        name: "sfyyjc",
        visible: false,
        desc: "是否到相关医院或门诊检查？ Have you been to hospital or clinic today?",
        option: ["是 Yes" ,"否 No" ],
        value: null,
      },{
        id: 10,
        type: 1,
        name: "jcjgqr",
        visible: false,
        desc: "检查结果属于以下哪种情况？ Choose your test result",
        option: ["疑似感染 With suspected Novel coronavirus pneumonia infection" ,"确诊感染 Confirmed Novel coronavirus pneumonia infection" ,"其他 Other" ],
        value: null,
      },{
        id: 11,
        type: 2,
        naem: "gcjg",
        visible: false,
        desc: "观察或诊疗情况 Doctor's diagnosis",
        value: null,
      },{
        id: 12,
        type: 2,
        naem: "jcjg",
        visible: false,
        desc: "检查结果 Diagnose result",
        value: null,
      },{
        id: 13,
        type: 1,
        name: "sfjcys",
        visible: true,
        desc: "今日是否接触过新冠肺炎疑似感染者？ Have you met suspected Novel coronavirus pneumonia patient today?",
        option: ["是 Yes" ,"否 No" ],
        value: null,
      },{
        id: 14,
        type: 4,
        name: "jcbhrq",
        visible: false,
        desc: "接触疑似人群时间 When did you met the suspected patient today?",
        value: null,
      },{
        id: 15,
        type: 1,
        name: "sfjcqz",
        visible: true,
        desc: "今日是否接触过新冠肺炎感染者？ Have you met confirmed Novel coronavirus pneumonia patient today",
        option: ["是 Yes" ,"否 No" ],
        value: null,
      },{
        id: 16,
        type: 4,
        name: "jcqzrq",
        visible: false,
        desc: "接触确诊人群时间 When did you met the Novel coronavirus pneumonia patient today?",
        value: null,
      },{
        id: 17,
        type: 1,
        name: "sfyqjzgc",
        visible: false,
        desc: "今日是否被当地管理部门要求在集中隔离点医学观察？ Have you been isolated by the local authorities at centralized isolation point for medical observation today?",
        option: ["是 Yes" ,"否 No" ],
        value: null,
      },{
        id: 18,
        type: 1,
        name: "sfcyglq",
        visible: false,
        desc: "今日是否居家隔离观察（居家非隔离状态填否）? Have you been in self-isolation at home today (select No if you are just stay at home but not isolated)?",
        option: ["是 Yes" ,"否 No" ],
        value: null,
      },{
        id: 19,
        type: 4,
        name: "sfjcqz",
        visible: false,
        desc: "观察开始时间 The start time",
        value: null,
      },{
        id: 20,
        type: 1,
        name: "jrsfqzys",
        visible: true,
        desc: "今日是否确诊疑似新冠肺炎？ Have you been diagnosed as suspected Novel coronavirus pneumonia patient?",
        option: ["是 Yes" ,"否 No" ],
        value: null,
      },{
        id: 21,
        type: 1,
        name: "jrdqtlqk",
        visible: true,
        desc: "你是否4月10日后从下列地区返回浙江（含经停）? Did you return to Zhejiang from the following areas after April 10th (including stopovers)？",
        option: ["武汉 Wuhan" ,"湖北（除武汉） Hubei (non-Wuhan regions)" ,"哈尔滨市 Harbin" ,"绥芬河市 Suifenhe" ,"满洲里市 Manzhouli" ,"广州市 Guangzhou" ,"深圳市 Shenzhen" ,"揭阳市 Jieyang" ,"否 None of the above" ],
        value: null,
      },{
        id: 22,
        type: 1,
        name: "sfhsjc",
        visible: true,
        desc: "你是否做过核酸检测？Did you screen by COVID-2019 Nucleic Acid Diagnosis Kit?",
        option: ["是 Yes" ,"否 No" ],
        value: null,
      },{
        id: 23,
        type: 1,
        name: "sfcxzysx",
        visible: true,
        desc: "是否有任何与疫情相关的，值得注意的情况？ Do you have any situation related to the epidemic that deserves attention?",
        option: ["是 Yes" ,"否 No" ],
        value: null,
      },{
        id: 24,
        type: 2,
        name: "qksm",
        visible: false,
        desc: "情况说明 Situation explanation",
        value: null,
      },{
        id: 25,
        type: 1,
        name: "sfsqhzjkk",
        visible: true,
        desc: "是否已经申领校区所在地健康码？Have you got the health code of the city where the campus is located？",
        option: ["是 Yes" ,"否 No" ],
        value: null,
      },{
        id: 26,
        type: 1,
        name: "sqhzjkkys",
        visible: false,
        desc: "今日申领校区所在地健康码的颜色？What's the color of today's health code？",
        option: ["绿码 Green code" ,"红码 Red code" ,"黄码 Yellow code" ,"橙码 Orange code" ],
        value: null,
      },{
        id: 27,
        type: 1,
        name: "sfymqjczrj",
        visible: true,
        desc: "本人家庭成员(包括其他密切接触人员)是否有近14日入境或近14日拟入境的情况？Have your family members (including other close contact persons）entered Chinese Mainland over the past 14 days or plan to enter Chinese Mainland in 14 days?",
        option: ["是 Yes，请及时向所在单位报告实际情况。please contact your college/school immediately","否 No" ],
        value: null,
      },{
        id: 28,
        type: 2,
        name: "zjdfgj",
        visible: false,
        desc: "近14日到访过的国家/地区 Countries you’ve visited over the past 14 days",
        placeholder: "多个用逗号隔开（如德国，荷兰）separate by commas if more than one country (eg: Germany, Netherlands)",
        value: null,
      },{
        id: 29,
        type: 1,
        name: "sfyrjjh",
        visible: false,
        desc: "未来14天内是否有入境计划? Do you have plan to enter Chinese Mainland in the next 14 days?",
        option: ["是 Yes","否 No" ],
        value: null,
      },{
        id: 30,
        type: 2,
        name: "cfgj",
        visible: false,
        desc: "出发国家或地区 Departure country or region?",
        value: null,
      },{
        id: 31,
        type: 2,
        name: "tjgj",
        visible: false,
        desc: "途经国家/地区（直航填无）Transit Country/region? (Enter “no” if direct flights).",
        placeholder: "多个用逗号隔开（如德国，荷兰）separate by commas if more than one country (eg: Germany, Netherlands)",
        value: null,
      },{
        id: 32,
        type: 4,
        name: "nrjrq",
        visible: false,
        desc: "拟入境日期（北京时间） Planned value of arrival",
        value: null,
      },{
        id: 33,
        type: 2,
        name: "rjka",
        visible: false,
        desc: "入境口岸 Port of Entry",
        placeholder: "输入入境口岸（城市） enter port of entry (city)",
        value: null,
      },{
        id: 34,
        type: 2,
        name: "jnmdd",
        visible: false,
        desc: "境内目的地 Destination in Chinese Mainland",
        value: null,
      },{
        id: 35,
        type: 1,
        name: "rjjtfs",
        visible: false,
        desc: "入境交通方式 Mode of transport by which you enter Chinese Mainland",
        option: ["飞机 By plane" ,"火车 By train" , "其他 Other"],
        value: null,
      },{
        id: 36,
        type: 2,
        name: "rjjtgjbc",
        visible: false,
        desc: "入境交通工具班次（航班号，火车车次） Details of the inbound transportation (Flight number, train number)",
        value: null,
      },{
        id: 37,
        type: 1,
        name: "jnjtfs",
        visible: false,
        desc: "境内交通方式 Mode of transport in Chinese Mainland",
        option: ["飞机 By plane" ,"火车 By train" ,"其他 Other"],
        value: null,
      },{
        id: 38,
        type: 2,
        name: "jnjtgjbc",
        visible: false,
        desc: "境内交通工具班次（航班号，火车车次，汽车牌照） Transportation details in Chinese Mainland (Flight number, train number, license plate)",
        placeholder: "多个用逗号隔开 Separate by commas if more than one",
        value: null,
      },{
        id: 39,
        type: 1,
        name: "brcn",
        visible: true,
        option: ["本人承诺：\n上述信息真实准确。如有变化，及时更新相关信息并报告所在单位。\n本人已知晓并将遵守政府和学校相关规定，配合做好疫情防控工作。\nI agree:\nThe above information is true and accurate. In case of changes, I will keep my information upvalued and report in a timely manner.\nI have understood and will abide by the relevant government and University regulations to facilitate the prevention and control of COVID-19 epidemic." ],
        value: null,
      }
    ]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //使用utils获取时间信息
    var DATE = util.formatDate(new Date()) 
    this.setData({
    'message.date': DATE
    })

    
    //初始化个人信息
    wx.cloud.callFunction({
      name: 'getUserInfo'
    }).then(res => {
      this.setData({
        'message.realName': res.result.data[0].name,
        'message.ZJUID': res.result.data[0].ZJUID,
      })
    })

    this.initialization()

  },
  initialization(e) {
    wx.showLoading({
      title: '加载中',
    })

    let that = this
    const db = wx.cloud.database()
    db.collection('HealthData').where({
      _openid:  wx.getStorageSync('id')// 填入当前用户 openid
    }).get({
      success: function(res) {
        console.log(res)
        //获取上次的打卡数据并重写message
        var arr = res.data[res.data.length-1];
        console.log(arr)
        for(var key in that.data.message) {
          // 判断今天是否已经打过卡
          if (key == "date") {
            that.setData({
              'todayIfSubmited': arr.date == that.data.message.date
            })
            continue
          }
          // 初始化message与上次打卡信息同步
          var str = "message." + key
          if(arr[key] != undefined) {
            that.setData({
              [str]: arr[key]
            })
          }
        }
        //记录上次打卡位置
        that.setData({
          'preLocation': that.data.message.szdd
        })
        //初始化问卷信息
        for (let i = 0; i < that.data.questionnaire.length; i++) {
          var name = that.data.questionnaire[i].name
          var value = arr[name]
          if (value == undefined) {
            continue
          }
          
          var strx = "questionnaire[" + i +"].value"
          that.setData({
            [strx]: value
          })
        }

        that.setData({
          // 将用户需手动勾选的选项值置为null
          'questionnaire[0].value': null,
          'questionnaire[3].value': null,
          'questionnaire[25].value': null,
          'questionnaire[26].value': null,
          'questionnaire[27].value': null,

          // 页面初始化,二级问题是否显示取决于一级问题是否默认选中
          'questionnaire[1].visible': (that.data.questionnaire[0].value == 0),
          'questionnaire[9].visible': (that.data.questionnaire[6].value == 0 || that.data.questionnaire[7].value == 0),
          'questionnaire[10].visible': (that.data.questionnaire[9].value == 0),
          'questionnaire[11].visible': (that.data.questionnaire[9].value == 0),
          'questionnaire[12].visible': (that.data.questionnaire[9].value == 0),
          'questionnaire[14].visible': (that.data.questionnaire[13].value == 0),
          'questionnaire[16].visible': (that.data.questionnaire[15].value == 0),
          'questionnaire[17].visible': (that.data.questionnaire[13].value == 0 || that.data.questionnaire[14].value == 0),
          'questionnaire[18].visible': (that.data.questionnaire[13].value == 0 || that.data.questionnaire[14].value == 0),
          'questionnaire[19].visible': (that.data.questionnaire[18].value == 0),
          'questionnaire[24].visible': (that.data.questionnaire[20].value == 0),
          'questionnaire[26].visible': (that.data.questionnaire[25].value == 0),
          'questionnaire[28].visible': (that.data.questionnaire[2].value == 1),
          'questionnaire[29].visible': (that.data.questionnaire[27].value == 0),
          'questionnaire[30].visible': (that.data.questionnaire[29].value == 0),
          'questionnaire[31].visible': (that.data.questionnaire[29].value == 0),
          'questionnaire[32].visible': (that.data.questionnaire[29].value == 0),
          'questionnaire[33].visible': (that.data.questionnaire[29].value == 0),
          'questionnaire[34].visible': (that.data.questionnaire[29].value == 0),
          'questionnaire[35].visible': (that.data.questionnaire[29].value == 0),
          'questionnaire[36].visible': (that.data.questionnaire[29].value == 0),
          'questionnaire[37].visible': (that.data.questionnaire[29].value == 0),
          'questionnaire[38].visible': (that.data.questionnaire[29].value == 0),
        })
      wx.hideLoading()
      },
      fail: function(res) {
        wx.showModal({
          title: '提示',
          content: '未查询到上次的打卡信息',
          showCancel: false
        })
        wx.hideLoading()
      }
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