// add metric 获取更多指标
exports.pmx=()=>{
var pmx = require('pmx').init({
  network       : true,  //选项将显示入站和出站流量
  ports         : true,  //将显示您的应用程序正在使用的端口 
}); 
var probe = pmx.probe();

var meter = probe.meter({
  name      : 'req/sec',
  samples   : 1,
  timeframe : 60
});

http.createServer(function(req, res) {
  meter.mark();
  res.end({success:true});
});


var histogram = probe.histogram({
  name        : 'latency',
  measurement : 'mean'
});

var latency = 0;

setInterval(function() {
  latency = Math.round(Math.random() * 100);
  histogram.update(latency);
}, 100);
}
