import React,{Component} from 'react';

import ReactDOM from 'react-dom';

import Header from './component/header/Header';
import Foot from './component/footer/Foot';
import Content from './component/content/Content';

import './common/style/index.css';

class App extends Component{
	constructor(props){
		super(props);
		this.state={
			counter: 0
		}
	}
	
	render(){
		let {counter}=this.state;//取出来
		return(
			<section className="box">
			<button onClick={
				()=>{
					this.setState({
						counter:800
					})
										
				}
			}
			
			>button</button>
			<div className="th" style={
                {
                    width: '100px',
                    height: '100px',
                    backgroundColor: 'red',
                    position: 'absolute',
                    left:counter
                }
            }>
            </div>
			   {/*<Header></Header>
				<Content></Content>
				<Foot indx={counter}></Foot>*/}
			</section>
		)
	}
}

ReactDOM.render(
	<App/>,
	document.getElementById('root')
);


