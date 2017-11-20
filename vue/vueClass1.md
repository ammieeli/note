### vue特点
响应的数据绑定

可组合的视图组件

    <ul id="list">
		</ul>
		<script>
			let arr = ['ov','ketang'];

			// 根据数据生成li 把数据填充到模板中

			let newArr = arr.map(function (item){//map遍历数组数据
				return `<li>${item}</li>`;
				//item是一个变量，用来放置你遍历strArray得到的每一个元素的
			})

			console.log(newArr.join(''));
			//join() 方法用于把数组中的所有元素放入一个字符串。

			let list = document.getElementById("list");

			list.innerHTML = newArr.join('')

		</script>
		
		
		
		<body>
		<ul id="list">
		</ul>
		<button id="add">添加</button>
		<button id="remove">删除</button>
		<script>
			let arr = ['ov','ketang'];

			// 根据数据生成li 把数据填充到模板中

			function render(d){
				let newArr = arr.map(function (item){//遍历获取每一个值
					return `<li>${item}</li>`	
				})	
				//把获取的所有数组严肃以字符串形式展示
				list.innerHTML = newArr.join('');
			}

			let list = document.getElementById("list");

			render(arr);// 初始展示

			let add = document.getElementById('add');

			// 和用户交互会产生数据

			add.onclick = function (){
				// 后面添加abc
				arr.push('abc');

				// 再重新渲染页面

				render(arr);

			}

			let remove = document.getElementById('remove');

			remove.onclick = function (){
				//pop() 方法用于删除并返回数组的最后一个元素
				arr.pop();

				// 再重新渲染页面
				render(arr);

			}

			// 当每一次数据发生变化，页面就会自动更新，用到了响应的数据绑定

		</script>
	</body>
	
使用vue做响应的数据绑定	
	
	<body>
		<div id="app">
		
		    <!--vue调用数据专用双花括号包起来-->
			{{ message }}
			{{ arr }}
			{{ 1+1 }}
			{{ [1,2].map((item) => item*3) }}
			{{ true ? 'hello' : '错误' }}
		</div>
		<script>
			// 在模板中渲染数据 {{任意表达式}}
			let arr = ['miaov','ketang'];

			// 启动应用
			// 选项对象
			new Vue({
				el:'#app', // document.getELementById('list')  // element  模板位置
				data: {  // 要呈现的数据
					arr:arr,
					message: 'hello'
				}
			});
		
			// 写任意表达式 表达式可以求出值
		
			let a = 'mv';
		
			let str = `<div>${a}${1+1}${[1,2,3].map((item) => item*3)}</div>`;

	console.log(str);


		</script>
	</body>
	
	
	
	<ul id="app">
			{{message}}
		</ul>

		<script>

         let ed=new Vue({
         	el:'#app',
         	data:{
         		message:'yue'
         	}
         });
         
         document.onclick=function(){
         	ed.message='gaibian'
         }
	
### 指令
写在标签上作为行间的自定义属性 以v-开头.
是Vue提供的特殊属性，用来完成某项功能的.

v-bind 动态绑定数据 简写为:
				
语法： v-bind:属性名="data中的数据"

        <div id="app">
			{{ message }}
			<div v-bind:title="tip">鼠标悬停提示</div>
			<div :title="tip">鼠标悬停提示</div>
			<img :src="customSrc" />
		</div>
		<script>
			let vm = new Vue({
				el:'#app',
				data: {  
					message: 'hello',
					tip: '这是一个提示，我很长很长很长我很长很长很长我很长很长很长我很长很长很长我很长很长很长我很长很长很长我很长很长很长我很长很长很长我很长很长很长',
					customSrc:'./img/1.jpg'
				}
			});

			console.log(vm);

			document.onclick = function (){
				vm.message = 'abc'	
			}


		</script>
		
### 指令
### v-for 做循环

	语法:
		v-for="value,key in 数组"
		v-for="value in 数组"
		v-for="value,key of 数组"
		v-for="value of 数组"
		
		
		<div id="app">
			<ul id="list">
				<li v-for="item,i in list">下标{{i}}+值{{item}}</li>
			</ul>
		</div>
		<script>

			let arr = ['miaov','ketang'];
			// 循环 遍历 枚举 一个数组 拿两种值： 数组中的每一个值；值对应的下标； key value

			let vm = new Vue({
				el:'#app',
				data: {
					list: arr
				}
			});


		</script>
		
### v-show 
切换display为block还是none

			    语法：v-show="表达式"
			    
				表达式的值为true，元素显示
				表达式的值为false，元素不显示
			v-if
				语法：v-show="表达式"
					表达式的值为true，元素渲染
					表达式的值为false，元素不渲染

			切换元素显示隐藏 v-show
			数据没有就不渲染结构的 v-if
			
			<div id="app">
			{{message}}
			<span v-show="isShow">hello,用来测试显示隐藏的</span>
			
			<!--标签存在，但是显示状态为display：none-->
			<ul v-show="arr.length">
				<li>123</li>
				<li>123</li>
			</ul>
			
			<!--此div直接不显示出来-->
			<div v-if="isShow">我来测试v-if</div>
		</div>
		<script>
			let arr = [];
			let obj = {
				a:1
			}

			new Vue({
				el:'#app',
				data: {
					message: 'hello',
					obj:obj,
					arr:arr,
					isShow: false
				}
			});
			
### 绑定事件 指令 v-on
					语法：v-on:事件名 = '表达式|事件处理函数'

		把定义的事件处理函数放在一个地方 选项对象中的methods中

		click
		mouseover
		mouseout
		
		
		<div id="app">
			<button v-on:click="message='mv'">点击改变数据</button>
			<button v-on:click="changeMessage">点击改变数据</button>
			{{message}}
		</div>
		<script>
			// 内部会把data中的数据放在new Vue创建的实例身上

			 new Vue({
				el:'#app',
				data: {  // 用来渲染到页面中的数据的
					message: 'hello'
				},
				methods: {
					changeMessage: function (){  // 函数

						console.log(this);  // 指向这个方法所在的对象（实例）
						
						this.message = 'out'	
					}
				}
			});
			
			
显示隐藏元素

			<div id="app">
			<button v-on:click="isClick=!isClick">显示隐藏元素</button>
			<button v-on:click="change">显示隐藏元素</button>
			<div v-show="isClick">
				被操控的元素
			</div>
		</div>
		
		<script>
			
			new Vue({
				el:'#app',
				data:{
					isClick:true
				},
				methods:{
					change:function(){
						this.isClick=!this.isClick;
					}
				}
			})
	
	
语法：

	@click="事件处理函数(传参,$event)" 模板中有一个全局的变量 $event
	@click="事件处理函数"  事件对象是事件处理函数的第一个参数	
	
	<div id="app">
			<ul>
				<li 
					@click="getIndex(index,$event)"
					v-for="value,index in list"
					>
					{{value}},{{index}}
				</li>
			</ul>
		</div>
		
		<script>
			
			new Vue({
				el:'#app',
				data:{
					list:['a','c','d']
				},
				methods:{
					getIndex(i,ev){
						console.log(i)
						console.log(ev)
					}
				}
			})
	