/**
 * Created by 圆环之理 on 2019/01/05.
 *
 * 功能：默认配置文件
 *
 */
'use strict';

module.exports = {
  robot: {
    host: '192.168.180.19',
    port: 5700,
    ws_port: 6700
  },
  mysql: {
    host: '119.27.168.74',
    user: 'root',
    password: 'mengyehuanyu123.',
    port: '3306',
    database: 'pokemon'
  },
  collectMoney: ['1', '机器人'],
  mongodb: 'mongodb://119.27.168.74:27017/Pokemon'
};