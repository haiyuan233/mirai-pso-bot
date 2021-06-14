// 定时器
module.exports = function scheduleJs(schedule, bot, message, id){
    const scheduleCronstyle = (bot, message, id)=>{
        //每分钟的第30秒定时执行一次:
        schedule.scheduleJob('30 * * * * *',()=>{
            bot.sendFriendMessage(message, id);
            console.log('scheduleCronstyle:' + new Date());
        });
    }
    scheduleCronstyle(bot, message, id)
}
