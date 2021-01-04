"use strict";

const assert = require("assert");
const BazMath = require("./bazMath");
const Random = require("./../random");

describe('BazMath', function () {
    describe('amplitude', function () {
        it('returns 0 when vector is an empty array', function () {
            assert.strictEqual(BazMath.amplitude([]), 0);
        });

        it('returns single value in a vector', function () {
            assert.strictEqual(BazMath.amplitude([7]), 7);
        });

        it('returns RMS of a normal vector', function () {
            assert.strictEqual(BazMath.amplitude([3, 4]), 5);
        });
    });

    describe('sigmoid', function () {
        it('returns 0 at origin', function () {
            assert.strictEqual(BazMath.sigmoid(0), 0);
        });

        it('is symmetric', function () {
            const x = Random.getInRange(0.01, 1000);
            assert.strictEqual(BazMath.sigmoid(x), - BazMath.sigmoid(-x));
        });

        it('returns correct value', function () {
            assert.strictEqual(BazMath.sigmoid(1), 1 / 2);
        });
    });
});
