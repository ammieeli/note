<template>
	<footer class="footer" v-show="list.length">
        <span class="todo-count">
        	<strong>{{unCheckedLength}}</strong>
        	<span>条未选中</span>
        </span>
        <ul class="filters">
        	<li><a href="#/all" :class="{selected:hash==='all'}">全部</a></li> 
        	<li><a href="#/active" :class="{selected:hash==='active'}">未选中</a></li> 
        	<li><a href="#/completed" :class="{selected:hash==='completed'}">选中</a></li>
       	</ul>
    </footer>
</template>
<script>
	let hash=null;			
	export default{
		props:['list'],
		data(){
			return{
				hash:'all'
			}
		},
		computed:{
	    		
			unCheckedLength(){
				return this.list.filter((item)=>{
					return !item.checked
				}).length;
			},
			filterList(){
				switch(this.hash){
					
					case "all":
					return this.list;
					break;
					case "active":
					return this.list.filter(item=>!item.checked);
					break;
					case "completed":
					return this.list.filter(item=> item.checked);
					break;
					console.log(111)
				}
			}
		}
	}

	window.onhashchange=function(){
		hash=window.location.hash.slice(2);
		filterList.hash=hash
	}
</script>