import 'reflect-metadata';
import {createConnection} from 'typeorm';
import Koa from 'koa';
import Router from '@koa/router';
import bodyParser from 'koa-bodyparser';
import session from 'koa-session';
import 'dotenv/config'; // 使得process.env.xxx可以获取到.env文件中对应得值
import {AppRoutes} from './routes';
import {sessionConfig} from './config/session.config';

type MethodType = 'get' | 'post' | 'put' | 'delete'

createConnection().then(async connection => {
  const app = new Koa();
  const router = new Router();

  app.keys = ['login secret'];
  app.use(session(sessionConfig, app));

  // 注册路由
  AppRoutes.forEach(route => {
    route.middleware ? router[route.method as MethodType](route.path, ...route.middleware, route.action) :
      router[route.method as MethodType](route.path, route.action);
  });

  app.use(bodyParser());
  app.use(router.routes());
  app.use(router.allowedMethods());
  app.listen(9000);
  console.log('app is running on 9000...');
}).catch((e) => {
  console.log(e);
});
