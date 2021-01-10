"use strict";

const assert = require("assert");
const Num = require("./num");

describe('Num', () => {
    describe(Num.approximates.name, () => {
        const minDelta = Number.MIN_VALUE;
        it('gets true from same number', () => {
            assert.strictEqual(Num.approximates(1, 1, minDelta), true);
        });
        it('gets true from close numbers', () => {
            assert.strictEqual(Num.approximates(1 + minDelta, 1, 2 * minDelta), true);
        });
        it('gets false from far numbers', () => {
            assert.strictEqual(Num.approximates(1.1, 1, 0.005), false);
        });
    });
});
