const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

//开发环境
module.exports = merge(common, {
	devtool: 'inline-source-map',
	mode: 'development', // mode=develop，会将 process.env.NODE_ENV 的值设为 development。启用 NamedChunksPlugin 和 NamedModulesPlugin。
	devServer: {
		disableHostCheck: true,
		// host: '0.0.0.0'
		host:(function getIPAdress(){  
			var interfaces = require('os').networkInterfaces()  
			for(var devName in interfaces){  
				  var iface = interfaces[devName]  
				  for(var i=0;i<iface.length;i++){  
					   var alias = iface[i]
					   if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){  
							 return alias.address  
					   }
				  }
			}
		})()
	},
	plugins: [
		// new webpack.DefinePlugin({//定义环境变量
		//     'process.env.NODE_ENV': JSON.stringify('development')
		// })
		new webpack.NamedModulesPlugin(),//当开启 HMR 的时候使用该插件会显示模块的相对路径，建议用于开发环境。
		new webpack.NamedChunksPlugin()
	]
})
