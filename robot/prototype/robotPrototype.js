import config from 'config-lite'; //获取基本信息
import moment from 'moment';
import { request } from '../../utils/request';

const { robot: robotPrototype } = config(__dirname);

const defaultCallback = (data) => console.log(data);

const callRobot = ({ name, data }, successCallback = defaultCallback, errorCallback = defaultCallback) => {
  request.get(`http://${robotPrototype.host}:${robotPrototype.port}/${name}`, { params: data }).then(response => {
    typeof successCallback === 'function' ? successCallback(response) : defaultCallback(response);
  }).catch(error => {
    typeof errorCallback === 'function' ? errorCallback(error) : defaultCallback(error);
  });
};

const getNowTime = (endTime) => {
  const years = moment().get('year');
  const month = moment().get('month') + 1 >= 10 ? moment().get('month') + 1 : `0${moment().get('month') + 1}`;
  const day = moment().get('date') >= 10 ? moment().get('date') : `0${moment().get('date')}`;
  const futureTime = moment(`${years}-${month}-${day}T${endTime}`).utc().valueOf();
  const newTime = moment().utc().valueOf();
  const time = futureTime - newTime;
  if (time < 0) {
    return true;
  }
  // const nowHour =
  //   moment(time).utc().get('hour') >= 10
  //     ? moment(time).utc().get('hour')
  //     : `0${moment(time).utc().get('hour')}`;
  // const nowMinute =
  //   moment(time).utc().get('minute') >= 10
  //     ? moment(time).utc().get('minute')
  //     : `0${moment(time).utc().get('minute')}`;
  // const nowSecond =
  //   moment(time).utc().get('second') >= 10
  //     ? moment(time).utc().get('second')
  //     : `0${moment(time).utc().get('second')}`;
  return false;
};

export {
  callRobot,
  getNowTime
};