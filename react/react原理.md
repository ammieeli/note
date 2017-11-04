### 1. react 运行原理

基于React进行开发时所有的DOM构造都是通过虚拟DOM进行，
每当数据变化时，React都会重新构建整个DOM树，
然后React将当前整个DOM树和上一次的DOM树进行对比，
得到DOM结构的区别，然后仅仅将需要变化的部分进行实际的浏览器DOM更新。


### *2. 声明 react 的组件
继承了 React.Component 的类就是一个组件
    至少有一个 render 方法
        这个方法应该 return 一份 jsx 的对象,
        这就是这个组件的样子
        
### *3. jsx 语法

自定义组件（是对象，react元素）要大写开头，
	内置组件（对象，用react createlement创建出来的，返回出来的是一个对象，对react来说是一个组件）小写开头
	jsx本身就可以是一个表达式
	在jsx里面使用{}表示表达式
	标签之间的内容就叫children，如果是类的组件的标签，它的children通过实例（this）的props.children拿到.
     class关键词要转成calssName, for变成htmlFor,应该是驼峰式的书写方式
     
相邻的jsx元素，必须包含在一个闭合的标签里面
     
     
jsx 的语法 
    
    let jsx=(
    	<div>
    		<span>React</span>
    	</div>
    );
    
	ReactDOM.render(
		jsx,
		document.getElementById('root')
	)

	
### 4. 把 jsx 渲染到页面

reactDOM.render
    
##### 5. virtual DOM 的概念 怎么来的
virtual DOM对比速度很快，操作dom时候，页面渲染的慢，浏览器重新绘制界面慢
	
   就是以前每次数据发生变化，就重新执行一次整体渲染。
   而 React 给出了解决方案，就是 Virtual DOM。
   在数据和真实 DOM 之间建立了一层缓冲。
   数据变化了就调用 React 的渲染方法，
   而 React先生成 Virtual DOM，
   与上一次渲染得到的 Virtual DOM 进行比对，
   在渲染得到的 Virtual DOM 上发现变化，
   然后将变化的地方更新到真实 DOM 上。

### 6. this.props.children
   this.props.children 的值有三种可能：如果当前组件没有子节点，它就是 undefined ;
   如果有一个子节点，数据类型是 object ；
   如果有多个子节点，数据类型就是 array 。使用React.Children.map来遍历子节点，不用担心数据类型。
   它表示组件的所有子节点
   
### 关于 webpack
html-webpack-plugin 自动创建 html 文件
clean-webpack-plugin 清理某一个文件夹在打包之前

### 关于css-loader
    
引入css文件使用这个 loader处理它
	   遇到url或者@import（比如创建一个b.css）  帮你去引入里面的资源，
	   引入资源的过程中，更根据资源的类型再使用相应的loader去处理
	   
### 关于file-loader
   处理资源（字体，图片，视频），
   转换出一个路径，把资源搬到输入目录里
   
   props react的属性
   undefined,B布尔值，none是不会渲染到页面上的	   
   
	children 使用this.props传递属性
	<content a='8' child=function(){
	   (
	     console.log(a)
	   )
	}></content>
	let{a,children}=this.props;


class App extends Component{//初始化实例
	constructor(props){
		super(props);
		this.counter=0;//初始化
		this.state={}//App有了组件的内部的状态，里面可以是任何值
	}
	



通过this.setState改变组件内部状态，这个时候页面会更新，
因为组件的render执行了，得到了一份新的jsx结构
父组件的render执行了，子组件render也会执行，比如在head.js里console.log('777')

this.forceUpdate()//强制更新  一定不要用,使用的是外部数据，react就失去控制了

页面状态是props.state给的,通过setstate更新 ，
	<div style={
	{}}
	></div>

### this.setState

实例化的对象方法，改变了组件的状态,视图，会更新组件本身.
	render方法会再执行一次return一份jsx => virtualdom执行 => 渲染比较改变 => 改变this.state值