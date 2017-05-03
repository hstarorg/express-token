const router = require('express').Router();
const biz = require('./biz');

router.get('/', biz.getHomePage);

router.get('/login', biz.getLoginPage);

router.post('/login', biz.doLogin);

router.post('/logout', biz.doLogout);

router.get('/user', biz.getUser);

module.exports = router;
