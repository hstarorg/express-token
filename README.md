# express-token
Token authentication for express.

前后端分离之后，一般会采用 `rest api` 类似方式来进行数据交互，此时如果用Session认证可能就不是那么合适（当然，也是可以的）。

由于我自己的多个项目都采用了token认证，每次都去实现一套token认证，也是蛮不爽的。so，搞个中间件玩起来。

# How to use

```bash
# 安装
npm i --save express-token

# 使用
const expressToken = require('express-token');

app.use(expressToken());

# 登录的时候
expressToken.login(userInfo)
.then(token => {
  // 此处可拿到token，怎么用，看你需求了。
  console.log(token);
})

```
