// add metric 获取更多指标
exports.pmx=()=>{

var probe = require('pmx').probe();
var pmx = require('pmx').init({
  network       : true,  //选项将显示入站和出站流量
  ports         : true,  //将显示您的应用程序正在使用的端口
});
var counter = 0;

var metric = probe.metric({
  name    : 'Realtime user',
  value   : function() {
    return counter;
  }
});

setInterval(function() {
  counter++;
}, 100);
}
