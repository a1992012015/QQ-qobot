import chalk from 'chalk';
import config from 'config-lite'; //获取基本信息
import { client as WebSocketClient } from 'websocket';

import { callRobot, getNowTime } from './prototype/robotPrototype';
import { getAnswer } from './models/robotModels';

const { robot } = config(__dirname);
const webSocketClient = new WebSocketClient();

webSocketClient.on('connectFailed', function(error) {
  console.log(chalk.red('Connect Error: ' + error.toString()));
});

webSocketClient.on('connect', function(connection) {
  console.log(chalk.green('WebSocket Client Connected...\n'));
  connection.on('error', function(error) {
    console.log(chalk.red('Connection Error: ' + error.toString()));
  });
  connection.on('close', function() {
    console.log(chalk.magenta('echo-protocol Connection Closed'));
  });
  connection.on('message', function(message) {
    console.log(chalk.yellow('========================================'));
    const params = getAnswer(message);
    params && connection.send(params);
  });
});

webSocketClient.connect(`ws://${robot.host}:${robot.ws_port}/`);

callRobot({
  name: 'send_private_msg',
  data: {
    user_id: 838485955,
    message: 'QQ Robot 启动完成。。。'
  }
});

const timer = setInterval(() => {
  if (getNowTime('07:50:00')) {
    callRobot({
      name: 'send_private_msg',
      data: {
        user_id: 838485955,
        message: '必须起床啦！！！！！！！！'
      }
    });
    clearInterval(timer);
  }
}, 1000);

export default () => {
  console.log(chalk.cyan('Starting the development server...\n'));
  console.log(chalk.cyan('QQ Robot Starts...\n'));
}