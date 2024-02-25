# JWT需求规格说明

- [JWT需求规格说明](#jwt需求规格说明)
  - [项目背景及意义](#项目背景及意义)
  - [项目需求](#项目需求)
    - [项目标准化要求](#项目标准化要求)
      - [API返回格式要求](#api返回格式要求)
      - [API地址命名要求](#api地址命名要求)
      - [API的安全访问](#api的安全访问)
    - [项目API需求](#项目api需求)
      - [access-token `/login/accesstoken`](#access-token-loginaccesstoken)
      - [refresh-token `/login/refreshtoken`](#refresh-token-loginrefreshtoken)
      - [退出登录 `/login/exit`](#退出登录-loginexit)
      - [获取所有用户登录记录 `/api/login/log`](#获取所有用户登录记录-apiloginlog)
      - [获取登录失败记录 `/api/login/faillogin`](#获取登录失败记录-apiloginfaillogin)
    - [项目数据库需求](#项目数据库需求)
      - [用户基本信息表](#用户基本信息表)
      - [用户登录记录表](#用户登录记录表)
      - [当前登录中的用户表](#当前登录中的用户表)
      - [失效token记录表](#失效token记录表)
    - [项目管理页面](#项目管理页面)
    - [项目使用框架及工具](#项目使用框架及工具)
  - [评审要点记录](#评审要点记录)
  - [面临问题](#面临问题)
  - [Next work](#next-work)

## 项目背景及意义

JWT项目将作为整个wangtrust.top网站的token授权中心，负责对用户的操作进行授权。项目采取微服务方式，为功能独立的模块独立构建项目，降低整个网站架构的耦合性，提高稳定性。

JWT项目作为econ-sta项目的后续，将作为网站的第一个项目进行实施，其重要性不言而喻。

## 项目需求

### 项目标准化要求

#### API返回格式要求

所有API返回格式均为json格式，状态码无论成功与失败都是200，系统自动处理部分与特殊情况除外。

```json
// 成功实例
{
    "code": 0, 
    "msg": "succeed",
    "data": "exit succeed!"
}

// 失败实例
{
    "code": -1,
    "msg": "token invalid!",
    "data": null
}
```

#### API地址命名要求

API地址命名方式采用：`/api/项目名或代号/api路由`

#### API的安全访问

本项目所有API只能使用https访问，访问时，需要添加`xhr.withCredentials = true;`

### 项目API需求

#### access-token `/login/accesstoken`

用于获取网站权限的凭证，有效期为60m，存放在`localStorage`。

#### refresh-token `/login/refreshtoken`

用于分发cookies。用于保证用户的登录状态，存放在`http-only Cookie`，有效期为7d。

```js
// post访问
var xhr = new XMLHttpRequest();
xhr.responseType = 'json';
xhr.open('POST', testDic.urlhead + '/login/exit');
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.withCredentials = true;
let v1 = {
  username: 'xxx',
  password: '123456'
}
xhr.send(JSON.stringify(v1));
```

#### 退出登录 `/login/exit`

```js
var xhr = new XMLHttpRequest();
xhr.responseType = 'json';
xhr.open('POST', testDic.urlhead + '/login/exit');
xhr.withCredentials = true;
xhr.send();
```

#### 获取所有用户登录记录 `/api/login/log`

#### 获取登录失败记录 `/api/login/faillogin`

### 项目数据库需求

#### 用户基本信息表

```js
const UserModel = new mongoose.Schema({
    uid: Number,
    username: String,
    password: String,
    role: Number,
    aliasname: String,
    signupDate: {
      type: Date,
      default: Date.now
    },
    isDelete: Number,
    oldPassword: String
})
```

#### 用户登录记录表

```js
const UserLoginLogModel = new mongoose.Schema({
    uid: Number,
    username: String,
    refer: String,
    loginTime: {
      type: Date,
      default: Date.now
    },
    platform: String,
    token: String,
    ipaddress: String,
    isDone: Number, // 0登录成功 1登录失败 2退出登录。。。
    isDelete: Number
})
```

#### 当前登录中的用户表

```js
// 仅记录refresh-token，准备存储到Redis中
const LoginingModel = new mongoose.Schema({
    uid: Number,
    username: String,
    token: String,
    platform: String,
    iatTime: {
      type: Date,
      default: Date.now
    },
    expTime: {
      type: Date,
      default: Date.now
    },
})
```

#### 失效token记录表

```js
// 仅记录refresh-token，准备存储到Redis中
const LoginingModel = new mongoose.Schema({
    uid: Number,
    username: String,
    token: String,
    platform: String,
    iatTime: {
      type: Date,
      default: Date.now
    },
    expTime: {
      type: Date,
      default: Date.now
    },
})
```

### 项目管理页面

### 项目使用框架及工具

数据库：Mongoose
框架：express

## 评审要点记录

初次评审要点：数据库表结构合理性

## 面临问题

1. MongoDB的时间格式处理

## Next work

1. 解决引入redis的问题，全部变量挂载使用 -get
2. jwt鉴权，全局中间件拦截实现 -get
3. 退出登录记录 -get
4. refresh记录
5. 当前在线用户统计 -get
6. redis中对数据做定时操作，去除无效token -get
7. redis数据持久化 -get
8. 本地日志记录
9. 路由模块化设计 -get
