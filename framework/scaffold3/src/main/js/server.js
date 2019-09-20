//server
const webpackDevServer = require('webpack-dev-server')
//webpack
const webpack = require('webpack')
//遵循不重复原则(Don't repeat yourself - DRY)，保留一个“通用”配置。
const config = require('./resources/webpack/webpack.server.js')
const options = {
	contentBase: './dist',
	hot: true,
	host: 'localhost'
}
//使webpackDevServer包含 HMR 入口起点
webpackDevServer.addDevServerEntrypoints(config, options)
//用webpack应用对应的config配置，生成编译器compiler
const compiler = webpack(config)

const server = new webpackDevServer(compiler, options)

server.listen(5000, '0.0.0.0', (err, result) => {
	console.log(result, 'dev server listening on port 5000')
	if (err) {
		console.log(result, err)
	}
})