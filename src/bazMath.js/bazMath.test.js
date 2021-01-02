const assert = require("assert");
const bazMath = require("./bazMath");
const Random = require("./../random");

describe('bazMath', function () {
    describe('amplitude', function () {
        it('should return 0 when vector is an empty array', function () {
            assert.strictEqual(bazMath.amplitude([]), 0);
        });

        it('should return single value in a vector', function () {
            assert.strictEqual(bazMath.amplitude([7]), 7);
        });

        it('should return RMS of a normal vector', function () {
            assert.strictEqual(bazMath.amplitude([3, 4]), 5);
        });
    });

    describe('sigmoid', function () {
        it('should return 0 at origin', function () {
            assert.strictEqual(bazMath.sigmoid(0), 0);
        });

        it('should be symmetric', function () {
            const x = Random.getInRange(0.01, 1000);
            assert.strictEqual(bazMath.sigmoid(x), - bazMath.sigmoid(-x));
        });

        it('should return correct value', function () {
            assert.strictEqual(bazMath.sigmoid(1), 1 / 2);
        });
    });
});
