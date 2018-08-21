const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
    entry: {
        app: './src/index.js'
    },
    output: {
        filename: '[name].[chunkhash].js',
        //正产环境，编译的路径。
        //把js编译到__dirname的路径+dist路径下面。
        //__dirname是path中的变量，是当前webpack.config.js文件所处的路径。
        path: path.resolve(__dirname, '../../dist')
    },
    plugins: [
        //第一个参数是个数组，可以指定清除多个路径的文件。
        new CleanWebpackPlugin(['../../dist'], {
            allowExternal: true//该插件默认只能清除当前配置所处的文件夹，开启allowExternal=true使其可以清除当前目录之外的文件夹。
        }),
        new HtmlWebpackPlugin({
            title: 'tetris'
        }),
        new webpack.ProvidePlugin({
            _: 'lodash',
            $: 'jquery'
            // join: ['lodash', 'join']
        }),
        // 包分析器
        // new BundleAnalyzerPlugin()
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