1、组件受控
	某些组件有自己的行为，比如input，你输入东西的时候，页面状态就会变化，组件本身的行为
	如果给input一个value值，这样就受到了react的控制，可以通过onchange来setstate 来改变input
	的value。
	非受控组件=>受控组件  变成受控组件，react会让它变得更安全，可以防护某些攻击行为，某些表达式react
	会把他转义。
	
2、合成的事件对象
	event.nativeEvent  ：访问浏览器dom元素的事件对象
	ev.preventDefault
	ev.stopPropagation
	ev.target  拿到真实的dom元素，
	ev.target.value可以拿到input同步输入的内容

3.map方法
	数组下的一个方法，接受一个回调函数，回调函数里面接收的参数是：（元素，索引，数组）。
	回调函数的返回值会替换掉原来的元素，返回一个新的数组。
	原来被遍历的数组没有变化。

4.当把数组写在jsx结构里面，react会自动帮你展开

5.在数组里面的jsx元素应该在最外层的结构有一个key，应该保证相应数据的key是唯一的。
同一份结构永远保证、不管视图如何变化，相同的数据对应同一个key值。

6.组件之间的交流（数据传递），组件之间通过props进行数据传递。react是单向数据流。数据从顶层流向
底层，不能修改props

let props={inputVal,todosData,view}  =>{...props}

7.在元素上面声明ref属性，可以通过组件拿到真实的dom元素
在标签里写 ref="todoContainer"；
=>this.refs.todoContainer.innerHtml='';（现在已经不被推荐使用）
使用： ref={(el)={this.cont=el))

8.（用类声明的）组件的生命周期
mounting 阶段：组件挂载阶段，  出生阶段只能被出生一次 item
updating 阶段： 更新阶段，活着时候阶段 app
unmounting 阶段：卸载 死亡

9.生命周期的函数（挂载会经历四个函数）
  mounting 
	   constructor App被构造
	   componentwillMount   App组件要被挂载执行
	   render           就是那一个执行了，App组件被挂载了
	   componentDidMount    App组件挂载完成,在这个函数里面发起请求
		
		在挂载完成之前，所有的组件都应该render，所有组件render之后，开始依次挂载
		同层级的组件，从先往后挂载，父子级，先挂载子组件，（组件没有被挂载完成，放不到浏览器上，未形成dom，就拿不到实例）
		如果要拿到真实的dom元素，必须在组件挂载完成之后，
		
  updating
       componentWillReceiveProps()奇葩，不会再自身setstate后执行，父组件的render执行，它就会执行
                                  可以在这里setState
       shouldComponentUpdate()决定组件应不应该被更新，默认会返回TRUE，表示永远都可以被更新
       							如果返回FALSE，会阻断render的执行，会拦截这一次更新
       		shouldComponentUpdate(nProps,nState){
//     		  nProps !=this.props;
//     		  nState !=this.nState;
//     		  return true;//执行
				 return false；//阻断更新会优化性能

       		}					
       componentWillUpdate() 更新之前
       render 就是那一刻
       componentDidUpdate() 更新之后

this.props,nprops (新，旧props）
       componentWillUpdate(nprops，nState){
       
			nState.inputVal='32322'(把下一个state改成了另外一个值，只要输入就是固定这个值，但是不能直接改变this，state趣
			      不可以在render（更新阶段）里面setstate,会死循环渲染)
		}
		
unmounting	卸载阶段
	componentWillUnmount（） 卸载之前	
		componentWillUnmount（）{
		}
		


10.promise	异步问题，解决回调函数的噩梦
	Promise是解决JS异步执行时候回调函数嵌套回调函数的问题， 更简洁地控制函数执行流程；  通过new实例化Promise，  构造函数需要两个参数， 第一个参数为函数执行成功以后执行的函数resolve， 第二个函数为函数执行失败以后执行的函数reject：
	
     new Promise(function(resolve , reject) { });


	
11.控制服务器什么时候返回数据，用于知道服务器有没有返回过	
	
12.router
BrowserRouter  使用的是browerHistory  放到最顶层，然后把其他的组件作为children

HashRoute 使用的是hashHistory


Route
	path属性：如果地址匹配到了这个路径，就会显示。
	component属性: 接收一个组件变量。
	Route标签里不能嵌套元素。
	Route会往组件里面存入三个props  ：history location match
	
Link 
	最后会被渲染成a标签链接、
	to的属性：跳转到哪里

	
		
let todosComponent=[1,1,1,6,1].map((elt,indx,arr)=>{
				//elt[1,1,1,6,1]
				return 6+elt;[7,7,7,12,7]
			})
			

		// this.state={
        //     view: 'home'
		// };
		
		// ;[
		// 	this.changeView,
		// ].forEach(fn=>this[fn.name]=fn.bind(this));
	// }
	// changeView(view){
	// 	this.setState({
	// 		view
	// 	})
	// }
