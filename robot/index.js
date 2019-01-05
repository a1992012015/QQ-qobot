import { request } from '../utils/request';

request.get('http://192.168.0.106:5700/send_private_msg', {
  params: {
    user_id: 838485955,
    message: '你好'
  }
}).then(response => {
  console.log(response.data);
}).catch(error => {
  console.log(error);
});

export default () => {
  console.log('启动机器人');
}