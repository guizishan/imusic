const router = require('koa-router')();

router.prefix('/singer');

router.get('/add',async function(ctx,next){
	await ctx.render('addSinger');
});

router.post('/add',async function(ctx,next){
	// 读取获取客户端提交的表单数据
	// 获取请求体
	let singer = ctx.request.body;
	console.log(singer);
	// 通过业务对象保存到数据库
});

module.exports=router;