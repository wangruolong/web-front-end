const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
    entry: {
        app: './src/index.js'
    },
    output: {
        filename: '[name].[chunkhash].js',
        //正产环境，编译的路径。
        //把js编译到__dirname的路径+dist路径下面。
        //__dirname是path中的变量，是当前js文件所处的路径。
        path: path.resolve(__dirname, '../../dist')
    },
    plugins: [
        //第一个参数是个数组，可以指定清除多个路径的文件。第二个参数是对CleanWebpackPlugin的配置。
        new CleanWebpackPlugin(['../../dist'], {
            allowExternal: true//该插件默认只能清除当前配置所处的文件夹，开启allowExternal=true使其可以清除当前目录之外的文件夹。
        }),
        new HtmlWebpackPlugin({
            title: 'tetris'
        }),
        //可以在代码中直接使用 _  $ jion
        new webpack.ProvidePlugin({
            _: 'lodash',
            $: 'jquery',
            join: ['lodash', 'join']
        }),
        //抽取css。把css从js单独剥离出来成为另外一个文件。
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css"
        }),
        //压缩css。把格式化的有换行有tab的css，压缩成只有一行的css。
        new OptimizeCSSAssetsPlugin(),
        // 包分析器，可以分析打包后每个文件的大小。
        // new BundleAnalyzerPlugin()
    ],
    //等价于webpack 3的plugin webpack.optimize.CommonsChunkPlugin
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {//对多个js引用同一个依赖的配置
                    name: 'vender',//生成的共享模块bundle的名字
                    chunks: 'initial',//"initial"，"async"，"all"这三个选项分别对应，只选择初始的chunks，所需要的chunks 还是所有chunks。
                    minChunks: 2//在split前，有共享模块的chunks的最小数目。简单来说就是：如果有某个js文件被2个以上其他文件引用，则把这个文件打包到vender里面。
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    //<style></style>和<link></link>的区别是前者跟着页面一起返回，后者需要再请求一次。
                    //由此可见如果页面文件比较大可以用link的方式进行分次请求就不用一次请求很久才回来，如果页面文件比较小可以用style和页面一起返回就只要请求一次就可以了不用请求多次。
                    // 'style-loader',//把css文件打包成以<style></style>的形式注入到页面中<head></head>里面。
                    MiniCssExtractPlugin.loader,//把css文件打包成<link></link>的形式诸如到页面中的<head></head>里面。把css文件从js充剥离成单独的文件，要在这里加入Loader，和上面的MiniCssExtractPlugin配套使用才会生效。
                    'css-loader',//css-loader处理import *.css的文件
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
