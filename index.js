const jwt = require('jsonwebtoken');
const MemoryStore = require('./lib/MemoryStore');

const defaults = {
  ttl: 1000 * 60 * 30, // 30分钟
  saveUninitializedToken: false, // 是否保存未初始化的token
  secret: Math.random().toString(36), // 随机产生安全码
  tokenHeader: 'x-token'
};

let tokenOptions;

/**
 * @param {Object} options
 */
const token = options => {
  let opts = Object.assign({}, defaults, options);

  opts.store = opts.store || new MemoryStore(opts);

  tokenOptions = opts;

  return function token(req, res, next) {
    if (req.method === 'OPTIONS') {
      return next();
    }
    Promise.resolve()
      .then(() => {
        if (typeof opts.getToken === 'function') {
          return opts.getToken(req);
        } else {
          return req.headers[opts.tokenHeader];
        }
      })
      .then(token => {
        console.log(token);
        if (!token) {
          return next();
        }
        opts.store.get(token)
          .then(user => {
            console.log(user);
            req.user = user;
            next();
          });
      })
      .catch(next);
  };
};

token.login = user => {
  let t = jwt.sign(user, tokenOptions.secret);
  tokenOptions.store.set(t, user);
  return Promise.resolve(t);
};

module.exports = token;
