### cookie:

是后端的技术，用来记录匹配后端的sessionID的。
保证用户只要在当前浏览器访问页面，登录信息不会被丢失。

cookie是在服务器下运行的。

前端使用一般用来数据存储（配合后端进行一些用户优化）

设置cookie

**每个域名**下一般就多少条（多少个、多少k）

     document.cookie = 'key=value';
            

##### 生命周期:

默认的生命周期就是当前的浏览器彻底关闭，生命结束
        
###### 设置生命周期

获取cookie：
    会把本域名下的所有的cookie一次性都获取出来
            
    name1=hehe; name=mazhi

    分号 + 空格链接

    ["name1=hehe","name=aa"]

    name1,hehe

删除：
    只要生命周期比现在少，就删除