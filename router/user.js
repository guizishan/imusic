const router = require('koa-router')();//创建路由实例，一般一个功能模块一个路由对象
const userDb = require('../db/userdb');

router.prefix('/user');//给这个路由设置模块路径前缀

// 这个模块主要处理user相关的功能：注册用户
// 请求注册的表单
router.get('/add',async function(ctx,next){
	await ctx.render('addUser');
});
// 请求保存提交的注册表单数据
router.post('/add',async function(ctx,next){
	let user = ctx.request.body;
	//将这个user对象保存到redis
	let db = new userDb();
	db.addUser(user);
	// 给客户端返回响应
	await ctx.render('success',{data:'保存成功'});
});
// 请求登录的表单
router.get('/login',async function(ctx,next){
	await ctx.render('login');
})
// 请求验证登录
router.post('/login',async function(ctx,next){
	let user = ctx.request.body;
	//将这个user对象保存到redis
	let db = new userDb();
	// 等到db.validateUser方法验证的结果出来后，才能给用户响应
	var validKey = await db.validateUser(user);
	console.log(validKey);
	// 给客户端返回响应
	if(validKey){
		await ctx.render('index',{
			user
		});
	}else{
		await ctx.redirect('/user/login');
	}
	
});

module.exports=router;//将这个对象暴露出去