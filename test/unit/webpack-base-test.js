// 使用断言库进行验证
// npm i assert -D
const assert = require('assert')

describe('webpack.base.js test case', () => {
    const baseConfig = require('../../lib/webpack.base.js')

    it('entry', () => {
		// for local
        // assert.equal(baseConfig.entry.index, 'D:/Study/webpack/common-builder-webpack/test/smoke/template/src/index/index.js');
        // assert.equal(baseConfig.entry.search, 'D:/Study/webpack/common-builder-webpack/test/smoke/template/src/search/index.js');
		// for travis
        assert.equal(baseConfig.entry.search, '/home/travis/build/Cangyang/common-builder-webpack/test/smoke/template/src/search/index.js');
        assert.equal(baseConfig.entry.index, '/home/travis/build/Cangyang/common-builder-webpack/test/smoke/template/src/index/index.js');
    });
});