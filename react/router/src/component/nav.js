import {Link,NavLink,withRouter} from 'react-router-dom';
let style={
    backgroundColor: 'red',
    color:'#fff'
}
export default class extends Component{
// class Nav extends Component{
    constructor(props){
        super(props);
        this.state={
            //保存当前所在页面
            from: props.location.pathname
            
        };
        this.fromChange= this.fromChange.bind(this);
    }
    // 保存的时候更新到所跳转的页面
    fromChange(from){
        this.setState({from});
    }
    // componentWillReceiveProps(np){
    //     this.setState({from: np.location.pathname})
    // }
	render(){
        let {history, location}=this.props;
        let {fromChange}=this;
        let {from}=this.state;
		return(			
                <ul>
                    
                    <li><NavLink to=
                    {{
                        pathname:'/',
    
                        state:{
                            from
                        }

                    }}
                    exact
                    onClick={()=>{
                        fromChange('/')
                          history.push('/',{from})
                    }}
                    activeStyle={style}
                    >首页</NavLink></li>
                    
                    <li><NavLink to={{
                        pathname:'/teleplay',
                        serch: '?a=4&b=8&h=89',
                        hash:'#hjhjk',
                        state:{
                            from
                        }

                    }}
                      onClick={()=>fromChange('/teleplay')}
                      activeStyle={style}
                    
                    >剧集</NavLink></li>

                    <li><NavLink to=
                    {{
                        pathname:'/movie',
    
                        state:{
                            from
                        }

                    }}
                     onClick={()=>fromChange('/movie')}
                     activeStyle={style}
                    >视频</NavLink></li>
                    {/* <li><NavLink to="/book">书籍</NavLink></li> */}
				</ul>
            
		)
	}
};

// export default withRouter(Nav);