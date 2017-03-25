const expressToken = require('./../');

const getHomePage = (req, res, next) => {
  res.render('home');
};

const getLoginPage = (req, res, next) => {
  res.render('login');
};

const doLogin = (req, res, next) => {
  expressToken.login({ username: 'Jay', userid: 1 })
    .then(token => {
      res.send({
        token
      });
    });
};

const getUser = (req, res, next) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.end();
  }
};

module.exports = {
  getHomePage,
  getLoginPage,
  doLogin,
  getUser
};
