"use strict";

class Var {
    constructor() {
        throw new Error("Do not instantiate a static class");
    }

    static isDefined(v) {
        return !this.isUndefined(v);
    }

    static isUndefined(v) {
        return typeof v === 'undefined';
    }

    static isFunction(v) {
        return typeof v === 'function';
    }

    static ifFunctionRun(v, ...args) {
        if (this.isFunction(v))
            return v(...args);
    }

    static nameOf(objectWrappedVar) {
        if (this.isObject(objectWrappedVar) === false
            || Object.keys(objectWrappedVar).length === 0
        )
            throw new Error("Parameter must be a variable wrapped in an object");
        return Object.keys(objectWrappedVar)[0];
    }

    static isObject(v) {
        if (typeof v === 'object') {
            if (v instanceof Array)
                return false;
            else if (v === null)
                return false;
            else
                return true;
        } else
            return false;
    }
}

if (typeof module !== "undefined")//Checks if Node enviro
    module.exports = Var;
