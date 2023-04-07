export class Section {
    constructor({ items, renderer }, elementsList) {
        this._items = items;
        this._renderer = renderer;
        this._elementsList = elementsList; //возможен тут нужен .content
    }

    renderItem() {
        this._items.forEach(element => {
            this._renderer(element);
        });
    }

    addItem(item) {
        this._elementsList.prepend(item);
    }
}