// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  try {
    const time = await db.collection('UserInfo').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        //字段名: 所添加新纪录的值
        OpenID: event.OpenID,
        ZJUID: event.ZJUID,
        school: event.school,
        major: event.major,
        class: event.class,
        name: event.name
      }
    })
    //resolve(time)
  }
  catch(e){
    return e
  }
  return 1
}