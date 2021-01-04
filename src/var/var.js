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

    //Todo: Write tests to cover this point downwards
    static isObject(v) {
        return typeof v === 'object';
    }
}

if (Var.isDefined(module))
    module.exports = Var;
