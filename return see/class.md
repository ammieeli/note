class
          
          
            如果类要接收参数，在constructor中接收
            
        {
            num : num   ===  {num}
        }
        {
            fn:function(){} === { fn(){} }
        }
        fn:function(){}
       
    */
    class Person {
        constructor(name,age){
            this.name = name;
            this.age = age;
        }
        say(){
            alert(this.name);
        }
        runing(){
            alert(this.name + '会跑');
        }
    }
    let p = new Person('小黄黄',18);
    p.runing();//调用
    console.log(p);//对象  只有原型链





    在继承（extends ）的时候，必须在constructor中写super(父类的参数)才能
        有this。
    */
    
    
        //Police继承了Person类对象
    class Police extends Person {
        constructor(name,age,job){
            /*
                super写完之后才能写this
            */
            // this.job = job;  //报错
            super(name,age);
            this.job = job;
        }
        say(){
            alert(this.name+'是个铁');
        }
        kungfu(){
            alert('会毒人,会救人,会查杀');
        }
    }
    let p = new Person('小黄黄',18);
    let p2 = new Police('ag',28,'警察');
    p2.say();//ag是个铁
    p.say();//小黄黄
    p2.kungfu();//会毒人,会救人,会查杀   kungfu()仅属于Police，如果写p.kungfu()会报错
    p2.runing();//ag会跑
    console.log(p2);//实例化对象    只有原型链 Police {name: "ag", age: 28, job: "警察"}
