// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  try {
    console.log("try")
    db.collection('UserInfo').where({
        OpenID: event.OpenID,
      })
      .get({
        success: function (res) {
          // res.data 是包含以上定义的两条记录的数组
          console.log("res",res)
          console.log("res.data",res.data)
          console.log("size", res.data.size)
          return res.data
        },
        fail: function(res){
          console.log("fail", res)
        }   
      })
    //resolve(time)
  } catch (e) {
    console.log("catch",e)
    return e
  }
  return -1
}