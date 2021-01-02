module.exports = class bazMath {
    constructor() {
        throw "Don't instantiate static class bazMath."
    }

    static amplitude(vect) {
        let sumOfSquares = vect.reduce(function (sum, currentVal, currentInd) { return sum + Math.pow(currentVal, 2) }, 0);
        return Math.sqrt(sumOfSquares);
    }

    static sigmoid(x) { return x / (1 + Math.abs(x)) };
}
