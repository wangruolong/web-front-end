const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: './src/index.js'
    },
    output: {
        filename: '[name].[chunkhash].js',
        //正产环境，编译的路径。
        //把js编译到__dirname的路径+dist路径下面。
        //__dirname是path中的变量，是当前webpack.config.js文件所处的路径。
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'tetris'
        }),
        new webpack.ProvidePlugin({
            _: 'lodash',
            $: 'jquery'
            // join: ['lodash', 'join']
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
    }
}