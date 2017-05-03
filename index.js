const uid = require('uid-safe');
const MemoryStore = require('./lib/MemoryStore');

const defaults = {
  ttl: 1000 * 60 * 30, // thirty minutes
  tokenHeader: 'x-token',
  generateToken(req) {
    return uid.sync(24);
  },
  getToken(req, tokenHeader) {
    return req.headers[tokenHeader];
  }
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
        return opts.getToken(req, opts.tokenHeader);
      })
      .then(token => {
        if (!token) {
          return next();
        }
        opts.store.get(token)
          .then(user => {
            req.token = token;
            req.user = user;
            next();
          });
      })
      .catch(next);
  };
};

/**
 * Log in with user
 */
token.login = user => {
  let t = tokenOptions.generateToken(user);
  return tokenOptions.store.set(t, user)
    .then(() => t);
};

/**
 * Log out by token
 */
token.logout = t => {
  return tokenOptions.store.remove(t);
};

module.exports = token;
