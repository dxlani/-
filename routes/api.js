const getccplog =require('./getccplog');//ccp接口
const getcsplog =require('./getcsplog');
const gettmslog =require('./gettmslog');

var express=require('express');

// 创建一个路由对象，此对象将会监听api文件夹下的url
var router=express.Router();

router.use('/getccplog',getccplog);
router.use('/getcsplog',getcsplog);
router.use('/gettmslog',gettmslog);

module.exports=router;