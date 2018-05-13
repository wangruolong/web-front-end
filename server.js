'use strict'
require('babel-register')
var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var config = require('./webpack/webpack.config.js')

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    disableHostCheck: true   // 新的安全设置，限定 host 头和 ip:port 必须一致，关闭 https://github.com/webpack/webpack-dev-server/releases/tag/v2.4.3
}).listen(3030, '0.0.0.0', function (err, result) {
    if (err) {
        console.log(err)
    }
    console.log('Listening at localhost:3030')
})