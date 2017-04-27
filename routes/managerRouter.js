/**
 * 管理员模块路由
 * Created by 11952 on 2017/4/19.
 */
const router = require('koa-router')();
const managerModule = require('../services/managerModule');


//登陆
router.get('/',managerModule.loginPage);
router.post('/login',managerModule.login);
//修改密码
router.get('/changePassword',managerModule.changePasswordPage);
router.post('/changePassword/sure',managerModule.changePassword);
//忘记密码
router.get('forgotPassword',managerModule.forgotPasswordPage);
router.post('/forgotPassword/sure',managerModule.forgotPassword);
//注册
router.get('/register',managerModule.registerPage);
router.post('/register/sure',managerModule.register);

module.exports=router;
