export default class extends Component{
	
	constructor(props){
	super(props);
	}
	
	render(){
        // let {history}=this.props;
	let {location}=this.props;
	let{from}=location.state || '';
		return(
			<div>
				剧集的视图内容
				<div>从哪里过来:{from}</div>

			</div>
		)
	}
}