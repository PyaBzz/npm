class Random {
    constructor() {
        throw new Error("Do not instantiate a static class");
    }

    static getInt(lower, upper) {  // Inclusive of boundaries
        return lower + Math.floor(Math.random() * (upper - lower + 1));
    }

    static getInRange(lower, upper) {  // Exclusive of upper bound
        return lower + Math.random() * (upper - lower);
    }
}
