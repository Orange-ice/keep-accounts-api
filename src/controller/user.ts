import {Context} from 'koa';
import {getManager} from 'typeorm';
import {User} from '../entity/User';
import {Code} from '../entity/Code';

class UserController {
  // 创建用户
  async createUser(context: Context) {
    const {username, email, code, password} = context.request.body;
    const userRepository = getManager().getRepository(User);
    // 校验邮箱是否已被注册
    const user = await userRepository.findOne({email});
    if (user) {context.throw(400, '该邮箱已被注册');}

    // 校验验证码
    const result = await UserController.#validateCode(code, email);
    if (!result) context.throw(400, '验证码校验失败');

    const newUser = userRepository.create({
      username,
      password,
      email,
      avatarUrl: `https://api.multiavatar.com/${email}.svg`
    });
    await userRepository.save(newUser);
    // 去除返回对象中的password字段
    const {password: pwd, ...rest} = newUser;
    context.body = rest;
  }

  /**
   * 校验验证码
   * @param authCode 验证码
   * @param email 邮箱地址
   * @return result true校验成功/false校验失败
   * */
  static async #validateCode(authCode: string, email: string) {
    const codeRepository = getManager().getRepository(Code);
    const codeObject = await codeRepository.findOne({where: {email}});
    // 未发送验证码/验证码不匹配
    if (!codeObject || codeObject.code !== authCode) {
      return false;
    }
    // 验证码过期（时效五分钟）
    return Date.now() - new Date(codeObject.updatedAt).getTime() <= 5 * 60 * 1000;

  }
}

export default new UserController();
