// add metric 获取更多指标
exports.pmx=()=>{
var probe = require('pmx').probe();

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