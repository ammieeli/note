export default class extends Component{
	
	constructor(props){
		super(props);
	}
	
	render(){
		let {location}=this.props;
		let{from}=location.state || '';
		return(
			<div>电影的内容

				<div>从哪里过来:{from}</div>
			</div>
		)
	}
}