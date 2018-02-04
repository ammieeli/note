jsx语法
    js XML ->  一种js的语法扩展
  在react中使用jsx描述用户界面

用法：
    在ReactDOM render()里
1.顶层只能有一个标签
2.class都要写成classname <div className="active" > {arr}</div> 
3.{}

  {}包裹的内容
  （1）标签里可直接写入js代码，用花括号{}包裹
    （2）如果是数组，花括号{}会扩展开  
    
    let arr=[1,2,3,4];    <div> {arr}</div> 
    
    在页面上会扩展开arr里面的参数1 2 3 4  
    
    数组里也可以写代码[<p>123</p>,<p>11</p>]
    
    （3）单标签必须加反斜线/   <input/>


            let arr=[1,2,3,4];
        ReactDOM.render(
             <div>      
                   <div>你好,世界</div>
                   <div className="active">
                        {alert(1)}
                   </div>
                    <ul>
                        arr.map((e,i)=><li key={i}>{e}</li>)     //写key是进行一一对比,才不报错
                   </ul>
        
             </div>,
             document.getElementById('root'),
             function(){
                   console.log('完成')
             }
        );
