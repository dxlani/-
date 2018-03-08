const getccplog =require('./getccplog');//ccp接口
const getcsplog =require('./getcsplog');
const gettmslog =require('./gettmslog');
const mailconfig =require('./mailconfig'); //邮件报警配置
const log =require('./log'); //接收前端日志

var express=require('express');

// 创建一个路由对象，此对象将会监听api文件夹下的url
var router=express.Router();

router.use('/getccplog',getccplog);
router.use('/getcsplog',getcsplog);
router.use('/gettmslog',gettmslog);
router.use('/mail',mailconfig);
router.use('/log',log);

module.exports=router;