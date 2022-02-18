import {Context} from 'koa';

export const welcome = async (context: Context) => {
  context.body = 'Hello, 这里是橙橙记账。';
};
