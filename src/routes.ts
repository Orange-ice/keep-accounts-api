import {welcome} from './controller/welcome';
import CodeController from './controller/code';

const prefixMap = {
  code: '/code',
  user: '/user'
};

export const AppRoutes = [
  {path: '/', method: 'get', action: welcome},
  // 发送验证码
  {path: `${prefixMap.code}/send`, method: 'post', action: CodeController.send},
];
