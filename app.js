import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import winston from 'winston'; //日志
import expressWinston from 'express-winston'; //日志中间插件

import indexRouter from './routes';
import robot from './robot';

robot();
const app = express();

app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Credentials', 'true'); //可以带Cookies
  res.header('X-Powered-By', '3.2.1');
  if (req.method === 'OPTIONS') {
    res.send(200);
  } else {
    next();
  }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//正确日志
app.use(expressWinston.logger({
  transports: [
    new (winston.transports.Console)(),
    new winston.transports.File({
      filename: `logs/${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}-success.log` // 根据日期生成日志成功文件
    })
  ]
}));

//错误日志
app.use(expressWinston.errorLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: `logs/${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}-error.log` // 根据日期生成日志错误文件
    })
  ]
}));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
