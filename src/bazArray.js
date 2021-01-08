"use strict";

class BazArray {
    constructor() {
        throw "Don't instantiate static class BazMath."
    }

    static takeFirstOut(arr, elementCount = 1) {
        if (elementCount > arr.length)
            throw new Error("Element count cannot exceed array length");
        return arr.splice(0, elementCount);
    }
    static takeLastOut(arr, elementCount = 1) {
        if (elementCount > arr.length)
            throw new Error("Element count cannot exceed array length");
        return arr.splice(-elementCount, elementCount);
    }

    static addToFront(arr, ...params) {
        for (let i = params.length - 1; i >= 0; i--)
            arr.unshift(params[i]);
        return arr.length;
    }

    static clone(arr, fromIndex = 0, toIndex) { //Excluding toIndex
        return arr.slice(fromIndex, toIndex);
    }

    static getTop(arr, getter = el => el, elementCount = 1) {
        if (elementCount < 1)
            throw new Error("Invalid number of elements requested: " + elementCount);
        if (arr.length < elementCount)
            throw new Error(`Array has ${arr.length} elements which is fewer than ${elementCount} required`);
        if (elementCount === 1) { //Todo: compare if elementCount < log(arr.length) and implement O(n*k)
            let max = this.getMax(arr, getter);
            return { items: [max.item], indices: [max.index], values: [max.value] };
        }
        const temp = arr.map((e, i, a) => { return { elem: e, ind: i } });
        this.sortDescend(temp, n => getter(n.elem));
        let top = this.takeFirstOut(temp, elementCount);
        return { items: top.map(n => n.elem), indices: top.map(n => n.ind), values: top.map(n => getter(n.elem)) };
    }

    static getMax(arr, getter = el => el) {
        if (arr.length === 0)
            throw new Error("Array cannot be empty");

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

    //Todo: Tests to cover this point downwards
    static sortAscend(arr, valueGetter) {
        arr.sort((a, b) => valueGetter(a) - valueGetter(b));
    }

    static sortDescend(arr, valueGetter) {
        arr.sort((a, b) => valueGetter(b) - valueGetter(a));
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
}

if (typeof module !== "undefined")//Checks if Node enviro
    module.exports = BazArray;
