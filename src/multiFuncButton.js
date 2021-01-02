class MultiFuncButton {
    #element;
    #funcs = {};

    constructor(element, funcDescriptions) {
        this.#element = element;
        copyProperties(funcDescriptions, this.#funcs);
        const initialKey = getPropKeyByIndex(this.#funcs, 0);
        this.bind(initialKey);
    }

    bind(label) {
        let me = this;
        this.#element.onmousedown = () => me.#funcs[label]();
        this.#element.innerText = label;
    }
} 
