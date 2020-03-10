
// 服务端打包入口文件

'use strict';
//ES6的写法
//import React from 'react';
//import ReactDOM from 'react-dom';
//import largeNumber from 'large-number';
//import './css/search.less';
//import logo from './images/guide.png';

//CJS的写法
const React = require('react');
const largeNumber = require('large-number');
const logo = require('./images/guide.png');
require('./css/search.less');



class Welcome extends React.Component {
	constructor(){
		super(...arguments);
		this.state = {
			Text:null
		}
	}
	
	//图片点击函数
	loadComponent(){
		//动态引入返回一个Promise对象
		import('./text.js').then((Text) => {
			this.setState({
				Text: Text.default
			});
		});
	}
	
	render() {
		// debugger;
		const { Text } = this.state;
		const addResult = largeNumber('999', '1');
		console.log('---------------------this is my log:'+logo);
		return <div className="search-text">
			Hello, React & WebPack { addResult }
			{
				Text ?  <Text /> : null
			}
			<img src={logo}  onClick={this.loadComponent.bind(this)}/>
		</div>;
  }
}

//CJS的写法
module.exports = <Welcome />;
//export default Welcome;
	