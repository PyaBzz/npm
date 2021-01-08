"use strict";

const assert = require("assert");
const Var = require("./var");

describe('Var', () => {
    describe(Var.isDefined.name, () => {
        it('gets false from missing parameter', () => {
            assert.strictEqual(Var.isDefined(), false);
        });
        it('gets false from undefined', () => {
            assert.strictEqual(Var.isDefined(undefined), false);
        });
        it('gets true from any ordinary value', () => {
            assert.strictEqual(Var.isDefined(1), true);
        });
        it('gets true from 0', () => {
            assert.strictEqual(Var.isDefined(0), true);
        });
        it('gets true from null', () => {
            assert.strictEqual(Var.isDefined(null), true);
        });
        it('gets true from false', () => {
            assert.strictEqual(Var.isDefined(false), true);
        });
        it('gets true from true', () => {
            assert.strictEqual(Var.isDefined(true), true);
        });
        it('gets true from empty string', () => {
            assert.strictEqual(Var.isDefined(""), true);
        });
    });

    describe(Var.isUndefined.name, () => {
        it('gets true from missing parameter', () => {
            assert.strictEqual(Var.isUndefined(), true);
        });
        it('gets true from undefined', () => {
            assert.strictEqual(Var.isUndefined(undefined), true);
        });
        it('gets false from any ordinary value', () => {
            assert.strictEqual(Var.isUndefined(1), false);
        });
        it('gets false from 0', () => {
            assert.strictEqual(Var.isUndefined(0), false);
        });
        it('gets false from null', () => {
            assert.strictEqual(Var.isUndefined(null), false);
        });
        it('gets false from false', () => {
            assert.strictEqual(Var.isUndefined(false), false);
        });
        it('gets false from true', () => {
            assert.strictEqual(Var.isUndefined(true), false);
        });
        it('gets false from empty string', () => {
            assert.strictEqual(Var.isUndefined(""), false);
        });
    });

    describe(Var.isFunction.name, () => {
        it('gets false from missing parameter', () => {
            assert.strictEqual(Var.isFunction(), false);
        });
        it('gets false from undefined', () => {
            assert.strictEqual(Var.isFunction(undefined), false);
        });
        it('gets false from number', () => {
            assert.strictEqual(Var.isFunction(0), false);
        });
        it('gets false from null', () => {
            assert.strictEqual(Var.isFunction(null), false);
        });
        it('gets false from boolean', () => {
            assert.strictEqual(Var.isFunction(true), false);
        });
        it('gets false from empty string', () => {
            assert.strictEqual(Var.isFunction(""), false);
        });
        it('gets true from inline function', () => {
            assert.strictEqual(Var.isFunction(() => { }), true);
        });
        it('gets true from arrow function', () => {
            assert.strictEqual(Var.isFunction(() => { }), true);
        });
    });

    describe(Var.ifFunctionRun.name, () => {
        it('gets value from inline func', () => {
            assert.strictEqual(Var.ifFunctionRun(() => { return 2 }), 2);
        });
        it('gets value from arrow func', () => {
            assert.strictEqual(Var.ifFunctionRun(() => 3), 3);
        });
        it('invokes non-return func', () => {
            const mockObj = {};
            Var.ifFunctionRun(() => { mockObj.foo = "bar" });
            assert.strictEqual(mockObj.foo, "bar");
        });
        it('gets undefined from non-return func', () => {
            assert.strictEqual(Var.ifFunctionRun(() => { }), undefined);
        });
        it('gets undefined from null', () => {
            assert.strictEqual(Var.ifFunctionRun(null), undefined);
        });
        it('gets undefined from number', () => {
            assert.strictEqual(Var.ifFunctionRun(2), undefined);
        });
    });

    describe(Var.nameOf.name, () => {
        let myVar;
        it('gets correct name', () => {
            assert.strictEqual(Var.nameOf({ myVar }), "myVar");
        });
        it('complains if unwrapped variable', () => {
            assert.throws(() => Var.nameOf(myVar), { message: "Parameter must be a variable wrapped in an object" });
        });
        it('complains if missing variable', () => {
            assert.throws(() => Var.nameOf({}), { message: "Parameter must be a variable wrapped in an object" });
        });
    });

    describe(Var.isObject.name, () => {
        it('gets false from missing parameter', () => {
            assert.strictEqual(Var.isObject(), false);
        });
        it('gets false from undefined', () => {
            assert.strictEqual(Var.isObject(undefined), false);
        });
        it('gets false from null', () => {
            assert.strictEqual(Var.isObject(null), false);
        });
        it('gets false from number', () => {
            assert.strictEqual(Var.isObject(0), false);
        });
        it('gets false from boolean', () => {
            assert.strictEqual(Var.isObject(true), false);
        });
        it('gets false from string', () => {
            assert.strictEqual(Var.isObject(""), false);
        });
        it('gets false from function', () => {
            assert.strictEqual(Var.isObject(() => { }), false);
        });
        it('gets false from array', () => {
            assert.strictEqual(Var.isObject([]), false);
        });
        it('gets true from inline object', () => {
            assert.strictEqual(Var.isObject({}), true);
        });
    });
});
