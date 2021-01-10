"use strict";
const isNode = typeof module !== "undefined";

class BazMath {
    constructor() {
        throw "Don't instantiate static class BazMath."
    }

    static amplitude(vect) {
        let sumOfSquares = vect.reduce(function (sum, currentVal, currentInd) { return sum + Math.pow(currentVal, 2) }, 0);
        return Math.sqrt(sumOfSquares);
    }

    static sigmoid(x) { return x / (1 + Math.abs(x)) };
}

if (isNode)
    module.exports = BazMath;
