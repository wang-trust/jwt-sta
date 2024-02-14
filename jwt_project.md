# JWT需求规格说明

- [JWT需求规格说明](#jwt需求规格说明)
  - [1 项目背景及意义](#1-项目背景及意义)
  - [2 项目需求](#2-项目需求)
    - [2.1 项目API需求](#21-项目api需求)
      - [2.1.1 access-token `/api/login/accesstoken`](#211-access-token-apiloginaccesstoken)
      - [2.1.2 refresh-token `/api/login/refreshtoken`](#212-refresh-token-apiloginrefreshtoken)
      - [2.1.3 退出登录 `/api/login/exit`](#213-退出登录-apiloginexit)
      - [2.1.4 获取所有用户登录记录 `/api/login/log`](#214-获取所有用户登录记录-apiloginlog)
      - [2.1.5 获取登录失败记录 `/api/login/faillogin`](#215-获取登录失败记录-apiloginfaillogin)
    - [2.2 项目数据库需求](#22-项目数据库需求)
      - [2.2.1 用户基本信息表](#221-用户基本信息表)
      - [2.2.2 用户登录记录表](#222-用户登录记录表)
      - [2.2.3 当前登录中的用户表](#223-当前登录中的用户表)
      - [2.2.4 失效token记录表](#224-失效token记录表)
    - [项目管理页面](#项目管理页面)
    - [项目使用框架及工具](#项目使用框架及工具)
  - [评审要点记录](#评审要点记录)
  - [面临问题](#面临问题)

## 1 项目背景及意义

JWT项目将作为整个wangtrust.top网站的token授权中心，负责对用户的操作进行授权。项目采取微服务方式，为功能独立的模块独立构建项目，降低整个网站架构的耦合性，提高稳定性。

JWT项目作为econ-sta项目的后续，将作为网站的第一个项目进行实施，其重要性不言而喻。

## 2 项目需求

### 2.1 项目API需求

#### 2.1.1 access-token `/api/login/accesstoken`

用于获取网站权限的凭证，有效期为60m，存放在`localStorage。

#### 2.1.2 refresh-token `/api/login/refreshtoken`

用于保证用户的登录状态，存放在`http-only Cookie`，有效期为7d。

#### 2.1.3 退出登录 `/api/login/exit`

#### 2.1.4 获取所有用户登录记录 `/api/login/log`

#### 2.1.5 获取登录失败记录 `/api/login/faillogin`

### 2.2 项目数据库需求

#### 2.2.1 用户基本信息表

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

#### 2.2.2 用户登录记录表

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
    isDone: Number,
    isDelete: Number
})
```

#### 2.2.3 当前登录中的用户表

```js
// 仅记录refresh-token，准备存储到Redis中
const LoginingModel = new mongoose.Schema({
  uid: Number,
    username: String,
    token: String,
    platform: String,
    loginTime: {
      type: Date,
      default: Date.now
    },
    duration: Number
})
```

#### 2.2.4 失效token记录表

```js
// 仅记录refresh-token，准备存储到Redis中
const discardTokenModel = new mongoose.Schema({
    uid: Number,
    username: String,
    token: String,
    loginTime: {
      type: Date,
      default: Date.now
    },
    duration: Number
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
