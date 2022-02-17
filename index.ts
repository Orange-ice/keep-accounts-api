import Koa from 'koa';
import 'dotenv/config'; // 使得process.env.xxx可以获取到.env文件中对应得值

const app = new Koa();

app.use((ctx) => {
  ctx.body = 'Success!';
});

app.listen(9000);
console.log('app is running on 9000...');
