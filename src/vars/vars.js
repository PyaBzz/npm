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

    //Todo: Add tests
    static copyProperties(from, to) {
        for (let key in from)
            to[key] = from[key];
    }

    //Todo: Add tests
    static getPropKeyByIndex(obj, i) {
        return Object.keys(obj)[i];
    }

    //Todo: Add tests
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
