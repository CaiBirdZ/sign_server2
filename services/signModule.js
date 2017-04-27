/**
 * Created by 11952 on 2017/4/18.
 * 签到模块
 */
const client = require('../config/my-connection').client;

/**
 *签到
 */
exports.sign = async (ctx,next) =>{

  await next();
  const reqData = ctx.request.body;

  client.startTransaction();
  const result = await client.executeTransaction("insert into "+reqData.cpID+"sign_record(jobNo,signDate,signTime) values(?,?,?)",[reqData.jobNo,reqData.date,reqData.time]);
  client.stopTransaction();

  if(result[0]!={}||result[0]!=null){
    return ctx.response.body = {code:'000'};
  }else{
    return ctx.response.body = {code:'003'};
  }
};

/**
 *签出
 */
exports.signOut = async (ctx,next) =>{

  await next();
  const reqData = JSON.parse(ctx.request.body);

  client.startTransaction();
  const result = await client.executeTransaction("update "+reqData.cpID+"sign_record SET signOut=?,remark=? where jobNo=? and signDate=?",[reqData.time,reqData.remark,reqData.jobNo,reqData.date]);
  client.stopTransaction();

  if(result[0]!={}||result[0]!=null){
    return ctx.response.body = {code:'000'};
  }else{
    return ctx.response.body = {code:'003'};
  }
};

/**
 *查询签到记录
 */
exports.getSignRecord = async (ctx,next) =>{

  await next();
  const reqData = ctx.request.body;

  client.startTransaction();
  const result = await client.executeTransaction("select * from "+reqData.cpID+"sign_record where jobNo=? and signDate=?",[reqData.jobNo,reqData.date]);
  client.stopTransaction();

  return ctx.response.body = result[0];
};

/**
 *修正签到记录
 */
exports.modifyRecord = async (ctx,next) =>{

  await next();
  const reqData = ctx.request.body;

  client.startTransaction();
  const signException = await client.executeTransaction("select signTime,signOut from "+reqData.cpID+"sign_record where jobNo = ? AND signDate = ? AND remark='异常'",[reqData.jobNo,reqData.date]);
  if(signException[0]==null||signException[0]=={}){
    return ctx.response.body = {code:'003'};
  }
  const result = await client.executeTransaction("insert into err_record values(?,?,?,?,?,?,'已申请')",[reqData.jobNo,reqData.date,signException[0].signTime,signException[0].signOut,reqData.signTime,reqData.signOut]);
  client.stopTransaction();

  if(result[0]!={}||result[0]!=null){
    return ctx.response.body = {code:'000'};
  }else{
    return ctx.response.body = {code:'003'};
  }
};

module.exports = exports;
