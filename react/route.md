### 路由库React-Router
通过管理 URL，实现组件的切换和状态的变化

使用时，路由器Router就是React的一个组件。

    $ npm i -Dreact-router-dom
    
    
    import {
    	BrowserRouter as Router,
    	Route

    } from 'react-router-dom';
    
    
    render(){
		let {history,location,match}=this.props;
	
		return(
			<div>
				<Nav history={history}/>
				<Route exact path="/" component={Home}/>
				<Route path="/teleplay" component={Teleplay}/>
				<Route path="/movie" component={Movie}/>
			</div>
		)
	}
}


上面代码中，用户访问/teleplay时，会先加载Home组件，然后在它的内部再加载Teleplay组件。
	
ReactDOM.render(
	<Router>
		<Route path="/" component={App}/>
	</Router>,
	document.getElementById('root')
)
    
Router组件本身只是一个容器，真正的路由要通过Route组件定义。

路由的切换由URL的hash变化决定，Route组件定义了URL路径与组件的对应关系。你可以同时使用多个Route组件。

### path 属性
Route组件的path属性指定路由的匹配规则。这个属性是可以省略的，这样的话，不管路径是否匹配，总是会加载指定组件。

    <Route path="inbox" component={Inbox}>
       <Route path="messages/:id" component={Message} />
    </Route>
上面代码中，当用户访问/inbox/messages/:id时，会加载下面的组件。

    <Inbox>
      <Message/>
    </Inbox>
    
path属性可以使用通配符。

    <Route path="/hello/:name">
    // 匹配 /hello/michael
    // 匹配 /hello/ryan
    
    <Route path="/hello(/:name)">
    // 匹配 /hello
    // 匹配 /hello/michael
    // 匹配 /hello/ryan
    
    <Route path="/files/*.*">
    // 匹配 /files/hello.jpg
    // 匹配 /files/hello.html
    
    <Route path="/files/*">
    // 匹配 /files/ 
    // 匹配 /files/a
    // 匹配 /files/a/b
    
    <Route path="/**/*.jpg">
    // 匹配 /files/hello.jpg
    // 匹配 /files/path/to/file.jpg
    
通配符的规则如下。

    （1）:paramName
    :paramName匹配URL的一个部分，直到遇到下一个/、?、#为止。这个路径参数可以通过this.props.params.paramName取出。
    （2）()
    ()表示URL的这个部分是可选的。
    （3）*
    *匹配任意字符，直到模式里面的下一个字符为止。匹配方式是非贪婪模式。
    （4） **
    ** 匹配任意字符，直到下一个/、?、#为止。匹配方式是贪婪模式。
    
路由匹配规则是从上到下执行，一旦发现匹配，就不再其余的规则了。

### Link
Link组件用于取代<a>元素，生成一个链接，允许用户点击后跳转到另一个路由。它基本上就是<a>元素的React 版本，可以接收Router的状态。

    render() {
      return <div>
        <ul role="nav">
          <li><Link to="/about">About</Link></li>
          <li><Link to="/repos">Repos</Link></li>
        </ul>
      </div>
    }
    
如果希望当前的路由与其他路由有不同样式，这时可以使用Link组件的activeStyle属性。

    <Link to="/about" activeStyle={{color: 'red'}}>About</Link>
    <Link to="/repos" activeStyle={{color: 'red'}}>Repos</Link>
上面代码中，当前页面的链接会红色显示。
另一种做法是，使用activeClassName指定当前路由的Class。

    <Link to="/about" activeClassName="active">About</Link>
    <Link to="/repos" activeClassName="active">Repos</Link>
上面代码中，当前页面的链接的class会包含active。

    如果链接到根路由/，不要使用Link组件，而要使用IndexLink组件。
    这是因为对于根路由来说，activeStyle和activeClassName会失效，或者说总是生效，因为/会匹配任何子路由。而IndexLink组件会使用路径的精确匹配。

Link组件用于正常的用户点击跳转，但是有时还需要表单跳转、点击按钮跳转等操作。这些情况怎么跟React Router对接呢？
下面是一个表单。

    <form onSubmit={this.handleSubmit}>
      <input type="text" placeholder="userName"/>
      <input type="text" placeholder="repo"/>
      <button type="submit">Go</button>
    </form>
    
第一种方法是使用browserHistory.push

    import { browserHistory } from 'react-router'
    
    // ...
      handleSubmit(event) {
        event.preventDefault()
        const userName = event.target.elements[0].value
        const repo = event.target.elements[1].value
        const path = `/repos/${userName}/${repo}`
        browserHistory.push(path)
      },
      
第二种方法是使用context对象。

    export default React.createClass({
    
      // ask for `router` from context
      contextTypes: {
        router: React.PropTypes.object
      },
    
      handleSubmit(event) {
        // ...
        this.context.router.push(path)
      },
    })


### histroy 属性
Router组件的history属性，用来监听浏览器地址栏的变化，并将URL解析成一个地址对象，供 React Router 匹配。
history属性，一共可以设置三种值。

    browserHistory
    hashHistory
    createMemoryHistory


在Router组件之外，导航到路由页面，可以使用浏览器的History API，像下面这样写。

    import { browserHistory } from 'react-router';
    browserHistory.push('/some/path');


### IndexRoute 组件
IndexRoute组件没有路径参数path。

    Router>
      <Route path="/" component={App}>
        <Route path="accounts" component={Accounts}/>
        <Route path="statements" component={Statements}/>
      </Route>
    </Router>
上面代码中，访问根路径/，不会加载任何子组件。也就是说，App组件的this.props.children，这时是undefined。

### Redirect 组件
<Redirect>组件用于路由的跳转，即用户访问一个路由，会自动跳转到另一个路由。

    <Route path="inbox" component={Inbox}>
      {/* 从 /inbox/messages/:id 跳转到 /messages/:id */}
      ＜Redirect from="messages/:id" to="/messages/:id" />
    </Route>
    现在访问/inbox/messages/5，会自动跳转到/messages/5。
    
### IndexRedirect 组件
IndexRedirect组件用于访问根路由的时候，将用户重定向到某个子组件。

    <Route path="/" component={App}>
      ＜IndexRedirect to="/welcome" />
      <Route path="welcome" component={Welcome} />
      <Route path="about" component={About} />
    </Route>
    上面代码中，用户访问根路径时，将自动重定向到子组件welcome。
    
 
### 路由的钩子
每个路由都有Enter和Leave钩子，用户进入或离开该路由时触发。

    <Route path="about" component={About} />
    ＜Route path="inbox" component={Inbox}>
      ＜Redirect from="messages/:id" to="/messages/:id" />
    </Route>
上面的代码中，如果用户离开/messages/:id，进入/about时，会依次触发以下的钩子。

    /messages/:id的onLeave
    /inbox的onLeave
    /about的onEnter
    
下面是一个例子，使用onEnter钩子替代<Redirect>组件。

    <Route path="inbox" component={Inbox}>
      <Route
        path="messages/:id"
        onEnter={
          ({params}, replace) => replace(`/messages/${params.id}`)
        } 
      />
    </Route>   
    
onEnter钩子还可以用来做认证。确认是否要离开此页面