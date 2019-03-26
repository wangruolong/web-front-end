const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
//测试环境
//1.有压缩。打包后的app.xxx.js、another-modules.xxx.js、commons.xxx.js文件进行压缩。
//2.有对应关系。有打包前和打包后的映射文件source-map，可以方便的进行定位。
module.exports = merge(common, {
    devtool: 'source-map',
    plugins: [
    	//我们将使用 -p(production) 这个 webpack 编译标记，来启用 uglifyjs 压缩插件。意思就是说如果mode是p那就是启用了这个。
    	//但是问题是，在使用 uglifyjs-webpack-plugin 时，你必须提供 sourceMap：true 选项来启用 source map 支持。
        new UglifyJSPlugin({
            sourceMap: true
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('debug')
        })
    ]
});
