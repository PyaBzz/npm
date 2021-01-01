Array.prototype.takeFirstOut = function (elementCount = 1) {
    return this.splice(0, elementCount);
}

Array.prototype.takeLastOut = function (elementCount = 1) {
    return this.splice(-elementCount, elementCount);
}

Array.prototype.addToFront = function (...params) {
    for (let i = params.length - 1; i >= 0; i--)
        this.unshift(params[i]);
}

Array.prototype.clone = function (fromIndex = 0, elementCount) {
    if (isUndefined(elementCount))
        elementCount = this.length;
    return this.slice(fromIndex, elementCount);
}

Array.prototype.forEachInterval = function (action, timeStep, callback) {
    if (this.hasNone)
        return;
    let i = 0;
    let elem = this[0];
    action(elem);
    let me = this;
    const loopHandle = setInterval(function () { //Todo: Could add index to callback args
        i++;
        if (i < me.length) {
            elem = me[i];
            action(elem);
        } else {
            clearInterval(loopHandle);
            ifFunctionRun(callback);
        }
    }, timeStep);
}

Array.prototype.getTop = function (getter = el => el, elementCount = 1) {
    if (elementCount === 1) { //Todo: compare if elementCount < log(this.length) and implement O(n*k)
        let max = this.getMax(getter);
        return { items: [max.item], indexes: [max.index], values: [max.value] };
    }
    let temp = [];
    this.forEach((e, i, a) => temp[i] = { elem: e, ind: i });
    temp.sortDescending(n => getter(n.elem));
    let top = temp.takeFirstOut(elementCount);
    return { items: top.map(n => n.elem), indexes: top.map(n => n.ind), values: top.map(n => getter(n.elem)) };
}

Array.prototype.getMax = function (getter = el => el) {
    let index = 0;
    let element = this[index];
    let maxVal = getter(element);
    for (let i = 1; i < this.length; i++) { //O(n) faster than getTop
        const elem = this[i]
        const val = getter(elem);
        if (val > maxVal) {
            index = i;
            element = elem;
            maxVal = val;
        }
    }
    return { item: element, index: index, value: maxVal };
}

Array.prototype.sortAscending = function (valueGetter) {
    this.sort((a, b) => valueGetter(a) - valueGetter(b));
}

Array.prototype.sortDescending = function (valueGetter) {
    this.sort((a, b) => valueGetter(b) - valueGetter(a));
}

Array.prototype.pickRandom = function (batchSize = 1) {
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

Array.prototype.shuffle = function (batchSize = 1) {
    for (let i = 1; i < this.length; i++) {
        let ind = Random.getInt(0, i - 1);
        [this[i], this[ind]] = [this[ind], this[i]];
    }
}

Object.defineProperties(Array.prototype, {
    last: { get: function () { return this[this.length - 1] } },
    hasAny: { get: function () { return Boolean(this.length) } },
    hasNone: { get: function () { return Boolean(this.length === 0) } },
});
