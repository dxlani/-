const nodemailer = require('nodemailer');
// error日志邮件报警
const pool = require('../dbpool');
var sendEmail=(list)=>{
    var level=list.level;
    var hostname=list.hostname;
    var time=list.time;
    var url=list.url;
    var msgs=list.msgs;
    var openStatus='';
    var sender="";
    var accepter="";
    var smtp="";
    pool.getConnection((err, conn)=> {
        if(err){
            console.log('err1',err);
            return ;
        }
        conn.query(
         "SELECT * FROM email_config",
          (err, result)=> {
              if(err){
                  console.log('updateErr',err);
                  return ;
              }
                 if(result.length>0){ //条件查询 ，找到数据
                    openStatus=result[0].open;
                    sender=result[0].sender;
                    accepter=result[0].accepter;
                    smtp=result[0].smtp;
                    console.log(level,openStatus,sender,time)
                    if(level=="error" && openStatus=="1"){
                        var transporter = nodemailer.createTransport({
                            service: 'qq',
                            port: 465, // SMTP 端口
                            secureConnection: true, // 使用 SSL
                            auth: {
                                user: sender,
                                //这里密码不是qq密码，是你设置的smtp密码
                                pass: smtp
                            }
                        });
                        
                        var mailOptions = {
                            from: sender, // 发件地址
                            to: accepter, // 收件列表
                            subject: hostname+"错误日志", // 标题
                            //text和html两者只支持一种
                           // text:"时间：["+time+"]["+url+"]:"+msgs, // 内容
                            html:`<p>域名：${hostname}</p><p>时间：${time}</p><p>页面：${url}</p><p>错误信息：${msgs}</p>`
                        };
                        
                        transporter.sendMail(mailOptions, function(error, info){
                            if(error){
                                return console.log(error);
                            }
                            console.log('Message sent: ' + info.response);
                        
                        });
                    }
            }else {  
               console.log('开启状态查询失败',openStatus);
            }
            })
            conn.release();
      });
console.log('level',level);
console.log('openStatus',openStatus);
console.log('sender',sender);
    
  
}
module.exports = sendEmail;