import config from 'config-lite';
import chalk from 'chalk';

const { collectMoney } = config(__dirname);

const getAnswer = (message) => {
  const data = JSON.parse(message.utf8Data);
  if (data.message_type === 'group') {
    console.log(chalk.blue(`group => ${data.message}`));

    const flag = collectMoney.filter(item => data.message.includes(item));
    if (flag.length > 0) {
      return JSON.stringify({
        action: 'send_group_msg',
        params: {
          group_id: data.group_id,
          message: '机器人正在建造中，打开支付宝首页搜"569464998"红包支支持[CQ:face,id=14]',
          auto_escape: false
        }
      });
    }

    if (data.message === '破杯子') {
      return JSON.stringify({
        action: 'send_group_msg',
        params: {
          group_id: data.group_id,
          message: '[CQ:at,qq=384158669]快帮我买！我要做测试！',
          auto_escape: false
        }
      });
    }
  } else if (data.message_type === 'private') {
    console.log(chalk.blue(`private => ${data.message}`));

    if (data.message === '名字') {
      return JSON.stringify({
        action: 'send_private_msg',
        params: {
          user_id: data.user_id,
          message: 'Garnet',
          auto_escape: false
        }
      });
    }
  } else {
    console.log(chalk.cyan(`data => ${JSON.stringify(data)}`));
    return false;
  }
};

export {
  getAnswer
};