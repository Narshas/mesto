export class Section {
    constructor({ items, renderer }, elementsList) {
        this._items = items;
        this._renderer = renderer;
        this._elementsList = elementsList; //возможен тут нужен .content
    }

    renderItem() {
        this._items.forEach(element => {
            element._renderer;
        });
    }

    addItem(item) {
        this._elementsList.prepend(item);
    }
}