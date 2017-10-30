/*
    缓存：
        当前一次请求的地址和后一次请求的地址是一样的，那么有可能会出现缓存（特别是get请求在IE下特别容易被缓存）



        

*/

function ajax(json){
    // console.log(123);
    //默认的配置
    var settings = {
        url:'',
        method:'get',
        success:function(){},
        fail:function(){},
        data:{},
        dataType:'json'
    }

    //有配置走配置，没配置走默认
    for(var attr in json){
        settings[attr] = json[attr]; 
    }

    //序列化操作，把对象转成字符串，可以去看第6个课件
    var arr = [];
    for(var attr in settings.data){
        arr.push(attr + '=' + settings.data[attr]);
    }
    settings.data = arr.join('&');
    var ajax = new XMLHttpRequest;
    // console.log(settings.data);
    if(settings.method === 'get'){
        ajax.open('get',settings.url+'?'+settings.data+'&md='+(new Date().getTime()),true);
        ajax.send();
    }else if(settings.method === 'post'){
        ajax.open('post',settings.url,true);
        ajax.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        ajax.send(settings.data);
    }
    
    ajax.onreadystatechange = function(){
        //4代表完成
        if(ajax.readyState === 4){
            //200-207之前算成功
            if(ajax.status >= 200 && ajax.status <= 207){
                //说明我要json
                if(settings.dataType === 'json'){
                    var d = ajax.responseText;
                    settings.success(eval('('+ d +')'));
                }else if(settings.dataType === 'xml'){
                    settings.success(ajax.responseXML);
                }else if(settings.dataType === 'str'){
                    settings.success(ajax.responseText);
                }
                
            }else{
                settings.fail(ajax.status);
            }
        }
    }
}