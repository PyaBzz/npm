isDefined = function (variable) {
    return typeof variable !== 'undefined';
}

isUndefined = function (variable) {
    return typeof variable === 'undefined';
}

isFunction = function (variable) {
    return typeof variable === 'function';
}

ifFunctionRun = function (variable, ...params) {
    if (isFunction(variable))
        variable(...params);
}

copyProperties = function (from, to) {
    for (let key in from)
        to[key] = from[key];
}

getPropKeyByIndex = function (obj, i) {
    return Object.keys(obj)[i];
}

deepFreeze = function (object) {
    const propNames = Object.getOwnPropertyNames(object);

    for (const name of propNames) {
        const value = object[name];

        if (value && typeof value === "object") {
            deepFreeze(value);
        }
    }

    return Object.freeze(object);
}
