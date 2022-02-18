import {Context} from 'koa';
import {getManager} from 'typeorm';
import {User} from '../entity/User';
import {Code} from '../entity/Code';

class UserController {
  // 创建用户
  async createUser(context: Context) {
    const {username, email, code} = context.request.body;
    const result = await UserController.#validateCode(code, email);
    if (!result) context.throw(400, '验证码有误');

    const userRepository = getManager().getRepository(User);
    const newUser = userRepository.create({
      username: `burt${Math.random() * 10}`.slice(0, 9),
      password: '123456',
      email: `${Math.random() * 10}@163.com`
    });
    await userRepository.save(newUser);

    context.body = newUser;
  }

  // 校验验证码
  static async #validateCode(authCode: string, email: string) {
    const codeRepository = getManager().getRepository(Code);
    const codeObject = await codeRepository.findOne({where: {email}});
    if (!codeObject || codeObject.code !== authCode) {
      return false;
    }
    return Date.now() - new Date(codeObject.updatedAt).getDate() <= 5 * 60 * 1000;

  }
}

export default new UserController();
