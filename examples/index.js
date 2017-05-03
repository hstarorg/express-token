const http = require('http');
const path = require('path');
const express = require('express');
const template = require('art-template-plus');
const app = express();

const expressToken = require('./../');

// config template engine
template.config('base', '');
template.config('extname', '.html');

// define view engine
app.engine('html', template.__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

const router = require('./router');

app.use('/public', express.static(path.join(__dirname, '/public')));

app.use(expressToken());
app.use('/', router);

const server = http.createServer(app);
server.listen(7410, err => {
  if (err) {
    return console.log(err);
  }
  let addr = server.address();
  console.log(`Server started at ${addr.address} ${addr.port}`);
});
