const path=require('path');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const CleanWebpackplugin=require('clean-webpack-plugin');
const Webpack=require('webpack');
const rv = (...a)=>path.resolve(__dirname,...a);

module.exports={
	entry:'./src/app.js',
	output:{
		filename:'app.js' ,
		path: rv('dist')
	},
	devtool: 'eval-source-map',
	module:{
		rules:[
			{
				test:/\.js$/,
				use:[
					{
						loader:'babel-loader',
						options: {
							presets:['react'],
							plugins:['transform-object-rest-spread']
						}
					}
				],
				exclude:[rv('node_modules')]
			},
			{
				test: /\.css$/,
				use:['style-loader','css-loader']
			},
			{
				test: /\.(jpg|png|gif|jpeg)$/,
				use:['file-loader']
			}
		]
	},
	plugins:[
		new HtmlWebpackPlugin({
			filename:'index.html',
			template: './src/index.html'
		}),
		new CleanWebpackplugin(['dist']),
		new Webpack.ProvidePlugin({
			React: 'react',
			Component:['react','Component'],
			ReactDOM:'react-dom'
		})
	],
	
	devServer:{
		open:true
	}
	
}
