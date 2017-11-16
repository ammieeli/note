### Promise
利用Promise是解决JS异步执行时候回调函数嵌套回调函数的问题， 更简洁地控制函数执行流程.

通过new实例化Promise，  构造函数需要两个参数， 第一个参数为函数执行成功以后执行的函数resolve， 第二个函数为函数执行失败以后执行的函数reject：
    
    new Promise(function(resolve , reject) { });
    
    
例如    
    
    fn("args", function(a) {   
    
        fn1("foo", function(b) {   
        
            fn2("bar", function(c) { 
            
                fn3("baz", function(d) { 
                
                     alert("回调成功，获知的内容为："+a+b+c+d) 
                
                })         
                
            })     
            
        }) 
        
    }) 
     
改为

    new Promise(function(resolve , reject) {     
        resolve(1);  
        
    }).then(function(val) {
        return new Promise(function(resolve , reject) { 
        resolve(2);    
        });  
        
        }).then(function(val) {     
            console.log(val);      
            return new Promise(function(resolve , reject) {         resolve(3);     
                
                });  
            
            }).then(function(val) {
            console.log(val);      
            return new Promise(function(resolve , reject) {         resolve(4);     
                
            });  
                
            }).then(function(val) {
            console.log(val);
            });  
            