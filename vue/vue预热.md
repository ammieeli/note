### vue
Vue.js (读音 /vjuː/，类似于 view) 是一套构建用户界面的渐进式框架。与其他重量级框架不同的是，Vue 采用自底向上增量开发的设计。Vue 的核心库只关注视图层，它不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与单文件组件和 Vue 生态系统支持的库结合使用时，Vue 也完全能够为复杂的单页应用程序提供驱动。

##### vue-cli 手脚架

vue提供的脚手架工具，
功能：
    
    生成目录结构
    本地开发调试
    代码部署
    热加载
    单元测试

dom流程

生成html模板=>

渲染函数=>虚拟dom树=>真实dom
    
指令和模板

模板  html部分 标签内置指令

    v-bind 动态的绑定数据 ，简写为：
    
    v-show  根据值的真假，切换元素的display属性
    
    v-for 基于源数据多次渲染元素或者模板快
    
    v-on 绑定事件监听器，简写为@
    
    v-if 根据值的真假，切换元素会被销毁、重建
    
    v-else 条件都不符合渲染
    
    v-model 在表单控件元素上创建双向数据绑定
    
    v-once 只渲染一次，渲染后数据更新不重新渲染
    
    :cutomId="id" 添加id

    html里添加html
    <div v-html="html"></div>
   html里可以写简单表达式{{}}
   
   
### 模板
字符串模板
template字符串
    
    模板将会替换挂载的元素，挂载元素的内容都将被忽略
    let str="<div>ewesds</div>"
		new Vue({
			el:'#app',
			template:str
		})
		

script 数据、声明渲染



要修改vuex中的state，必须commit一个mutation，如果不这样做的话：
1. vue-tools不能够记录状态的变化
2. 不能够对赋的值做一个滤过判断

Mutation 必须是同步函数，也就说提交一个Mutation之后，立马要把state的值改了，不能再Mutation中写任何异步的操作，当使用异步操作的时候，因为只要提交一个mutation，就会有一条记录，记录记的时候，state值还没有改变。

所有的异步操作放在actions中，在action中提交Mutation

commit一个Mutation，是this.$store.commit('Mutation名字'，参数)

dispatch一个action 是this.$store.dispatch('action名字'，参数)


axios
------------------------

npm i axios --save 

用法：
	 Axios.get(url)
	 .then(function (pramas){
	 	console.log(pramas)

	 	store.commit();
	 })