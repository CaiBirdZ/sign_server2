/**
 * 用户路由模块
 */


const router = require('koa-router')();
const userModule = require('../services/userModule');


//登陆
router.post('/users/loginByJobNo',userModule.loginByJobNo);
router.post('/users/loginByTel',userModule.loginByTel);

//修改密码
router.post('/users/changePw',userModule.changePw);
//找回密码
router.post('/users/forgotPw',userModule.forgotPw);
//修改个人信息
router.post('/users/modifyInfo',userModule.modifyInfo);
//获取验证码
router.post('/users/getCode',userModule.getCode);


module.exports=router;
