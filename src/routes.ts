import {welcome} from './controller/welcome';
import CodeController from './controller/code';
import UserController from './controller/user';
import TagController from './controller/tag';

const prefixMap = {
  code: '/code',
  user: '/user',
  tag: '/tag'
};

export const AppRoutes = [
  {path: '/', method: 'get', action: welcome},
  /**
   * Code
   * */
  // 发送验证码
  {path: `${prefixMap.code}/send`, method: 'post', action: CodeController.send},

  /**
   * User
   * */
  // 创建用户
  {path: `${prefixMap.user}/create`, method: 'post', action: UserController.createUser},
  // 用户登录
  {path: `${prefixMap.user}/login`, method: 'post', action: UserController.login},

  /**
   * Tag
   * */
  // 创建标签
  {
    path: `${prefixMap.tag}/create`,
    method: 'post',
    action: TagController.create,
    middleware: [UserController.checkSession]
  },
];
