const assert = require("assert");
const Vars = require("./vars");

describe('Vars', function () {
    describe('isDefined', function () {
        it('should return false from missing parameter', function () {
            assert.strictEqual(Vars.isDefined(), false);
        });
        it('should return false from undefined value', function () {
            assert.strictEqual(Vars.isDefined(undefined), false);
        });
        it('should return true from any ordinary value', function () {
            assert.strictEqual(Vars.isDefined(1), true);
        });
        it('should return true from 0', function () {
            assert.strictEqual(Vars.isDefined(0), true);
        });
        it('should return true from null', function () {
            assert.strictEqual(Vars.isDefined(null), true);
        });
        it('should return true from false', function () {
            assert.strictEqual(Vars.isDefined(false), true);
        });
        it('should return true from true', function () {
            assert.strictEqual(Vars.isDefined(true), true);
        });
        it('should return true from empty string', function () {
            assert.strictEqual(Vars.isDefined(""), true);
        });
    });

    describe('isUndefined', function () {
        it('should return true from missing parameter', function () {
            assert.strictEqual(Vars.isUndefined(), true);
        });
        it('should return true from undefined value', function () {
            assert.strictEqual(Vars.isUndefined(undefined), true);
        });
        it('should return false from any ordinary value', function () {
            assert.strictEqual(Vars.isUndefined(1), false);
        });
        it('should return false from 0', function () {
            assert.strictEqual(Vars.isUndefined(0), false);
        });
        it('should return false from null', function () {
            assert.strictEqual(Vars.isUndefined(null), false);
        });
        it('should return false from false', function () {
            assert.strictEqual(Vars.isUndefined(false), false);
        });
        it('should return false from true', function () {
            assert.strictEqual(Vars.isUndefined(true), false);
        });
        it('should return false from empty string', function () {
            assert.strictEqual(Vars.isUndefined(""), false);
        });
    });

    describe('isFunction', function () {
        it('should return false from missing parameter', function () {
            assert.strictEqual(Vars.isFunction(), false);
        });
        it('should return false from undefined value', function () {
            assert.strictEqual(Vars.isFunction(undefined), false);
        });
        it('should return false from number', function () {
            assert.strictEqual(Vars.isFunction(0), false);
        });
        it('should return false from null', function () {
            assert.strictEqual(Vars.isFunction(null), false);
        });
        it('should return false from boolean', function () {
            assert.strictEqual(Vars.isFunction(true), false);
        });
        it('should return false from empty string', function () {
            assert.strictEqual(Vars.isFunction(""), false);
        });
        it('should return true from inline function', function () {
            assert.strictEqual(Vars.isFunction(function () { }), true);
        });
        it('should return true from arrow function', function () {
            assert.strictEqual(Vars.isFunction(() => { }), true);
        });
    });

    describe('ifFunctionRun', function () {
        it('should return value from inline func', function () {
            assert.strictEqual(Vars.ifFunctionRun(function () { return 2 }), 2);
        });
        it('should return value from arrow func', function () {
            assert.strictEqual(Vars.ifFunctionRun(() => 3), 3);
        });
        it('should invoke non-return func', function () {
            const mockObj = {};
            Vars.ifFunctionRun(() => { mockObj.foo = "bar" });
            assert.strictEqual(mockObj.foo, "bar");
        });
        it('should return undefined from non-return func', function () {
            assert.strictEqual(Vars.ifFunctionRun(function () { }), undefined);
        });
        it('should return undefined from null', function () {
            assert.strictEqual(Vars.ifFunctionRun(null), undefined);
        });
        it('should return undefined from number', function () {
            assert.strictEqual(Vars.ifFunctionRun(2), undefined);
        });
    });
});
