/**
 * 管理员模块
 * Created by 11952 on 2017/4/19.
 */
const client = require('../config/my-connection');

/**
 * 管理员登陆
 */
exports.loginPage = async (ctx,next) => {
  await next();
  ctx.render('index',{title:'登陆'});
}
exports.login = async (ctx,next) =>{
  await next();
  const reqData = JSON.parse(ctx.request.body);

  client.startTransaction();
  let result = await client.executeTransaction("select * from rootuser where userNum = ? and password=?", [reqData.userNo,reqData.password]);
  client.stopTransaction();

  if(result[0]=={}||result[0]==null){
    return ctx.response.body = {code:"0"};
  }else{
    return ctx.response.body = {code:"1",result:result[0].userNum};
  }
}
/**
 * 修改密码
 */
exports.changePasswordPage = async (ctx,next) => {
  await next();
  ctx.render('changePassword',{title:'修改密码'});
}
exports.changePassword = async (ctx,next) =>{
  await next();
  const reqData = JSON.parse(ctx.request.body);

  client.startTransaction();
  const cpKey = await client.executeTransaction("select * from rootuser where userNum=? AND cpKey=?", [reqData.userNum,reqData.cpKey]);
  if(cpKey[0].cpKey==null||cpKey[0].cpKey==""){
    return ctx.response.body = {code:'err'};
  }
  const result = await client.executeTransaction("update rootuser set password=? where userNum = ?", [reqData.password,reqData.userNum]);
  client.stopTransaction();

  if(result[0]=={}||result[0]==null){
    return ctx.response.body = {code:"0"};
  }else{
    return ctx.response.body = {code:"1",result:result[0].userNum};
  }
}
/**
 * 忘记密码
 */
exports.forgotPasswordPage = async (ctx,next) => {
  await next();
  ctx.render('changePassword',{title:'忘记密码'});
}
exports.forgotPassword = async (ctx,next) =>{
  await next();
  const reqData = JSON.parse(ctx.request.body);

  client.startTransaction();
  const cpKey = await client.executeTransaction("select * from rootuser where userNum=? AND cpKey=?", [reqData.userNum,reqData.cpKey]);
  if(cpKey[0].cpKey==null||cpKey[0].cpKey==""){
    return ctx.response.body = {code:'err'};
  }
  const result = await client.executeTransaction("update rootuser set password='123456' where userNum = ?", [reqData.userNum]);
  client.stopTransaction();

  if(result[0]=={}||result[0]==null){
    return ctx.response.body = {code:"0"};
  }else{
    return ctx.response.body = {code:"1",result:result[0].userNum};
  }
}
/**
 * 注册
 */
exports.registerPage = async (ctx,next) => {
  await next();
  ctx.render('changePassword',{title:'注册'});
}
exports.register = async (ctx,next) =>{
  await next();
  const reqData = JSON.parse(ctx.request.body);

  client.startTransaction();
  const userRepeat = await client.executeTransaction("select * from rootuser where userNum = ?", [reqData.userNum]);
  if(userRepeat[0]!=null||userRepeat[0]!={}){
    return ctx.response.body = {code:'userRepeat'};
  }
  const cpKeyExit = await client.executeTransaction("select * from company_data where cpKey = ?", [reqData.cpKey]);
  if(cpKeyExit[0]==null||cpKeyExit[0]=={}){
    return ctx.response.body = {code:'cpKeyNotExit'};
  }
  const result = await client.executeTransaction("insert into rootuser values(?,?,?)", [req.body.userNum,req.body.password,req.body.cpKey]);
  client.stopTransaction();

  if(result[0]=={}||result[0]==null){
    return ctx.response.body = {code:"err"};
  }else{
    return ctx.response.body = {code:"1",result:result[0].userNum};
  }
}
