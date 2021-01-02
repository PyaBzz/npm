const assert = require("assert");
const Vars = require("./vars");

describe('Vars', function () {
    describe('isDefined', function () {
        it('should return false from missing parameter', function () {
            assert.strictEqual(Vars.isDefined(), false);
        });
        it('should return false from undefined value', function () {
            assert.strictEqual(Vars.isDefined(Vars.undef), false);
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
            assert.strictEqual(Vars.isUndefined(Vars.undef), true);
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
            assert.strictEqual(Vars.isFunction(Vars.undef), false);
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
        it('should return true from literal function', function () {
            assert.strictEqual(Vars.isFunction(function () { }), true);
        });
        it('should return true from arrow function', function () {
            assert.strictEqual(Vars.isFunction(() => { }), true);
        });
    });
});
