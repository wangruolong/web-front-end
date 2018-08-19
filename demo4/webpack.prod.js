const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

//测试环境
//1.有压缩。打包后的app.xxx.js、another-modules.xxx.js、commons.xxx.js文件进行压缩。
//2.无映射关系。有打包前和打包后的映射文件source-map
module.exports = merge(common, {
    devtool: 'none',
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ]
});
