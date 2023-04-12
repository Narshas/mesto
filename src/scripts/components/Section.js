export class Section {
    constructor({ renderer }, elementsList) {
        // this._items = items;
        this._renderer = renderer;
        this._elementsList = elementsList;
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