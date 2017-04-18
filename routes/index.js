/**
 * 用户路由模块
 */


const router = require('koa-router')();

router.post('/',async (ctx,next) =>{
  await next();
  ctx.render('index',{title:'hello world'});
});


module.exports=router;
