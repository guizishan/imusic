// 封装和user相关的redis操作
var Redis = require('ioredis');

var options = {
		host:'127.0.0.1',
		port:6379
	};

function UserDb(){
	this.client = new Redis(options);
}

UserDb.prototype.addUser = async function(user){
	// 1.将singerid自增1，2.查询新的singerid,作为新歌手的键的标识3.将新歌手的信息保存到redis中
	await this.client.setnx('userid',0);//如果userid这个key不存在，就把它初始化为0
	var id =await this.client.incr('userid');//递增userid
	console.log(id);
	await this.client.hmset('user:'+id,user);//使用
}

// 根据用户提交的用户信息，和redis数据库中所有的以user开头的key对应的值的对象进行比较，如果在redis中找到一个，说明登录成功
UserDb.prototype.validateUser = async function(user){
	var loginUser = null;
	// 使用箭头函数，要不然里面的this指向就变了
	await this.client.keys('user:*').then(keys=>{
		
		// for(let key of keys){
		// 	this.client.hgetall(key).then(function(value){
		// 		if(user.name === value.name && user.pwd === value.pwd){

		// 			loginUser = {
		// 				key:key,
		// 				name:user.name
		// 			};
		// 		}
		// 	},function(err){
		// 		console.log(err);
		// 	});
			
		// }
		await keys.forEach(async (key,index)=>{
			await this.client.hgetall(key).then(function(value){
				if(user.name === value.name && user.pwd === value.pwd){
					loginUser = {
						key:key,
						name:user.name
					};
				}
			},function(err){
				console.log(err);
			});
		});
	});
	return loginUser;
}



module.exports = UserDb;

