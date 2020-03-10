// 使用断言库进行验证
// npm i assert -D
const assert = require('assert')

describe('webpack.base.js test case', () => {
    const baseConfig = require('../../lib/webpack.base.js')

    it('entry', () => {
		// for travis
        assert.equal(baseConfig.entry.search.indexOf('common-builder-webpack/test/smoke/template/src/search/index.js') > -1, true);
        assert.equal(baseConfig.entry.index.indexOf('common-builder-webpack/test/smoke/template/src/index/index.js') > -1, true);
    });
});