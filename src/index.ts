import 'reflect-metadata';
import {createConnection} from 'typeorm';
import Koa from 'koa';
import 'dotenv/config'; // 使得process.env.xxx可以获取到.env文件中对应得值
import {createUser} from './controller/user';

createConnection().then(async connection => {
  const app = new Koa();

  app.use(createUser);

  app.listen(9000);
  console.log('app is running on 9000...');
});
