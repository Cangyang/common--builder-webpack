const path = require('path');
const webpack = require('webpack');
// npm i rimraf -D
const rimraf = require('rimraf');
const Mocha = require('mocha');

const mocha = new Mocha({
	timeout: '10000ms',
});

// 进入到当前运行目录template
process.chdir(path.join(__dirname, 'template'));

// 检查构建是否报错
rimraf('./dist', () => {
	const prodConfig = require('../../lib/webpack.prod.js');
	
	webpack(prodConfig, (err, stats) => {
		if(err){
			console.error(err);
			process.exit(2);
		}
		console.log(stats.toString({
			colors: true,
			modules: false,
			children: false
		}));
		
		console.log('Webpack build success, begin run test.');
		mocha.addFile(path.join(__dirname, 'html-test.js'));
		mocha.addFile(path.join(__dirname, 'css-js-test.js'));
		
		mocha.run();
	})
})