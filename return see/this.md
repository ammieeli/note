 1.事件触发的元素
        2.函数直接调用  -> window
        3.对象下的this -> 就是对象
        4.定时器下的this指向window
        5.构造函数下的this -> 实例化对象
        6.()=> 的this 指向老爹
        7.undefined  严格模式下
        只要遇到有函数的情况下（也包括函数套函数），this非常容易被修改

document.onclick = fn; //document
      
       function fn(){
           alert(this);
       }
      fn();  window
       let obj = {
           name:'杨',
           fn:function(){
               alert(this.name);
                  console.log(this);//obj
           }
       }
       obj.fn();
    // console.dir(window);
       setTimeout(obj.fn,1000);  //弹'' window自带的name
    document.onclick = function(){
        setTimeout(()=>{
            // new fn();
            "use strict"
            console.log(this);// document
        });
    };
       function fn(){
           "use strict"
           console.log(this); //undefined
       }
      
       let fn = function (){
           "use strict"
           console.log(this); //undefined
       }
       fn();
