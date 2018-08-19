const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    devtool: 'inline-source-map',
    mode: 'development',
    output: {
        filename: '[name].[hash].js',
        //正产环境，编译的路径。
        //把js编译到__dirname的路径+dist路径下面。
        //__dirname是path中的变量，是当前webpack.config.js文件所处的路径。
        path: path.resolve(__dirname, 'dist')
        //开发环境中，在内存中的根路径。
        //在内存中的index.html引用的js路径是：publicPath的路径+app.bundle.js
        // publicPath: '/'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        //在热加载时直接返回更新文件名，而不是文件的id
        new webpack.NamedModulesPlugin(),
        //主要用于HMR热替换
        //用server方式启动的webpack一定要启动热加载，这样才能快速看到效果。
        new webpack.HotModuleReplacementPlugin()
    ]
});
