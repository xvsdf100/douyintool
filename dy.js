var https = require("https");
function GetDouyinWatermarkApi(url,call_back){
    try{
        var option = {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36 Edg/100.0.1185.44',
                'accept': 'accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                'accept-language': ' zh-CN,zh;q=0.9',
            }
        };

        https.get(url, option, function(res){
            var html='';
            res.on('data',function(data){
                html+=data;
            });
            
            res.on('end',function(){

                try{
                    if(res.statusCode == 302){
                        console.log("headers:" + this.headers.location);
                        var locaiton = this.headers.location;
                        console.log("跳转的地址:" + locaiton);
                        var id = GetVideoIDFromUrl(locaiton);
                        console.log('id:' + id)
                        var url_info = "https://www.iesdouyin.com/web/api/v2/aweme/iteminfo/?item_ids=" + id;
                        console.log("构建url:" + url_info)
                        GetDouyinWatermarkApi(url_info, call_back);
                    }else{
                        var raw_url = GetDouYinData(html);
                        console.log("获取的真正的地址:" + raw_url);
                        call_back(raw_url);
                    }
                }catch(err){
                    reuslt = "";
                    console.error("错误信息:" + err)
                    call_back(reuslt);
                }

            });

        });
    }catch(err){
        reuslt = "";
        console.error("错误信息:" + err)
        call_back(reuslt);
    }
}

function GetVideoIDFromUrl(url){
    var find_key = "/share/video/";
    if(url != null && url.length > 0){
        var find_pos = url.indexOf(find_key);

        if(find_pos != -1){
            find_pos += find_key.length;
            var new_url = url.substring(find_pos);
            var str_array = new_url.split("/");
            if(str_array.length > 0){
                return str_array[0];
            }
        }
    }
    
    return "";
}

function GetDouYinData(data){
    var raw_url = "";
    if(data != null && data.length > 0){
        console.log("解析的数据:" + data)
        var vedio_info = JSON.parse(data);
        raw_url = vedio_info['item_list'][0]['video']['play_addr']['url_list'][0];
        raw_url = raw_url.replace("playwm", "play")
    }

    return raw_url;
}

var real_url = "";
    function GetQueryKey(raw_key){
    if(raw_key != null && raw_key.length > 0){
        str = raw_key;
        str = str.match("(https?|ftp|file)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]");
        if(str != null){
            real_url = str[0];
        }else{
            return null;
        }

        var content = GetDouyinQueryData(raw_key);
        if(content == null || content.length == 0){
            return null;
        }

        return {"url": real_url, "content": content};
    }

    return null;
}

function GetDouyinQueryData(raw_key){
    if(raw_key != null){
        var start_index = 0;
        if(start_index >= 0){
            var end_index  = raw_key.indexOf("https://");
            if(end_index != -1 && end_index > start_index){
                return raw_key.substring(start_index, end_index);
            }
        }
    }

    return null;
}


GetDouyinWatermarkApi('https://v.douyin.com/NEpF8Sy/',(real_url)=>{
    console.log(real_url);
})