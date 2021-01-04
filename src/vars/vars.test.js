const assert = require("assert");
const Vars = require("./vars");

describe('Vars', function () {
    describe('isDefined', function () {
        it('returns false from missing parameter', function () {
            assert.strictEqual(Vars.isDefined(), false);
        });
        it('returns false from undefined value', function () {
            assert.strictEqual(Vars.isDefined(undefined), false);
        });
        it('returns true from any ordinary value', function () {
            assert.strictEqual(Vars.isDefined(1), true);
        });
        it('returns true from 0', function () {
            assert.strictEqual(Vars.isDefined(0), true);
        });
        it('returns true from null', function () {
            assert.strictEqual(Vars.isDefined(null), true);
        });
        it('returns true from false', function () {
            assert.strictEqual(Vars.isDefined(false), true);
        });
        it('returns true from true', function () {
            assert.strictEqual(Vars.isDefined(true), true);
        });
        it('returns true from empty string', function () {
            assert.strictEqual(Vars.isDefined(""), true);
        });
    });

    describe('isUndefined', function () {
        it('returns true from missing parameter', function () {
            assert.strictEqual(Vars.isUndefined(), true);
        });
        it('returns true from undefined value', function () {
            assert.strictEqual(Vars.isUndefined(undefined), true);
        });
        it('returns false from any ordinary value', function () {
            assert.strictEqual(Vars.isUndefined(1), false);
        });
        it('returns false from 0', function () {
            assert.strictEqual(Vars.isUndefined(0), false);
        });
        it('returns false from null', function () {
            assert.strictEqual(Vars.isUndefined(null), false);
        });
        it('returns false from false', function () {
            assert.strictEqual(Vars.isUndefined(false), false);
        });
        it('returns false from true', function () {
            assert.strictEqual(Vars.isUndefined(true), false);
        });
        it('returns false from empty string', function () {
            assert.strictEqual(Vars.isUndefined(""), false);
        });
    });

    describe('isFunction', function () {
        it('returns false from missing parameter', function () {
            assert.strictEqual(Vars.isFunction(), false);
        });
        it('returns false from undefined value', function () {
            assert.strictEqual(Vars.isFunction(undefined), false);
        });
        it('returns false from number', function () {
            assert.strictEqual(Vars.isFunction(0), false);
        });
        it('returns false from null', function () {
            assert.strictEqual(Vars.isFunction(null), false);
        });
        it('returns false from boolean', function () {
            assert.strictEqual(Vars.isFunction(true), false);
        });
        it('returns false from empty string', function () {
            assert.strictEqual(Vars.isFunction(""), false);
        });
        it('returns true from inline function', function () {
            assert.strictEqual(Vars.isFunction(function () { }), true);
        });
        it('returns true from arrow function', function () {
            assert.strictEqual(Vars.isFunction(() => { }), true);
        });
    });

    describe('ifFunctionRun', function () {
        it('returns value from inline func', function () {
            assert.strictEqual(Vars.ifFunctionRun(function () { return 2 }), 2);
        });
        it('returns value from arrow func', function () {
            assert.strictEqual(Vars.ifFunctionRun(() => 3), 3);
        });
        it('invokes non-return func', function () {
            const mockObj = {};
            Vars.ifFunctionRun(() => { mockObj.foo = "bar" });
            assert.strictEqual(mockObj.foo, "bar");
        });
        it('returns undefined from non-return func', function () {
            assert.strictEqual(Vars.ifFunctionRun(function () { }), undefined);
        });
        it('returns undefined from null', function () {
            assert.strictEqual(Vars.ifFunctionRun(null), undefined);
        });
        it('returns undefined from number', function () {
            assert.strictEqual(Vars.ifFunctionRun(2), undefined);
        });
    });

    describe('copyProps', function () {
        it('copies nothing from an empty object', function () {
            const src = {}, dest = {};
            Vars.copyProps(src, dest);
            assert.strictEqual(Object.keys(dest).length, 0);
        });
        it('doesn\'t change existing props', function () {
            const src = { foo: 3 }, dest = { bar: 4 };
            Vars.copyProps(src, dest);
            assert.strictEqual(Object.keys(dest).length, 2);
            assert.strictEqual(dest.bar, 4);
        });
        it('copies props', function () {
            const src = { foo: 3 }, dest = {};
            Vars.copyProps(src, dest);
            assert.strictEqual(dest.foo, 3);
        });
        it('overwrites matching props', function () {
            const src = { foo: 3 }, dest = { foo: 4 };
            Vars.copyProps(src, dest);
            assert.strictEqual(Object.keys(dest).length, 1);
            assert.strictEqual(dest.foo, 3);
        });
    });

    describe('getPropKeyByIndex', function () {
        const obj = { foo: null, bar: null };
        it('gets property key', function () {
            assert.strictEqual(Vars.getPropKeyByIndex(obj, 0), "foo");
            assert.strictEqual(Vars.getPropKeyByIndex(obj, 1), "bar");
        });
        it('complains about missing params', function () {
            try {
                Vars.getPropKeyByIndex();
            }
            catch (err) {
                assert.strictEqual(err.message, "Expected number of parameters: 2")
            }
        });
    });
});
