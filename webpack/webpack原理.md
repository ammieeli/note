### 什么是 webpack？
webpack是近期最火的一款模块加载器兼打包工具，它能把各种资源，例如JS（含JSX）、coffee、样式（含less/sass）、图片等都作为模块来使用和处理。

近期 Github 上各大主流的（React相关）项目来说，它们仓库上所展示的示例已经是基于 webpack 来开发的，比如 React-Bootstrap 和 Redux。

### 安装
     npm install webpack -g
常规项目还是把依赖写入 package.json 包去更人性化：
$ npm init
$ npm install webpack --save-dev

webpack– for building once for development(用于构建一个开发目录)
webpack -p– for building once for development(用于构建一个生产目录(压缩过的))
webpack --watch– for continuous incremental build(用于连续地构建)
webpack -d– to include source maps(展示映射关系)
webpack --colors– for making things pretty(用于美化展示的信息)

### 配置
每个项目下都必须配置有一个 webpack.config.js ，它的作用如同常规的 gulpfile.js/Gruntfile.js ，就是一个配置项，告诉 webpack 它需要做什么。

entry 入口文件 让webpack用哪个文件作为项目的入口
output 出口 让webpack把处理完成的文件放在哪里
module 模块 要用什么不同的模块来处理各种类型的文件


    module.exports = {
        //插件项
        plugins: [commonsPlugin],
        //页面入口文件配置
        entry: {
            index : './src/js/page/index.js'
        },
        //入口文件输出配置
        output: {
            path: 'dist/js/page',
            filename: '[name].js'
        },
        module: {
            //加载器配置
            loaders: [
                { test: /\.css$/, loader: 'style-loader!css-loader' },
                { test: /\.js$/, loader: 'jsx-loader?harmony' },
                { test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
                { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
            ]
        },
        //其它解决方案配置
        resolve: {
            root: 'E:/github/flux-example/src', //绝对路径
            extensions: ['', '.js', '.json', '.scss'],
            alias: {
                AppStore : 'js/stores/AppStores.js',
                ActionType : 'js/actions/ActionType.js',
                AppAction : 'js/actions/AppAction.js'
            }
        }
    };
    
####  plugins 是插件项
 插件（Plugins）是用来拓展Webpack功能的，它们会在整个构建过程中生效，执行相关的任务。
 entry 是页面入口文件配置，output 是对应输出项配置（即入口文件最终要生成什么名字的文件、存放到哪里）

要使用某个插件，我们需要通过npm安装它，然后要做的就是在webpack配置中的plugins关键字部分添加该插件的一个实例（plugins是一个数组）


loaders是在打包构建过程中用来处理源文件的（JSX，Scss，Less..），一次处理一个，插件并不直接操作单个文件，它直接对整个构建过程其作用。

### Loaders
通过使用不同的loader，webpack有能力调用外部的脚本或工具，实现对不同格式的文件的处理，比如说分析转换scss为css，或者把下一代的JS文件（ES6，ES7)转换为现代浏览器兼容的JS文件，对React的开发而言，合适的Loaders可以把React的中用到的JSX文件转换为JS文件。

Loaders需要单独安装并且需要在webpack.config.js中的modules关键字下进行配置，Loaders的配置包括以下几方面：

test：一个用以匹配loaders所处理文件的拓展名的正则表达式（必须）
loader：loader的名称（必须）
include/exclude:手动添加必须处理的文件（文件夹）或屏蔽不需要处理的文件（文件夹）（可选）；
query：为loaders提供额外的设置选项（可选）

 module.loaders 是最关键的一块配置。它告知 webpack 每一种文件都需要使用什么加载器来处理
 
    module: {
        //加载器配置
        loaders: [
            //.css 文件使用 style-loader 和 css-loader 来处理
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            //.js 文件使用 jsx-loader 来编译处理
            { test: /\.js$/, loader: 'jsx-loader?harmony' },
            //.scss 文件使用 style-loader、css-loader 和 sass-loader 来编译处理
            { test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
            //图片文件使用 url-loader 来处理，小于8kb的直接转为base64
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
        ]
    }
 

### Babel
Babel其实是一个编译JavaScript的平台。
Babel是几个模块化的包，其核心功能位于称为babel-core的npm包中，webpack可以把其不同的包整合在一起使用，对于每一个你需要的功能或拓展，你都需要安装单独的包（用得最多的是解析Es6的babel-preset-es2015包和解析JSX的babel-preset-react包）。通过配置，允许你使用ES6以及JSX的语法了。

    npm i -D
    
      babel-core babel-loader babel-preset-es2015 babel-preset-react  babel-plugin-transform-object-rest-spread
      
一些开发者支持把babel的配置选项放在一个单独的名为 ".babelrc" 的配置文件中。
 
### CSS
webpack提供两个工具处理样式表，css-loader 和 style-loader，二者处理的任务不同，css-loader使你能够使用类似@import 和 url(...)的方法实现 require()的功能,style-loader将所有的计算后的样式加入页面中，二者组合在一起使你能够把样式表嵌入webpack打包后的JS文件中。

    {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader"
                    }
                ]
            }

### CSS预处理器
Sass 和 Less 之类的预处理器是对原生CSS的拓展，它们允许你使用类似于variables, nesting, mixins, inheritance等不存在于CSS中的特性来写CSS，CSS预处理器可以这些特殊类型的语句转化为浏览器可识别的CSS语句


    常用的CSS 处理loaders:
    
    Less Loader
    Sass Loader
    Stylus Loader
也存在一个CSS的处理平台-PostCSS

### HtmlWebpackPlugin
这个插件的作用是依据一个简单的index.html模板，生成一个自动引用你打包后的JS文件的新index.html。这在每次生成的js文件名称不同时非常有用（比如添加了hash值）。


    
### Source Maps（使调试更容易）
在webpack的配置文件中配置source maps，需要配置devtool，它有以下四种不同的配置选项，各具优缺点，描述如下：

 source-map	
 
     （在一个单独的文件中产生一个完整且功能完全的文件。这个文件具有最好的source map，但是它会减慢打包速度；）
    
cheap-module-source-map

    在一个单独的文件中生成一个不带列映射的map，不带列映射提高了打包速度，但是也使得浏览器开发者工具只能对应到具体的行，不能对应到具体的列（符号），会对调试造成不便；    

eval-source-map	

    使用eval打包源文件模块，在同一个文件中生成干净的完整的source map。这个选项可以在不影响构建速度的前提下生成完整的sourcemap，但是对打包后输出的JS文件的执行具有性能和安全的隐患。在开发阶段这是一个非常好的选项，在生产阶段则一定不要启用这个选项；

cheap-module-eval-source-map

     这是在打包文件时最快的生成source map的方法，生成的Source Map 会和打包后的JavaScript文件同行显示，没有列映射，和eval-source-map选项具有相似的缺点；。