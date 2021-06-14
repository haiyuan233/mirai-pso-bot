module.exports = function ocr(reply, client, Image){

    // 如果有可选参数
    let options = {};
    options["language_type"] = "JAP";
    options["detect_direction"] = "true";
    options["detect_language"] = "true";
    options["probability"] = "true";
    // 带参数调用通用文字识别, 图片参数为远程url图片
    client.generalBasicUrl(Image, options).then(function(result) {
        let json = JSON.parse(JSON.stringify(result))
        let text = '提取结果：'
        json.words_result.forEach(item => {
            text += '\n' + item.words
        })
        reply(text);
    }).catch(function(err) {
        // 如果发生网络错误
        console.log(err);
    })

}
