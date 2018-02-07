组件
   组件的名字首字母要大写
    继承  component === React.Component


        //引入组件
        import React,{Component} from 'react';
        
        class App extends Component {//类 App继承了Component组件
          constructor(){//指向构造函数
            //写了constructor必须写super
            super();
            //this.state 初始化数据的，里面写数据
            //只要this.state的数据发生变化，就会更新页面
            this.state = {
              arr:[1,2,3,4,5,6]
            }
          }
          click = () => {//点击事件用箭头函数写
            let {arr} = this.state;//获取初始化的数据，获取的时候要写花括号
           
            let arr2 = arr.concat();//复制一份出来操作    对象与对象对比，不用覆盖
            arr2.push(Math.random());//添加数据
            /*
              更新数据，通过this.setState()更新
              只要使用this.setState更新，就会渲染页面
            */
            this.setState({
              arr:arr2
            });
            // console.log(arr2);
          }
          render(){//方法
            // console.log(this.state)、、打印在这里打印
                   let lis=this.state.arr.map((e,i)=><li key={i}>{e}</li>);
            return (//里面是结构，不在这里面打印
              <div>
                <div>你好,世界</div>
                //在标签里写的点击事件  C大写 
                <button onClick={this.click}>点击添加</button>
                <ul>
        //        {
                   {lis}
        //          this.state.arr.map((e,i)=><li key={i}>{e}</li>) //也可以这么写
        //        }
                </ul>
              </div>
            )
          }
        }
//导出
export default App;
/*
 * 在app.js里，写你要实现的功能，
 * 首先引入组件  import React,{Component} from 'react';组件的首字母必须大写，从react里继承Component组件
 * class App extends Component  类 app继承组件 Component{}
 *    在组件 Component{}先写上constructor(){}构造函数，再写点击事件（用箭头函数写）等，再写方法render(){}，然后导出变量App
 *
 *     constructor(){}构造函数里首先必须写上super()，再写初始化数据this.state = {arr:[1,2,3,4,5,6]}
 *
 *     点击事件click = () => {}  先从this.state里获取数据let {arr} = this.state，再拷贝一份let arr2=arr.concat();如果要添加数据用爱人如.push()
 *                               引完并拷贝完数据后，通过this.setState()更新，重新渲染页面 this.setState({arr:arr2})
 *         
 *          render(){}把结构放在 return (<button onClick={this.click}>点击添加</button>）里面
     *        在标签里引入便利引入arr 通过引入数据库里的数据，this.state.arr.map((e,i)=><li key={i}>{e}</li>) 标签里必须写key={i}，进行一一对比
     *
     * 然后可以导出变量了export default App，index.js会接收它import App from './reactDemo/App';以及在虚拟dom的方法下ReactDOM.render(     <App/>,
 */



        index.js里关联的内容为
        import App from './reactDemo/App';
        import React from 'react';
        import ReactDOM from 'react-dom';
        ReactDOM.render(
             <App/>,
             document.getElementById('root')
        );
        if(module.hot){
             module.hot.accept();
        }

/*
 * 在index.js里，引入要关联的文件，以及React ReactDOM import ReactDOM from 'react-dom',import引入的时候，首字母要大写 React
 * index.js里必须写的部分为：
 *  if(module.hot){
           module.hot.accept();
    }
   
   引入ReactDOM插件后，
   在虚拟dom树上挂载render（）方法  ，注意是小括号，在小括号里写入要插入的标签<App/>,，然后引入到index.html里document.getElementById('root')
   
 */


仅文件名叫做index.js的这个文件才能关联展示页面,其他index2.js这种,要改成index.js才能使用,同时,只允许有一个index.js

注释用{/*{arr}*/}
