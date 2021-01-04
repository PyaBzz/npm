"use strict";

const assert = require("assert");
const Obj = require("./obj");

describe('Obj', function () {
    describe('copyProps', function () {
        it('copies nothing from an empty object', function () {
            const src = {}, dest = {};
            Obj.copyProps(src, dest);
            assert.strictEqual(Object.keys(dest).length, 0);
        });
        it('doesn\'t change existing props', function () {
            const src = { foo: 3 }, dest = { bar: 4 };
            Obj.copyProps(src, dest);
            assert.strictEqual(Object.keys(dest).length, 2);
            assert.strictEqual(dest.bar, 4);
        });
        it('copies props', function () {
            const src = { foo: 3 }, dest = {};
            Obj.copyProps(src, dest);
            assert.strictEqual(dest.foo, 3);
        });
        it('overwrites matching props', function () {
            const src = { foo: 3 }, dest = { foo: 4 };
            Obj.copyProps(src, dest);
            assert.strictEqual(Object.keys(dest).length, 1);
            assert.strictEqual(dest.foo, 3);
        });
    });

    describe('getPropKeyByIndex', function () {
        const obj = { foo: null, bar: null };
        it('gets property key', function () {
            assert.strictEqual(Obj.getPropKeyByIndex(obj, 0), "foo");
            assert.strictEqual(Obj.getPropKeyByIndex(obj, 1), "bar");
        });
        it('complains about missing params', function () {
            assert.throws(() => Obj.getPropKeyByIndex(), { message: "Expected number of parameters: 2" });
        });
    });

    describe('deepFreeze', function () {
        it('freezes flat object', function () {
            const obj = { foo: null, bar: null };
            Obj.deepFreeze(obj);
            assert.throws(() => obj.foo = 3, { message: /^Cannot assign to read only property/ });
        });
        it('freezes deep object', function () {
            const obj = { foo: { bar: null } };
            Obj.deepFreeze(obj);
            assert.throws(() => obj.foo.bar = 3, { message: /^Cannot assign to read only property/ });
        });
    });
});
