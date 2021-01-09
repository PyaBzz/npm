"use strict";

const assert = require("assert");
const BazArray = require("./bazArray");

describe('BazArray', () => {
    describe(BazArray.takeFirstOut.name, () => {
        it('nags if not enough elements', () => {
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

    describe(BazArray.takeLastOut.name, () => {
        it('nags if not enough elements', () => {
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

    describe(BazArray.addToFront.name, () => {
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

    describe(BazArray.clone.name, () => {
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

    describe(BazArray.getTop.name, () => {
        it('nags if elementCount < 1', () => {
            assert.throws(() => BazArray.getTop([1, 2], x => x, 0), { message: "Invalid number of elements requested: 0" });
        });
        it('nags if empty array', () => {
            assert.throws(() => BazArray.getTop([]), { message: "Array has 0 elements which is fewer than 1 required" });
        });
        it('nags if not enough elements', () => {
            assert.throws(() => BazArray.getTop([1, 2], x => x, 3), { message: "Array has 2 elements which is fewer than 3 required" });
        });
        const arr = [{ val: 1 }, { val: 3 }, { val: 5 }, { val: 2 }, { val: 0 }, { val: -1 }, { val: 4 }];
        it('gets max if ungiven element count', () => {
            const max = BazArray.getMax(arr, x => x.val);
            assert.deepStrictEqual(BazArray.getTop(arr, x => x.val), { indices: [max.index], items: [max.item], values: [max.value], });
        });
        it('gets correct elements', () => {
            const res = BazArray.getTop(arr, x => x.val, 2);
            assert.strictEqual(res.items.length, 2);
            assert.deepStrictEqual(res.items[0], { val: 5 });
            assert.deepStrictEqual(res.items[1], { val: 4 });
            assert.strictEqual(res.indices.length, 2);
            assert.strictEqual(res.indices[0], 2);
            assert.strictEqual(res.indices[1], 6);
            assert.strictEqual(res.values.length, 2);
            assert.strictEqual(res.values[0], 5);
            assert.strictEqual(res.values[1], 4);
        });
    });

    describe(BazArray.getMax.name, () => {
        it('nags if empty array', () => {
            assert.throws(() => BazArray.getMax([]), { message: "Array cannot be empty" });
        })
        it('gets correct value', () => {
            const arr = [{ val: 1 }, { val: 3 }, { val: 5 }, { val: 2 }, { val: 0 }, { val: -1 }, { val: 4 }];
            const res = BazArray.getMax(arr, x => x.val);
            assert.deepStrictEqual(res.item, { val: 5 });
            assert.strictEqual(res.index, 2);
            assert.strictEqual(res.value, 5);
        });
        it('gets lower index if equal values', () => {
            const arr = [{ val: 1 }, { val: 1 }];
            const res = BazArray.getMax(arr, x => x.val);
            assert.deepStrictEqual(res.item, { val: 1 });
            assert.strictEqual(res.index, 0);
            assert.strictEqual(res.value, 1);
        });
    });

    describe(BazArray.sortAscend.name, () => {
        it('sorts', () => {
            const arr = [{ val: 1 }, { val: 3 }, { val: 5 }, { val: 2 }, { val: 0 }, { val: 4 }];
            BazArray.sortAscend(arr, x => x.val);
            for (let i = 0; i < arr.length; i++)
                assert.strictEqual(arr[i].val, i);
        });
    });

    describe(BazArray.sortDescend.name, () => {
        it('sorts', () => {
            const arr = [{ val: 1 }, { val: 3 }, { val: 5 }, { val: 2 }, { val: 0 }, { val: 4 }];
            BazArray.sortDescend(arr, x => x.val);
            for (let i = 0; i < arr.length; i++)
                assert.strictEqual(arr[i].val, arr.length - i - 1);
        });
    });

    describe(BazArray.pickRandom.name, () => {
        it('nags if empty array', () => {
            assert.throws(() => BazArray.pickRandom([]), { message: "Array cannot be empty" });
        });
        it('nags if batchSize < 1', () => {
            assert.throws(() => BazArray.pickRandom([1], 0), { message: "Batch size of 0 must be at least 1" });
        });
        it('nags if batchSize > array length', () => {
            assert.throws(() => BazArray.pickRandom([1], 2), { message: "Array has 1 elements which is fewer than 2 required" });
        });
        it('gets correct number of items', () => {
            const batchSize = 2;
            const arr = [1, 2, 3, 4, 5];
            const res = BazArray.pickRandom(arr, batchSize);
            assert.strictEqual(res.items.length, batchSize);
            assert.strictEqual(res.indices.length, batchSize);
        });
    });

    describe(BazArray.hasNone.name, () => {
        it('gets true if empty array', () => {
            assert.strictEqual(BazArray.hasNone([]), true);
        });
        it('gets false if non-empty array', () => {
            assert.strictEqual(BazArray.hasNone([null]), false);
        });
    });

    describe(BazArray.hasAny.name, () => {
        it('gets false if empty array', () => {
            assert.strictEqual(BazArray.hasAny([]), false);
        });
        it('gets true if non-empty array', () => {
            assert.strictEqual(BazArray.hasAny([null]), true);
        });
    });

    describe(BazArray.getLast.name, () => {
        it('nags if empty array', () => {
            assert.throws(() => BazArray.getLast([]), { message: "Array cannot be empty" });
        });
        it('gets last item', () => {
            assert.strictEqual(BazArray.getLast([1, 2, 3, 4]), 4);
        });
    });
});
