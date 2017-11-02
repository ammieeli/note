const path=require('path');
const HtmlWebpackPlugin= require('html-webpack-plugin');
const cleanWebpackPlugin=require('clean-webpack-plugin');

const rv=(...a)=>path.resolve(__dirname,...a);
module.exports={
	entry: './src/app.js',
	output:{
		filename: '[hash]_app.js',
		path: rv('dist')
	},
	
	module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: [
                    rv('node_modules')
                ]
            }
        ]
    },

    plugins:[
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        }),
        new cleanWebpackPlugin(['dist'])

    ]
}
