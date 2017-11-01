### 关于 .babelrc 这个配置文件
    
1.干什么的

    	.babelrc是Babel的配置文件，
    	该文件用来设置转码规则和插件，
		存放babel-loader的插件和预设。
		
		
2.什么时候会被使用

    	插件和预设复杂且多的时候需要，设置转码规则和插件，统一管理；
    如何配置 预设和插件
    {
	  "presets": [],
	  "plugins": []
	}
	
	presets用来存放一些预设
    plugins用来存放一些插件 
     
    webpack.config.js ->  module ->rules -> use:["babel-loader"]
    
### 关于 babel

1.干什么的

    	Babel是一个广泛使用的转码器，把能转成ES5代码转成ES5代码
    	
2.如何在 cli 使用

        $ npm i -D babel-cli/
    	$ npm install --save-dev babel-cli
    	
3.如何在 webpack 使用

    	webpack.config.js ->  module ->rules -> use:["babel-loader"]
    	
4.基于什么运行的 (插件)

    	babel-core ,babel-loader;
5.预设是什么 (插件的集合)

		babel-preset-env(es6)、babel-preset-react(react)
		
### 关于 webpack 的

1.干什么的

    	是模块打包器。浏览器不支持模块化代码，
    	通过webpack打包JS代码，生成一个新的JS文件，使之在浏览器上运行了；
    	
2.入口是什么意思, 如何配置

    	wabpack打包的时候,通过js文件的设置可以找到所有需要引入的模块。
    	module.exports = {
		  entry: './path/to/my/entry/file.js'
		};
		
3.输出是什么意思, 如何配置(文件名, 输出路径)

    	webpack打包后会生成一个JS文件，而这个出口就是指向JS文件需要存放的位置和文件名
    	module.exports = {
		  entry: './path/to/my/entry/file.js',
		  output: {
		    path: path.resolve(__dirname, 'dist'),
		    filename: '***.js'
		  }
		};

4.什么是 loader,

    	loader 用于对模块的源代码进行转换。是可以把代码转换成浏览器支持的ES5代码的一个插件。
    	loader 可以使你在 import 或"加载"模块时预处理文件。
    	
5.在什么情况下会让 loader 起作用

    	在 webpack.config.js 文件中指定 loader。
    	下载loader的插件后，在webpack的rules里面引用了这个loader。webpack打包的时候就起作用了
    	
6.如何在 webpack 使用 babel-loader

			use:["babel-loader",...arg];
			
##### 关于 npm 的

1.干什么用的

    	包管理器，可以通过npm下载各种插件。
2.关于package.json的文件  
        如何生成
        
        npm init -y
        什么情况下会被使用
        
          项目需要使用插件的时候，通过npm i 下载文件里需要的插件
*如何在里面声明命令

        	在package.json 底下的scripts创建键值对，通过npm run key调用命令，例如: "dev":"webpack"
在里面声明命令的好处
        
        	可以快速运行
            	
如何安装依赖
(声明为生产还是开发)

      npm i -D packName （开发依赖）
      npm i -S react/react-dom (生产依赖)
      
### 关于模块化语法
     es6
        import 'f.js'
        import a from './ds.js'
        import a,{b,c} from './ds.js'
        import a,{b as ccd,c} from './ds.js'

        export
        export default

    commonJS
        require('./a.js')
        module.exports
        exports