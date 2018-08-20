const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
//开发环境
//1.×压缩入口文件。打包后的app.xxx.js、another-modules.xxx.js、commons.xxx.js文件，没有进行压缩。
//2.√源文件映射。有打包前和打包后的映射文件source-map，可以方便的进行定位。
//3.×抽取css。
//4.×压缩css。
module.exports = merge(common, {
    devtool: 'inline-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
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
