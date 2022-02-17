import Koa from 'koa';
const app = new Koa();

app.use((ctx) => {
    ctx.body = 'Success!';
})

app.listen(9000);
console.log('app is running on 9000...');
