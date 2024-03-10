# jwt-sta需求规格说明

- [jwt-sta需求规格说明](#jwt-sta需求规格说明)
  - [项目背景及意义](#项目背景及意义)
  - [项目需求](#项目需求)
    - [项目标准化要求](#项目标准化要求)
    - [项目API需求](#项目api需求)
      - [access-token `/login/access`](#access-token-loginaccess)
      - [refresh-token `/login/refresh`](#refresh-token-loginrefresh)
      - [退出登录 `/login/exit`](#退出登录-loginexit)
      - [后续API计划](#后续api计划)
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

jwt-sta项目将作为整个wangtrust.top网站的token授权中心，负责对用户的操作进行授权。项目采取微服务方式，为功能独立的模块独立构建项目，降低整个网站架构的耦合性，提高稳定性。

jwt-sta项目作为econ-sta项目的后续，将作为网站的第一个项目进行实施，其重要性不言而喻。

## 项目需求

### 项目标准化要求

1. 项目代号：jwt-sta
2. API返回格式要求：所有API返回格式均为json格式，状态码无论成功与失败都是200，系统自动处理部分与特殊情况除外。

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

3. API地址命名要求：`/api/项目名或代号/api路由`
4. API的安全访问
   1. 本项目所有API只能使用https访问，访问时，需要添加`xhr.withCredentials = true;`
   2. 身份认证在请求头中添加：`Token: 12333xxxxxxxxxxxxxx`

### 项目API需求

#### access-token `/login/access`

用于获取网站权限的凭证，必须携带有效的cookie,有效期为60m，存放在`localStorage`。

```js
Headers: null,
Mothed: POST,
Query: null,
Body: null,
Respones:
  {
    code: 0,
    msg: 'succeed',
    data: {
      token: '12333xxxxxxxxxxxxxx'
    }
  }
```

#### refresh-token `/login/refresh`

用于分发cookies。用于保证用户的登录状态，存放在`http-only Cookie`，有效期为7d。

```js
Headers: null,
Mothed: POST,
Query: null,
Body: {
  username: 'xxx',
  password: '123456'
},
Respones:
  {
    code: 0,
    msg: 'succeed',
    data: { 'ok' }
  }
```

#### 退出登录 `/login/exit`

当前用户退出登录，其cookie将会失效，无法再使用该cookie获取accesstoken。

```js
Headers: null,
Mothed: POST,
Query: null,
Body: null,
Respones:
  {
    code: 0,
    msg: 'succeed',
    data: { 'ok' }
  }
```

#### 后续API计划

- 获取所有用户登录记录 `/api/login/log`
- 获取登录失败记录 `/api/login/faillogin`
- 获取当前登录有效的用户
- 添加用户
- 修改用户
- 删除用户
- 管理员用户验证
- 强制下线用户
- 创建管理页面

### 项目数据库需求

#### 用户基本信息表

包含用户的基本信息，用户判定登录是否成功，使用MongoDB。

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

记录用户的登录行为，存储到MogonDB中，持久化保存。

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
    cookies: String,
    ipaddress: String,
    isDone: Number, // 0登录成功 1登录失败 2退出登录 3access失败 4access成功
    isDelete: Number
})
```

#### 当前登录中的用户表

记录当前有效的refresh-token，即当前在线用户记录，存储在Redis中。

```js
// 
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

记录当前失效refresh-token，存储在Redis中，会定期清理失效token记录。

```js
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

框架：express

数据库：

- MongoDB

使用到的包：

- body-parser
- jsonwebtoken
- cookie-parser
- mongoose

## 评审要点记录

初次评审要点：数据库表结构合理性

## 面临问题

1. MongoDB的时间格式处理

## Next work

1. 解决引入redis的问题，全部变量挂载使用 -get
2. jwt鉴权，全局中间件拦截实现 -get
3. 退出登录记录 -get
4. refresh记录 -get
5. 当前在线用户统计 -get
6. redis中对数据做定时操作，去除无效token -get
7. redis数据持久化 -get
8. 本地日志记录 -get
9. 路由模块化设计 -get
10. 部署生效 -get
