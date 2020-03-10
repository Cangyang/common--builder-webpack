'use strict';

//npm i express webpack-dev-middleware -D
//安装html-webpack-plugin用于生成html页面入口
//npm i html-webpack-plugin -D

const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);

//告诉express使用webpack-dev-middleware以及将webpack.config.js配置文件作为基础配置
app.use(
	webpackDevMiddleware(
		compiler,
		{
			publicPath: config.output.publicPath
		}
	)
);

app.listen(
	4000,
	function(){
		console.log('Example app listening on port 4000~\n');
	}
);