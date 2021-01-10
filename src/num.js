"use strict";

class Num {
    constructor() {
        throw "Don't instantiate static class BazMath."
    }

    static approximates(num, centre, delta) {
        delta = Math.abs(delta);
        return Math.abs(num - centre) < delta;
    }
}

if (typeof module !== "undefined")//Checks if Node enviro
    module.exports = Num;
