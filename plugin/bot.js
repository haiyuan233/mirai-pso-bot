const baiduApi = require('./ocr/baiduApi')
module.exports = function bot(client, bot, Plain, At){

    bot.onMessage(async message => {
        const { type, sender, messageChain, reply, quoteReply } = message;
        let msg = '';
        // console.log('sender', sender)
        // console.log('messageChain', messageChain)
        messageChain.forEach(chain => {

            if (chain.type === 'Plain')
                msg += Plain.value(chain);       // 从 messageChain 中提取文字内容
        });

        // 直接回复
        if (msg.includes('#识别')) {
            messageChain.forEach(chain => {
                if (chain.type === 'Image')
                    baiduApi(reply, client, chain.url)
            });
        }
            // reply('收到了收到了');                          // 或者: bot.reply('收到了收到了', message)
        // 引用回复
        else if (msg.includes('#引用我'))
            quoteReply([At(sender.id), Plain('好的')]);     // 或者: bot.quoteReply(messageChain, message)
        // 撤回消息
        else if (msg.includes('#撤回'))
            bot.recall(message);
        // 发送图片，参数接受图片路径或 Buffer
        else if (msg.includes('#来张图'))
            bot.sendImageMessage("./image.jpg", message);
    });
}
