// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()

  return await db.collection('UserInfo').add({
    // data 字段表示需新增的 JSON 数据
    data: {
      OpenID: event.OpenID,
      ZJUID: event.ZJUID,
      school: event.school,
      major: event.major,
      class: event.class,
      name: event.name
    }
  })
}