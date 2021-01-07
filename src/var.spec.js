"use strict";

const assert = require("assert");
const Var = require("./var");

describe('Var', function () {
    describe('isDefined', function () {
        it('returns false from missing parameter', function () {
            assert.strictEqual(Var.isDefined(), false);
        });
        it('returns false from undefined', function () {
            assert.strictEqual(Var.isDefined(undefined), false);
        });
        it('returns true from any ordinary value', function () {
            assert.strictEqual(Var.isDefined(1), true);
        });
        it('returns true from 0', function () {
            assert.strictEqual(Var.isDefined(0), true);
        });
        it('returns true from null', function () {
            assert.strictEqual(Var.isDefined(null), true);
        });
        it('returns true from false', function () {
            assert.strictEqual(Var.isDefined(false), true);
        });
        it('returns true from true', function () {
            assert.strictEqual(Var.isDefined(true), true);
        });
        it('returns true from empty string', function () {
            assert.strictEqual(Var.isDefined(""), true);
        });
    });

    describe('isUndefined', function () {
        it('returns true from missing parameter', function () {
            assert.strictEqual(Var.isUndefined(), true);
        });
        it('returns true from undefined', function () {
            assert.strictEqual(Var.isUndefined(undefined), true);
        });
        it('returns false from any ordinary value', function () {
            assert.strictEqual(Var.isUndefined(1), false);
        });
        it('returns false from 0', function () {
            assert.strictEqual(Var.isUndefined(0), false);
        });
        it('returns false from null', function () {
            assert.strictEqual(Var.isUndefined(null), false);
        });
        it('returns false from false', function () {
            assert.strictEqual(Var.isUndefined(false), false);
        });
        it('returns false from true', function () {
            assert.strictEqual(Var.isUndefined(true), false);
        });
        it('returns false from empty string', function () {
            assert.strictEqual(Var.isUndefined(""), false);
        });
    });

    describe('isFunction', function () {
        it('returns false from missing parameter', function () {
            assert.strictEqual(Var.isFunction(), false);
        });
        it('returns false from undefined', function () {
            assert.strictEqual(Var.isFunction(undefined), false);
        });
        it('returns false from number', function () {
            assert.strictEqual(Var.isFunction(0), false);
        });
        it('returns false from null', function () {
            assert.strictEqual(Var.isFunction(null), false);
        });
        it('returns false from boolean', function () {
            assert.strictEqual(Var.isFunction(true), false);
        });
        it('returns false from empty string', function () {
            assert.strictEqual(Var.isFunction(""), false);
        });
        it('returns true from inline function', function () {
            assert.strictEqual(Var.isFunction(function () { }), true);
        });
        it('returns true from arrow function', function () {
            assert.strictEqual(Var.isFunction(() => { }), true);
        });
    });

    describe('ifFunctionRun', function () {
        it('returns value from inline func', function () {
            assert.strictEqual(Var.ifFunctionRun(function () { return 2 }), 2);
        });
        it('returns value from arrow func', function () {
            assert.strictEqual(Var.ifFunctionRun(() => 3), 3);
        });
        it('invokes non-return func', function () {
            const mockObj = {};
            Var.ifFunctionRun(() => { mockObj.foo = "bar" });
            assert.strictEqual(mockObj.foo, "bar");
        });
        it('returns undefined from non-return func', function () {
            assert.strictEqual(Var.ifFunctionRun(function () { }), undefined);
        });
        it('returns undefined from null', function () {
            assert.strictEqual(Var.ifFunctionRun(null), undefined);
        });
        it('returns undefined from number', function () {
            assert.strictEqual(Var.ifFunctionRun(2), undefined);
        });
    });

    describe('nameOf', function () {
        let myVar;
        it('returns correct name', function () {
            assert.strictEqual(Var.nameOf({ myVar }), "myVar");
        });
        it('complains about unwrapped variable', function () {
            assert.throws(() => Var.nameOf(myVar), { message: "Parameter must be a variable wrapped in an object" });
        });
        it('complains about missing variable', function () {
            assert.throws(() => Var.nameOf({}), { message: "Parameter must be a variable wrapped in an object" });
        });

        describe('isObject', function () {
            it('returns false from missing parameter', function () {
                assert.strictEqual(Var.isObject(), false);
            });
            it('returns false from undefined', function () {
                assert.strictEqual(Var.isObject(undefined), false);
            });
            it('returns false from null', function () {
                assert.strictEqual(Var.isObject(null), false);
            });
            it('returns false from number', function () {
                assert.strictEqual(Var.isObject(0), false);
            });
            it('returns false from boolean', function () {
                assert.strictEqual(Var.isObject(true), false);
            });
            it('returns false from string', function () {
                assert.strictEqual(Var.isObject(""), false);
            });
            it('returns false from function', function () {
                assert.strictEqual(Var.isObject(() => { }), false);
            });
            it('returns false from array', function () {
                assert.strictEqual(Var.isObject([]), false);
            });
            it('returns true from inline object', function () {
                assert.strictEqual(Var.isObject({}), true);
            });
        });
    });
});
