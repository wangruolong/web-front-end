const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
//测试环境
//1.√压缩入口文件。打包后的app.xxx.js、another-modules.xxx.js、commons.xxx.js文件，没有进行压缩。
//2.√源文件映射。有打包前和打包后的映射文件source-map，可以方便的进行定位。
//3.√抽取css。
//4.×压缩css。
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
        }),
        //抽取css
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css"
        })
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
