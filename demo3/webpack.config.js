const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    //开发工具。当js报错会定位到具体的行数。
    devtool: 'inline-source-map',
    entry: {
        app: './src/index.js',
    },
    output: {
        filename: '[name].bundle.js',
        //正产环境，编译的路径。
        //把js编译到__dirname的路径+dist路径下面。
        //__dirname是path中的变量，是当前webpack.config.js文件所处的路径。
        path: path.resolve(__dirname, 'dist'),
        //开发环境中，在内存中的根路径。
        //在内存中的index.html引用的js路径是：publicPath的路径+app.bundle.js
        publicPath: '/'
    },
    mode: "development",
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'Output Management'
        }),
        //在热加载时直接返回更新文件名，而不是文件的id
        new webpack.NamedModulesPlugin(),
        //主要用于HMR热替换
        // new webpack.HotModuleReplacementPlugin()
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
}