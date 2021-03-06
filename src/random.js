"use strict";

class Random {
    constructor() {
        throw new Error("Do not instantiate a static class");
    }

    static getInt(lower, upper) {  // Inclusive of boundaries
        return lower + Math.floor(Math.random() * (upper - lower + 1));
    }

    static getNumber(lower, upper) {  // Exclusive of upper bound
        return lower + Math.random() * (upper - lower);
    }
}

if (typeof module !== "undefined")
    module.exports = Random;
