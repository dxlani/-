/***
 * 数据库连接池模块
 * 向外提供 pool 对象
 */
const mysql = require('mysql2');

var pool = mysql.createPool({
 // host: '172.17.0.1',    //docker数据库服务器地址
  host: '127.0.0.1',    //本地数据库服务器地址
  user: 'root',         //数据库服务器登录用户名
  // password: '123456', //docker 数据库密码
  password: '',
  database: 'log',
  port: 3306,
  connectionLimit: 10,    //连接池最大容量
  dateStrings: true  //将时间转换为字符串
});

module.exports = pool;
