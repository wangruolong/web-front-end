describe('jQuery', function () {
    it('should have jQuery', function () {
        if (!window.jQuery) {
            throw new Error('查看下 karma.conf.js 配置项 files 是否正确')
        }
    });

});