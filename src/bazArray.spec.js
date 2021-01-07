"use strict";

const assert = require("assert");
const BazArray = require("./bazArray");

describe('BazArray', function () {
    describe('takeFirstOut', function () {
        it('complains if not enough elements', function () {
            const arr = [];
            assert.throws(() => BazArray.takeFirstOut(arr, 1), { message: "Element count cannot exceed array length" });
        });
        it('gets empty array if count is 0', function () {
            const arr = [1, 2, 3];
            const res = BazArray.takeFirstOut(arr, 0);
            assert.strictEqual(res.length, 0);
        });
        it('gets first element as array', function () {
            const arr = [1, 2, 3];
            const res = BazArray.takeFirstOut(arr);
            assert.strictEqual(res[0], 1);
            assert.strictEqual(res.length, 1);
        });
    });
});
