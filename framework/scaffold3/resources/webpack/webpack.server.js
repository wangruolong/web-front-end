const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')

//server环境
//提供给node server.js和webpack-dev-server运行的环境配置。
module.exports = merge(common, {
	devtool: 'inline-source-map',
	mode: 'development',
	output: {
		filename: '[name].[hash].js',
		//开发环境中，在内存中的根路径。
		//在内存中的index.html引用的js路径是：publicPath的路径+app.bundle.js
		publicPath: '/'
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('development')
		}),
		//在热加载时，在控制台显示更新文件名，而不仅仅是文件的id
		new webpack.NamedModulesPlugin(),
		//主要用于HMR热替换
		//用server方式启动的webpack一定要启动热加载，这样用户保存代码之后就能快速看到效果了。
		new webpack.HotModuleReplacementPlugin()
	]
})
