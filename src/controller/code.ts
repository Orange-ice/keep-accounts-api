import {Context} from 'koa';
import {getManager} from 'typeorm';
import {Code} from '../entity/Code';
import {sendMail} from '../utils/mailer';

class CodeController {
  // 发送验证码
  async send(context: Context) {
    const {email} = context.request.body as { email: string };

    const codeRepository = getManager().getRepository(Code);
    // 随机生成六位数验证码
    const authCode = Math.random().toString().slice(-6);
    const codeItem = await codeRepository.findOne({email})
    if(codeItem){
      // 修改
      codeItem.code = authCode
      await codeRepository.save(codeItem);
    }else{
      // 新增
      const newEmail = codeRepository.create({email, code: authCode});
      await codeRepository.save(newEmail);
    }

    // 向目标邮箱发送验证码
    sendMail(email, `
        <p>您好！</p>
        <p>您正在注册橙橙记账的账号</p>
        <p>您的验证码是：<strong style="color: #3296fa;">${authCode}</strong></p>
        <p>***该验证码5分钟内有效***</p>
    `);

    context.status = 204;
  }
}

export default new CodeController();
