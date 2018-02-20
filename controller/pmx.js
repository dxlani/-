// add metric 获取更多指标
exports.pmx=()=>{

var probe = require('pmx').probe();
var pmx = require('pmx').init({
  network       : true,  //选项将显示入站和出站流量
  ports         : true,  //将显示您的应用程序正在使用的端口
});

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

var metric = probe.metric({
  name  : 'CPU usage',
  value : function() {
    return cpu_usage;
  },
  alert : {
    mode  : 'threshold',
    value : 90,
    msg   : 'Detected over 90% CPU usage', // optional
    action: function() { //optional
      console.error('Detected over 90% CPU usage');
    },
    cmp   : function(value, threshold) { //optional
      return (parseFloat(value) > threshold); // default check
    }
  }
});

}
