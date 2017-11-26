<template>
	<section class="main">
	    <input class="toggle-all" type="checkbox" v-model="isAllChecked"/>
    	    <ul class="todo-list">
    	    	<li v-for="item,i in list" :class="{completed:item.checked,editing:item.id===editId}">
    	    	    <div class="view">
    	    	        <input class="toggle" type="checkbox" 
    	    	        	v-model="item.checked"
    	    	        	/>
    	    	        <label @dblclick="editTodo(item)">{{item.title}}</label>
    	    	        <button class="destroy" @click="removeList(item.id)"></button>
    	    	    </div>
    	    	    <input class="edit" 
    	    	    	v-model="item.title"
    	    	    	@blur="editDone(item)"
    	    	    	@keydown.13="editDone(item)"
    	    	    	@keydown.esc="editBefore(item)"
    	    	    	/>
    	    	</li>
    	    </ul>
	</section>
</template>

<script>
	export default{
		props:['list'],
		data(){
			return{
				editId:'',
	    		beforeTitle:''
			}
		},
		methods:{
			removeList(id){
				this.$emit('remove-list',id)
			},
			editTodo(item){
	    				this.editId=item.id;//正在编辑的id
	    				this.beforeTitle=item.title;
	    			},
			editDone(item){
				this.editId='';//输入框消失
				//如果内容是空的话
				if(item.title.trim()==""){
					this.removeList(item.id)
				}
			},
			//回复原数据
			editBefore(item){
				this.editId='';//输入框消失
				item.title=this.beforeTitle;
				this.beforeTitle='';
			}
		},
	
	computed:{
	    		
		isAllChecked:{
			
			get(){
				let checkeds=this.list.filter((item)=>{
					return item.checked
				})
				return checkeds.length===this.list.length
			},
			set(newValue){
				this.list.forEach((item)=>{
					item.checked=newValue
				})
			}
		}
	}
}
</script>


