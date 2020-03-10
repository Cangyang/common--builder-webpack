'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import largeNumber from 'large-number';
import '../../common';
import {a} from './tree-shaking';
import './css/search.less';
import logo from './images/guide.png';


if(false){
	console.log('---------------'+a());
}
a = 1/ 0;

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
		//tree shaking test
		const funcA = a();
		const { Text } = this.state;
		const addResult = largeNumber('999', '1');
		return <div className="search-text">
			{
				Text ?  <Text /> : null
			}
			Hello, React & WebPack { funcA } { addResult }
			<img src={logo} onClick= {this.loadComponent.bind(this)} />
		</div>;
  }
}

ReactDOM.render(
	<Welcome />,
	document.getElementById('root')
)

	