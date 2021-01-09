"use strict";

if (typeof module !== "undefined")//Checks if Node enviro
    var Random = require("./random");

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

    static sortAscend(arr, valueGetter) {
        arr.sort((a, b) => valueGetter(a) - valueGetter(b));
    }

    static sortDescend(arr, valueGetter) {
        arr.sort((a, b) => valueGetter(b) - valueGetter(a));
    }

    //Todo: Move to Random
    static pickRandom(arr, batchSize = 1) {
        if (this.hasNone(arr))
            throw new Error("Array cannot be empty")
        if (batchSize < 1)
            throw new Error(`Batch size of ${batchSize} must be at least 1`);
        if (arr.length < batchSize)
            throw new Error(`Array has ${arr.length} elements which is fewer than ${batchSize} required`);
        if (batchSize === 1) {
            let randomIndex = Math.floor(Math.random() * arr.length);
            return { items: [arr[randomIndex]], indices: [randomIndex] };
        }
        else {
            let temp = arr.map((e, i, a) => { return { elem: e, ind: i } });
            temp = this.takeFirstOut(temp, batchSize);
            return { items: temp.map(x => x.elem), indices: temp.map(x => x.ind) };
        }
    }

    static hasNone(arr) { return Boolean(arr.length === 0) }

    static hasAny(arr) { return Boolean(arr.length) }

    static getLast(arr) {
        if (this.hasNone(arr))
            throw new Error("Array cannot be empty");
        return arr[arr.length - 1]
    }

    //Todo: Move to Random
    static shuffle(arr) {
        if (arr.length <= 1)
            return;
        for (let i = 1; i < arr.length; i++) {
            let ind = Random.getInt(0, i);
            [arr[i], arr[ind]] = [arr[ind], arr[i]];
        }
    }

    //Todo: Tests to cover this point downwards
    static forEachInterval(arr, action, timeStep, callback) {
        if (this.hasNone(arr))
            return;
        let i = 0;
        let elem = arr[0];
        action(elem, i, arr);
        const loopHandle = setInterval(function () {
            i++;
            if (i < arr.length) {
                elem = arr[i];
                action(elem, i, arr);
            } else {
                clearInterval(loopHandle);
                callback();
            }
        }, timeStep);
    }

    static hasAll(arr, subArr) { return subArr.every(x => arr.includes(x)) }
}

if (typeof module !== "undefined")//Checks if Node enviro
    module.exports = BazArray;
