const cloud = require('wx-server-sdk')
// 给定 DYNAMIC_CURRENT_ENV 常量：接下来的 API 调用都将请求到与该云函数当前所在环境相同的环境
// 请安装 wx-server-sdk v1.1.0 或以上以使用该常量
cloud.init()
const db = cloud.database()
exports.main = async (event, context) => {
  // collection 上的 get 方法会返回一个 Promise，因此云函数会在数据库异步取完数据后返回结果
  return await db.collection('UserInfo').add({
    // data 字段表示需新增的 JSON 数据
    data: {
      ZJUID: event.ZJUID,
      school: event.school,
      major: event.major,
      class: event.class,
      name: event.name
    }
  })
}