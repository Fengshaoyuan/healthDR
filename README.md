**完整小程序请至[微信git](https://git.weixin.qq.com/wx_wx000d5f14535c4623/healthDR)查看，github不再更新**

# EMSS疫情防控系统

## 健康打卡_基于增量1_v1.1
- 继续优化每日打卡，完成度90%
  - 自动获取前一日的打卡信息并初始化问卷内容
  - 不再默认勾选重要的选项
  - 更改了UI,可点击选中范围增大
  - 每日仅可打卡一次
  - 提交时将判断并提示是否已全部填写
  - 可以判断当前位置是否和前一天不同了
  - 更改了data中的数据组织形式，删除了location字段
- 已知问题
 - 锚点功能无效，即提示有问题未填写，无法自动锚点到该问题，原因待查

**示例** 
![teI8K0.png](https://s1.ax1x.com/2020/05/28/teI8K0.png) ![teIWPH.png](https://s1.ax1x.com/2020/05/28/teIWPH.png) ![teITqf.png](https://s1.ax1x.com/2020/05/28/teITqf.png)

## EMSS增量1_v1.0
1. 进一步完善了注册数据时的OpenID唯一性判断
2. 进一步完善了授权模块新增是否已注册判定
3. 制作了个人信息页面
4. 健康码将导向个人信息页面
5. 修改了设置打卡提醒的UI界面
6. 统一了navigationBar的背景色 

## EMSS增量1_v0.9
基本交互已完成  
在 *健康打卡 v1.0* 版本的基础上进行了修改微调，完善了与基础数据模块的衔接：
1. 完善了注册数据时的OpenID唯一性判断
2. 授权模块新增是否已注册判定


### 逻辑问题：
1. 每日健康打卡上报可以重复填写
2. 健康码逻辑判定过于简单
3. 健康码不包括个人信息、时间等要素

### 设计问题：
1. UI设计不统一，各小组**务必采用[WEUI](https://github.com/Tencent/weui-wxss?tdsourcetag=s_pctim_aiomsg)作为设计规范！**
**务必采用[WEUI](https://github.com/Tencent/weui-wxss?tdsourcetag=s_pctim_aiomsg)作为设计规范！**
**务必采用[WEUI](https://github.com/Tencent/weui-wxss?tdsourcetag=s_pctim_aiomsg)作为设计规范！**

### 其他问题：
1. 问卷数据库字段名看不懂

## 健康打卡 v1.0

目前已基本完成开发，实现的功能及演示如下：

**用户登录（由第一小组实现）**

![YfzKns.png](https://s1.ax1x.com/2020/05/18/YfzKns.png) ![YfzMBn.png](https://s1.ax1x.com/2020/05/18/YfzMBn.png)

**每日打卡**

![YfzDN6.png](https://s1.ax1x.com/2020/05/18/YfzDN6.png) ![Yfz63D.png](https://s1.ax1x.com/2020/05/18/Yfz63D.png)

**个人中心**

![Yfzcge.png](https://s1.ax1x.com/2020/05/18/Yfzcge.png)

**健康码**

![YfzWDA.png](https://s1.ax1x.com/2020/05/18/YfzWDA.png)　![YfzTC8.png](https://s1.ax1x.com/2020/05/18/YfzTC8.png)

**设置打卡提醒**

![YfzvEq.png](https://s1.ax1x.com/2020/05/18/YfzvEq.png)

## 健康打卡 v0.4

目前已结合云开发

- 大幅完善了打卡功能
  - 现在可以初始化默认选项了
  - 数据绑定进一步完善
  - 可以上传打卡信息到云数据库了
- 健康码功能完善
  - 自动更新健康码颜色
- 打卡提醒功能完善
  - 可以设置打卡提醒时间了
  - 到时将推送消息至小程序

## 健康打卡 v0.3

- 基本完成了每日打卡功能
 - 目前实现了二级问题的自动隐藏和显示
 - 更新了.js中的data数据组织方式
 - 删除questionItem组件，合并到pages中
 - 获取地理位置使用的api为`http://api.map.baidu.com`暂时还无法在真机上运行，因为此接口不是https，需在自己服务器上配置请求转发，请在编译器中设置`详情-本地设置-不校验合法域名` 

## 健康打卡 v0.2

目前完成的基础功能包括每日打卡、个人中心、健康码(暂时未启用云开发)
- 二维码调用的api为`http://qr.liantu.com/api.php?text=`

# 基础数据子系统

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

# 部署方法

以后再说……
