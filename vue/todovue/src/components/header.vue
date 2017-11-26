
<template>
	<div>
		<header class="header" >
	        	    <h1>todos</h1>
	        	    <input class="new-todo" 
        	    	placeholder="请输入内容"
        	    	v-model="message"
        	    	@keydown.13="addTodo"
        	    	 />
	    </header>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				message:''
			}
		},
		methods:{
			addTodo(){
				this.$emit('add-todo',this.message)
				this.message=''
			}
		}
	}
</script>