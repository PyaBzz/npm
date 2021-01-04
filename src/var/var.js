"use strict";

class Var {
    constructor() {
        throw new Error("Do not instantiate a static class");
    }

    //Todo: Rename variable to v
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

    static nameOf(objectWrappedVar) {
        if (this.isObject(objectWrappedVar) === false)
            throw new Error("Parameter must be a variable wrapped in an object");
        return Object.keys(objectWrappedVar)[0];
    }

    //Todo: Write tests to cover this point downwards
    static isObject(variable) {
        return typeof variable === 'object';
    }
}

if (Var.isDefined(module))
    module.exports = Var;
