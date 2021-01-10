"use strict";
const isNode = typeof module !== "undefined";

class Obj {
    constructor() {
        throw new Error("Do not instantiate a static class");
    }

    static copyProps(from, to) {
        for (let key in from)
            to[key] = from[key];
    }

    static getPropKeyByIndex(...args) {
        if (args.length !== 2)
            throw new Error("Expected number of parameters: " + 2)
        const [obj, i] = args;
        return Object.keys(obj)[i];
    }

    static deepFreeze(o) {
        const propNames = Object.getOwnPropertyNames(o);

        for (const name of propNames) {
            const value = o[name];

            if (value && typeof value === "object") {
                Obj.deepFreeze(value);
            }
        }
        return Object.freeze(o);
    }
}

if (isNode)
    module.exports = Obj;
