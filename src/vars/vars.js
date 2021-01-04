"use strict";

class Vars {
    constructor() {
        throw new Error("Do not instantiate a static class");
    }

    static isDefined(variable) {
        return !this.isUndefined(variable);
    }

    static isUndefined(variable) {
        return typeof variable === 'undefined';
    }

    static isFunction(variable) {
        return typeof variable === 'function';
    }

    static ifFunctionRun(variable, ...args) {
        if (this.isFunction(variable))
            return variable(...args);
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
    static nameOf(objectWrappedVar) {
        return Object.keys(objectWrappedVar)[0];
    }

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

if (Vars.isDefined(module))
    module.exports = Vars;
