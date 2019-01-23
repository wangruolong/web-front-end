# 前端开发框架
用webpack 4构建前端应用。
react-router 3.x
redux-saga 0.x
babel 6

## 前置要求
- npm v6.4.0
- node v8.11.4

## 本地server环境
1. 压缩入口文件。打包后的app.xxx.js、another-modules.xxx.js、commons.xxx.js文件，没有进行压缩。
2. 源文件映射。有打包前和打包后的映射文件source-map，可以方便的进行定位。

- 用node
    > npm start
- 用webpack-dev-server
    > npm run dev
- 用http-server
    > npm run dist

