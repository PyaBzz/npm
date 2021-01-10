"use strict";

const assert = require("assert");
const Random = require("./random");
const BazArray = require("./bazArray");
const Num = require("./num");

describe('Random', () => {
    describe(Random.getInt.name, () => {
        it('stays within range', () => {
            const lower = 2;
            const upper = 11;
            for (let count = 1; count < 100; count++) {
                const x = Random.getInt(lower, upper);
                assert.strictEqual(x >= lower && x <= upper, true);
            }
        });
        it('evenly distributes', () => {
            const lower = 2;
            const upper = 11;
            const len = upper - lower + 1;
            const count = BazArray.of(0, len);
            const rounds = 1000;
            for (let i = 1; i <= rounds; i++) {
                const x = Random.getInt(lower, upper);
                count[x - lower]++;
            }
            const targetCount = rounds / len;
            const delta = rounds * 0.2;
            for (let c of count) {
                assert.strictEqual(Num.approximates(c, targetCount, delta), true);
            }
        });
    });
});
