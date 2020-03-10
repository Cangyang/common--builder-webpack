// 检测是否又js和css文件生成
// npm i mocha -D

const glob =require('glob-all');

describe('Checking generated css js files', () => {
	it('should generate css js files', (done) => {
		const files = glob.sync([
			'./dist/index-*.js',
			'./dist/index-*.css',
			'./dist/search-*.js',
			'./dist/search-*.css'
		]);
		if(files.length > 0){
			done();
		} else {
			throw new Error('no css js files found');
		}
	});
})