"use strict";

const assert = require("assert");
const Var = require("./var");

describe('Var', function () {
    describe('isDefined', function () {
        it('gets false from missing parameter', function () {
            assert.strictEqual(Var.isDefined(), false);
        });
        it('gets false from undefined', function () {
            assert.strictEqual(Var.isDefined(undefined), false);
        });
        it('gets true from any ordinary value', function () {
            assert.strictEqual(Var.isDefined(1), true);
        });
        it('gets true from 0', function () {
            assert.strictEqual(Var.isDefined(0), true);
        });
        it('gets true from null', function () {
            assert.strictEqual(Var.isDefined(null), true);
        });
        it('gets true from false', function () {
            assert.strictEqual(Var.isDefined(false), true);
        });
        it('gets true from true', function () {
            assert.strictEqual(Var.isDefined(true), true);
        });
        it('gets true from empty string', function () {
            assert.strictEqual(Var.isDefined(""), true);
        });
    });

    describe('isUndefined', function () {
        it('gets true from missing parameter', function () {
            assert.strictEqual(Var.isUndefined(), true);
        });
        it('gets true from undefined', function () {
            assert.strictEqual(Var.isUndefined(undefined), true);
        });
        it('gets false from any ordinary value', function () {
            assert.strictEqual(Var.isUndefined(1), false);
        });
        it('gets false from 0', function () {
            assert.strictEqual(Var.isUndefined(0), false);
        });
        it('gets false from null', function () {
            assert.strictEqual(Var.isUndefined(null), false);
        });
        it('gets false from false', function () {
            assert.strictEqual(Var.isUndefined(false), false);
        });
        it('gets false from true', function () {
            assert.strictEqual(Var.isUndefined(true), false);
        });
        it('gets false from empty string', function () {
            assert.strictEqual(Var.isUndefined(""), false);
        });
    });

    describe('isFunction', function () {
        it('gets false from missing parameter', function () {
            assert.strictEqual(Var.isFunction(), false);
        });
        it('gets false from undefined', function () {
            assert.strictEqual(Var.isFunction(undefined), false);
        });
        it('gets false from number', function () {
            assert.strictEqual(Var.isFunction(0), false);
        });
        it('gets false from null', function () {
            assert.strictEqual(Var.isFunction(null), false);
        });
        it('gets false from boolean', function () {
            assert.strictEqual(Var.isFunction(true), false);
        });
        it('gets false from empty string', function () {
            assert.strictEqual(Var.isFunction(""), false);
        });
        it('gets true from inline function', function () {
            assert.strictEqual(Var.isFunction(function () { }), true);
        });
        it('gets true from arrow function', function () {
            assert.strictEqual(Var.isFunction(() => { }), true);
        });
    });

    describe('ifFunctionRun', function () {
        it('gets value from inline func', function () {
            assert.strictEqual(Var.ifFunctionRun(function () { return 2 }), 2);
        });
        it('gets value from arrow func', function () {
            assert.strictEqual(Var.ifFunctionRun(() => 3), 3);
        });
        it('invokes non-return func', function () {
            const mockObj = {};
            Var.ifFunctionRun(() => { mockObj.foo = "bar" });
            assert.strictEqual(mockObj.foo, "bar");
        });
        it('gets undefined from non-return func', function () {
            assert.strictEqual(Var.ifFunctionRun(function () { }), undefined);
        });
        it('gets undefined from null', function () {
            assert.strictEqual(Var.ifFunctionRun(null), undefined);
        });
        it('gets undefined from number', function () {
            assert.strictEqual(Var.ifFunctionRun(2), undefined);
        });
    });

    describe('nameOf', function () {
        let myVar;
        it('gets correct name', function () {
            assert.strictEqual(Var.nameOf({ myVar }), "myVar");
        });
        it('complains if unwrapped variable', function () {
            assert.throws(() => Var.nameOf(myVar), { message: "Parameter must be a variable wrapped in an object" });
        });
        it('complains if missing variable', function () {
            assert.throws(() => Var.nameOf({}), { message: "Parameter must be a variable wrapped in an object" });
        });

        describe('isObject', function () {
            it('gets false from missing parameter', function () {
                assert.strictEqual(Var.isObject(), false);
            });
            it('gets false from undefined', function () {
                assert.strictEqual(Var.isObject(undefined), false);
            });
            it('gets false from null', function () {
                assert.strictEqual(Var.isObject(null), false);
            });
            it('gets false from number', function () {
                assert.strictEqual(Var.isObject(0), false);
            });
            it('gets false from boolean', function () {
                assert.strictEqual(Var.isObject(true), false);
            });
            it('gets false from string', function () {
                assert.strictEqual(Var.isObject(""), false);
            });
            it('gets false from function', function () {
                assert.strictEqual(Var.isObject(() => { }), false);
            });
            it('gets false from array', function () {
                assert.strictEqual(Var.isObject([]), false);
            });
            it('gets true from inline object', function () {
                assert.strictEqual(Var.isObject({}), true);
            });
        });
    });
});
