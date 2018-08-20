const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

//开发server环境
//1.√压缩入口文件。打包后的app.xxx.js、another-modules.xxx.js、commons.xxx.js文件，没有进行压缩。
//2.√源文件映射。有打包前和打包后的映射文件source-map，可以方便的进行定位。
//3.√抽取css。
//4.√压缩css。
module.exports = merge(common, {
    devtool: 'inline-source-map',
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
        new webpack.HotModuleReplacementPlugin(),
        //抽取css
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css"
        }),
        //压缩css
        new OptimizeCSSAssetsPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(csv|tsv)$/,
                use: [
                    'csv-loader'
                ]
            },
            {
                test: /\.xml$/,
                use: [
                    'xml-loader'
                ]
            }
        ]
    }
});
