import {Link} from 'react-router-dom';
//导出封装的组件
 class Nav extends Component{
       //构造函数，组件中的props是一种父级向子级传递数据的方式.
    constructor(props){
        //调用super的原因：在ES6中，在子类的constructor中必须先调用super才能引用this
         //super(props)的目的：在constructor中可以使用this.props
        super(props);
        //state是React中组件的一个对象.React中,更新组件的state,会导致重新渲染用户界面(不要操作DOM).简单来说,就是用户界面会随着state变化而变化.
        this.state = {
            //设置初始值，对象props下面的地址的路径名称
            from: props.location.pathname
        };
        //给封装的函数绑定this指向，否则会是undefind
        this.fromChange = this.fromChange.bind(this);
    }
    //生命周期方法
    // componentWillReceivePro(nP){
    //     this.setState({from: nP.location.pathname})
    // }

    fromChange(){
        //通知React数据变化的方法是调用setState(data,callback).这个方法会合并data到this.state,并重新渲染组件
        this.setState({from: this.props.history.location.pathname})
    }

    render(){
        //调用方法
        let {history, location} = this.props;
        let {fromChange} = this;
        let {from} = this.state;
        console.log(from, 'curt');
        return (
            
                    <ul>
                    
                    <li><NavLink to=
                    {{ //路径
                        pathname:'/',
                       //修改state的from值
                        state:{
                            from
                        }

                    }}
                    exact
                    onClick={()=>{
                         //点击触发封装函数，激活from
                         fromChange('/')
                         //历史记录增加，放到from里面
                         history.push('/', {from})
                    }}
                    //添加样式
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
}
//高阶函数 接收一个组件作为参数
// export default withRouter(Nav)