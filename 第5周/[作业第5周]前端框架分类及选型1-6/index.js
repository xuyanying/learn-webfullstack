/*
 * @Description: file content
 * @Version: 0.0.1
 * @Author: yanyingxu
 * @Date: 2019-10-29 20:48:02
 * @LastEditors: yanyingxu
 * @LastEditTime: 2019-10-30 03:04:15
 */
const Koa = require('koa');
const Router = require('koa-router')
const cors = require('@koa/cors');
const koaBody = require('koa-body');
const json = require('koa-json');

const app = new Koa();
const router = new Router();

// 路由路径前缀设置
router.prefix('/api')

router.get('/', (ctx, next) => {
    // ctx.router available
    console.log(ctx);
    console.log(ctx.request);
    ctx.body = 'Hello World！！！';
});

// 获取get 请求中的params
router.get('/api', (ctx, next) => {
    // ctx.router available
    // get params
    const params = ctx.request.query
    console.log(params);
    // name:'imoocxyy',age:'22'
    console.log(params.name, params.age);

    // console.log(ctx);
    // console.log(ctx.request);
    // ctx.body = 'Hello World！！！APIAPI';
    ctx.body = {
        name: params.name,
        age: params.age
    }
});

router.get('/async', async (ctx) => {
    let result = await new Promise((resolve) => {
        setTimeout(() => {
            resolve('Hello world 2s later')
        }, 2000);
    })
    ctx.body = result
})

router.post('/post', async (ctx) => {
    let { body } = ctx.request
    console.log(body);
    console.log(ctx.request);
    ctx.body = { ...body }
})

router.post('/user', async (ctx) => {

    let { body } = ctx.request
    console.log(body);
    console.log(ctx.request);
    // name:'imoocxyy',age:'22',email:'imoocxyy@imooc.com'
    let name = body.name
    let email = body.email
    let role = ctx.request.header.role
    if (name && email) {
        if (role == 'admin') {
            // ctx.body = { ...body }
            ctx.body = {
                code: 200,
                data: body,
                msg: '上传成功'
            }
        } else {
            ctx.body = {
                code: 401,
                msg: 'unauthorize posr'
            }
        }
    } else {
        ctx.body = {
            code: 404,
            msg: 'name与email不得为空'
        }
    }

})
// app.use(async ctx => {});

// 中间件是有顺序的，先处理koabody里面的数据，再去处理跨域的请求，最后使用router
app.use(koaBody());
app.use(cors());
// json
app.use(json({ pretty: false, param: 'pretty' }));


// 1. request(请求),method,respond(响应)
// 2. api url => function ,router?
// 3. ctx, async

app.use(router.routes()).use(router.allowedMethods());



app.listen(3000);