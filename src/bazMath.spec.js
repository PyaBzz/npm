"use strict";

const assert = require("assert");
const BazMath = require("./bazMath");
const Random = require("./random");

describe('BazMath', function () {
    describe('amplitude', function () {
        it('gets 0 when vector is an empty array', function () {
            assert.strictEqual(BazMath.amplitude([]), 0);
        });

        it('gets single value in a vector', function () {
            assert.strictEqual(BazMath.amplitude([7]), 7);
        });

        it('gets RMS of a normal vector', function () {
            assert.strictEqual(BazMath.amplitude([3, 4]), 5);
        });
    });

    describe('sigmoid', function () {
        it('gets 0 at origin', function () {
            assert.strictEqual(BazMath.sigmoid(0), 0);
        });

        it('is symmetric', function () {
            const x = Random.getInRange(0.01, 1000);
            assert.strictEqual(BazMath.sigmoid(x), - BazMath.sigmoid(-x));
        });

        it('gets correct value', function () {
            assert.strictEqual(BazMath.sigmoid(1), 1 / 2);
        });
    });
});
