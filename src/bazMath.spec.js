"use strict";

const assert = require("assert");
const BazMath = require("./bazMath");
const Random = require("./random");

describe('BazMath', () => {
    describe(BazMath.amplitude.name, () => {
        it('gets 0 when vector is an empty array', () => {
            assert.strictEqual(BazMath.amplitude([]), 0);
        });

        it('gets single value in a vector', () => {
            assert.strictEqual(BazMath.amplitude([7]), 7);
        });

        it('gets RMS of a normal vector', () => {
            assert.strictEqual(BazMath.amplitude([3, 4]), 5);
        });
    });

    describe(BazMath.sigmoid.name, () => {
        it('gets 0 at origin', () => {
            assert.strictEqual(BazMath.sigmoid(0), 0);
        });

        it('is symmetric', () => {
            const x = Random.getInRange(0.01, 1000);
            assert.strictEqual(BazMath.sigmoid(x), - BazMath.sigmoid(-x));
        });

        it('gets correct value', () => {
            assert.strictEqual(BazMath.sigmoid(1), 1 / 2);
        });
    });
});
