// 云函数入口文件
const cloud = require('wx-server-sdk')
var userinfo = []
var failinfo = ["fail", "fail!"]

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const openid = wxContext.OPENID
  console.log("finding")
  console.log(openid)
  return db.collection('UserInfo').where({
      OpenID: openid
    })
    .get({
      complete: res => {
        userinfo = userinfo.concat(res.data)
        console.log(res.data)
        //return res.data
      },
      fail: function (res) {
        //return failinfo
      }
    })
  return userinfo
}