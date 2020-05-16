# EMSS疫情防控系统

## 基础数据v0.2.0

2020/05/10：小程序登陆界面 (v1.0) 已经全部完成

### 云函数 `getOpenID` 

用于获取用户唯一标识的OpenID：

```js
wx.cloud.callFunction({
  name: 'getOpenID',
  complete: res => {
    OpenID = res.result.userInfo.openId;    //var OpenID=""
  }
})
```
**使用云函数时，务必注意需要用 `npm install --save wx-server-sdk@latest` 安装依赖**

### 云函数 `addUserInfo2Colud`

用于上传新用户的个人数据至云数据库：

- 函数

    ```js
    // 云函数入口文件
    const cloud = require('wx-server-sdk')
    cloud.init()
    // 云函数入口函数
    exports.main = async (event, context) => {
      const db = cloud.database()
      return await db.collection('UserInfo').add({
        // data 字段表示需新增的 JSON 数据
        // 通过 event 实现变量传递
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
    ```

- 调用方式

    ```js
    wx.cloud.callFunction({
            name: 'addUserInfo2Cloud',    //声明调用的云函数
            data: {
              //字段名: 所添加新纪录的值
              OpenID: OpenID,
              ZJUID: inputInfo.ZJUID,
              school: inputInfo.school,
              major: inputInfo.major,
              class: inputInfo.class,
              name: inputInfo.name
            }
          }).then(res => {
            console.log("upload result:", res)
          })
          .catch(console.error)
    ```

    


## 基础数据v0.1.0
- 建立了5个主要的tabBar，请各小组基于5个tabBar界面进行开发：
  - 可视化：疫情信息 / vi
  - 健康打卡：健康打卡 / questionnaire ;  健康码 / QR
  - 新闻发布： 疫情新闻 / news
  - 周边服务： 周边服务 / circu
- 对登陆逻辑进行了修改， 健康码/QR 页面设计了判断用户是否授权的函数，请务必**不要删除**, 后期考虑结合用户信息数据库进一步完善该判定函数
- signup界面的信息上传还没写 （咕咕咕

## 基础数据v0.0.1
- 搭建了授权界面 (permission)
- 搭建了初次登陆时的用户信息完善界面 (signup)：
  - 用户信息上传待完善
- 完善了登陆逻辑

# 健康打卡子系统

## 健康打卡 v0.3

- 基本完成了每日打卡功能
 - 目前实现了二级问题的自动隐藏和显示
 - 更新了.js中的data数据组织方式
 - 删除questionItem组件，合并到pages中
 - 获取地理位置使用的api为`http://api.map.baidu.com`暂时还无法在真机上运行，因为此接口不是https，需在自己服务器上配置请求转发，请在编译器中设置`详情-本地设置-不校验合法域名` 

## 健康打卡 v0.2

目前完成的基础功能包括每日打卡、个人中心、健康码(暂时未启用云开发)
 
### 每日打卡

![YEMMPP.png](https://s1.ax1x.com/2020/05/06/YEMMPP.png)![YEMQ8f.png](https://s1.ax1x.com/2020/05/06/YEMQ8f.png)

### 个人中心

![YElTUA.png](https://s1.ax1x.com/2020/05/06/YElTUA.png)

### 健康码

二维码调用的api为`http://qr.liantu.com/api.php?text=`
右图为美化~~丑化~~版
![YE1i80.png](https://s1.ax1x.com/2020/05/06/YE1i80.png) ![YElbCt.png](https://s1.ax1x.com/2020/05/06/YElbCt.png)
