"use strict";

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

    //Todo: Write tests to cover this point downwards
    static deepFreeze(object) {
        const propNames = Object.getOwnPropertyNames(object);

        for (const name of propNames) {
            const value = object[name];

            if (value && typeof value === "object") {
                deepFreeze(value);
            }
        }

        return Object.freeze(object);
    }
}

if (typeof module !== "undefined")
    module.exports = Obj;
