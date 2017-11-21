let koa = require('koa');
let views = require('koa-views');
let bodyparser = require('koa-bodyparser');


let singer = require('./router/singer');
let user = require('./router/user');


const app = new koa();

// 添加post请求参数解析器
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
// 配置模板解析器
app.use(views(__dirname + '/views', {
  map: {
    html: 'swig'
  }
}));

app.use(singer.routes());
app.use(user.routes());



app.listen(3000);