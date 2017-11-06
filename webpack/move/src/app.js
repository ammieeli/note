import React,{Component} from 'react';
import ReactDOM from 'react-dom';

class App extends Component{
	constructor(props){
		super(props);
		this.state={
			marginLeft: 0,
			onOff:true
		}
		this.timer=null;
		this.moveBox=this.moveBox.bind(this);
	}
	moveBox(){
		let{timer}=this;
		let{onOff,marginLeft}=this.state;
		if(onOff){
				clearInterval(timer);
				this.timer=setInterval(()=>{
					this.setState({
						marginLeft:++marginLeft
				});
				
			},)
		
		}else{
			clearInterval(timer);
		};
		this.setState({
			onOff:!onOff
		})
	}
	
    render(){
    	let {marginLeft}=this.state;
    	let {moveBox}=this;
		return(
			<div>
				<button onClick={				
					
						this.moveBox											
				       
	            }>
	            button
	            </button>
	            <div className="box" style={
	                {
	                    width: '100px',
	                    height: 100,
	                    backgroundColor: 'red',
	                    marginLeft:marginLeft
	                }
	            }>
	            </div>
           </div>
        );
    }
}

ReactDOM.render(
	<App/>,
	document.getElementById('root')
);