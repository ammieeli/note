有五步：

0-4

***0是监控不到的 ，到了第五步说明完成

0 － （未初始化）还没有调用send()方法 
1 － （载入）已调用send()方法，正在发送请求 
2 － （载入完成）send()方法执行完成，已经接收到全部响应内容 
3 － （交互）正在解析响应内容 
4 － （完成）响应内容解析完成，可以在客户端调用了   

onreadystatechange 每当完成一步就执行一次 

如果把onreadystatechange放在send之前，那么可以监听到第2步，
但是意义不大，因为4之前的步骤，前端都拿不到数据，只有第五步的时候
前端才能有数据。

ajax.readyState查看当前到了第几步。

    ajax.onreadystatechange = function(){
      
        if(ajax.readyState === 4){
            //alert(ajax.responseText);
            if(ajax.status >= 200 && ajax.status <= 207){
                alert(ajax.status);
            }else{
                alert('失败');
            }
            
        }
    }