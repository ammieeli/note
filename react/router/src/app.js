
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch

} from 'react-router-dom';


import Nav from './component/nav';
import Home from './container/home/home';
import Movie from './container/movie/movie';
import Teleplay from './container/teleplay/teleplay';
// import Book from './container/book/book';

class App extends Component{

	render(){
	
		return(
			<div>
				<Route>
					{props=><Nav {...props}/> }
				</Route> 
				{/* <Nav/> */}
				{/* <Switch> */}
				
					<Route exact={true} path="/" component={Home}/>
					<Route path="/teleplay" render={
						
						({history,location,match})=>{
							
							return true ? (
								<div>
								<h1>这个是剧集</h1>
								<Teleplay location={location}/>
							</div>
							):
							(<Redirect to='/movie'/>)
						}
						
					}/> 
					<Route path="/movie" component={Movie}/>
					{/* <Route path="/">
						<div>404</div>
					</Route> */}
				{/* </Switch> */}
			</div>
		)
	}
}
	
ReactDOM.render(
	<Router>
		{<Route path="/" component={App}/>}
		{/* <App/> */}
	</Router>,
	
	document.getElementById('root')
)