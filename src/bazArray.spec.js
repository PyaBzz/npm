"use strict";

const assert = require("assert");
const BazArray = require("./bazArray");

describe('BazArray', () => {
    describe('takeFirstOut', () => {
        it('complains if not enough elements', () => {
            const arr = [];
            assert.throws(() => BazArray.takeFirstOut(arr, 1), { message: "Element count cannot exceed array length" });
        });
        const arr = [1, 2, 3];
        it('gets empty array if count is 0', () => {
            const res = BazArray.takeFirstOut(arr, 0);
            assert.strictEqual(res.length, 0);
        });
        it('leaves array untouched if count is 0', () => {
            assert.strictEqual(arr.length, 3);
        });
        it('gets first element as array', () => {
            const res = BazArray.takeFirstOut(arr);
            assert.strictEqual(res[0], 1);
            assert.strictEqual(res.length, 1);
        });
        it('removes elements from the array', () => {
            assert.strictEqual(arr.length, 2);
        });
    });

    describe('takeLastOut', () => {
        it('complains if not enough elements', () => {
            const arr = [];
            assert.throws(() => BazArray.takeLastOut(arr, 1), { message: "Element count cannot exceed array length" });
        });
        const arr = [1, 2, 3];
        it('gets empty array if count is 0', () => {
            const res = BazArray.takeLastOut(arr, 0);
            assert.strictEqual(res.length, 0);
        });
        it('leaves array untouched if count is 0', () => {
            assert.strictEqual(arr.length, 3);
        });
        it('gets first element as array', () => {
            const res = BazArray.takeLastOut(arr);
            assert.strictEqual(res[0], 3);
            assert.strictEqual(res.length, 1);
        });
        it('removes elements from the array', () => {
            assert.strictEqual(arr.length, 2);
        });
    });

    describe('addToFront', () => {
        const arr = [4, 5, 6];
        it('leaves array untouched if no params', () => {
            const res = BazArray.addToFront(arr);
            assert.strictEqual(res, 3);
            assert.strictEqual(arr.length, 3);
        });
        it('adds single element to array', () => {
            const res = BazArray.addToFront(arr, 3);
            assert.strictEqual(arr[0], 3);
            assert.strictEqual(res, 4);
        });
        it('adds multiple elements to array', () => {
            const res = BazArray.addToFront(arr, 1, 2);
            assert.strictEqual(arr[0], 1);
            assert.strictEqual(res, 6);
        });
    });

    describe('clone', () => {
        const arr = [1, 2, 3];
        it('leaves array untouched', () => {
            const res = BazArray.clone(arr);
            assert.strictEqual(arr.length, 3);
        });
        it('clones fully if no param', () => {
            const res = BazArray.clone(arr);
            assert.strictEqual(res.length, 3);
            for (let i = 0; i <= arr.length; i++)
                assert.strictEqual(arr[i], res[i]);
        });
        it('clones partially if start index given', () => {
            const startIndex = 1;
            const res = BazArray.clone(arr, startIndex);
            assert.strictEqual(res.length, arr.length - startIndex);
            for (let i = 0; i <= res.length; i++)
                assert.strictEqual(res[i], arr[startIndex + i]);
        });
        it('gets empty array if equal start and end indices', () => {
            const startIndex = 1;
            const toIndex = 1;
            const res = BazArray.clone(arr, startIndex, toIndex);
            assert.strictEqual(res.length, 0);
        });
        it('gets correct elements', () => {
            const startIndex = 1;
            const toIndex = 3;
            const res = BazArray.clone(arr, startIndex, toIndex);
            assert.strictEqual(res.length, toIndex - startIndex);
            for (let i = 0; i <= res.length; i++)
                assert.strictEqual(res[i], arr[startIndex + i]);
        });
    });
});
