// npm i express -D
// 使用express搭建server端

// hack for window is not defined
if (typeof window === 'undefined') {
	global.window = {};
}

const path = require('path');
const fs = require('fs');
const express= require('express');
const { renderToString } = require('react-dom/server');
//客户端打包出来供服务端渲染的组件
const SSR = require('../dist/search-server');
const template = fs.readFileSync(path.join(__dirname, '../dist/search.html'), 'utf-8');
const data = require('./data.json');

const server = (port) => {
	const app = express();
	// 设置静态目录
	app.use(express.static("dist"));
	// 设置了路由
	app.get("/search", (req, res) => {
		//通过renderToString将客户端打包出来的组件渲染成字符串
		const html =renderMaprkUp(renderToString(SSR));
		console.log("SSR content is:"+html)
		res.status(200).send(html);
	});
	
	app.listen(port, () => {
		console.log("Express Server is running on port:" + port);
	});
}

server(process.env.PORT || 3000);

const renderMaprkUp = (html) => {
	const dataStr = JSON.stringify(data);
	return template.replace('<!--HTML_PLACEHOLDER-->', html).replace('<!-- INTIAL_DATA_PLACEHOLDER-->', `<script>window.__initial_data=${dataStr}</script>`);

}
