const router = require('koa-router')();
var Redis = require('ioredis');

var options = {
		host:'127.0.0.1',
		port:6379
	};
var client = new Redis(options);
// const redis = require('redis');

router.prefix('/singer');

router.get('/add',async function(ctx,next){
	await ctx.render('addSinger');
});

router.post('/add',async function(ctx,next){
	// 读取获取客户端提交的表单数据
	// 获取请求体
	let singer = ctx.request.body;
	
	// 通过业务对象保存到数据库
	
	
	// singer:1 {}
	// 当singerid不存在的时候，将他初始化为0
	
	// 1.将singerid自增1，2.查询新的singerid,作为新歌手的键的标识3.将新歌手的信息保存到redis中4.给客户端返回响应
	
	add(singer);

	await ctx.render('success',{data:'成功'});
	
});

 async function add(singer){
	await client.setnx('singerid',0);
	var id =await client.incr('singerid');
	 // await client.get('singerid');
	await client.hmset('singer:'+id,singer);
}

module.exports=router;