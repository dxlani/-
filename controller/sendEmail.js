const nodemailer = require('nodemailer');
// error日志邮件报警
const pool = require('../dbpool');
var sendEmail=(list)=>{
    var level=list.level; //日志等级
    var hostname=list.hostname;  //日志域名
    var time=list.time; //日志记录时间
    var url=list.url;  //日志记录的接口地址
    var msgs=list.msgs; //日志消息
    var openStatus=''; //邮件报警开启状态  
    var sender=""; //发件人
    var accepter=""; //收件人
    var smtp=""; //smtp 密码
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
               console.log('开启状态查询失败,状态:',openStatus);
            }
            })
            conn.release();
      });
}
module.exports = sendEmail;