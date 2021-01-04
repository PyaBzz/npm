"use strict";

class Var {
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

    //Todo: Write tests to cover this point downwards
    static nameOf(objectWrappedVar) {
        return Object.keys(objectWrappedVar)[0];
    }

}

if (Var.isDefined(module))
    module.exports = Var;
