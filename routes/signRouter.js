/**
 * Created by 11952 on 2017/4/18.
 */
const router = require('koa-router')();
const signModule = require('../services/signModule');


//签到
router.post('/sign',signModule.sign);
//签出
router.post('/sign/signOut',signModule.signOut);
//查询记录
router.post('/sign/getSignRecord',signModule.getSignRecord);
//修正记录
router.post('/sign/modifyRecord',signModule.modifyRecord);

module.exports=router;
