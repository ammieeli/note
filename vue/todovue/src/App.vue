<template>
  <section class="todoapp" id="app">
  	<header-nav @add-todo="addTodo"></header-nav>
  	<content-list :list='list' @remove-list="removeList"></content-list>
  	<footer-list :list='list'></footer-list>
  	</section>
</template>

<script>

import HeaderNav from './components/header';
import ContentList from './components/Content';
import FooterList from './components/footer';

let arr=[
	    		{
	    			id:Date.now()+Math.random(),
	    			title:'假的1',
	    			checked:false
	    		},
	    		{
	    			id:Date.now()+Math.random(),
	    			title:'假的2',
	    			checked:false
	    		}
	    	];

export default {
	data(){
		return{
			list:arr
		}
	},
	components:{
		HeaderNav,
		ContentList,
		FooterList
	},
	methods:{
		addTodo(message){
			this.list.push({
				id:Math.random(),
				title:message,
				checked:false
			})
		},
		removeList:function(id){
			this.list=this.list.filter((item)=>{
					return item.id!=id
			})
		}
	}
		
}
</script>

