const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: './src/index.js',
        another: './src/another-module.js'
    },
    output: {
        
        filename: '[name].[chunkhash].js',
        //正产环境，编译的路径。
        //把js编译到__dirname的路径+dist路径下面。
        //__dirname是path中的变量，是当前webpack.config.js文件所处的路径。
        path: path.resolve(__dirname, 'dist')
        //开发环境中，在内存中的根路径。
        //在内存中的index.html引用的js路径是：publicPath的路径+app.bundle.js
        // publicPath: '/'
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'Code Splitting'
        }),
        //可以在代码中直接使用这些变量。
        new webpack.ProvidePlugin({
            // _: 'lodash',
            join: ['lodash', 'join']
        })
    ],
    //等价于webpack 3的plugin webpack.optimize.CommonsChunkPlugin
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {//对多个js引用同一个依赖的配置
                    name: 'vender',//生成的共享模块bundle的名字
                    chunks: 'initial',//"initial"，"async"，"all"。 只选择初始的chunks，所需要的chunks 还是所有chunks 
                    minChunks: 2//在split前，有共享模块的chunks的最小数目。简单来说就是：只要有2个文件引用了同一个js就会被抽取出来。
                }
            }
        }
    },
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