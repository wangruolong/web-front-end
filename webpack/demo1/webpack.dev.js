const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
//开发环境
//无压缩。1.打包后的app.xxx.js、another-modules.xxx.js、commons.xxx.js文件，没有进行压缩。
//有对应关系。2.有打包前和打包后的映射文件source-map，可以方便的进行定位。
module.exports = merge(common, {
    devtool: 'inline-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        })
    ]
});
