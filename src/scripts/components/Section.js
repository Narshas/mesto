export class Section {
    constructor({ renderer }, elementsListSelector) {
        this._renderer = renderer;
        this._elementsList = document.querySelector(elementsListSelector);
    }

    renderItem = (items) => {
        items.forEach(element => {
            this._renderer(element);
        });
    }

    addItem = (item) => {
        this._elementsList.prepend(item);
    }
}