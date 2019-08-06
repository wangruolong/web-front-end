import { bind } from '../../src/utils/bindUtil'

let obj = {
    v:'v',
    f: function (...args) {return [this.v].concat(args)}
}

describe('bindUtil', function() {
    it('starts', () => {
        console.log('good beginning')
        expect(obj.f()[0]).to.equal('v')
        expect(obj.f()[1]).to.equal(undefined)
        expect(obj.f(1)[1]).to.equal(1)
    });

    it('binds this', () => {
        let f = bind(obj.f, obj)
        expect(f()[0]).to.equal('v')
        expect(f()[1]).to.equal(undefined)
        expect(f(1)[1]).to.equal(1)
    });

    it('binds args', () => {
        let f = bind(obj.f, obj)
        let f2 = f.bindArgs(1)
        expect(f2()[0]).to.equal('v')
        expect(f2()[1]).to.equal(1)
        expect(f2()[2]).to.equal(undefined)
        expect(f2(3)[1]).to.equal(1)
        expect(f2(3)[2]).to.equal(3)
    });

    it('caches binded funcs', () => {
        let f = bind(obj.f, obj)
        let f2 = f.bindArgs()
        let f3 = f.bindArgs()
        let f4 = f.bindArgs(1)
        let f5 = f.bindArgs(1)
        let f6 = f.bindArgs(2,3,4,5,8,[1,2])
        let f7 = f.bindArgs(2,3,4,5,8,[1,2])
        let f8 = f.bindArgs(2,3,4,5,6,7,9)
        expect(f2).to.equal(f3)
        expect(f4).to.equal(f5)
        expect(f5).to.not.equal(f6)
        expect(f6).to.equal(f7)
        expect(f7).to.not.equal(f8)
    });

    it('won\'t cache funcs when arg is a func', () => {
        let f = bind(obj.f, obj)
        let f2 = f.bindArgs(f)
        let f3 = f.bindArgs(f)
        expect(f2).to.not.equal(f3)
    });

    it('won\'t cache funcs when there is a symbol and it needs to use json', () => {
        let f = bind(obj.f, obj)
        let s = Symbol()
        let f2 = f.bindArgs(s)
        let f3 = f.bindArgs(s)
        expect(f2).to.equal(f3)
        let f4 = f.bindArgs(s, {})
        let f5 = f.bindArgs(s, {})
        expect(f5).to.not.equal(f4)
    });
});
