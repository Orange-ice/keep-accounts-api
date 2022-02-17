import nodemailer from 'nodemailer';

// 创建SMTP客户端配置
const config = {
  host: 'smtp.163.com',
  port: 465,
  auth: {
    user: process.env.USERMAIL,
    pass: process.env.USERAUTH
  }
};
// 创建SMTP客户端对象
const transporter = nodemailer.createTransport(config);

/**
 * 发送验证码
 * @param otherMail 目标邮箱地址
 * @param code 验证码
 * */
export const sendMail = (otherMail: string, code: string) => {
  const mail = {
    from: `橙橙记账 <${process.env.USERMAIL}>`,
    subject: '验证码',
    to: otherMail,
    text: `您得验证码是 ${code}`
  };
  transporter.sendMail(mail, (err, info) => {
    if (err) {
      return console.log(err);
    }
    console.log('mail sent:', info.response);
  });
};
