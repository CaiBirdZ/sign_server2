/**
 * Created by 11952 on 2017/4/18.
 * 用户模块
 */
const client = require('../config/my-connection').client;
const url = require('url');
const topClient = require("../scripts/topClient").TopClient;


/**
 *获取验证码
 */
exports.getIdentifyCode = async (ctx,next) => {
  await next();
  let idCode = "";
  const reqData = ctx.request.body;

  client.startTransaction();
  let user = await client.executeTransaction("select * from user_info,company_data where jobNo = ?",[reqData.userNo]);
  client.stopTransaction();
  if(user==[]){
    return ctx.response.body = {noUser:"1"};
  }

  for(let i = 0;i<4;i++){
    idCode += Math.floor(Math.random()*10);
  }

  let topclient = new topClient({
    'appkey':'23662936',
    'appsecret':'dfee5c7cc4c12137b2860ddf4cd59e3d',
    'REST_URL':'http://gw.api.taobao.com/router/rest'
  });
  topclient.execute('alibaba.aliqin.fc.sms.num.send',
    {
      'sms_type':'normal',
      'sms_free_sign_name':'爱签',
      'sms_param':'{\"emName\":\"张闯\",\"number\":'+'\"'+idCode+'\"'+'}',
      'rec_num':reqData.emTel,
      'sms_template_code':'SMS_53530126'
    },
    function (error,response) {
      if(!error){
        console.log(response);
        return ctx.response.body = {okCode:"1",messageCode:idCode};
      }
      else{
        console.log(error);
        return ctx.response.body = {errCode:"1"};
      }

    });
}


/**
 *登陆
 */
exports.loginByJobNo = async (ctx,next) =>{
  await next();
  console.log(ctx.request.body);
  const reqData = ctx.request.body;

  client.startTransaction();
  let userInfo = await client.executeTransaction("select * from user_info,company_data where jobNo = ?",[reqData.userNo]);
  client.stopTransaction();

  if(userInfo[0]=={}||userInfo[0]==null){
      return ctx.response.body = {code:'003'};
  }else if(userInfo[0].password === reqData.password){
      return ctx.response.body = {code:'000',result:userInfo};
  }else{
      return ctx.response.body = {code:'002'};
  }
};

exports.loginByTel = async (ctx,next) =>{
  await next();
  console.log(ctx.request.body);
  const reqData = ctx.request.body;

  client.startTransaction();
  let userInfo = await client.executeTransaction("select * from user_info,company_data where emTel = ?",[reqData.emTel]);
  client.stopTransaction();

  if(userInfo[0]=={}||userInfo[0]==null){
    return ctx.response.body = {code:'003'};
  }else if(userInfo[0].password === reqData.password){
    return ctx.response.body = {code:'000',result:userInfo};
  }else{
    return ctx.response.body = {code:'002'};
  }
};


/**
 * 修改密码
 */
exports.changePw = async (ctx,next) => {
  await next();
  const reqData = ctx.request.body;
  client.startTransaction();
  const result = await client.executeTransaction("update user_info set password=? where emTel=?", [reqData.newPassword,reqData.emTel]);
  client.stopTransaction();

  console.log(result);
  if(result[0]!=null||result[0]!={}){
    return ctx.response.body = {code:'000'};
  }else{
    return ctx.response.body = {code:'003'};
  }
}

/**
 *密码找回
 */
exports.forgotPw = async (ctx,next) => {
  await next();
  const reqData = ctx.request.body;

  client.startTransaction();
  const result = await client.executeTransaction("update user_info set password='123456' where emTel=?", [reqData.emTel]);
  client.stopTransaction();

  console.log(result);
  if(result[0]!=null||result[0]!={}){
    return ctx.response.body = JSON.stringify({code:'000'});
  }else{
    return ctx.response.body = {code:'003'};
  }
}


/**
 *修改个人信息
 */
exports.modifyInfo = async (ctx,next) => {
  await next();
  const reqData = ctx.request.body;

  client.startTransaction();
  const result = await client.executeTransaction("update user_info set jobNo=?,emName=?,department=?,emTel=?,email=? where jobNo = ?;",
            [reqData.jobNo,reqData.emName,reqData.department,reqData.emTel,reqData.email,reqData.oldJobNo]);
  client.stopTransaction();

  console.log(result);
  if(result[0]!=null||result[0]!={}){
    return ctx.response.body = {code:'000'};
  }else{
    return ctx.response.body = {code:'003'};
  }
}


module.exports=exports;
