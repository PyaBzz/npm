"use strict";
const isNode = typeof module !== "undefined";

class Num {
    constructor() {
        throw "Don't instantiate static class BazMath."
    }

    static approximates(num, centre, delta) {
        delta = Math.abs(delta);
        return Math.abs(num - centre) < delta;
    }
}

if (isNode)
    module.exports = Num;
