# express-token
Token authentication for express.

前后端分离之后，一般会采用 `rest api` 类似方式来进行数据交互，此时如果用Session认证可能就不是那么合适（当然，也是可以的）。

由于我自己的多个项目都采用了token认证，每次都去实现一套token认证，也是蛮不爽的。so，搞个中间件玩起来。

# How to use

```bash
# Install
npm i --save express-token

# Use
const expressToken = require('express-token');

app.use(expressToken(options)); // optional options

# When login
expressToken.login(userInfo)
.then(token => {
  // There can get token, you can use it do anything.
  console.log(token);
});

# When logout
expressToken.logout(token)
.then(() => {
  // Logout succeed，do something...
});

# Get token or user info

router.user('/', (req, res, next) => {
  let token = req.token; // Get token
  let user = req.user; // Get user info
  if(!req.user){
    // Not login
  }
});
```

**Options（均为可选参数，默认无需设置）**

* ttl {Number} 单位毫秒，token滑动过期时间，默认30分钟
* tokenHeader {String} 自定义的token header，默认 'x-token'（决定我们从哪个header获取token）
* generateToken {(req: Request) => {}} 生成token的函数，允许返回Promise
* getToken {(req: Request, tokenHeader: string) => {}} 获取token的函数，如果配置了该函数，将不会通过tokenHeader获取token。

示例：

```js
let options = {
  ttl: 1000 * 60 * 60, // 1个小时
  tokenHeader: 'x-test-token', // 默认通过 req.headers['x-test-token'] 获取token
  generateToken(req){ // 自定义token生成函数
    return Math.random().toString(16);
  },
  getToken(req, tokenHeader){ // 自定义获取token
    return req.headers['xxx'];
  }
};
```

# How to develop?

```bash
git clone

# Run dev
npm run dev
```

# How to feedback?

If you find some bug or have some feedback, please [create an issue](https://github.com/hstarorg/express-token/issues/new).

# ChANGELOG

[Click here](CHANGELOG.md) to show more change log.
