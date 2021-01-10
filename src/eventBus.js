"use strict";

class EventBus {
    static #instance = null;
    #funcs = {};

    constructor() {
        if (EventBus.#instance)
            throw new Error("Do not instantiate a singleton class twice");
        EventBus.#instance = this;
    }

    static get instance() { return EventBus.#instance ? EventBus.#instance : new EventBus() }

    subscribe(key, func) {
        if (!this.#funcs[key])
            this.#funcs[key] = [];
        this.#funcs[key].push(func);
        return BazArray.getLast(this.#funcs[key]);
    }

    notify(key, ...args) { //Todo: Rename to emit
        const funcArray = this.#funcs[key];
        if (!funcArray)
            throw new Error(`No subscription found with key ${key}`);
        for (let listenerFunc of funcArray)
            listenerFunc(...args);
    }

    unsubscribe(key, listenerRef) {
        const funcArray = this.#funcs[key];
        if (!funcArray)
            throw new Error(`No subscription found with key ${key}`);
        const ind = funcArray.indexOf(listenerRef);
        if (ind !== -1)
            funcArray.splice(ind, 1);
    }
}
