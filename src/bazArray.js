"use strict";

class BazArray {
    constructor() {
        throw "Don't instantiate static class BazMath."
    }

    static takeFirstOut(arr, elementCount = 1) {
        return arr.splice(0, elementCount);
    }

    static takeLastOut(arr, elementCount = 1) {
        return arr.splice(-elementCount, elementCount);
    }

    static addToFront(arr, ...params) {
        for (let i = params.length - 1; i >= 0; i--)
            arr.unshift(params[i]);
    }

    static clone(arr, fromIndex = 0, elementCount) {
        elementCount = elementCount || arr.length;
        return arr.slice(fromIndex, elementCount);
    }

    static forEachInterval(arr, action, timeStep, callback) {
        if (this.hasNone(arr))
            return;
        let i = 0;
        let elem = arr[0];
        action(elem);
        const loopHandle = setInterval(function () { //Todo: Could add index to callback args
            i++;
            if (i < arr.length) {
                elem = arr[i];
                action(elem);
            } else {
                clearInterval(loopHandle);
                callback();
            }
        }, timeStep);
    }

    static getTop(arr, getter = el => el, elementCount = 1) {
        if (elementCount === 1) { //Todo: compare if elementCount < log(arr.length) and implement O(n*k)
            let max = arr.getMax(getter);
            return { items: [max.item], indexes: [max.index], values: [max.value] };
        }
        let temp = [];
        arr.forEach((e, i, a) => temp[i] = { elem: e, ind: i });
        this.sortDescending(temp, n => getter(n.elem));
        let top = this.takeFirstOut(temp, elementCount);
        return { items: top.map(n => n.elem), indexes: top.map(n => n.ind), values: top.map(n => getter(n.elem)) };
    }

    static getMax(err, getter = el => el) {
        let index = 0;
        let element = arr[index];
        let maxVal = getter(element);
        for (let i = 1; i < arr.length; i++) { //O(n) faster than getTop
            const elem = arr[i]
            const val = getter(elem);
            if (val > maxVal) {
                index = i;
                element = elem;
                maxVal = val;
            }
        }
        return { item: element, index: index, value: maxVal };
    }

    static sortAscending(valueGetter) {
        this.sort((a, b) => valueGetter(a) - valueGetter(b));
    }

    static sortDescending(valueGetter) {
        this.sort((a, b) => valueGetter(b) - valueGetter(a));
    }

    static pickRandom(batchSize = 1) {
        if (this.hasNone)
            throw new Error("Array is empty!")
        if (batchSize === 1) {
            let randomIndex = Math.floor(Math.random() * this.length);
            return this[randomIndex];
        }
        else {
            let clone = this.clone();
            clone.shuffle();
            return clone.slice(0, batchSize);
        }
    }

    static shuffle(batchSize = 1) {
        for (let i = 1; i < this.length; i++) {
            let ind = Random.getInt(0, i - 1);
            [this[i], this[ind]] = [this[ind], this[i]];
        }
    }

    getLast() { return this[this.length - 1] }
    hasAny() { return Boolean(this.length) }
    hasNone() { return Boolean(this.length === 0) }
}

if (typeof module !== "undefined")//Checks if Node enviro
    module.exports = BazMath;
