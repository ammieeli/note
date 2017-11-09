
export default class extends Component{
	
	constructor(props){
		super(props);
	}
	
	render(){
		//从props调用location
		let {location}=this.props;
		let{from}=location.state || '';
		console.log('from')
		return(
			<div>首页的内容
				<div>从哪里过来:{from}</div>
				
			</div>
		)
	}
}
