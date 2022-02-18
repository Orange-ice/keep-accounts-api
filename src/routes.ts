import {welcome} from './controller/welcome';
import CodeController from './controller/code';

export const AppRoutes = [
  {path: '/', method: 'get', action: welcome},
  // 发送验证码
  {path: '/code/send', method: 'post', action: CodeController.send},
];
